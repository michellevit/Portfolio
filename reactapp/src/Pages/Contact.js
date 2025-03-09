import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

function Contact() {
  const [state, handleSubmit] = useForm("mpwpabkn");
  
  if (state.succeeded) {
      return (
        <div className="contact-container">
          <h2>Contact Me</h2>
          <p>Thank you for your message! I will get back to you as soon as possible.</p>
        </div>
      );
  }
  
  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name:</label>
        <input
          id="name"
          type="text" 
          name="name"
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />

        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          type="email" 
          name="email"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <label htmlFor="message">Your Message:</label>
        <textarea
          id="message"
          name="message"
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <button type="submit" id="contact-form" disabled={state.submitting} className="dark">
          {state.submitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Contact;