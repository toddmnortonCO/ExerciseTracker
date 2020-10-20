require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    authController = require('../server/authController'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
    app = express();
      
const exerciseController = require('./exerciseControllers');
const commentController = require('./commentController');

app.use(express.json());
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
app.put("api/exercises", exerciseController.editExercise); 
app.delete("api/exercises", exerciseController.deleteExercise);

// comment endpoints
app.get("/api/comments", commentController.getComments);
app.post("api/comments", commentController.addComment);
app.put("api/comments", commentController.editComment);
app.delete("api/comments", commentController.deleteComment);

app.listen(SERVER_PORT, () => console.log(`server chillin on ${SERVER_PORT}`));