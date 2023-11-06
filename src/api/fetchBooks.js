const ENDPOINT = "https://www.googleapis.com/books/v1/volumes"
const MAX_RESULT_LIMIT = 40

const fetchBooks = async ({maxResults, offset, searchTerm}) => {
  const search = `?q=cyber ${searchTerm || ''}`
  const normalOptions = `&maxResults=${maxResults || 10}&startIndex=${offset || 0}`
  if (maxResults <= MAX_RESULT_LIMIT) {
    return fetch(`${ENDPOINT}${search}${normalOptions}`)
      .then(data => data.json())
      .then(data => data.items)
  } else {
    const numberOfIterations = Math.ceil(maxResults / MAX_RESULT_LIMIT)
    const limit = maxResults / numberOfIterations
    let results = []
    let iterations = []
    for (let i = 0; i < numberOfIterations; i++) {
      const correctedOffset = offset + limit * i
      const correctedOptions = `&maxResults=${limit}&startIndex=${correctedOffset}`
      iterations.push(fetch(`${ENDPOINT}${search}${correctedOptions}`)
        .then(data => data.json())
        .then(data => data.items)
        .then(books => {
          results = [...results, ...books]
          return books
        })
      )
    }
    return Promise.all(iterations).then(_ => results)
  }
}

export default fetchBooks