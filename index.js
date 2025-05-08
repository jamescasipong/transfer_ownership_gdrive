// index.js
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const open = require('open');
const oAuth2Client = require('./config/googleClient'); // Import the OAuth2 client
require('dotenv').config(); // Load environment variables from .env file 

// SCOPES — we specify Drive full access here
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// STEP 1 — Generate auth URL and open browser
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});
console.log('Authorize this app by visiting this URL:\n', authUrl);
open(authUrl);

// STEP 2 — Prompt user to enter auth code
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Enter the code from that page here: ', (code) => {
  rl.close();
  oAuth2Client.getToken(code, async (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    oAuth2Client.setCredentials(token);

    // ✅ Now authenticated — call Drive API
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const fileId = 'YOUR_FILE_ID';  // ID of the file to transfer
    const newOwnerEmail = 'newowner@example.com'; // Recipient's email

    try {
      const res = await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          type: 'user',
          role: 'owner',
          emailAddress: newOwnerEmail,
        },
        transferOwnership: true,
      });
      console.log('Ownership transferred:', res.data);
    } catch (error) {
      console.error('Error transferring ownership:', error);
    }
  });
});
