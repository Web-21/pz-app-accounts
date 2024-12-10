import React from 'react';
import { NavLink } from 'react-router-dom';
import "./style.css";

export const NavBar = () => {
  return (
    <nav className="iav-navbar">
      <ul>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
          >
            WEB 22
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accounts"
            className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
          >
            Accounts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
          >
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
