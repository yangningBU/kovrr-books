import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';

import { DEFAULT_IMAGE } from "../constants"

const PurchaseForm = ({book, closeModal}) => {
  const bookTitle = book.title || 'Unknown'
  const authors = (book.authors || []).join(", ")
  const image = book.imageLinks?.thumbnail || DEFAULT_IMAGE
  const { register, handleSubmit, formState: { errors } } = useForm()

  console.log(errors)
  
  return (
    <>
      <h1>Purchase Form</h1>
      <span className="close" onClick={closeModal}>&#x2717;</span>
      
      <h3><span style={{backgroundColor: '#555555'}}>{bookTitle}</span></h3>
      <h4>{book.subtitle}</h4>
      <h4>by {authors}</h4>
      <section id="purchase-form">
        <div>
          <img src={image} alt=""/>
        </div>

        <form onSubmit={handleSubmit((data) => {
          if (!!errors) {
            console.log("Purchase Data Sheet", data)
            closeModal()
          }
        })}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              {...register(
                "name",
                {
                  required: 'Name must be at least 5 characters long',
                  minLength: 5
                }
              )}/>
          </label>
          <p>{errors.name?.message}</p>
          <label htmlFor="phone-number">
            Phone Number
            <input
              type="tel"
              {...register(
                "phone-number",
                {
                  pattern: "[0-9]{10}",
                  required: "Please enter 10 digit phone number"
                }
              )}
            />
          </label>
          <p>{errors['phone-number']?.message}</p>
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
          <p>{errors.email?.message}</p>
          <label htmlFor="address">
            Address
            <input
              type="text"
              {...register(
                "address",
                {
                  required: 'Must be at least 10 characters long',
                  minLength: 10
                }
              )}
            />
          </label>
          <p>{errors.address?.message}</p>
          <button type="submit">Purchase</button>
        </form>
      </section>
    </>
  )
}

const PurchaseFormModal = ({book, isOpen, onClose}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className="registration-modal"
      overlayClassName="registration-modal-overlay"
      shouldCloseOnEsc={true}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      appElement={document.getElementById('modal')}
    >
      <PurchaseForm book={book} closeModal={onClose}/>
    </ReactModal>
)}

export default PurchaseFormModal