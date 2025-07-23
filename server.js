const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// Load .env if needed
require('dotenv').config();

// SSL Certificates
const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem'),
};

// Serve React build files
app.use(express.static(path.join(__dirname, 'dist')));

// All routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start HTTPS server
https.createServer(options, app).listen(443, () => {
  console.log('🌐 FusionMMApp is now live at https://localhost');
});
