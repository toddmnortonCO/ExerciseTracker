let exercises = [];
let exercise_id = 1;

module.exports = {
  getExercises: (req, res) => {
    res.status(200).send(exercises); //need to update exercises to attach to DB
  },

  addExercise: (req, res) => {
    const { user_id, activity, duration, distance, summary } = req.body,
      db = req.app.get("db");

    db.post
      .add_exercise(user_id, activity, duration, distance, summary)
      .then(() => res.sendStatus(200))
      .catch((err) => console.log(err));
    exercise_id++;

    // exercise_id++;
    // let newExercise = {
    //     exercise_id,
    //     user_id: req.body.user_id,
    //     activity: req.body.activity,
    //     duration: req.body.duration,
    //     distance: req.body.distance,
    //     summary: req.body.summary
    // }
    // exercises.push(newExercise);
    // res.status(200).send('Exercise Added, Way to go!', exercises)
  },

  editExercise: (req, res) => {
    let exercise = exercises.find((element) => element.id === +req.params.id);
    exercise.activity = req.body.activity;
    exercise.duration = req.body.duration;
    exercise.distance = req.body.distance;
    exercise.summary = req.body.summary;

    res.status(200).send(exercises.limit(10));
  },

  deleteExercise: (req, res) => {
    let exercise = exercises.findIndex(
      (element) => element.id === +req.params.id
    );
    exercises.splice(index, 1);

    res.status(200).send(exercises.limit(10));
  },
};
