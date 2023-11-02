import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SET_BOOKS, LOAD_ERROR, LOAD_START } from "../constants";
import fetchBooks from '../api/fetchBooks';

import './Catalog.css';

const Catalog = () => {
  const books = useSelector(state => state.books)

  console.log("CATALOG:", books)
  const dispatch = useDispatch()
  dispatch({type: LOAD_START})

  useEffect(() => {
    fetchBooks().then(apiBooks => dispatch({
      type: SET_BOOKS,
      payload: apiBooks
    })).catch(error => {
      dispatch({type: LOAD_ERROR})
    })
  }, [dispatch])

  return (
    <>
      <h1 style={{textAlign: 'left', paddingLeft: '1rem'}}>Catalog:</h1>
      <div className="catalog">
        {books.map(book => {
          return (
            <div className="book" key={book.id}>
              <p>{book.volumeInfo.title}</p>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt=""/>
            </div>
          )})}
      </div>
    </>
  )
}

export default Catalog