import fetchBooks from './fetchBooks';

test('fetchBooks', async () => {
  return fetchBooks({}).then(books => {
    const title = books[0].volumeInfo.title
    expect(title).toContain('Cyber')
  })
});
