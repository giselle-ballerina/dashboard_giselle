import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export function FileUpload() {
    const [fileUrl, setFileUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target); // Get the form data
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData, // Send form data including the file
            });

            const result = await response.json();

            if (result.success) {
                setFileUrl(result.fileUrl); // Set the file URL from the response
            } else {
                console.error('File upload failed:', result.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <>
            <h1 className="text-gray-600 text-xl m-8">Upload Using API</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Input type="file" name="file" />
                <Button
                    type="submit"
                    varient="secondary"
                    className="text-white "
                >
                    Upload
                </Button>
            </form>

            {fileUrl && (
                <p className="mt-4">
                    File uploaded successfully!{' '}
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        View File
                    </a>
                </p>
            )}
        </>
    );
}

