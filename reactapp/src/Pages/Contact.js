import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

function Contact() {
  const [state, handleSubmit] = useForm("mpwpabkn"); // Ensure this matches your Formspree ID
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await handleSubmit(event);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <form onSubmit={handleFormSubmit} action="https://formspree.io/f/mpwpabkn" method="POST">
        <label htmlFor="name">Your Name:</label>
        <input id="name" type="text" name="name" required />
        <ValidationError prefix="Name" field="name" errors={state.errors} />

        <label htmlFor="email">Email Address:</label>
        <input id="email" type="email" name="email" required />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <label htmlFor="message">Your Message:</label>
        <textarea id="message" name="message" required />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <button type="submit" id="contact-form" disabled={isSubmitting} className="dark">
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Contact;