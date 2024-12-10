import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './components/navigation_bar';
import { MainPage } from './pages/home_page';
import { AccountPage } from './pages/accaunts/index';
import { AboutPage } from './pages/about_us';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/accounts" />} /> 
          <Route path="/accounts" element={<MainPage />} />
          <Route path="/profile" element={<AccountPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
