// routes/authRoutes.js
import express from 'express';
import { redirectToGoogleAuth, handleOAuthCallback } from '../controllers/authController.js';

const router = express.Router();

router.get('/auth', redirectToGoogleAuth);
router.get('/oauth2callback', handleOAuthCallback);

export default router;
