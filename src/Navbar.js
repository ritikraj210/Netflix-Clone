import React from 'react'
import './Navbar.css';

function Navbar() {
  return (
    <div className="Navbar">        
        <img
        className="nav_logo"
        src= "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo" 
        />
        <img
        className="nav_avatar"
        src= "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix Avatar" 
        />
    </div>
  )
}

export default Navbar