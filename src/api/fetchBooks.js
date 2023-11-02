const ENDPOINT = "https://www.googleapis.com/books/v1/volumes?q=cyber"

const fetchBooks = async ({maxResults}) => {
  return fetch(`${ENDPOINT}&maxResults=${maxResults || 10}`)
    .then(data => data.json())
    .then(data => data.items)
}

export default fetchBooks