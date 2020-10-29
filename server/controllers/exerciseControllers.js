/* eslint-disable no-unused-vars */

module.exports = {
  getExercises: async (req, res) => {
    const { user_id } = req.params,
        db = req.app.get('db');

      await db.exercises.get_exercises([user_id])
      .then((exercises) => res.status(200).send(exercises))
      .catch(err => {console.log(err);
      res.status(500).send(err)})
  },

  addExercise: (req, res) => {
    const { activity, duration, distance, summary } = req.body,
      db = req.app.get("db");

      db.exercises.add_exercise([ 
        activity,
        duration, 
        distance,
        summary])
      .then(exercises => res.sendStatus(200).send(exercises))
      .catch(err => res.status(500).send(err));

    res.status(200).send('Exercise Added, Way to go!')
  },

  editSummary: (req, res) => {
    const {exercise_id, activity, duration, distance} = req.params;
    const {summary} = req.body;
    const db = req.app.get('db');

          db.exercises.update_summary([exercise_id, activity, distance, duration, summary])
          .then(exercises => res.status(200).send(exercises))
          .catch( err=> console.log(err))

          res.status(200).send('Summary Updated!')
  },

  deleteExercise: (req, res) => {
    const {exercise_id} = req.params,
      db = req.app.get('db');

    db.exercises.delete_exercise([exercise_id])
    .then(exercises => res.status(200).send(exercises))
    .catch(err => res.status(500).send(err));
  }
};
