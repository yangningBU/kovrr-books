import Catalog from './catalog/Catalog';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kovrr <i className="fa-book-open-reader fa-classic"></i> Books</h1>
      </header>
      <main>
        <Catalog />
      </main>
    </div>
  );
}

export default App;
