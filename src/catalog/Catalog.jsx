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
import './Catalog.css';

const Catalog = () => {
  const books = useSelector(state => state.books)

  const dispatch = useDispatch()
  const [maxResultCount, setMaxResultCount] = useState(DEFAULT_MAX_RESULT_COUNT)
  /* FIXME: extract to method */
  const [pageIndex, setPageIndex] = useState(0)
  const offset = pageIndex * maxResultCount
  const showPrevious = pageIndex > 0

  /* FIXME: LOADING LOGIC */
  dispatch({type: LOAD_START})
  useEffect(() => {
    fetchBooks({maxResults: maxResultCount, offset})
      .then(apiBooks => dispatch({
        type: SET_BOOKS,
        payload: apiBooks
      }))
      .catch(error => dispatch({type: LOAD_ERROR}))
  }, [dispatch, maxResultCount, offset])

  return (
    <div id="catalogWrapper">
      <h1>Catalog</h1>
      <div className="controls">
        <span>Result Size: </span>
        <button
          onClick={() => setMaxResultCount(10)}
          className={maxResultCount === 10 ? 'selected' : undefined}
        >10</button>
        <button
          onClick={() => setMaxResultCount(25)}
          className={maxResultCount === 25 ? 'selected' : undefined}
        >25</button>
        <button
          onClick={() => setMaxResultCount(40)}
          className={maxResultCount === 40 ? 'selected' : undefined}
        >40</button>
      </div>
      <div className="controls">
        <button onClick={() => setPageIndex(pageIndex - 1)} disabled={!showPrevious}>Prev</button>
        <span>Page {pageIndex + 1}</span>
        <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
      </div>
      <div id="scroll">
        <div className="catalog">
          {books.map(book => <CatalogBook book={book} key={book.id}/>)}
        </div>
      </div>
    </div>
  )
}

export default Catalog