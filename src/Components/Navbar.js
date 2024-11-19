import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Focus Tracker</div>
      <ul className="navbar-links">
        <li>
          <Link to="/UserDetails">User Details</Link>
        </li>
        <li>
          <Link to="/Home">Dashboard</Link>
        </li>
        <li>
          <Link to="/ActivityPage">Activity Page</Link>
        </li>
        <li>
          <Link to="/Exportdata">Export Data</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
