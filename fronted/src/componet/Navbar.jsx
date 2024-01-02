import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css'; 

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const handleLogout = async () => {
    try {
      const response = await axios.get('/auth/logout');
      localStorage.setItem('isAuthenticated', 'false');
      setIsAuthenticated(false); 
    } catch (error) {
      console.log("error in logout");
    }
  }

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (storedAuth !== isAuthenticated) {
      setIsAuthenticated(storedAuth);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <ul className="nav-links">
        
        <li><Link to="/">Home</Link></li>

        
        {!isAuthenticated && (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

        {isAuthenticated && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/dashboard/adduser">Add User</Link></li>
            <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
