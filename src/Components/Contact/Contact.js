import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Header from '../Header/Header';


class Contact extends Component {
    constructor(props){
        super(props)
        this.state = { 
            userEmail: "",
            userQuestion: "",
        }

    }

    handleInput = (e, val) => {
        console.log(e.target)
        this.setState({[e.target.name]: val})
      }

    sendEmail = () => {
        console.log(this.props);
        axios.post(`/api/email`, {
            userEmail: this.state.userEmail
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Header />
                <br />
                <h2>
                Submit your question below!
                </h2>
                <br />
                <input 
                placeholder="Enter Email Address Here"
                onChange={(e) => this.handleInput(e, e.target.value)}
                value={this.props.userEmail}
                />
                <br />
                <textarea
                cols="50"
                rows="10"
                placeholder="Ask Your Question Here"
                onChange={(e) => this.handleInput(e, e.target.value)}
                value={this.props.userQuestion}
                />
                <br />
                <button onClick={() => this.sendEmail}>Submit Question</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Contact);