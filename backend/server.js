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