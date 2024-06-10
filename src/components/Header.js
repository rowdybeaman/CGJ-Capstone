import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/authContext.js';
import logo from './assets/CGJlogo.svg';
import './Header.css';

function Header() {
  const { state } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Custom Gauge Jewelry</h1>
      </div>
      <nav className="nav">
        <Link to="/auth">
          <i className="profile-icon"></i>
        </Link>
        <Link to="/cart">
          <i className="cart-icon"></i>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
