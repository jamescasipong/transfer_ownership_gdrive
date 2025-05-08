// controllers/driveController.js
import { transferOwnership } from '../services/driveService.js';
import googleClient from '../config/googleClient.js';

export const handleTransferOwnership = async (req, res) => {
  const fileId = req.query.fileId;
  const newOwner = req.query.newOwner;

  await transferOwnership(googleClient, fileId, newOwner);
  res.send(`Ownership transferred to ${newOwner}`);
};
