const ENDPOINT = "https://www.googleapis.com/books/v1/volumes?q=cyber"

const fetchBooks = async ({maxResults, offset}) => {
  const options = `&maxResults=${maxResults || 10}&startIndex=${offset || 0}`
  return fetch(`${ENDPOINT}${options}`)
    .then(data => data.json())
    .then(data => data.items)
}

export default fetchBooks