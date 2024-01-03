import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import './comment.css';

const Comment = ({ postId }) => {
  const { user } = useContext(Context);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${postId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch comments for the given postId when the component mounts
    fetchComments();
  }, [postId]);

  const handleComment = async () => {
    try {
      await axios.post(`/comments/${postId}/comments`, {
        username: user.username,
        text: comment,
      });

      // Clear the comment input
      setComment('');

      // Fetch comments after posting to ensure we have the latest list
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}/delete`);

      // Update the comments state by filtering out the deleted comment
      setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="commentTop">
      {/* Input for adding a new comment */}
      <textarea
        className="commentInput"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button className="commentButton" onClick={handleComment}>
        Post
      </button>

      {/* Display existing comments */}
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="commentContent">
            <p>
              <strong className="commentUsername">{comment.username}</strong>: {comment.text}
            </p>
          </div>

          {/* Render delete button for the current user or admin */}
          {(user && user.username === comment.username) || (user && user.username === 'Admin') ? (
            <button className="deleteButton" onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Comment;
