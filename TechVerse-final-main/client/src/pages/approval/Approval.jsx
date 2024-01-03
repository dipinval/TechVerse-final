import { alignProperty } from '@mui/material/styles/cssUtils';
import React, { useState, useEffect } from 'react';
import './approval.css';
const ApprovalPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the API endpoint
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/posts/admin/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleApprove = async (postId) => {
    try {
      // Update approval status via API
      await fetch(`http://localhost:8000/api/posts/admin/posts/${postId}/approve`, {
        method: 'PUT',
      });

      // Update local state after approval
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, approval: true } : post
        )
      );
    } catch (error) {
      console.error('Error approving post:', error);
    }
  };

  return (
      <div className="approval-container">
        <h2 className="approval-heading">Approval Page</h2>
        <ul className="approval-list">
          {posts.map((post) => (
            <li key={post._id} className="approval-item">
              <strong>Title:</strong> {post.title} | <strong>Username:</strong>{' '}
              {post.username} | <strong>Approval:</strong>{' '}
              {post.approval ? 'Approved' : 'Pending'} |{' '}
              <button
                className="approve-button"
                onClick={() => handleApprove(post._id)}
              >
                Approve Post
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default ApprovalPage;