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
  const bookTitle = book.title || 'Unknown'
  const authors = (book.authors || []).join(", ")
  const image = book.imageLinks?.thumbnail || DEFAULT_IMAGE
  return (
    <ReactModal
      isOpen={isOpen}
      className="registration-modal"
      overlayClassName="registration-modal-overlay"
      shouldCloseOnEsc={true}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
    >
      <h1>Purchase Form</h1>
      <span class="close" onClick={onClose}>&#x2717;</span>
      
      <h3><span style={{backgroundColor: '#555555'}}>{bookTitle}</span> by {authors}</h3>
      <h4>{book.subtitle}</h4>
      <section id="purchase-form">
        <div>
          <img src={image} alt=""/>
        </div>

        <form onSubmit={() => {}}>
          <label for="name">
            Name
            <input type="text" name="name"/>
          </label>
          <label for="phone-number">
            Phone Number
            <input type="phone-number" name="phone-numer"/>
          </label>
          <label for="email">
            Email
            <input type="email" name="email"/>
          </label>
          <label for="address">
            Address
            <input type="text" name="address"/>
          </label>
        </form>
      </section>
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