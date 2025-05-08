// services/authFlow.js
import googleClient from '../config/googleClient.js';

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata'
];

export const getAuthUrl = () => {
  const authUrl = googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  });
  return authUrl;
};

export const getTokenFromCode = async (code) => {
  const { tokens } = await googleClient.getToken(code);
  googleClient.setCredentials(tokens);
  return tokens;
};
