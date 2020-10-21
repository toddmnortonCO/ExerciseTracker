let exercises = []
let exercise_id = 1

module.exports = {
    getExercises: (req, res) => {
        res.status(200).send(exercises) //need to update exercises to attach to DB
    },

    addExercise: (req, res) => {
        let newExercise = {
            exercise_id,
            user_id: req.body.user_id,
            activity: req.body.activity,
            duration: req.body.duration,
            distance: req.body.distance,
            summary: req.body.summary
        }
        exercises.push(newExercise);
        exercise_id++;
        res.status(200).send('Exercise Added, Way to go!', exercises.limit(10))
    },

    editExercise: (req, res) => {
        let exercise = exercises.find(element => element.id === +req.params.id);
            exercise.activity = req.body.activity;
            exercise.duration = req.body.duration;
            exercise.distance = req.body.distance;
            exercise.summary = req.body.summary;

        res.status(200).send(exercises.limit(10));
    },

    deleteExercise: (req, res) => {
        let exercise = exercises.findIndex(element => element.id === +req.params.id);
        exercises.splice(index, 1);

        res.status(200).send(exercises.limit(10));
    }
}
