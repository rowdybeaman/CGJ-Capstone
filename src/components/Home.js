import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import collage from './assets/collage.png';
import d20 from './assets/d20.png';
import majora from './assets/majora.png';
import mimic from './assets/mimic.png';
import { AuthContext } from '../store/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  console.log(userId);

  const handlePurchase = async (productId, sizeId) => {
    const isAuthenticated = userId ? true : false;
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4005/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify({
            productId,
            quantity: 1,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        alert('success');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Improper email');
    } else {
      setEmailError('');
      window.location.href = `mailto:customgaugejewelry.com?subject=Subscribe&body=Please subscribe me to your updates. Email: ${email}`;
    }
  };

  return (
    <div className="home">
      <div className="collage-container">
        <div className="motto">
          <h2>Stretch Your Imagination</h2>
        </div>
        <div className="collage">
          <img src={collage} alt="Collage" />
        </div>
      </div>
      <div className="preview">
        <h2>Preview our Products</h2>
        <div className="product-boxes">
          <div className="product-box">
            <img src={d20} alt="Product 1" className="product-image" />
            <p><span className="original-price">$30</span> <span className="sale-price">$19.98</span></p>
            <p className="free-shipping">Free Shipping</p>
            <label htmlFor="size1">Size:</label>
            <select id="size1" name="size1">
              {Array.from({ length: 41 }, (_, i) => (
                <option key={i} value={20 + i}>{20 + i} mm</option>
              ))}
            </select>
            <button className="purchase-button" onClick={() => handlePurchase(1, 'size1')}>Purchase</button>
          </div>
          <div className="product-box">
            <img src={majora} alt="Product 2" className="product-image" />
            <p><span className="original-price">$30</span> <span className="sale-price">$19.98</span></p>
            <p className="free-shipping">Free Shipping</p>
            <label htmlFor="size2">Size:</label>
            <select id="size2" name="size2">
              {Array.from({ length: 41 }, (_, i) => (
                <option key={i} value={20 + i}>{20 + i} mm</option>
              ))}
            </select>
            <button className="purchase-button" onClick={() => handlePurchase(2, 'size2')}>Purchase</button>
          </div>
          <div className="product-box">
            <img src={mimic} alt="Product 3" className="product-image" />
            <p><span className="original-price">$30</span> <span className="sale-price">$19.98</span></p>
            <p className="free-shipping">Free Shipping</p>
            <label htmlFor="size3">Size:</label>
            <select id="size3" name="size3">
              {Array.from({ length: 41 }, (_, i) => (
                <option key={i} value={20 + i}>{20 + i} mm</option>
              ))}
            </select>
            <button className="purchase-button" onClick={() => handlePurchase(3, 'size3')}>Purchase</button>
          </div>
        </div>
        <Link to="/products" className="view-products-button">
          View all Products <span className="arrow">→</span>
        </Link>
      </div>
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          Welcome to Custom Gauge Jewelry, your premier destination for unique and customized jewelry pieces. 
          Our mission is to offer a diverse range of high-quality gauges that cater to all styles and preferences. 
          We believe that jewelry is a powerful form of self-expression, and we are dedicated to helping you find 
          the perfect piece that resonates with your individuality.
        </p>
        <p>
          Our collection features a variety of designs, from classic to contemporary, all crafted with the utmost 
          attention to detail and quality. We pride ourselves on our customer-centric approach, ensuring that every 
          piece of jewelry is not only beautiful but also comfortable and durable.
        </p>
        <p>
          At Custom Gauge Jewelry, we are committed to sustainability and ethical practices. We source our materials 
          responsibly and work with artisans who share our values. Our goal is to create jewelry that you can feel 
          good about wearing, knowing that it was made with care and integrity.
        </p>
        <p>
          Thank you for choosing Custom Gauge Jewelry. We are honored to be a part of your journey in finding the perfect 
          piece of jewelry that speaks to your soul. If you have any questions or need assistance, our friendly customer 
          service team is always here to help.
        </p>
        <p>
          Stretch your imagination with Custom Gauge Jewelry.
        </p>
      </div>
      <div className="social-updates">
        <div className="social-media box">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            <FontAwesomeIcon icon={faTwitter} className="social-icon" />
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            <FontAwesomeIcon icon={faPinterest} className="social-icon" />
          </div>
        </div>
        <div className="updates box">
          <h2>Receive Updates</h2>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="email-input"
          />
          <button onClick={handleSubscribe} className="subscribe-button">Subscribe</button>
          {emailError && <p className="email-error">{emailError}</p>}
        </div>
      </div>
    </div>
  );
}

export default Home;
