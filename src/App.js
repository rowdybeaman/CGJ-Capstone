import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Auth from './components/Auth';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
      <footer>
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Submit Idea</a>
          <a href="#">About Us</a>
        </div>
        <div className="footer-bottom">
          <a href="#">Back to Top</a>
          <p>&copy; 2024 Custom Gauge Jewelry. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
