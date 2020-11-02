import axios from 'axios';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { getUser } from '../../redux/reducer';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegister = (e) => {
    e.preventDefault();
    const { email, password } = this.state
      axios
        .post("/api/register", { email, password })
        .then((res) => {
          this.props.getUser(res.data);
          this.props.history.push("/dashboard");
        })
        .catch((err) => console.log(err));
    } 
  

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
      axios
      .post("/api/login", { email, password })
      .then((res) => {
        this.props.getUser(res.data);
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  render(){
    return (
      <div>
        <h1 name='App Title'>Get Swoll Exercise Tracker</h1>
        <h2>Please Login or Register</h2>
        <input
          value={this.state.email}
          name='email'
          placeholder="Email"
          onChange={(e) => this.handleInput(e)}
        />
        <input
          value={this.state.password}
          name="password"
          placeholder="Password"
          onChange={(e) => this.handleInput(e)}
        />
        <button onClick={this.handleRegister}>Register</button>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser })(Landing);
