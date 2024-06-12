import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import collage from './assets/collage.png';
import d20 from './assets/d20.png';
import majora from './assets/majora.png';
import mimic from './assets/mimic.png';
import { AuthContext } from '../store/authContext'; 
import { useContext } from 'react';

function Home() {
  const navigate = useNavigate();
  // const {user} = useContext(AuthContext);
  //   console.log(user)
  const userId = localStorage.getItem('userId');
    console.log(userId) 
  const handlePurchase = async (productId, sizeId) => {
    const isAuthenticated = userId ? true:false; 
        console.log(userId ? true:false)
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
          alert('success')
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="home">
      <div className="motto">
        <h2>Stretch Your Imagination</h2>
      </div>
      <div className="collage">
        <img src={collage} alt="Collage" />
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
        <p>Custom Gauge Jewelry is dedicated to providing unique and customized jewelry pieces...</p>
      </div>
    </div>
  );
}

export default Home;
