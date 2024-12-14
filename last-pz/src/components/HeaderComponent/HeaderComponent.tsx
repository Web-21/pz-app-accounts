import React from 'react';
import {Link} from 'react-router-dom';
import './HeaderComponent.css';

const HeaderComponent: React.FC = () => {
  return (
    <header className="header-container bg-dark">
      <div className="d-flex align-items-center pt-2 ps-2 text-white">
        <Link to={"/"} className="h3 link-underline link-underline-opacity-0 text-danger">WEB22</Link>
        <Link to={"/"} className="header-link h5 ms-3 link-underline link-underline-opacity-0">Accounts</Link>
        <Link to={"/about-us"} className="header-link h5 ms-3 link-underline link-underline-opacity-0">About Us</Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
