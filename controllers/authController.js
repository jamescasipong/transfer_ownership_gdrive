// controllers/authController.js
import { getAuthUrl, getTokenFromCode } from '../services/authFlow.js';

export const redirectToGoogleAuth = (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
};

export const handleOAuthCallback = async (req, res) => {
  const code = req.query.code;
  await getTokenFromCode(code);
  res.send('Authentication successful! You can now transfer ownership.');
};
