import React, { Component } from "react";
import { Link } from 'react-router-dom';
import session from "express-session";

class Header extends Component {

  logout = () => {
    localStorage.clear('token');
    session.destroy();
    this.history.push('/');
  }

  render() {
    return (
      <section>
        <p>
          <Link to='/dashboard'>Dashboard</Link>
        </p>
        <p>
          <Link to='/about'>About</Link>
        </p>
        {/* <p>
          <Link to='/donate'>Donate</Link>
        </p>
        <p>
          <Link to='/contact'>Contact Me</Link>
        </p> */}
        <button onClick={this.logout}>Logout</button>
      </section>
    );
  }
};

export default Header;


// add Links to other pages in the app