import fetchBooks from './fetchBooks';

test('renders learn react link', () => {
  return fetchBooks().then(books => {
    const title = books[0].volumeInfo.title
    expect(title).toContain('Cyber')
  })
});
