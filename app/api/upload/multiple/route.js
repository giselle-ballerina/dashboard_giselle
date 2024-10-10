import { UploadToGcs } from '@/lib/storage';

export async function POST(req) {
    const form = await req.formData();
    const files = form.getAll('files'); // Assuming the input name is 'files'
    const fileUrls = await Promise.all(files.map(file => UploadToGcs(file))); // Upload all files concurrently

    return Response.json({ success: true, fileUrls: fileUrls });
}