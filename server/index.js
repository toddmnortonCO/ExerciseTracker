require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    authController = require('./controllers/authController'),
    exerciseController = require('./controllers/exerciseControllers'),
    commentController = require('./controllers/commentController'),
    const nodemailerController = require('./controllers/nodemailerController');
    const bodyParser = require('body-parser'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

// auth endpoints
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.get('/api/logout', authController.logout);

// exercise endpoints
app.get("/api/exercises", exerciseController.getExercises);
app.post("api/exercises", exerciseController.addExercise); 
app.put("api/exercises/:exercise_id", exerciseController.editExercise); 
app.delete("api/exercises/:exercise_id", exerciseController.deleteExercise);

// comment endpoints
app.get("/api/comments", commentController.getComments);
app.post("api/comments", commentController.addComment);
app.put("api/comments/:exercise_comment_id", commentController.editComment);
app.delete("api/comments/:exercise_comment_id", commentController.deleteComment);

// nodemailer endpoint
app.post('api/contact', nodemailerController.emailPost);

app.listen(SERVER_PORT, () => console.log(`server chillin on ${SERVER_PORT}`));