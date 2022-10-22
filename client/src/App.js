import { useEffect, useState } from "react";
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import SignUp from './SignUp';
import Account from './Account';
import NavBar from './Navbar';
import axios from 'axios';

const domain = "http://localhost:5001"

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("");

  const isAuthenticated = async () =>{
        try {
            const response = await axios({
                method: 'get',
                url: domain + "/user/account",
                withCredentials: true,
            })
                .then((res)=>{
                    console.log(res.data.id)
                    setUser(res.data.id)
                    // set is Auth here since we know we are getting user data
                    setIsAuth(!isAuth)
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
/*             window.location = "/";  */
        } catch (error) {
            console.error(error.Message)
            
        }
  }

  useEffect(()=>{
    isAuthenticated()
  }, []);

  return (
    <div className="App">
      <NavBar auth={isAuth}/>
      <Header/>
      <div className='main'>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/account' element={<Account/>} />
        </Routes>
      </Router>
      </div>
      <div className='test'>
        user is {user}
      </div>
    </div>
  );
}

export default App;
