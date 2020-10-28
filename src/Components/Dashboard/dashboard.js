import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
  }

  componentDidMount() {
    if (!this.props.user.email) {
      this.props.history.push('/')
    }
  }

  handleInput = (e, val) => {
    console.log(e.target)
    this.setState({[e.target.name]: val})
  }

  // handleInput(val) {
  //   this.setState({exercises: val})
  // }

  getExercises = () => {
    axios.get(`/api/exercises/${this.props.exercise_tracker_user.user_id}`)
      .then(res => this.setState({ posts: res.data }))
    .catch(err => console.log(err))
  }

  addExercise = () => {
    axios.post(`/api/exercises/`, {
      // user_id: this.props.exercise_tracker_user.user_id,
      activity: this.props.activity,
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
    // console.log(this.props)
    let exercises = [];
    const mappedExercises = exercises.map((exercise, i) => (
      <div>
        <button onClick={() => this.deleteExercise(exercise.exercise_id)}>Delete</button>
        <button onClick={() => this.editExercise(exercise.exercise_id)}>Edit</button>
      </div>
  ))
    return (
      <div className="dashboard">
        <h1>Hello! Welcome to Your Dashboard.</h1>
        <h2>Add Your Exercise Here</h2>
        <input
          placeholder="Add Exercise"
          onChange={(e) => this.handleInput(e, e.target.value)}
          value={this.props.exercise}
          name="exercises"
        />
        <input
          placeholder="Add Duration"
          onChange={(e) => this.handleInput(e, e.target.value)}
          value={this.props.duration}
          name="duration"
        />
        <input
          placeholder="Add Distance"
          onChange={(e) => this.handleInput(e, e.target.value)}
          value={this.props.distance}
          name="distance"
        />
        <input
          placeholder="Add Summary"
          onChange={(e) => this.handleInput(e, e.target.value)}
          value={this.props.summary}
          name="summary"
        />
        <button onClick={this.addExercise}>Add Workout</button>
        <h2>Your Recent Workouts</h2>
        <div>{mappedExercises}</div>
        <button>Edit Exercise</button>
        <button>Delete Exercise</button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);
