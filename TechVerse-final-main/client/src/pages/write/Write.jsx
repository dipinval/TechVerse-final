import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [isAwaitingApproval, setIsAwaitingApproval] = useState(false);
  const [imageSize, setImageSize] = useState('medium'); // small, medium, large
  const [textColor, setTextColor] = useState('#000000'); // default black

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
      approved: false,
      textColor,
      imageSize, // You need to handle this in your backend and post rendering as well
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    }

    try {
      setIsAwaitingApproval(true);
      await axios.post("http://localhost:8000/api/posts", newPost);
      setIsAwaitingApproval(false);
    } catch (err) {
      console.error('Error sending post to approval:', err);
      setIsAwaitingApproval(false);
    }
  };

  return (
    <div className="write">
      {isAwaitingApproval && (
        <p className="approvalMessage">Post submitted! Awaiting approval...</p>
      )}
      {file && (
        <img
          className={`writeImg ${imageSize}`}
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <h1 className="uploadPhotoHere">Upload photo</h1>
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <label>Text Color:</label>
          <input className="colorchoose"
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          /> <p className="colorCHoose">Choose your color</p>
        </div>

        <div className="writeFormGroup">
          <label>Image Size:</label>
          <select value={imageSize} onChange={(e) => setImageSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            style={{ color: textColor }}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}