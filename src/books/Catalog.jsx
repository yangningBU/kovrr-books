import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from 'react-modal';

import {
  DEFAULT_MAX_RESULT_COUNT,
  SET_BOOKS,
  LOAD_ERROR,
  LOAD_START
} from "../constants";
import fetchBooks from '../api/fetchBooks';

import './Catalog.css';

const DEFAULT_IMAGE = "https://images.placeholders.dev/?width=125&height=200&bgColor=%23555555&textColor=%23fd6e71&text=%F0%9F%9A%AB"

const CatalogBook = ({book}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const bookTitle = book.volumeInfo.title
  const image = book.volumeInfo.imageLinks?.thumbnail || DEFAULT_IMAGE
  return (
    <>
      <div className="book" key={book.id} onClick={() => setIsModalOpen(true)}>
        <p>{bookTitle}</p>
        <img src={image} alt=""/>
      </div>
      <RegistrationModal
        isOpen={isModalOpen}
        book={book.volumeInfo}
        onClose={() => setIsModalOpen(false)}
        style={{content: { color: 'black'}}}
      />
    </>
  )
}

const RegistrationModal = ({book, isOpen, onClose}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className="registration-modal"
      shouldCloseOnEsc={true}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
    >
      <h1>Registration</h1>
      <p>You are interested in purchasing "<span style={{fontWeight: 'bold'}}>{book.title || 'Unknown'}</span>".</p>
      <input type="text"/>
    </ReactModal>
)}

const Catalog = () => {
  const books = useSelector(state => state.books)

  const dispatch = useDispatch()
  const [maxResultCount, setMaxResultCount] = useState(DEFAULT_MAX_RESULT_COUNT)

  /* FIXME: LOADING LOGIC */
  dispatch({type: LOAD_START})
  useEffect(() => {
    fetchBooks({maxResults: maxResultCount}).then(apiBooks => dispatch({
      type: SET_BOOKS,
      payload: apiBooks
    })).catch(error => {
      dispatch({type: LOAD_ERROR})
    })
  }, [dispatch, maxResultCount])

  return (
    <>
      <h1 style={{textAlign: 'left', paddingLeft: '1rem'}}>Catalog:</h1>
      <div>
        <h3>Result Size: {maxResultCount}</h3>
        <button onClick={() => setMaxResultCount(10)}>10</button>
        <button onClick={() => setMaxResultCount(25)}>25</button>
        <button onClick={() => setMaxResultCount(40)}>40</button>
      </div>
      <div className="catalog">
        {books.map(book => <CatalogBook book={book} key={book.id}/>)}
      </div>
    </>
  )
}

export default Catalog