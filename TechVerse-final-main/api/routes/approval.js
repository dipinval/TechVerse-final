// approval.js
const router = require("express").Router();
const Post = require("../models/Post"); // Import your Post model

// Get all posts awaiting approval
router.get("/", async (req, res) => {
  try {
    const awaitingApprovalPosts = await Post.find({ approved: false });
    res.status(200).json(awaitingApprovalPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new post awaiting approval
router.post("/", async (req, res) => {
  const { title, desc, username, approved } = req.body;

  try {
    const newPost = new Post({
      title,
      desc,
      username,
      approved,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
