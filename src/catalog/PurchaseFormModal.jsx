import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ADD_TO_CART, DEFAULT_IMAGE } from "../constants"

const PurchaseForm = ({book, closeModal}) => {
  const bookTitle = book.title || 'Unknown'
  const authors = (book.authors || []).join(', ')
  const image = book.imageLinks?.thumbnail || DEFAULT_IMAGE
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const dispatch = useDispatch()
  const addToCart = ({book}) => dispatch({
    type: ADD_TO_CART,
    payload: book
  })

  return (
    <>
      <h1>Purchase Form</h1>
      <span className="close" onClick={closeModal}>&#x2717;</span>
      
      <h3>{bookTitle}</h3>
      <h4>{book.subtitle}</h4>
      <h4>by {authors}</h4>
      <section id="purchase-form">
        <div>
          <img src={image} alt=""/>
        </div>

        <form onSubmit={handleSubmit((data) => {
          if (!!errors) {
            closeModal()
            alert("Purchase order sent!")
          }
        })}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              {...register(
                "name",
                { required: true, minLength: 5 }
              )}/>
          </label>
          <p className='errors'>{!!errors.name && 'Name must be at least 5 characters long'}</p>
          <label htmlFor="phone-number">
            Phone Number
            <input
              type="tel"
              {...register(
                "phone-number",
                {
                  pattern: /^[0-9]{10}/,
                  required: true
                }
              )}
            />
          </label>
          <p className='errors'>{!!errors['phone-number'] && "Please enter 10 digit phone number"}</p>
          <label htmlFor="email">
            Email
            <input
              type="email" {...register(
                "email", { 
                  required: 'Valid email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  }
                })
              }
            />
          </label>
          <p className='errors'>{errors.email?.message}</p>
          <label htmlFor="address">
            Address
            <input
              type="text"
              {...register(
                "address",
                {
                  required: true,
                  minLength: 10
                }
              )}
            />
          </label>
          <p className='errors'>{!!errors.address && 'Must be at least 10 characters long'}</p>
          <button type="submit">Purchase</button>
          <button onClick={() => {
            addToCart({book})
            closeModal()
          }}>Add to Cart</button>
        </form>
      </section>
    </>
  )
}

const PurchaseFormModal = ({book, isOpen, onClose}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className="purchase-form-modal"
      overlayClassName="purchase-form-modal-overlay"
      shouldCloseOnEsc={true}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      appElement={document.getElementById('modal')}
    >
      <PurchaseForm book={book} closeModal={onClose}/>
    </ReactModal>
)}

export default PurchaseFormModal