let exercise_comments = [];
let comment_id = 1;

module.exports = {

  getComments: (req, res) => {
    res.status(200).send(comments);
  },

  addComment: (req, res) => {
    // console.log(req.body);
    const newComment = {
      comment_id,
      exercise_id: req.body.exercise_id,
      comments: req.body.comment,
    };
    exercise_comments.push(newComment);
    comment_id++;
    res.status(200).send("Comment Added, Way to go!", exercise_comments.limit(10));
  },

  editComment: (req, res) => {
    console.log(req.body);
    console.log(req.params);

    let exercise_comment = exercise_comments.find((element) => element.id === +req.params.id);
    exercise_comment.comments = req.body.comments;
  
    res.status(200).send(exercise_comments.limit(10));
  },

  deleteComment: (req, res) => {
    let exercise_comment = exercise_comments.findIndex(element => element.id === +req.params.id);
    exercise_comments.splice(index, 1);

    res.status(200).send(exercise_comments.limit(10))
  },
}
