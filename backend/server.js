require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// Test route to make sure your server is working
app.get('/api', (req, res) => {
  res.send('Backend API is working!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// ADD CORS to communicate with frontend
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));


// NODEMAILER SETUP

const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

// Email sending route
app.post('/api/sendmail', async (req, res) => {
    let { name, email, message } = req.body;
  
    try {
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"My Website Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: "New email from michellef.dev", 
        text: `Message from: ${name} <${email}>\n\n${message}`, 
        html: `<b>Message from:</b> ${name} &lt;${email}&gt;<br><br>${message}`,
      });
  
      res.send('Message sent: ' + info.messageId);
    } catch (error) {
      res.status(500).send('Message not sent.');
    }
  });