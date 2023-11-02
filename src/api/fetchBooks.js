const ENDPOINT = "https://www.googleapis.com/books/v1/volumes?q=cyber"

const fetchBooks = async (input) => {
  return fetch(ENDPOINT)
    .then(data => data.json())
    .then(data => data.items)
}

export default fetchBooks