// src/config/googleConfig.js
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// OAuth scopes required for Google Drive operations
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file'
];

/**
 * Create a new OAuth2 client
 * @returns {OAuth2Client} A new OAuth2 client instance
 */
export const createOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
};

/**
 * Get authentication URL for Google OAuth
 * @param {OAuth2Client} oauth2Client - OAuth2 client
 * @returns {string} Authentication URL
 */
export const getAuthUrl = (oauth2Client) => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // Force consent screen to get refresh token
    scope: SCOPES
  });
};

/**
 * Exchange authorization code for tokens
 * @param {OAuth2Client} oauth2Client - OAuth2 client
 * @param {string} code - Authorization code
 * @returns {Promise<Object>} OAuth tokens
 */
export const getTokens = async (oauth2Client, code) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

/**
 * Set credentials on OAuth2 client
 * @param {OAuth2Client} oauth2Client - OAuth2 client
 * @param {Object} tokens - OAuth tokens
 */
export const setCredentials = (oauth2Client, tokens) => {
  oauth2Client.setCredentials(tokens);
};

export default {
  SCOPES,
  createOAuth2Client,
  getAuthUrl,
  getTokens,
  setCredentials
};