// services/driveService.js
import { google } from 'googleapis';

export async function transferOwnership(auth, fileId, newOwnerEmail) {
  const drive = google.drive({ version: 'v3', auth });

  // Add new owner permission
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'owner',
      type: 'user',
      emailAddress: newOwnerEmail,
    },
    transferOwnership: true,
  });

  console.log(`Ownership transferred to ${newOwnerEmail}`);
}
