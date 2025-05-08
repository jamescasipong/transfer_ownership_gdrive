// src/routes/driveRoutes.js
import express from 'express';
import driveController from '../controllers/driveController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware.isAuthenticated);
router.use(authMiddleware.refreshTokensIfNeeded);

// Get list of files
router.get('/api/files', driveController.getFilesList);

// Get details of a specific file
router.get('/api/files/:fileId', driveController.getFileDetails);

// Transfer ownership of a file
router.post('/api/files/:fileId/transfer-ownership', driveController.transferFileOwnership);

export default router;