import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4005/api/cart', {
      headers: {
        'Authorization': token,
      },
    })
      .then(response => {
        console.log(response.data);
        setCartItems(response.data.items);
        setTotalPrice(Math.round(response.data.totalPrice * 100) / 100);
      })
      .catch(error => console.error(error));
  }, []);

  const removeFromCart = (itemId) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:4005/api/cart/${itemId}`, {
      headers: {
        'Authorization': token,
      },
    })
      .then(() => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
        const updatedTotal = updatedCartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
        setTotalPrice(Math.round(updatedTotal * 100) / 100);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="cart-container">
      <div className="cart-box">
        <div className="cart-header">
          <div className="total-price">Total: ${totalPrice}</div>
          <button className="checkout-button" onClick={() => window.location.href = '/checkout'}>Checkout</button>
        </div>
        {cartItems.length === 0 ? (
          <p>There are no items in your cart</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <ProductCard product={item.product} />
              <div className="cart-item-buttons">
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  X Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
