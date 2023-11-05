import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactModal from 'react-modal'

import { DEFAULT_IMAGE, REMOVE_FROM_CART } from '../constants'
import './Cart.css'

const Cart = () => {
  const cartItems = useSelector(state => state.cart)
  const count = cartItems.length

  const [isCartOpen, setIsCartOpen] = useState(false)
  const closeModal = () => setIsCartOpen(false)

  const dispatch = useDispatch()
  const removeFromCart = (index) => {
    dispatch({type: REMOVE_FROM_CART, payload: index})
  }
  return <>
    <button onClick={() => setIsCartOpen(true)} id="cart-button">
      <span>{count}</span><i className="fa-solid fa-cart-shopping"></i>
    </button>
    <ReactModal
      isOpen={isCartOpen}
      className="purchase-form-modal"
      overlayClassName="purchase-form-modal-overlay"
      shouldCloseOnEsc={true}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      appElement={document.getElementById('modal')}
    >
      <h1>Cart</h1>
      <span className="close" onClick={closeModal}>&#x2717;</span>
      {cartItems.map((book, index) => {
        const authors = (book.authors || []).join(', ')
        const bookTitle = book.title
        const image = book.imageLinks?.thumbnail || DEFAULT_IMAGE

        return (
          <div className="cart-book">
            <h3 style={{marginBottom: 0}}>{bookTitle}</h3>
            <p style={{marginTop: '.5rem'}}>by {authors}</p>
            <img src={image} alt=""/>
            <button onClick={() => removeFromCart(index)}>Remove from Cart</button>
          </div>
        )
      })}
      {cartItems.length === 0 && (
        <div>
          <h3>Nothing here yet.</h3>
          <p>Why don't you add some books?</p>
        </div>
      )}
    </ReactModal>
  </>
}

export default Cart