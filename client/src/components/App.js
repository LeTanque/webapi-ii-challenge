import React, { } from 'react';
import logo from '../assets/logo.svg';

import Posts from './Posts.jsx';



const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Posts />

      </header>
    </div>
  );
}

export default App;
