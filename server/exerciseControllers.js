const exercises = []
let id = 1;

function getExercises(req, res) {
    
    res.status(200).send(exercises)
}

function addExercise(req, res) {
    // console.log(req.body);
    const newExercise = {
        id,
        activity: req.body.activity,
        duration: req.body.duration,
        distance: req.body.distance,
        summary: req.body.summary
    }
    exercises.push(newExercise);
    id++; 
    res.status(200).send('Exercise Added, Way to go!', exercises)
}

function editExercise(req, res) {
    console.log(req.body);

}

function deleteExercise(req, res) {
    
}

module.exports = {
    getExercises,
    addExercise,
    editExercise,
    deleteExercise
}