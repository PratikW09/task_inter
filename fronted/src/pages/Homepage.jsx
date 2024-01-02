import React from 'react';
import './Homepage.css'; 

const Homepage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to Our Application</h1>
      <p className="description">
        Explore the features we offer, designed to provide a seamless experience.
      </p>

     
      <section className="feature-section">
        <div className="feature">
          <h2>Search Functionality</h2>
          <p>Efficiently find users by their name or email.</p>
        </div>
        <div className="feature">
          <h2>Filtering Options</h2>
          <p>Refine your search results using various filters.</p>
        </div>
        <div className="feature">
          <h2>User Management</h2>
          <p>Manage users with ease through CRUD operations.</p>
        </div>
      </section>

  
      <div className="info-section">
        <p>
          Our application is built with a focus on user experience and robust security. 
          With features like strong authentication and role-based access, we ensure 
          your data remains secure while providing you with a smooth and efficient 
          interface to manage your tasks.
        </p>
      </div>
    </div>
  );
}

export default Homepage;
