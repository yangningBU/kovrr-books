import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOAD_BOOKS } from "../constants";
import fetchBooks from '../api/fetchBooks';

import './Catalog.css';

const Catalog = () => {
  const books = useSelector(state => state.books)
  console.log("CATALOG:", books)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchBooks().then(apiBooks => dispatch({
      type: LOAD_BOOKS,
      payload: apiBooks
    }))
  }, [dispatch])

  return (
    <div className="catalog">
      {books.map(book => {
        return (
          <div className="book" key={book.id}>
            <p>{book.volumeInfo.title}</p>
            <img src={book.volumeInfo.imageLinks.thumbnail}/>
          </div>
        )})}
    </div>
  )
}

export default Catalog