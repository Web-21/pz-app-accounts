import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import AccountPage from './pages/AccountPage/AccountPage';
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";

const App: React.FC = () => {
  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/about-us" element={<AboutUsPage/>}/>
        <Route path="/accounts/:id" element={<AccountPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
