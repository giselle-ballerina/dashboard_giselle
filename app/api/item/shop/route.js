
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    const body = await req.json(); // Use req.json() to parse the JSON body
    const { shopID } = body;

    if (!shopID) {
      return NextResponse.json({ error: 'shopID is required' }, { status: 400 });
    }
  try {
    // Making the request to fetch shop items
    const response = await fetch(`http://localhost:9091/item/shop/${shopID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch shop data');
    }

    const data = await response.json();
    console.log(data);
    // Return the shop data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching shop data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
    console.log('Received shopID:', shopID);

    // Continue with processing, such as querying your database or further logic
    return NextResponse.json({ success: true, message: `Shop ID ${shopID} received` });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';

// // Define a named export for the GET method
// export const GET = async (req, { params }) => {
//   const { shopID } = params; // Extract shopID from dynamic params
//   console.log('Shop ID:', shopID);

//   if (!shopID) {
//     return NextResponse.json({ error: 'shopID is required' }, { status: 400 });
//   }

//   try {
//     // Making the request to fetch shop items
//     const response = await fetch(`http://localhost:9091/item/shop/${shopID}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error('Failed to fetch shop data');
//     }

//     const data = await response.json();

//     // Return the shop data as JSON
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error fetching shop data:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };
