// src/services/authService.js
import googleConfig from '../config/googleConfig.js';

/**
 * Create a new OAuth client instance
 * @returns {OAuth2Client} OAuth2 client
 */
export const createClient = () => {
  return googleConfig.createOAuth2Client();
};

/**
 * Generate authentication URL
 * @param {OAuth2Client} oauth2Client - OAuth2 client
 * @returns {string} Authentication URL
 */
export const generateAuthUrl = (oauth2Client) => {
  return googleConfig.getAuthUrl(oauth2Client);
};

/**
 * Exchange authorization code for tokens
 * @param {OAuth2Client} oauth2Client - OAuth2 client
 * @param {string} code - Authorization code from Google
 * @returns {Promise<Object>} OAuth tokens
 */
export const exchangeCodeForTokens = async (oauth2Client, code) => {
  try {
    return await googleConfig.getTokens(oauth2Client, code);
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    throw error;
  }
};

/**
 * Apply tokens to OAuth client
 * @param {OAuth2Client} oauth2Client - OAuth2 client
 * @param {Object} tokens - OAuth tokens
 */
export const applyTokens = (oauth2Client, tokens) => {
  googleConfig.setCredentials(oauth2Client, tokens);
};

/**
 * Refresh the access token if needed
 * @param {OAuth2Client} oauth2Client - OAuth2 client with refresh token
 * @returns {Promise<Object>} Updated tokens
 */
export const refreshTokenIfNeeded = async (oauth2Client) => {
  try {
    const tokens = await oauth2Client.refreshAccessToken();
    return tokens.credentials;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export default {
  createClient,
  generateAuthUrl,
  exchangeCodeForTokens,
  applyTokens,
  refreshTokenIfNeeded
};