import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoginPage from './Components/LoginPage';
import Register from './Components/Register';
import HomePage from './Components/HomePage';
import ActivityPage from './Components/ActivityPage';
import UserDetails from './Components/UserDetails';
import Exportdata from './Components/Exportdata';


const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

const MainApp = () => {
  const location = useLocation(); // Access the current path

  return (
    <>
      {/* Render Navbar only if path is NOT '/' or '/Register' */}
      {location.pathname !== '/' && location.pathname !== '/Register' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/activityPage" element={<ActivityPage />} />
        <Route path="/UserDetails" element={<UserDetails />} />
        <Route path="/Register" element={<Register />} /> {/* Registration route */}
        <Route path="/Exportdata" element={<Exportdata />} />
      </Routes>
    </>
  );
};

export default App;
