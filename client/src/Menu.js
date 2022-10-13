import {slide as Menu} from 'react-burger-menu';
import React from 'react';

function HamMenu(){
    let styles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px'
        },
        bmBurgerBars: {
            background: 'black'
        },
        bmCross: {
            background: 'red'
        },
        bmMenu: {
            background: 'gray',
            padding: '5em 2em 0',
            fontSize: '1em'
        }
    }


    return (
        <Menu styles={styles} width={'40%'}>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="signUp" className="menu-item" href="/contact">Sign Up</a>
        </Menu>
    );

}

export default HamMenu;