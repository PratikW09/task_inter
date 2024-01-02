// AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './adduser.css'
const AddUser = () => {
  const navigate = useNavigate();
 
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/adduser', userData);
      
    
      setUserData({
        name: '',
        email: '',
        phone: ''
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={userData.phone} onChange={handleChange} required />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
