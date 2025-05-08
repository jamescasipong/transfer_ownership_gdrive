// src/config/appConfig.js
import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'your-secret-key',
  environment: process.env.NODE_ENV || 'development',
  cookieMaxAge: 24 * 60 * 60 * 1000, // 24 hours
  
  // File listing defaults
  fileListingDefaults: {
    pageSize: 10,
    orderBy: 'modifiedTime desc',
    fields: 'nextPageToken, files(id, name, mimeType, webViewLink, iconLink, createdTime, modifiedTime, owners)'
  }
};