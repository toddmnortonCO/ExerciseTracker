import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Header from '../Header/Header';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      exercises: [],
      user_id: "",
      activity: "",
      duration: "",
      distance: "",
      summary: "",
      exercise_id: ""
    };
  }

  componentDidMount() {
    if (!this.props.user.email) {
      this.props.history.push('/');
    }
    this.getExercises();
  }

  handleInput = (e, val) => {
    console.log(e.target)
    this.setState({[e.target.name]: val})
  }

  getExercises = () => {
    axios.get(`/api/exercises/${this.props.user.user_id}`)
      .then(res => this.setState({ exercises: res.data }))
      .catch(err => console.log(err))
  }

  addExercise = () => {
    console.log(this.props);
    axios.post(`/api/exercises/`, {
      activity: this.state.activity,
      duration: this.state.duration,
      distance: this.state.distance,
      summary: this.state.summary
    })
      .then(() => {this.getExercises()})
      .catch(err => console.log(err))
  }

  editExercise = (exercise_id) => {
    axios.put(`/api/exercises/${exercise_id}`)
      .then(() => { this.getExercises() })
      .catch(err => console.log(err))
  }

  deleteExercise = (exercise_id) => {
    //can't pass in a body into a delete request
    axios.delete(`/api/exercises/${exercise_id}`
    )
      .then(() => { this.getExercises() })
      .catch(err => console.log(err))
  }

  getComments = () => {
      axios.get(`/api/comments/${this.props.exercise_tracker_user.user_id}`)
  }

  addComment = () => {
    axios.post(`api/comments/`, {
      // exercise_id: this.props.exercise_id,
      comments: this.props.comments
    })
  }

  deleteComment = (comment_id) => {
    axios.delete(`/api/comments/${comment_id}`)
      .then(() => { this.getComments() })
      .catch(err => console.log(err))
  }

  render() {
    const mappedExercises = this.state.exercises.map((exercise, i) => (
      <div class="outerDiv" key={exercise.exercise_id}>
        <p>{exercise.exercise_id}</p>
        <p>Exercise: {exercise.activity}</p>
        <p>Distance: {exercise.distance}mi</p>
        <p>Duration: {exercise.duration}</p>
        <p>Summary: {exercise.summary}</p>
        <button onClick={() => this.deleteExercise(exercise.exercise_id)}>Delete</button>
        {/* <button onClick={() => this.editExercise(exercise.exercise_id)}>Edit</button> */}
      </div>
  ))
    return (
      <div className="dashboard">
        <Header />
        <h1>Hello! Welcome to Your Dashboard.</h1>
        <h2>Add Your Exercise Here</h2>
        <input
          placeholder="Add Exercise"
          onChange={(e) => this.handleInput(e, e.target.value)}
          value={this.props.activity}
          name="activity"
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
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);
