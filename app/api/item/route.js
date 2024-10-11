import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Parse the form data (when Content-Type is multipart/form-data)
        const form = await req.formData();

        // Extract fields from the form data
        const itemId = form.get('itemId') || '';
        const shopId = form.get('shopId') || '';
        const price = parseFloat(form.get('price')) || 0;
        const productName = form.get('productName') || '';
        const description = form.get('description') || '';
        const brand = form.get('brand') || '';
        const tags = (form.get('tags') || '').split(',');
        const varients = form.get('varients') ? JSON.parse(form.get('varients')) : [];

        const itemData = {
            itemId,
            shopId,
            price,
            productName,
            description,
            brand,
            tags,
            varients,
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
