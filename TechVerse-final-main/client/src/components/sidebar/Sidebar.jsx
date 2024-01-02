import { useEffect, useState } from 'react'
import Techverse from './Techverse.png';
import './sidebar.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async() => 
    {
      const res = await axios.get("http://localhost:8000/api/categories/")
      console.log(res.data)
      setCats(res.data);
    };
    getCats();

  },[])
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT US</span>
            <img src={Techverse}
            alt="About me" />
            <p>Techverse is designed to provide you with a seamless and user-friendly experience. Whether you are a tech enthusiast, a professional in the industry,
               or simply curious about the latest tech trends, our app is your go-to resource.
                 </p>
        </div>
        
          <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <a href='www.facebook.com'><i className="sidebarIcon fab fa-facebook-square" ></i></a>
          <a href='www.instagram.com'><i className="sidebarIcon fab fa-instagram-square"></i></a>
          <a href='www.pininterest.com'><i className="sidebarIcon fab fa-pinterest-square"></i></a>
          <a href='www.twitter.com'><i className="sidebarIcon fab fa-twitter-square"></i></a>
        </div>
      </div>       
        
    </div>
  )
}