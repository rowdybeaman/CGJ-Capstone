import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/authContext';
import logo from './assets/CGJlogo.svg';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faHome, faBoxOpen, faLightbulb, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon icon={faUser} className="profile-icon" />
        </Link>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
        </Link>
      </nav>
      <nav className="main-nav">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} className="nav-icon" />
          <span>Home</span>
        </Link>
        <Link to="/products">
          <FontAwesomeIcon icon={faBoxOpen} className="nav-icon" />
          <span>Products</span>
        </Link>
        <Link to="/submit-idea">
          <FontAwesomeIcon icon={faLightbulb} className="nav-icon" />
          <span>Submit Idea</span>
        </Link>
        <Link to="/about-us">
          <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" />
          <span>About Us</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
