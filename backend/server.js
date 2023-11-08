require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

const app = express();
const port = process.env.PORT || 3001;

let credentials;
let project_id;

try {
  credentials = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS));
  project_id = credentials.project_id;
} catch (error) {
  console.error('Error reading or parsing credentials file:', error);
  process.exit(1); 
}

const recaptchaClient = new RecaptchaEnterpriseServiceClient();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Test route to make sure your server is working
app.get('/api', (req, res) => {
  res.send('Backend API is working!');
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Email sending route
app.post('/api/sendmail', async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  // Function to create an assessment for reCAPTCHA Enterprise
  async function createAssessment(token) {
    const projectPath = recaptchaClient.projectPath(project_id);
    const assessment = {
      event: {
        token: token,
        siteKey: process.env.SITE_KEY,
      },
    };

    const request = {
      assessment,
      parent: projectPath,
    };

    try {
      const [response] = await recaptchaClient.createAssessment(request);
      return response;
    } catch (error) {
      console.error('Error with reCAPTCHA assessment:', error);
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
        from: `"My Website Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: "New email from michellef.dev",
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
