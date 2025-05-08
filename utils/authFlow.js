// utils/authFlow.js
const readline = require('readline');
const open = require('open');
const oAuth2Client = require('../config/googleClient');

const SCOPES = ['https://www.googleapis.com/auth/drive'];

async function authenticateUser() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this URL:\n', authUrl);
  await open(authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject('Error retrieving access token');
        oAuth2Client.setCredentials(token);
        resolve(oAuth2Client);
      });
    });
  });
}

module.exports = { authenticateUser };
