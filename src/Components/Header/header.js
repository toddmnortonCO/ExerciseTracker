import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      <section>
        <p>
          <Link to='/dashboard'>Dashboard</Link>
        </p>
        <p>
          <Link to='/about'>About</Link>
        </p>
        <p>
          <Link to='/donate'>Donate</Link>
        </p>
        {/* <p>
          <Link to='/contact'>Contact Me</Link>
        </p> */}
        <button onClick={this.handleLogout}>Logout</button>
      </section>
    );
  }
};

export default Header;


// add Links to other pages in the app