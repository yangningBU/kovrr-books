import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DEFAULT_MAX_RESULT_COUNT,
  SET_BOOKS
} from "../constants";
import fetchBooks from '../api/fetchBooks';
import CatalogBook from "./CatalogBook";
import SearchBar from "./SearchBar";

import './Catalog.css';

const Catalog = () => {
  const books = useSelector(state => state.books)

  const dispatch = useDispatch()
  const [maxResultCount, setMaxResultCount] = useState(DEFAULT_MAX_RESULT_COUNT)
  const [pageIndex, setPageIndex] = useState(0)
  const showPrevious = pageIndex > 0

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 800)

  useEffect(() => {
    fetchBooks({
      pageSize: maxResultCount,
      pageIndex,
      searchTerm: debouncedSearchTerm
    })
    .then(apiBooks => dispatch({
      type: SET_BOOKS,
      payload: apiBooks
    }))
    .catch(error => console.log(error))
  }, [dispatch, maxResultCount, pageIndex, debouncedSearchTerm])

  const MaxResult = ({count = 10}) => (
    <button
      onClick={() => setMaxResultCount(count)}
      className={maxResultCount === count ? 'selected' : undefined}
    >{count}</button>
  )

  return (
    <div id="catalogWrapper">
      <div className="controls">
        <span>Result Size: </span>
        <MaxResult count={10} />
        <MaxResult count={25} />
        <MaxResult count={50} />
        <MaxResult count={75} />
        <MaxResult count={125} />
      </div>
      <div className="controls">
        <button onClick={() => setPageIndex(pageIndex - 1)} disabled={!showPrevious}>Prev</button>
        <span>Page {pageIndex + 1}</span>
        <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
      </div>
      <br/>
      <SearchBar search={searchTerm} handleChange={setSearchTerm} />

      <div id="scroll">
        <div className="catalog">
          {books.map((book, idx) => <CatalogBook book={book} key={`${idx}-${book.id}`}/>)}
        </div>
      </div>
    </div>
  )
}

export default Catalog