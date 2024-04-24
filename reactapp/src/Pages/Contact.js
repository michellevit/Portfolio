import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contact.css';
/* global grecaptcha */

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', 
  });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successClass, setSuccessClass] = useState('');
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot || isSending) { 
      return;
    }
    setIsSending(true);
    grecaptcha.enterprise.ready(async () => {
      try {
        // Generate a new reCAPTCHA token
        const newToken = await grecaptcha.enterprise.execute('6Lcz8AMpAAAAAOQKiyLWE8Rssx6mQvuGFdsM8sWh', { action: 'submit' });
        setRecaptchaToken(newToken);

        // Post form data with the new reCAPTCHA token
        const response = await axios.post('/api/sendmail', {
          ...formData,
          recaptchaToken: newToken,
        });

        // Handling success response
        setSuccessMessage(<span>Thank you - your message has been sent successfully.<br />I will get back to you as soon as possible.</span>);
        setSuccessClass('success-message');
        setFormData({ name: '', email: '', message: '' }); 
        setShowLinkedIn(false);
        setRecaptchaToken("");

      } catch (error) {
        console.error('Error sending message:', error);
        setSuccessMessage(<span>The message failed to send.<br />Please try contacting me through LinkedIn.</span>);
        setSuccessClass('success-message error-message');
        setShowLinkedIn(true);
      } finally {
        setIsSending(false);
      }
    });
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="honeypot"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className={`dark ${isSending ? 'sending' : ''}`} id="contact-form">
          {isSending ? 'Sending...' : 'Send'}
        </button>
        </form>
        {successMessage && <div className={successClass}>{successMessage}</div>}
        {showLinkedIn && (
          <div className="linkedInButton">
            <a
              href="https://www.linkedin.com/in/michelle-f-ba0a5017b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="light" id="contact-form-button">LinkedIn</button>
            </a>
          </div>
        )}
      
    </div>
  );
}

export default Contact;