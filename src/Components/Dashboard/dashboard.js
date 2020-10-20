import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor() {
    super();
    this.setState = {
      
    };
  }

  addExercise = () => {
    axios.post('/api/post', {id: this.props.exercise_tracker_user.user_id})
  }

  getExercises = () => {
    axios.get()
  }

  editExercise = () => {
    axios.put
  }

  deleteExercise = () => {
    axios.delete()
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
