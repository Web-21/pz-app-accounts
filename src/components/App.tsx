import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AccountList from './AccountList';
import AccountForm from './AccountForm';
import AboutUs from './AboutUs';
import './styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="logo">WEB 22</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Accounts</Link>
            </li>
            <li>
              <Link to="/add-account">Add Account</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<AccountList />} />
            <Route path="/add-account" element={<AccountForm />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
