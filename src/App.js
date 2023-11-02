import Catalog from './books/Catalog';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kovrr <i class="fa-book-open-reader"></i> Books</h1>
      </header>
      <main>
        <Catalog />
      </main>
    </div>
  );
}

export default App;
