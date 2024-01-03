// comment.js
const router = require("express").Router();
const Comment = require("../models/Comment");

// Create new comment
router.post("/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { username, text } = req.body;

  try {
    const newComment = new Comment({
      postId,
      username,
      text,
    });

    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get comments for a post
router.get("/:postId/comments", async (req, res) => {
    const { postId } = req.params;
  
    try {
      const comments = await Comment.find({ postId });
      res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  router.delete("/:commentId/delete", async (req, res) => {
    const { commentId } = req.params;
  
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
  
      if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;
