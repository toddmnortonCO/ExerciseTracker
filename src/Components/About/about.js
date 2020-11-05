import React, { Component } from 'react'
import Header from '../Header/Header'

class About extends Component {
    render() {
        return (
          <div>
            <Header />
            <h1>About the App Creator</h1>
            <h2>Todd Norton</h2>
            <text>This is just a little about me.<br></br>Not filled in yet.</text>
            <br></br>
            <a href="https://www.linkedin.com/in/toddmnorton/">My LinkedIn Profile</a>
            <br></br>
            <text>Future portfolio link goes here.</text>
            <div id="todd"></div>
            <p></p>
          </div>
        );
    }
}

export default About;

