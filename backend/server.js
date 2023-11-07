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
    let { name, email, subject, message } = req.body;
  
    try {
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"My Website Contact Form" <your-email@example.com>', // sender address
        to: "your-receiving-email@example.com", // list of receivers
        subject: subject, // Subject line
        text: `Message from: ${name} <${email}>\n\n${message}`, // plain text body
        html: `<b>Message from:</b> ${name} &lt;${email}&gt;<br><br>${message}`, // html body
      });
  
      res.send('Message sent: ' + info.messageId);
    } catch (error) {
      res.status(500).send('Message not sent.');
    }
  });