/* eslint-disable no-unused-vars */

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
      const { comment_id, comments_user_id, comments } = req.body,
        db = req.app.get("db");
  
        db.comments.add_comment([
          comment_id,
          comments_user_id, 
          comments])
        .then(comments => res.sendStatus(200).send(comments))
        .catch(err => res.status(500).send(err));
  
      res.status(200).send('Comment Added!')
    },

  editComment: (req, res) => {
    const db = req.app.get('db');
    const {comment_id, exercise_id } = req.params,
          {comments} = req.body;

    db.comments.edit_comment([comment_id, exercise_id, comments])
    .then(exercise_comments => res.status(200).send('Comment updated', exercise_comments.limit(10)))
    .catch(err => console.log(err))
  },

  deleteComment: (req, res) => {
    const {comment_id} = req.params,
    db = req.app.get('db');

    db.comments.delete_comment([comment_id])
    .then(exercise_comments => res.status(200).send(exercise_comments))
    .catch(err => res.status(500).send(err));
  },
}
