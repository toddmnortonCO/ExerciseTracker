let exercise_comments = [];
let comment_id = 1;

module.exports = {
    getComments: async (req, res) => {
      const {user_id } = req.params,
          db = req.app.get('db');
  
        await db.comments.get_comments([user_id])
        .then((comments) => res.status(200).send(comments))
        .catch(err => {console.log(err);
        res.status(500).send(err)})
    }
  ,

  addComment: (req, res) => {
      console.log(req.body);
      const { comment_id, exercise_id, comments } = req.body,
        db = req.app.get("db");
  
        db.exercise_comments
        .add_comment({
          comment_id: this.props.comment_id,
          exercise_id: this.state.exercise_id, 
          comments: this.props.comments})
        .then(exercise_comments => res.sendStatus(200).send(exercise_comments))
        .catch(err => res.status(500).send(err));
  
      res.status(200).send('Comment Added!', exercise_comments)
    },

  editComment: (req, res) => {
    const db = req.app.get('db');
    const {comment_id, exercise_id } = req.params,
          {comments} = req.body;

    db.exercise_comments.edit_comment({comment_id, exercise_id, comments})
    .then(exercise_comments => res.status(200).send('Comment updated', exercise_comments.limit(10)))
    .catch(err => console.log(err))

    let exercise_comment = exercise_comments.find((element) => element.id === +req.params.id);
    exercise_comment.comments = req.body.comments;
  
    res.status(200).send(exercise_comments.limit(10));
  },

  deleteComment: (req, res) => {
    let targetComment = exercise_comments.findIndex(element => element.id === +req.params.id);
    exercise_comments.splice(targetComment, 1);

    res.status(200).send(exercise_comments.limit(10))
  },
}
