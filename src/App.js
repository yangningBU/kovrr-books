import Catalog from './books/Catalog';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <Catalog />
      </main>
    </div>
  );
}

export default App;
