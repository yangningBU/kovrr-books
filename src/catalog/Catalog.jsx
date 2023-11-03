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
  const [offset, setOffset] = useState(0)

  /* FIXME: LOADING LOGIC */
  dispatch({type: LOAD_START})
  useEffect(() => {
    fetchBooks({maxResults: maxResultCount, offset})
      .then(apiBooks => dispatch({
        type: SET_BOOKS,
        payload: apiBooks
      }))
      .catch(error => dispatch({type: LOAD_ERROR}))
  }, [dispatch, maxResultCount])

  return (
    <div id="catalogWrapper">
      <h1 style={{textAlign: 'left', paddingLeft: '1rem'}}>Catalog:</h1>
      <div>
        <h3>Result Size: {maxResultCount}</h3>
        <button onClick={() => setMaxResultCount(10)}>10</button>
        <button onClick={() => setMaxResultCount(25)}>25</button>
        <button onClick={() => setMaxResultCount(40)}>40</button>
      </div>
      <span className="arrow" id="leftArrow">
        <i className="fa-solid fa-arrow-left"></i>
      </span>
      <div className="catalog">
        {books.map(book => <CatalogBook book={book} key={book.id}/>)}
      </div>
      <span className="arrow" id="rightArrow">
        <i className="fa-solid fa-arrow-right"></i>
      </span>
    </div>
  )
}

export default Catalog