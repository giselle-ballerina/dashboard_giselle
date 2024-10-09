// app/profile/upload.jsx
'use server';

import { Storage } from '@google-cloud/storage';
import { UploadToGcs } from './storage';

export const UploadFile = async (form) => {
    try {
        const file = form.get('file') || null;
        if (!file) {
            throw new Error('No file provided');
        }
        // Ensure that the file is uploaded to GCS
        await UploadToGcs(file);
        return true;
    } catch (error) {
        console.error('Error uploading file:', error);
        return false;
    }
};
