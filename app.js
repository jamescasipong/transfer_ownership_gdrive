// src/app.js
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './src/routes/index.js';
import appConfig from './src/config/appConfig.js';
import authController from './controllers/authController.js';

// Create Express app
const app = express();

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../public');

// Initialize OAuth client
authController.initOAuthClient();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

// Session configuration
app.use(session({
  secret: appConfig.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: appConfig.environment === 'production',
    maxAge: appConfig.cookieMaxAge
  }
}));

// Routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // API error responses
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({
      error: 'Internal server error',
      message: appConfig.environment === 'development' ? err.message : undefined
    });
  }
  
  // HTML error responses
  res.status(500).send('Something went wrong!');
});

// 404 handler
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.status(404).send('Page not found');
});

export default app;