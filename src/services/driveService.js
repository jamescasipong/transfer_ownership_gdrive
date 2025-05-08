// src/services/driveService.js
import { google } from 'googleapis';
import appConfig from '../config/appConfig.js';

/**
 * Create a Google Drive API client
 * @param {OAuth2Client} auth - Authenticated OAuth2 client
 * @returns {drive_v3.Drive} Google Drive API client
 */
const createDriveClient = (auth) => {
  return google.drive({ version: 'v3', auth });
};

/**
 * List files from Google Drive with pagination
 * @param {OAuth2Client} auth - Authenticated OAuth2 client
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Files list response
 */
export const listFiles = async (auth, options = {}) => {
  const drive = createDriveClient(auth);
  
  // Merge default options with provided options
  const queryOptions = {
    ...appConfig.fileListingDefaults,
    ...options
  };
  
  try {
    const response = await drive.files.list(queryOptions);
    return response.data;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

/**
 * Get detailed information about a specific file
 * @param {OAuth2Client} auth - Authenticated OAuth2 client
 * @param {string} fileId - ID of the file to get
 * @returns {Promise<Object>} File metadata
 */
export const getFileInfo = async (auth, fileId) => {
  const drive = createDriveClient(auth);
  
  try {
    const response = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, webViewLink, iconLink, createdTime, modifiedTime, size, owners, capabilities'
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting file info:', error);
    throw error;
  }
};

/**
 * Transfer ownership of a file to another user
 * @param {OAuth2Client} auth - Authenticated OAuth2 client
 * @param {string} fileId - ID of the file to transfer
 * @param {string} newOwnerEmail - Email of the new owner
 * @returns {Promise<Object>} Permission response
 */
export const transferOwnership = async (auth, fileId, newOwnerEmail) => {
  const drive = createDriveClient(auth);
  
  try {
    const response = await drive.permissions.create({
      fileId,
      transferOwnership: true,
      requestBody: {
        role: 'owner',
        type: 'user',
        emailAddress: newOwnerEmail
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error transferring ownership:', error);
    throw error;
  }
};

export default {
  listFiles,
  getFileInfo,
  transferOwnership
};