import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

var TopBar = ({handleClickedNavItem}) => (
  <div>
    <Link to='/'>
      <div className='flexContainer'>
        <button onClick={() => {handleClickedNavItem(-1)}}>Home</button>
      </div>
    </Link>
    <Link to='/questionnaire'>
      <div className='flexContainer'>
        <button onClick={() => {handleClickedNavItem(-1)}}>Survey</button>
      </div>
    </Link>
  </div>
);

export default TopBar;