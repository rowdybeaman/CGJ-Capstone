import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="box-container">
        <div className="box">
          <Link to="/products">
            <button>View All Products</button>
          </Link>
        </div>
        <div className="box">
          <h2>Submit Your Own Idea</h2>
          <form className="idea-form">
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Describe your idea"></textarea>
            <input type="file" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          Custom Gauge Jewelry is a company dedicated to providing unique and
          creative gauges for those who love to express their individuality. We
          specialize in 3D printed custom gauges and can create anything to fit
          inside an earring gauge. Our journey began when one of our founders
          struggled to find fun and interesting gauges in his size, leading to
          the creation of Custom Gauge Jewelry.
        </p>
      </div>
    </div>
  );
}

export default Home;
