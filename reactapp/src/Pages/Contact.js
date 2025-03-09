import React, { useState, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import ReCAPTCHA from 'react-google-recaptcha';
import './Contact.css';

function Contact() {
  const [state, handleSubmit] = useForm("mpwpabkn");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const recaptchaRef = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault(); 
    setIsSubmitting(true);
    setErrorMessage(null); 

    try {
      // Manually trigger reCAPTCHA validation
      const token = await recaptchaRef.current.executeAsync();
      if (!token) {
        setErrorMessage("Please complete the reCAPTCHA.");
        setIsSubmitting(false);
        return;
      }

      setRecaptchaToken(token);

      // Submit form with reCAPTCHA token
      const result = await handleSubmit(event, { recaptchaToken: token });

      if (result && result.errors) {
        console.error("Form error:", result.errors);
        setErrorMessage("There was an issue with the form submission.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Failed to send the message. Please try again.");
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}

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

        {/* Google reCAPTCHA v2 Invisible Widget */}
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LeDku4qAAAAAPxcBinFyYFRXzj9MMZwuMhNpxhW"
          size="invisible"
          badge="bottomright"
        />

        <button type="submit" id="contact-form" disabled={isSubmitting} className="dark">
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Contact;
