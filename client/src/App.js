import './App.css';
import React from "react";
import ReactDOM from "react-dom";

import Header from './Header';
import HamMenu from './Menu';

function App() {
  return (
    <div className="App">
      <HamMenu/>
      <Header/>
      <div className='main'>
        stuff goes here
      </div>
    </div>
  );
}

export default App;
