import React from 'react';
import {Link} from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="container d-flex align-items-center pt-2 ps-2 border-bottom">
      <Link to={"/"} className="h3 link-underline link-underline-opacity-0">WEB22</Link>
      <Link to={"/about-us"} className="h5 ms-3 link-underline link-underline-opacity-0">About Us</Link>
    </header>
  );
};

export default Header;
