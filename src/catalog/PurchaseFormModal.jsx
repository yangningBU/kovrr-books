import ReactModal from 'react-modal';

import { DEFAULT_IMAGE } from "../constants"

const PurchaseForm = ({book, closeModal}) => {
  const bookTitle = book.title || 'Unknown'
  const authors = (book.authors || []).join(", ")
  const image = book.imageLinks?.thumbnail || DEFAULT_IMAGE
  
  return (
    <>
      <h1>Purchase Form</h1>
      <span class="close" onClick={closeModal}>&#x2717;</span>
      
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
      setAppElement={PurchaseForm}
    >
      <PurchaseForm book={book} closeModal={onClose}/>
    </ReactModal>
)}

export default PurchaseFormModal