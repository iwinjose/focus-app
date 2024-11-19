import React, { useState } from 'react';
import axios from 'axios';  // Make sure to install axios
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const defaultUsername = 'bciUser';
  const defaultPassword = 'focus123';

  const handleLogin = async (e) => {
    e.preventDefault();

    // Default login credentials for testing
    if (username === defaultUsername && password === defaultPassword) {
      navigate('/home');
      return;
    }

    try {
      // Send POST request to the backend to check the credentials
      const response = await axios.post('/api/auth/login', { username, password });

      if (response.data.success) {
        navigate('/home'); // Redirect to homepage after successful login
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = () => {
    navigate('/Register');
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-box">
        <h2>Welcome to BCI Focus Tracker</h2>
        <p className="tagline">Enhancing focus with the power of your mind</p>
        <form onSubmit={handleLogin}>
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
          <div className="button-container">
            <button type="submit">Login</button>
            <button type="button" onClick={handleRegister} className="register-button">
              Register
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

