const express = require('express');
const app = express();
const exerciseController = require('./exerciseControllers');
const commentController = require('./commentController');

console.log(controller)

app.use(express.json());

// exercise endpoints
app.get("/api/exercises", exerciseController.getExercises);
app.post("api/exercises", exerciseController.addExercise); 
app.put("api/exercises", exerciseController.editExercise); 
app.delete("api/exercises", exerciseController.deleteExercise);

// comment endpoints
app.get("/api/comments", commentController.getComments);
app.post("api/comments", commentController.addComment);
app.put("api/comments", commentController.editComment);
app.delete("api/comments", commentController.deleteComment);

const port = 4040;
app.listen(port, () => console.log(`server running on ${port}`));