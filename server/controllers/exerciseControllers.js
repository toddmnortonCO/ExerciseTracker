/* eslint-disable no-unused-vars */

module.exports = {
  getExercises: async (req, res) => {
    const {user_id } = req.params,
        db = req.app.get('db');

      await db.exercises.get_exercises({ user_id })
      .then((exercises) => res.status(200).send(exercises))
      .catch(err => {console.log(err);
      res.status(500).send(err)})
  },

  addExercise: (req, res) => {
    const { exercises } = req.body,
      db = req.app.get("db");

      db.exercises
      .add_exercise({user_id: this.state.user_id, 
        activity: this.props.activity,
        duration: this.props.duration, 
        distance: this.props.distance,
        summary: this.props.summary})
      .then(exercises => res.sendStatus(200).send(exercises))
      .catch(err => res.status(500).send(err));

    res.status(200).send('Exercise Added, Way to go!')
  },

  editSummary: (req, res) => {
    const {exercise_id, activity, duration, distance} = req.params;
    const {summary} = req.body;
    const db = req.app.get('db');

          db.exercises.edit_summary({exercise_id, activity, distance, duration, summary})
          .then(exercises => res.status(200).send(exercises.limit(10)))
          .catch( err=> console.log(err))
  },

  deleteExercise: (req, res) => {
    const id = req.body,
          db = req.app.get('db'),

      targetExercise = db.exercises.findIndex(
      (element) => element.id === +req.params.id
    );

    db.exercises.delete_exercise(targetExercise)
    .then(() => db.exercises.splice(targetExercise, 1))
    .catch(err => res.status(500).send(err));

    res.status(200).send(db.exercises.limit(10));
  },
};
