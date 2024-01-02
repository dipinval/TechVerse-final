import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';
import { Context } from '../../context/Context';

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:8000/images/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='top'>
      <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook-square"></i>
        <i className="topIcon fa-brands fa-twitter-square"></i>
        <i className="topIcon fa-brands fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className={`topList ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
          <li className="topListItem"><Link className="link" to="/about">ABOUT</Link></li>
          <li className="topListItem"><Link className="link" to="/contact">CONTACT</Link></li>
          <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li>
          {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
          {user && user.username === 'Admin' && (
            <li className="topListItem"><Link className="link" to="/approval">APPROVAL</Link></li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <>
            <Link className="topListItem" to="/login">LOGIN</Link>
            <Link className="topListItem" to="/register">REGISTER</Link>
          </>
        )}
        <i className="topSearchIcon fas fa-search"></i>
        <i className="topDropdownIcon fas fa-bars" onClick={toggleMenu}></i>
      </div>
    </div>
  );
}
