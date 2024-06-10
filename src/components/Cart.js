import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.get('/api/cart')
      .then(response => {
        setCartItems(response.data.items);
        setTotalPrice(response.data.totalPrice);
      })
      .catch(error => console.error(error));
  }, []);

  const updateCart = (itemId, quantity) => {
    // logic to update cart
  };

  return (
    <div className="cart">
      {cartItems.map(item => (
        <ProductCard key={item.id} product={item} />
      ))}
      <div className="total-price">Total: ${totalPrice}</div>
      <button className="checkout-button" onClick={() => window.location.href = '/checkout'}>Checkout</button>
    </div>
  );
}

export default Cart;
