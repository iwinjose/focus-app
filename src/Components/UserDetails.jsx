import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css';

const UserDetails = () => {
  const [user, setUser] = useState({
    name: "Jane Doe",
    age: Math.floor(Math.random() * 30 + 20),  // Random age between 20-50
    employeeId: `EMP${Math.floor(Math.random() * 100000)}`,
    batch: "BCI Batch " + Math.floor(Math.random() * 10 + 1),
    highestAttentionScore: Math.floor(Math.random() * 100),  // Random score between 0-100
    profileImage: "https://via.placeholder.com/200",  // Placeholder image URL
  });

  useEffect(() => {
    // Replace '/api/user/details' with your backend endpoint
    axios.get('/api/user/details')
      .then(response => {
        // Update state with data from backend
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        // Handle error (e.g., show a message, use fallback values)
      });
  }, []);

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <img src={user.profileImage} alt="User Profile" className="profile-image" />
        <h1>{user.name}</h1>
      </div>
      <div className="user-info">
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Employee ID:</strong> {user.employeeId}</p>
        <p><strong>Batch:</strong> {user.batch}</p>
        <p><strong>Highest Attention Score:</strong> {user.highestAttentionScore}</p>
      </div>
    </div>
  );
};

export default UserDetails;



