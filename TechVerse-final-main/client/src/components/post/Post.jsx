import React, { useState, useEffect } from 'react';
import './post.css';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

export default function Post({ post }) {
  const PF = "http://localhost:8000/images/";
  const [liked, setLiked] = useState(false);
  const [viewCount, setViewCount] = useState(post.views);

  useEffect(() => {
    setLiked(post.likes > 0);
  }, [post.likes]);

  const handleLike = async () => {
    try {
      // Send a request to the server to update the like status
      const response = await fetch(`http://localhost:8000/api/posts/${post._id}/like`, {
        method: 'PUT',
      });

      if (response.ok) {
        // If the update is successful, update the liked state
        setLiked(!liked); // Toggle the liked state
      } else {
        console.error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error updating like status', error);
    }
  };

  const handleView = () => {
    // Use setTimeout to delay the view count update
    setTimeout(() => {
      // Add logic to update view count, e.g., send a request to your server
      axios.put(`/api/posts/${post._id}/view`)
        .then((response) => {
          setViewCount(response.data.views);
        })
        .catch((error) => {
          console.error('Failed to update view count', error);
        });
    }, 5000); //(5 seconds)
  };

  return (
    <div className='post'>
      {post.photo && (
        <img
          className='postImg'
          src={PF + post.photo}
          width="100%"
          alt=""
        />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories && post.categories.length > 0 ? (
            post.categories.map((c, index) => (
              <span key={index} className="postCat">{c.name}</span>
            ))
          ) : (
            <span className="postCat">Uncategorized</span>
          )}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        <p className='postDesc'>{post.desc}</p>
        <div className="postView">
          <IconButton onClick={handleLike} color={liked ? 'primary' : 'default'}>
            <FavoriteIcon />
          </IconButton>
          <IconButton color="default" aria-label="view" onClick={handleView}>
            <VisibilityIcon />
          </IconButton>
          <span>{Math.ceil(viewCount)}</span>
        </div>
      </div>
    </div>
  );
}
