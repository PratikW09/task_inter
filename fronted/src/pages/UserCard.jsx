import React, { useState } from 'react';
import axios from 'axios';
import EditForm from './EditForm';
import './usercard.css'


const UserCard = ({ user, puser }) => {
    const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  console.log("user ", user);
  console.log("puser ", puser);

  const handleDelete = async () => {
    try {
      
      console.log(user._id);
      const response = await axios.delete(`/delete/${user._id}`);
      console.log('Delete response:', response.data);
      
    
      window.location.reload();

    } catch (error) {
      console.error('Error deleting Add_user:', error);
    }
  };

  

  return (
    <div className="user-card">
    {isEditing ? (
      <EditForm user={user} />
    ) : (
      <>
        <h4>Name: {user.name}</h4>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        {/* Add edit and delete buttons */}
        <div className="user-card-actions">
          <button className="edit-button" onClick={handleEdit}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </>
    )}
  </div>
  );
};

export default UserCard;
