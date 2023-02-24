import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {RxHamburgerMenu} from 'react-icons/rx';
import {AiOutlineClose} from 'react-icons/ai';




const sidebarData = [
    {
        title: 'HOME',
        path: '/',
        cName: 'nav-text',
        show: ''
    },
    {
        title: 'ABOUT',
        path: '/about',
/*         icon: < IoHammerOutline />, */
        cName: 'nav-text',
        show: ''
    },
    {
        title: 'SIGN UP/ SIGN IN',
        path: '/signup',
        cName: 'nav-text',
        show: 'anonymous'        
    },    
    {
        title: 'ACCOUNT',
        path: '/account',
        cName: 'nav-text',
        show: 'user'
    }
]

const MenuList = (props) => {

    let flag = 'user';
    if(props.auth){
        flag = 'anonymous'
    }

    return (
        <ul className="w-full h-[60vh] pr-8 flex flex-col leading-loose
        ">
            {sidebarData.filter(each => each.show !== flag)
                .map((item, index) => {
                return (
                    <li key={index} className="border-b-2 border-[#ffffff] w-10/12 py-4 pt-4">
                        <a id={item.cName} href={item.path}>{item.title}</a>
                    </li>
                );
            })}
            <li className=''><a href='#contactMe'>Contact</a></li>
        </ul>
    )
}

const Navbar = props => {
    const [showNav, setShowNav] = useState(false)

    const handleToggleShowNav = () =>{
        setShowNav(!showNav);
    }

    return (
        <div className='flex'>
            <div className='fixed right-0 pt-8 pr-8' onClick={handleToggleShowNav}>
                <RxHamburgerMenu size="40"/>
            </div>

            <div className= {'flex fixed w-[22em] max-w-[85%] h-full right-0 ease-in-out duration-500 text-white ' + (showNav ? 'translate-x-0' : 'translate-x-full')}>
                {/* below is a tailwind css trick to spin the svg icon upon open and closing */}
                <div className='h-[60px] aspect-square pt-4' onClick={handleToggleShowNav}>
                    <div className={showNav ? '' : 'rotate-[360deg] ease-in-out duration-500 text-[#585858]  '}>
                        <div className={showNav ? 'rotate-[360deg] ease-in-out duration-500 text-[#585858] ' : ''}>
                        <AiOutlineClose size="40"/>
                        </div>
                    </div>
                </div>
                <div className=' z-10 bg-[#585858] drop-shadlow-lg w-full h-full px-8 py-8'>
                    <div className='flex flex-col'>
                        <h1 className='text-3xl font-bond mr-4 sm:text-4xl'>
                            MENU 
                        </h1>
                        <MenuList auth={props.auth}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

Navbar.propTypes = {
    
};

export default Navbar;