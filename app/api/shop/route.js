import { NextResponse } from 'next/server';
import { UploadToGcs } from '@/lib/storage';

export async function POST(req) {

    // console.log('Request:', req);
    const form = await req.formData();

    // Extract form fields
    const shopId = form.get('shopId') || ''; // Ensure empty string for missing fields
    const shopName = form.get('shopName') || '';
    const ownerName = form.get('ownerName') || '';
    const ownerEmail = form.get('ownerEmail') || '';
    const ownerUserId = form.get('ownerUserId') || '';
    const ownerPhone = form.get('ownerPhone') || ''; // Optional field, set empty if missing
    const ownerAddress = form.get('ownerAddress') || ''; // Optional field, set empty if missing
    const description = form.get('description') || ''; // Optional field, set empty if missing
    const background = form.get('background') || ''; // Optional field, set empty if missing
    const colorPrimary = form.get('colorPrimary') || ''; // Optional field, set empty if missing
    const colorSecondary = form.get('colorSecondary') || ''; // Optional field, set empty if missing
    const fontPrimary = form.get('fontPrimary') || ''; // Optional field, set empty if missing
    const fontSecondary = form.get('fontSecondary') || ''; // Optional field, set empty if missing
    const fileUrl = form.get('fileUrl');



    // Prepare shop data with default empty values for missing fields
    const shopData = {
        shopId,
        shopName,
        owner: {
            name: ownerName,
            email: ownerEmail,
            userId: ownerUserId,
            phone: ownerPhone,
            address: ownerAddress,
        },
        description,
        background,
        color: {
            primary: colorPrimary,
            secondary: colorSecondary,
        },
        font: {
            primary: fontPrimary,
            secondary: fontSecondary,
        },
        logo: fileUrl, // Store the file URL
        insights: [] // You can set an empty array or omit it, depending on your use case
    };

    console.log('Shop data:', shopData);

    // Send the shop data to the Ballerina backend
    const ballerinaResponse = await fetch('http://localhost:9091/shop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shopData),
    });

    if (!ballerinaResponse.ok) {
        throw new Error('Failed to insert shop in Ballerina backend');
    }

    const ballerinaData = await ballerinaResponse.json();
    console.log(ballerinaData);
    return NextResponse.json({ success: true, message: 'Shop data inserted successfully', data: ballerinaData });
} 
