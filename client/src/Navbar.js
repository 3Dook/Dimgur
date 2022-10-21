
import { useEffect, useState } from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import {GrClose} from "react-icons/gr";
import './css/NavBar.css';
import axios from 'axios';
const domain = "http://localhost:5001/user";

const sidebarData = [
    {
        title: 'HOME',
        path: '/',
        cName: 'nav-text'
    },
    {
        title: 'SIGN UP',
        path: '/signup',
        cName: 'nav-text'
    },
    {
        title: 'ABOUT',
        path: '/about',
/*         icon: < IoHammerOutline />, */
        cName: 'nav-text'
    },
    {
        title: 'ACCOUNT',
        path: '/account',
        cName: 'nav-text'
    }
]


function NavBar() {
    const [menuOpen, setMenuOpen] = useState(true);
    
    const toggleMenu = ()=>{
        setMenuOpen(!menuOpen)

        if(menuOpen){
            document.documentElement.style.setProperty('--menu-display', 'flex');
        }else{
            document.documentElement.style.setProperty('--menu-display', 'none');
        }
    }
 

    const handleLogOut = async e =>{
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: domain + "/logout",
                withCredentials: true,
            })
                .then((res)=>{
                    console.log(res.data)
                })
                .catch((e)=>{
                    console.log("failed - ", e.response.data.message)
                })
        } catch (error) {
            console.error(error.Message)
            
        }
    }
    

    return (
      <div className="navigation">
        <div className="hamburger">
            { menuOpen?
                    <GiHamburgerMenu className="burgerIcon" size='3rem' onClick={toggleMenu}/>
                    :
                    <GrClose className="burgerIcon" size='3rem' onClick={toggleMenu}/>
            }
        </div>

        <nav className='nav-container'>
            <h1>MENU</h1>
            <ul className="navMenuItems">
                    {sidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <a id={item.cName} href={item.path}>{item.title}</a>
                            </li>
                        );
                    })}
            <form onSubmit={handleLogOut}>
                <input type="submit" value="LOG OUT" className="logOutSubmit"/>
            </form>
            </ul>
        </nav>

      </div>
    );
  }
  
  export default NavBar;
  