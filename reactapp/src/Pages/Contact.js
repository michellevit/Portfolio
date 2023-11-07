import React, { useState } from 'react';
import axios from 'axios';
import "./Contact.css";


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sendmail', formData);
      console.log(response.data);
    } catch (error) {
    }
  };
  return <div className="contact-container">
    <h2>Contact Me</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange} required />
      <textarea name="message" placeholder="Your Message" onChange={handleChange} required />
      <button type="submit" onChange={handleSubmit}>Send</button>
    </form>
  </div>;
}

export default Contact;
