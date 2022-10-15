
import { useEffect, useState } from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import {GrClose} from "react-icons/gr";

import './css/NavBar.css';
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
            </ul>
        </nav>

      </div>
    );
  }
  
  export default NavBar;
  