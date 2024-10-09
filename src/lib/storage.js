import { Storage } from '@google-cloud/storage';
export const UploadToGcs = async (file) => {
    if (!file) throw new Error('No file provided');
    if (file.size < 1) throw new Error('File is empty');

    const buffer = await file.arrayBuffer();
    const storage = new Storage();
    const bucketName = 'giselle_bucket'; // Your bucket name
    const fileName = file.name; // Name of the file in GCS

    // Create a reference to the file in the bucket
    const gcsFile = storage.bucket(bucketName).file(fileName);

    // Upload the file buffer
    await gcsFile.save(Buffer.from(buffer));

    // Make the file publicly accessible (optional, but required for public URLs)
    await gcsFile.makePublic();

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

    return publicUrl;
}
export const GetSignedUrl = async (fileName) => {
    // I am not including the key in the github repo, but this key goes in the root of the project.
    const storage = new Storage({ keyFilename: 'storage-demo-key.json' });

    const [url] = await storage.bucket('scriptbytes-storagedemo')
        .file(fileName)
        .getSignedUrl(
            {
                action: 'write',
                version: 'v4',
                expires: Date.now() + 15 * 60 * 100000,
                contentType: 'application/octet-stream',
            }
        );

    return url;
}