import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      exercises: []
    };
  }

  let exercises = [];

  componentDidMount() {
    if (!this.props.user.email) {
      this.props.history.push('/')
    }
  }

  handleInput = (val) => {
    this.setState({exercises: val})
  }

  getExercises = () => {
    axios.get(`/api/exercises/${this.props.exercise_tracker_user.user_id}`)
      .then(res => this.setState({ posts: res.data }))
    .catch(err => console.log(err))
  }

  addExercise = () => {
    axios.post(`/api/exercises/`, {
      user_id: this.props.exercise_tracker_user.user_id,
      activity: this.state.activity,
      duration: this.props.duration,
      distance: this.props.distance,
      summary: this.props.summary
    })
      .then(() => {this.getExercises()})
      .catch(err => console.log(err))
  }

  editExercise = (exercise_id) => {
    console.log(exercise_id)
    axios.put(`/api/exercises/${exercise_id}`)
      .then(() => { this.getExercises() })
      .catch(err => console.log(err))
  }

  deleteExercise = (exercise_id) => {
    axios.delete(`/api/exercises/${exercise_id}`)
      .then(() => {
        this.getExercises();
      })
    .catch(err => console.log(err))
  }

  getComments = () => {
      axios.get(`/api/comments/${this.props.exercise_tracker_user.user_id}`)

  }

  addComment = () => {
    axios.post(`api/comments/`, {
      exercise_id: this.props.exercise_id,
      comments: this.props.comments
    })
  }

  deleteComment = (comment_id) => {
    axios.delete(`/api/comments/${comment_id}`)
      .then(() => {
        this.getComments();
      })
    .catch(err => console.log(err))
  }

  render() {
    console.log(this.props)
    const mappedExercises = exercises.map((exercise, i) => (
      <div>
        <button onClick={() => this.deleteExercise(exercise.exercise_id)}>Delete</button>
        <button onClick={() => this.editExercise(exercise.exercise_id)}>Edit</button>
      </div>
  ))
    return (
      <div className="dashboard">
        <input
          value={this.state.exercises}
          placeholder="Add Exercise"
          onChange={(e) => this.handleInput(e.target.value)}
        />
        <h1>Hello! Welcome to your dashboard.</h1>
        <button onClick={this.createExercise}>Add Exercise</button>
        <h2>Your Recent Workouts</h2>
        <div>{mappedExercises}</div>
        <button>Edit Exercise</button>
        {/* <button onClick=>Log Out</button> */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);
