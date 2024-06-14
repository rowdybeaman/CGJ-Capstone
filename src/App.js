import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Product from './components/Product';
import SubmitIdea from './components/SubmitIdea';
import Auth from './components/Auth';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import { AuthContextProvider } from './store/authContext';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Product />} />
              <Route path="/submit-idea" element={<SubmitIdea />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
