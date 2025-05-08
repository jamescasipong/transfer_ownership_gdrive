// src/middleware/authMiddleware.js

/**
 * Middleware to check if user is authenticated
 * Redirects to login page for page requests
 * Returns 401 status for API requests
 */
export const isAuthenticated = (req, res, next) => {
    if (!req.session.tokens) {
      // Check if it's an API request based on the path
      if (req.path.startsWith('/api/')) {
        return res.status(401).json({ error: 'Authentication required' });
      } else {
        return res.redirect('/auth/google');
      }
    }
    next();
  };
  
  /**
   * Middleware to check if tokens need refreshing
   * Should be used after isAuthenticated
   */
  export const refreshTokensIfNeeded = async (req, res, next) => {
    // Only proceed if we have tokens
    if (!req.session.tokens) return next();
    
    // Check if token is expired or about to expire
    const expiryDate = req.session.tokens.expiry_date;
    const now = Date.now();
    
    // If token doesn't expire, or isn't close to expiring (within 5 minutes), continue
    if (!expiryDate || expiryDate - now > 5 * 60 * 1000) {
      return next();
    }
    
    // Token is about to expire, refresh it
    try {
      const oauth2Client = authController.getAuthenticatedClient(req.session.tokens);
      const newTokens = await authService.refreshTokenIfNeeded(oauth2Client);
      
      // Update session with new tokens
      req.session.tokens = newTokens;
      next();
    } catch (error) {
      console.error('Failed to refresh token:', error);
      
      // If refresh fails, clear session and redirect to login
      req.session.destroy();
      
      if (req.path.startsWith('/api/')) {
        return res.status(401).json({ error: 'Session expired' });
      } else {
        return res.redirect('/auth/google');
      }
    }
  };
  
  export default {
    isAuthenticated,
    refreshTokensIfNeeded
  };