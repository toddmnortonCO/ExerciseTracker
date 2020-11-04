import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Header from '../Header/Header';
import './Dashboard.css'

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
    this.getExercises();
    if (!this.props.user.email) {
      this.props.history.push('/');
    }
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

  clearExerciseSummary = () => {
    axios.put(`/api/exercises/`, {
      summary: this.state.summary
    })
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
      <div class="outerDiv" key={exercise.exercise_id} >
        <p>Exercise: {exercise.activity}</p>
        <p>Distance: {exercise.distance}mi</p>
        <p>Duration: {exercise.duration}min</p>
        <p>Summary: {exercise.summary}</p>
        <button onClick={() => this.clearExerciseSummary(exercise.exercise_id)}>Clear Summary</button>
        <button onClick={() => this.deleteExercise(exercise.exercise_id)}>Delete</button>
      </div>
  ))
    return (
      <div className="Dashboard">
        <Header />
        <h1 className="HeaderOne">Hello! Welcome to Your Dashboard.</h1>
        <h2 className="HeaderTwo">Add Your Exercise Here</h2>
        <input
          placeholder="Workout"
          onChange={(e) => this.handleInput(e, e.target.value)}
          value={this.props.activity}
          name="activity"
        />
        <input
          placeholder="Exercise Duration"
          onChange={(e) => this.handleInput(e, e.target.value)}
          value={this.props.duration}
          name="duration"
        />
        <input
          placeholder="Miles (if applicable)"
          onChange={(e) => this.handleInput(e, e.target.value)}
          value={this.props.distance}
          name="distance"
        />
        <input
          placeholder="Workout Summary"
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
