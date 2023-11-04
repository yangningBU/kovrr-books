const ENDPOINT = "https://www.googleapis.com/books/v1/volumes"

const fetchBooks = async ({maxResults, offset, searchTerm}) => {
  const search = `?q=cyber ${searchTerm || ''}`
  const options = `&maxResults=${maxResults || 10}&startIndex=${offset || 0}`
  return fetch(`${ENDPOINT}${search}${options}`)
    .then(data => data.json())
    .then(data => data.items)
}

export default fetchBooks