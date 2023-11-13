const ENDPOINT = "https://www.googleapis.com/books/v1/volumes"
const MAX_RESULT_LIMIT = 40
const DEFAULT_RESULT_LIMIT = 10
const DEFAULT_OFFSET = 0

const fetchBooks = async ({pageSize, pageIndex, searchTerm}) => {
  const search = `?q=cyber${' ' + searchTerm || ''}`
  const iterationParameters = determineFetchParameters({pageSize, pageIndex})
  let allResults = []
  const allFetches = iterationParameters.map(iteration => {
    const options = `&maxResults=${iteration.max || DEFAULT_RESULT_LIMIT}&startIndex=${iteration.offset || DEFAULT_OFFSET}`
    return fetch(`${ENDPOINT}${search}${options}`)
        .then(data => data.json())
        .then(data => data.items)
        .then(books => {
          allResults = [...allResults, ...books]
          return allResults
        })
  })

  return Promise.all(allFetches).then(_ => {
    return allResults
  })
}

export default fetchBooks

export const determineFetchParameters = ({pageSize, pageIndex}) => {
  const size = pageSize || DEFAULT_RESULT_LIMIT
  const baseOffset = pageIndex ? pageIndex * size : DEFAULT_OFFSET
  if (size < MAX_RESULT_LIMIT) {
    return [
      {
        max: size,
        offset: baseOffset
      }
    ]
  }

  let sizeLeft = size
  let offsetLeft = baseOffset
  const out = []
  const numberOfIterations = Math.ceil(size / MAX_RESULT_LIMIT)
  for(let i = 0; i < numberOfIterations; i++) {
    const iterationSize = Math.min(sizeLeft, MAX_RESULT_LIMIT)
    const pageOffset = offsetLeft
    out.push({
      max: iterationSize,
      offset: pageOffset
    })
    sizeLeft -= MAX_RESULT_LIMIT
    offsetLeft += iterationSize
  }

  return out
}
