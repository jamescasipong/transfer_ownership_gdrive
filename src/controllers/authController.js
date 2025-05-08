// src/controllers/authController.js
import authService from '../services/authService.js';

// Store the OAuth client for reuse
let oauth2Client = null;

/**
 * Initialize the OAuth client
 */
export const initOAuthClient = () => {
  if (!oauth2Client) {
    oauth2Client = authService.createClient();
  }
  return oauth2Client;
};

/**
 * Redirect user to Google authorization page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const redirectToGoogleAuth = (req, res) => {
  const client = initOAuthClient();
  const authUrl = authService.generateAuthUrl(client);
  res.redirect(authUrl);
};

/**
 * Handle OAuth callback from Google
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const handleOAuthCallback = async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).send('Authorization code is missing');
  }
  
  try {
    const client = initOAuthClient();
    const tokens = await authService.exchangeCodeForTokens(client, code);
    
    // Store tokens in session
    req.session.tokens = tokens;
    
    // Redirect to dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).send('Authentication failed');
  }
};

/**
 * Check authentication status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const checkAuthStatus = (req, res) => {
  res.json({
    authenticated: !!req.session.tokens
  });
};

/**
 * Logout user by destroying session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

/**
 * Get authenticated OAuth client with tokens from session
 * @param {Object} tokens - OAuth tokens from session
 * @returns {OAuth2Client} Authenticated OAuth client
 */
export const getAuthenticatedClient = (tokens) => {
  const client = initOAuthClient();
  authService.applyTokens(client, tokens);
  return client;
};

export default {
  initOAuthClient,
  redirectToGoogleAuth,
  handleOAuthCallback,
  checkAuthStatus,
  logout,
  getAuthenticatedClient
};