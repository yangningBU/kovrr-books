import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DEFAULT_MAX_RESULT_COUNT,
  SET_BOOKS,
  LOAD_ERROR,
  LOAD_START
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
  const offset = pageIndex * maxResultCount
  const showPrevious = pageIndex > 0

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  /* FIXME: LOADING LOGIC */
  useEffect(() => {
    dispatch({type: LOAD_START})
    fetchBooks({maxResults: maxResultCount, offset, searchTerm})
      .then(apiBooks => dispatch({
        type: SET_BOOKS,
        payload: apiBooks
      }))
      .catch(error => dispatch({type: LOAD_ERROR}))
  }, [dispatch, maxResultCount, offset, debouncedSearchTerm])

  const MaxResult = ({count = 10}) => (
    <button
      onClick={() => setMaxResultCount(count)}
      className={maxResultCount === count ? 'selected' : undefined}
    >{count}</button>
  )

  return (
    <div id="catalogWrapper">
      <h1>Catalog</h1>
      <div className="controls">
        <span>Result Size: </span>
        <MaxResult count={10} />
        <MaxResult count={25} />
        <MaxResult count={40} />
      </div>
      <div className="controls">
        <button onClick={() => setPageIndex(pageIndex - 1)} disabled={!showPrevious}>Prev</button>
        <span>Page {pageIndex + 1}</span>
        <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
      </div>

      <SearchBar search={searchTerm} handleChange={setSearchTerm} />

      <div id="scroll">
        <div className="catalog">
          {books.map(book => <CatalogBook book={book} key={book.id}/>)}
        </div>
      </div>
    </div>
  )
}

export default Catalog