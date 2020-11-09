require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    authController = require('./controllers/authController'),
    exerciseController = require('./controllers/exerciseControllers'),
    commentController = require('./controllers/commentController'),
    stripeController = require('./controllers/stripeController'),
    nodemailerController = require('./controllers/nodemailerController'),
    bodyParser = require('body-parser'),
    path = require('path'),
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
  app.listen(SERVER_PORT, () => console.log(`server lifting on ${SERVER_PORT}`));
});

// hosting 
app.use(express.static(__dirname + '/../build')) 

// auth endpoints
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.get('/api/logout', authController.logout);
app.post('/api/email', authController.email);


// exercise endpoints
app.get("/api/exercises/:user_id", exerciseController.getExercises);
app.post("/api/exercises", exerciseController.addExercise); 
app.put("/api/exercises/:exercise_id", exerciseController.editSummary); 
app.delete("/api/exercises/:exercise_id", exerciseController.deleteExercise);

// comment endpoints
app.get("/api/comments/:user_id", commentController.getComments);
app.post("/api/comments", commentController.addComment);
app.put("/api/comments/:exercise_comment_id", commentController.editComment);
app.delete("/api/comments/:exercise_comment_id", commentController.deleteComment);

// stripe endpoint
app.post('/api/payment', stripeController.completePayment);

// nodemailer endpoint
app.post('/api/email', nodemailerController.email);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})