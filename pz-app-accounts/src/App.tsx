import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import AccountList from './pages/AccountList';
import AboutUs from './pages/AboutUs';
import AccountDetails from './pages/AccountDetails';
import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AccountList/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/account/:id" element={<AccountDetails/>}/>
      </Routes>
    </Router>
  );
};

export default App;
