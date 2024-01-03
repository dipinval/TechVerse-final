// SinglePost.jsx
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import './singlePost.css';
import { Link } from "react-router-dom";
import Comment from "../comment/Comment";
import { Context } from "../../context/Context";
import { useCallback } from 'react';

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const PF = "http://localhost:8000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const getComments = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/comments/${path}/comments`);
      console.log("Comments:", res.data);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [path]);
  useEffect(() => {

    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts/${path}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
    getComments();
  }, [path, getComments]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${post._id}`, {
        data: { username: user.username},
      });
      window.location.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='singlePost'>
      <div className="singlepostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-user-pen"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className='singlePostAuthor'>
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className='singlePostDate'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className='singlePostDesc'>{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}

        {/* Display comments */}

        {/* Comment input */}
        {user && <Comment postId={post._id} updateComments={getComments} />} 
      </div>
      {/* <div className="comments">
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <strong>{comment.username}</strong> {comment.text}
          </div>
        ))}
      </div> */}
    </div>
  );
}
export default SinglePost;