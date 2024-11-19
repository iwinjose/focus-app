import React, { useState } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (employeeId && username && password && email) {
      try {
        // Send POST request to backend to register user
        const response = await axios.post('/api/auth/register', { employeeId, username, password, email });

        if (response.data.success) {
          setSuccessMessage('Registration successful! Redirecting...');
          setTimeout(() => {
            navigate('/login'); // Redirect to login page after successful registration
          }, 2000);
        } else {
          setError(response.data.message || 'Registration failed');
        }
      } catch (error) {
        setError('Error registering user. Please try again.');
        console.error('Error during registration:', error);
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="register-container">
      <div className="overlay"></div>
      <div className="register-box">
        <h2>Register for BCI Focus Tracker</h2>
        <p className="tagline">Create an account to start your journey</p>
        <form onSubmit={handleRegister}>
          <label>
            <input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <div className="button-container">
            <button type="submit" className="register-button">Register</button>
          </div>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
