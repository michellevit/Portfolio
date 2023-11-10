// SERVER FILE -> DREAMHOST REQUIRES IT TO BE NAMED 'app.js'

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

const app = express();
const port = process.env.PORT || 3001;


const recaptchaClient = new RecaptchaEnterpriseServiceClient();

app.use(express.json());
app.use(cors({ origin: 'https://www.michellef.dev' }));
app.use(express.static(path.join(__dirname, 'build')));

// Test route to make sure your server is working
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const recaptchaKey = process.env.RECAPTCHA_SITE_KEY;
// // Email sending route
app.post('/api/sendmail', async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;
  const recaptcha_action = 'submit';
  // Function to create an assessment for reCAPTCHA Enterprise
  async function createAssessment(token) {
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(process.env.GOOGLE_PROJECT_ID);
    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: process.env.RECAPTCHA_SITE_KEY,
        },
      },
      parent: projectPath,
    };

    try {
      const [response] = await client.createAssessment(request);
      if (!response.tokenProperties.valid) {
        console.error(`[${new Date().toLocaleString()}] Invalid reCAPTCHA token: ${response.tokenProperties.invalidReason}`);
        throw new Error('Invalid reCAPTCHA token');
      }
      if (response.tokenProperties.action !== recaptcha_action) {
        console.error(`[${new Date().toLocaleString()}] reCAPTCHA action mismatch: expected '${recaptchaAction}', got '${response.tokenProperties.action}'`);
        throw new Error('reCAPTCHA action mismatch');
      }
      return response;
    } catch (error) {
      console.error(`[${new Date().toLocaleString()}] Error with reCAPTCHA assessment:`, error);
      throw error;
    }
  }

  try {
    const assessmentResponse = await createAssessment(recaptchaToken);

    if (
      assessmentResponse &&
      assessmentResponse.tokenProperties.valid &&
      assessmentResponse.riskAnalysis.score >= 0.5
    ) {
      const info = await transporter.sendMail({
        from: `"Contact @ michellef.dev" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: "New contact form message",
        text: `Message from: ${name} <${email}>\n\n${message}`,
        html: `<b>Message from:</b> ${name} &lt;${email}&gt;<br><br>${message}`,
      });

      res.send('Message sent: ' + info.messageId);
    } else {
      // reCAPTCHA validation failed
      res.status(400).send('reCAPTCHA validation failed.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Message not sent.');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;