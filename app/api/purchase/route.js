import { NextResponse } from 'next/server';

// POST method to get all purchases of a shop
export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { shopID } = body;

    if (!shopID) {
      return NextResponse.json({ error: 'shopID is required' }, { status: 400 });
    }

    try {
      // Making the request to fetch all purchases of the shop
      const response = await fetch(`http://localhost:9091/purchase/shop/${shopID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch purchase data');
      }

      const data = await response.json();
      console.log(data);

      // Return the purchases as JSON
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error fetching purchase data:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 500 });
  }
}
