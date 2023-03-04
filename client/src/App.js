import { useEffect, useState } from "react";
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
/* import SignUp from './SignUp'; */
import Account from './components/Account';
import Museum from "./Museum";
import EditImage from "./EditImage";
import axios from 'axios';
import Navbar from "./components/Navbar";
import SignUp from "./components/Signup";

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
/*                     console.log(res.data.payload, "app") */
                    setUser(res.data.payload.id)
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
      <Navbar auth={isAuth}/>
      <Header/>
      <div className='main'>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/account' element={<Account isAuth={isAuth}/>} />
          <Route path='/museum' element={<Museum isAuth={isAuth}/>} />
          <Route path='/edit/' element={<EditImage isAuth={isAuth}/>} />
        </Routes>
      </Router>
      </div>
{/*       <div className='test'>
        user is {user}
      </div> */}
    </div>
  );
}

export default App;
