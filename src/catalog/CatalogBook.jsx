import { useState } from "react";

import PurchaseFormModal from './PurchaseFormModal'
import { DEFAULT_IMAGE } from '../constants'

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
      <PurchaseFormModal
        isOpen={isModalOpen}
        book={book.volumeInfo}
        onClose={() => setIsModalOpen(false)}
        style={{content: { color: 'black'}}}
      />
    </>
  )
}

export default CatalogBook
