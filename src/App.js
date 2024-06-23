import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import CardsDetails from './components/CardsDetails';
import Cards from './components/Cards';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/cart/:id" element={<CardsDetails />} />
          {/* <Route path="/Edit/:id" element={<Edit />} /> */}
          {/* <Route path="/Details/:id" element={<Details />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
