// src/controllers/driveController.js
import driveService from '../services/driveService.js';
import authController from './authController.js';

/**
 * Get list of files from Google Drive
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getFilesList = async (req, res) => {
  try {
    // Get authenticated client
    const auth = authController.getAuthenticatedClient(req.session.tokens);
    
    // Parse query parameters
    const options = {
      pageSize: parseInt(req.query.pageSize) || 10,
      pageToken: req.query.pageToken || null,
      orderBy: req.query.orderBy || 'modifiedTime desc'
    };
    
    // Add search query if provided
    if (req.query.q) {
      options.q = req.query.q;
    }
    
    // Add mimetype filter if provided
    if (req.query.mimeType) {
      options.q = options.q ? 
        `${options.q} and mimeType='${req.query.mimeType}'` : 
        `mimeType='${req.query.mimeType}'`;
    }
    
    // Exclude trashed files by default
    const includeTrashed = req.query.includeTrashed === 'true';
    if (!includeTrashed) {
      options.q = options.q ? 
        `${options.q} and trashed=false` : 
        `trashed=false`;
    }
    
    // Get list of files
    const result = await driveService.listFiles(auth, options);
    
    res.json({
      files: result.files,
      nextPageToken: result.nextPageToken || null
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files', details: error.message });
  }
};

/**
 * Get information about a specific file
 * @param {Object} req - Express request object 
 * @param {Object} res - Express response object
 */
export const getFileDetails = async (req, res) => {
  const fileId = req.params.fileId;
  
  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required' });
  }
  
  try {
    // Get authenticated client
    const auth = authController.getAuthenticatedClient(req.session.tokens);
    
    // Get file info
    const fileInfo = await driveService.getFileInfo(auth, fileId);
    
    res.json(fileInfo);
  } catch (error) {
    console.error('Error getting file details:', error);
    res.status(500).json({ error: 'Failed to get file details', details: error.message });
  }
};

/**
 * Transfer ownership of a file to another account
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const transferFileOwnership = async (req, res) => {
  const fileId = req.params.fileId;
  const { newOwnerEmail } = req.body;
  
  if (!fileId || !newOwnerEmail) {
    return res.status(400).json({ error: 'File ID and new owner email are required' });
  }
  
  try {
    // Get authenticated client
    const auth = authController.getAuthenticatedClient(req.session.tokens);
    
    // Transfer ownership
    const result = await driveService.transferOwnership(auth, fileId, newOwnerEmail);
    
    res.json({
      success: true,
      message: `Ownership of file transferred to ${newOwnerEmail}`,
      permission: result
    });
  } catch (error) {
    console.error('Error transferring ownership:', error);
    res.status(500).json({ error: 'Failed to transfer ownership', details: error.message });
  }
};

export default {
  getFilesList,
  getFileDetails,
  transferFileOwnership
};