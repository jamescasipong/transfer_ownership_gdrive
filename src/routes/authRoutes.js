// src/routes/authRoutes.js
import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Route to initiate OAuth flow
router.get('/auth/google', authController.redirectToGoogleAuth);

// OAuth callback route
router.get('/oauth2callback', authController.handleOAuthCallback);

// Check auth status
router.get('/api/auth/status', authController.checkAuthStatus);

// Logout route
router.get('/logout', authController.logout);

export default router;