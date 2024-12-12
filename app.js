const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve static files like CSS from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home Route
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    const fact = response.data.fact;
    res.render('index', { fact });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving cat fact');
  }
});

// Get New Fact Route
app.get('/new-fact', async (req, res) => {
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    res.json({ fact: response.data.fact });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving new fact');
  }
});

// Start Server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
