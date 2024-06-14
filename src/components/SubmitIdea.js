import React, { useState } from 'react';
import './SubmitIdea.css';
import d20 from './assets/d20.png';
import majora from './assets/majora.png';
import mimic from './assets/mimic.png';
import nukacola from './assets/nukacola.png';
import vaultboy from './assets/vaultboy.png';

function SubmitIdea() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [file, setFile] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    setDescriptionCount(value.length);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Improper email');
      return;
    }
    setEmailError('');

    // Handle form submission logic here
    console.log('Email:', email);
    console.log('Description:', description);
    console.log('File:', file);
    alert('Idea submitted successfully!');
  };

  return (
    <div className="submit-idea-container">
      <div className="submit-idea">
        <h2>Submit Your Idea</h2>
        <form onSubmit={handleSubmit} className="submit-idea-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="email-input"
            />
            {emailError && <p className="email-error">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload Photo:</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Describe Your Idea:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              maxLength="1000"
              className="description-input"
            />
            <p className="char-counter">{descriptionCount}/1000</p>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <hr className="separator" />
      <h2 className="gallery-title">Gallery</h2>
      <div className="gallery">
        <img src={d20} alt="d20" />
        <img src={majora} alt="majora" />
        <img src={mimic} alt="mimic" />
        <img src={nukacola} alt="nukacola" />
        <img src={vaultboy} alt="vaultboy" />
      </div>
    </div>
  );
}

export default SubmitIdea;
