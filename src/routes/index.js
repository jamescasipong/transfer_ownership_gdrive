// src/routes/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './authRoutes.js';
import driveRoutes from './driveRoutes.js';
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../../public');

// API routes
router.use(authRoutes);
router.use(driveRoutes);

// Frontend routes
router.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Protected dashboard route
router.get('/dashboard', authMiddleware.isAuthenticated, (req, res) => {
  res.sendFile(path.join(publicPath, 'dashboard.html'));
});

export default router;