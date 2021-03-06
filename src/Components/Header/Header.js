import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.scss';

class Header extends Component {

  handleLogout = (e) => {
    axios
    .get('/api/logout', (req, res) => {
      req.session.destroy();
      res.status(200).send(console.log('user has been logged out'))
  });
  // this.props.history.push("/");
}

  render() {
    return (
      <section class="Header" >
        <p>
          <Link className="Link" to='/dashboard'> Dashboard </Link>
        </p>
        <p>
          <Link to='/about'> About Me </Link>
        </p>
        <p>
          <Link to='/donate'> Donate </Link>
        </p>
        <p>
          <Link to='/contact'>Contact</Link>
        </p>
        {/* <button onClick={this.handleLogout}>Logout</button> */}
      </section>
    );
  }
};

export default Header;


// add Links to other pages in the app