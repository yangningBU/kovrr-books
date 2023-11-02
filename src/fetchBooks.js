const URL = "https://www.googleapis.com/books/v1/volumes?q=cyber"

export default async (input) => {
  return fetch(URL)
    .then(data => data.json())
    .then(data => data.items)
}
