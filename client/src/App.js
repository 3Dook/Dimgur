import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import SignUp from './SignUp';
import Account from './Account';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='main'>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/account/:id' element={<Account/>} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
