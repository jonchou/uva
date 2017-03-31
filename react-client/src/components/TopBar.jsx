import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


class TopBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }


  render(){
    var signup = (<button className='flexItem flexEdge' onClick={this.props.handleUserWantsSignUp} value='signup'>Sign Up</button>);
    var home = (<button onClick={this.props.handleUserWantsHome} className='flexItem flexEdge' value='login'>Home</button>);

    return(
      <Link to='/'>
        <div className='flexContainer'>
          { this.props.userWantsHomePage && !this.props.userLoggedIn ? signup : this.props.userWantsHomePage && this.props.userLoggedIn || this.props.userWantsLogin ? home : home}
       </div>  
      </Link>
    )
  }
}

export default TopBar;