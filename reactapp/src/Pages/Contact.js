import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // hidden field to trick bots
  });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [successClass, setSuccessClass] = useState('');
  const [showLinkedIn, setShowLinkedIn] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6Lcz8AMpAAAAAOQKiyLWE8Rssx6mQvuGFdsM8sWh';
    document.body.appendChild(script);

    script.onload = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('6Lcz8AMpAAAAAOQKiyLWE8Rssx6mQvuGFdsM8sWh', { action: 'submit' })
          .then(token => {
            setRecaptchaToken(token);
          });
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot) { 
      return;
    }

    if (!recaptchaToken) {
      console.error('reCAPTCHA token is missing.');
      return;
    }
    console.log("RECAPTCHA: ", recaptchaToken);
    try {
      const response = await axios.post('/api/sendmail', {
        ...formData,
        recaptchaToken,
      });
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
    }
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
        <button type="submit">Send</button>
        {successMessage && <div className={successClass}>{successMessage}</div>}
        {showLinkedIn && (
          <div className="linkedInButton">
            <a
              href="https://www.linkedin.com/in/michelle-f-ba0a5017b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" id="linkedButton">LinkedIn</button>
            </a>
          </div>
        )}
      </form>
    </div>
  );
}

export default Contact;
