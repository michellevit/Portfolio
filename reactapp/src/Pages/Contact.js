import React, { useState, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import ReCAPTCHA from 'react-google-recaptcha';
import './Contact.css';

function Contact() {
  const [state, handleSubmit] = useForm("mpwpabkn");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [successClass, setSuccessClass] = useState('');
  
  const recaptchaRef = useRef();
  const formRef = useRef(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage('');

    try {
  
      if (!recaptchaRef.current) {
        setErrorMessage("reCAPTCHA validation is not available.");
        setIsSubmitting(false);
        return;
      }
  
      const token = await recaptchaRef.current.executeAsync();
  
      if (!token) {
        setErrorMessage("Please complete the reCAPTCHA.");
        setIsSubmitting(false);
        return;
      }
  
      recaptchaRef.current.reset(); // Reset reCAPTCHA for future submissions

      // Convert FormData to JSON object
      const formData = new FormData(event.target);
      const jsonData = Object.fromEntries(formData.entries());
      jsonData["g-recaptcha-response"] = token;

      const result = await handleSubmit(jsonData);
  
      if (result && result.errors) {
        setErrorMessage("There was an issue with the form submission.");
      } else {
        // Success handling
        setSuccessMessage("Thank you for message, I'll get back to you soon!");
        setSuccessClass("success-message");

        // Reset the form
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (error) {
      setErrorMessage("Failed to send the message. Please reach me at contact@michellef.dev");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form ref={formRef} onSubmit={handleFormSubmit} action="https://formspree.io/f/mpwpabkn" method="POST">
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

      {/* Success Message below Submit Button */}
      {successMessage && <div className={successClass}>{successMessage}</div>}
    </div>
  );
}

export default Contact;