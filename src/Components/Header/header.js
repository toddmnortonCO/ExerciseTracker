import React, { Component } from "react";
import { Link } from 'react-router-dom';
// import session from "express-session";

class Header extends Component {

  // logout = () => {
  //   localStorage.clear('token');
  //   session.destroy();
  //   this.history.push('/');
  // }

  render() {
    return (
      <section>
        <h1>Get Swoll Exercise Tracker</h1>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/donate'>Donate</Link>
        </li>
        <button onClick={this.logout}>Logout</button>
      </section>
    );
  }
};

export default Header;


// add Links to other pages in the app