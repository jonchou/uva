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
      <div >
        {this.props.wineRoutes.map((route, index) => (
          <ul key={index}>
              <div className='nav'>
                    <Link to={route.path}>
                  <li>
                      <h2>
                      {route.title}
                      </h2>
                  </li>
                    </Link>
              </div>
          </ul>
        ))}
      </div>
    )
  }
}

export default Nav;