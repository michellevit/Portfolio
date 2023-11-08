import React, { useState, useCallback } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successClass, setSuccessClass] = useState("");
  const [showLinkedIn, setShowLinkedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleReCaptchaVerify = useCallback((token) => {
    setRecaptchaToken(token);
    handleSubmit();
  }, []);

  const handleSubmit = async (e) => {
    if (formData.honeypot) {
      console.log("Nothing sent.");
      return;
    }
    if (recaptchaToken) {
    try {
      const response = await axios.post("/api/sendmail", {
        ...formData,
        recaptchaToken: recaptchaToken,
      });
      console.log(response.data);
      setSuccessMessage(
        <span>
          Thank you - your message has been sent successfully.
          <br />I will get back to you as soon as possible.
        </span>
      );
      setSuccessClass("success-message");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSuccessMessage("");
        setSuccessClass("");
      }, 10000);
    } catch (error) {
      setSuccessMessage(
        <span>
          The message failed to send.
          <br />
          Please try contacting me through LinkedIn.
        </span>
      );
      setSuccessClass("success-message error-message");
      setShowLinkedIn(true);
      setTimeout(() => {
        setSuccessMessage("");
        setSuccessClass("");
      }, 10000);
    }
  }
  };

  window.onSubmit = handleReCaptchaVerify;

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <form onSubmit={(e) => e.preventDefault()}>
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
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          onChange={handleChange}
          required
        />
        <button
          className="g-recaptcha"
          data-sitekey="6Lcz8AMpAAAAAOQKiyLWE8Rssx6mQvuGFdsM8sWh"
          data-callback="onSubmit"
          data-action="submit"
        >
          Send
        </button>
        {successMessage && <div className={successClass}>{successMessage}</div>}
        {showLinkedIn && (
          <div className="linkedInButton">
            <a
              href="https://www.linkedin.com/in/michelle-f-ba0a5017b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button id="linkedButton">LinkedIn</button>
            </a>
          </div>
        )}
      </form>
    </div>
  );
}

export default Contact;
