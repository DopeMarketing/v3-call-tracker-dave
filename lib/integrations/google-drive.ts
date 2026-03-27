import { google } from 'googleapis';

const drive = google.drive({
  version: 'v3',
  auth: process.env.GOOGLE_DRIVE_API_KEY
});

export interface DriveFile {
  id?: string;
  name?: string;
  mimeType?: string;
  parents?: string[];
}

export async function listFiles(folderId?: string): Promise<DriveFile[]> {
  try {
    const response = await drive.files.list({
      q: folderId ? `'${folderId}' in parents` : undefined,
      fields: 'files(id,name,mimeType,parents)'
    });
    return response.data.files || [];
  } catch (error) {
    console.error('Error listing Drive files:', error);
    throw error;
  }
}

export async function createFolder(name: string, parentId?: string): Promise<DriveFile> {
  try {
    const response = await drive.files.create({
      requestBody: {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentId ? [parentId] : undefined
      },
      fields: 'id,name,mimeType,parents'
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Drive folder:', error);
    throw error;
  }
}