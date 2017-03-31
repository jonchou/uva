import React from 'react';
import WineList from './WineList.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('props inside nav', this.props);
  }

  render () {
    const NavOption = ({option}) => (
      <div>{option}</div> 
    )

    return (
        <div className='bestCategory trendingCategory'>
          {this.props.wineRoutes.map((route, index) => (
            <div key={index}>
              <ul>
                <li>
                  <Link to={route.path}>
                    <h2>
                    {route.title}
                    </h2>
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
    )
  }
}

export default Nav;