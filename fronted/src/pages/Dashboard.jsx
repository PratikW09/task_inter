import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import './dashboard.css'

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [puser, setPuser] = useState([""]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getuser');
        if (Array.isArray(response.data.Add_user)) {
          setUsers(response.data.Add_user);
          setPuser(response.data.user);
          setIsFetching(false);
        } else {
          setError('Invalid data format');
          setIsFetching(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    } else {
      return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
    }
  });

  return (
    <div className="dashboard-container">
      <h1>DashBoard</h1>
      <div className='box'>
      <button onClick={() => navigate('/dashboard/adduser')}>Add User</button>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button onClick={toggleSortOrder}>
        {`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
      </button>

      </div>


      {isFetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : sortedUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="users-list">
          {sortedUsers.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              puser={puser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
