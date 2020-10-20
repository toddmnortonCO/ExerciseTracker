import axios from 'axios';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducer';

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
          this.props.getUser(res.data);
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
        this.props.getUser(res.data);
        this.props.history.push('/dashboard');
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div>
        <h1>Get Swoll Exercise Tracker</h1>
        <h2>Please Login or Register</h2>
        <input value="email" onEvent={this.handleInput}></input>
        <input value="password" onEvent={this.handleInput}></input>
        <button onClick={this.handleRegister}>Register</button>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default connect(null, {getUser})(Landing);