

import React, { useState } from 'react';
import axios from 'axios';

const EditForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/edit/${user._id}`, formData);
      console.log('Edit response:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
     
      <button type="submit">Update</button>
    </form>
  );
};

export default EditForm;
