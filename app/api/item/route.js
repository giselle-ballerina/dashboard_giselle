import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Parse the form data (for multipart/form-data)
        const form = await req.formData();

        // Extract text fields from the form data
        const itemId = form.get('itemId') || '';
        const shopId = form.get('shopId') || '';
        const price = parseFloat(form.get('price')) || 0;
        const productName = form.get('productName') || '';
        const description = form.get('description') || '';
        const brand = form.get('brand') || '';

        // Extract tags as an array of objects
        const tags = (form.get('tags') || '').split(',').map(tag => ({ name: tag.trim() }));

        // Extract variants (assuming this is passed as a JSON string)
        const varients = form.get('varients') ? JSON.parse(form.get('varients')) : [];

        // Extract images as an array of objects with URLs
        const images = [];
        form.forEach((value, key) => {
            if (key.startsWith('file')) {
                images.push({ url: value });  // Use the value as the image URL
            }
        });

        // Create the item data with image URLs and tag objects
        const itemData = {
            itemId,
            shopId,
            price,
            productName,
            description,
            brand,
            tags,      // Array of objects like { name: "clothing" }
            varients,  // Assuming this is already an array
            images,    // Array of objects like { url: "https://example.com/images/tshirt1.jpg" }
        };

        console.log('Item data:', itemData);

        // Send the item data to the Ballerina backend
        const ballerinaResponse = await fetch('http://localhost:9091/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        });

        if (!ballerinaResponse.ok) {
            throw new Error('Failed to insert item in Ballerina backend');
        }

        return NextResponse.json({ success: true, message: 'Item inserted successfully' });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
