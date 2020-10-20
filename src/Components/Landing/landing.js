import axios from 'axios';
import React, { Component } from "react";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      verPassword: ''
    }
  }

  handleInput = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  handleRegister = () => {
    const { email, password, verPassword } = this.state;
    if (password && password === verPassword) {
      axios.post('/api/register', { email, password })
        .then(res => {
          //redux function
          this.props.history.push('/dashboard');
        })
        .catch(err => console.log(err));
    } else {
      alert("Passwords don't match")
    }
  }

  handleLogin = () => {
    const { email, password } = this.state;
    axios.post('/api/login', { email, password })
      .then(res => {
        // redux function
        this.props.history.push('/dashboard');
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div>
        <h1>Welcome to Get Swoll Exercise Tracker</h1>
        <h2>Please Login or Register</h2>
        <input value="email"></input>
        <input value='password'></input>
        <button onClick={this.handleRegister}>Register</button>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}

export default Landing;