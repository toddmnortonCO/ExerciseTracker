import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      exercise: []
    };
  }

  handleInput = (val) => {
    this.setState({exercise: val})
  }

  addExercise = () => {
    axios.post('/api/post', { id : this.props.exercise_tracker_user.user_id })
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err))
  }

  getExercises = () => {
    axios.get(`/api/posts/${this.props.exercise_tracker_user.user_id}`)
      .then(res => this.setState({ posts: res.data }))
    .catch(err => console.log(err))
  }

  editExercise = () => {
    axios.put()
  }

  deleteExercise = () => {
    axios.delete(`/api/post/${id}`)
      .then(() => {
        this.getExercises();
      })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <section>
        <div>
          <h1>Hello! Welcome to your dashboard.</h1>
          <button onClick={this.createExercise}>Add Exercise</button>
          <h2>Your Recent Workouts</h2>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);
