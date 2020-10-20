const comments = [];
let id = 1;

function getComments(req, res) {
  res.status(200).send(comments);
}

function addComment(req, res) {
  // console.log(req.body);
  const newComment = {
    id,
    comment: req.body.comment,
  };
  exercises.push(newComment);
  id++;
  res.status(200).send("Comment Added, Way to go!", comments);
}

function editComment(req, res) {
  console.log(req.body);
}

function deleteComment(req, res) {}

module.exports = {
  getComments,
  addComment,
  editComment,
  deleteComment,
};
