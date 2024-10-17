import { NextResponse } from 'next/server';

// Define a named export for the GET method
export const GET = async (req, { params }) => {
  const { userId } = params; // Extract userId from the dynamic params
  console.log('User ID:', userId);
  try {
    // Making the GraphQL request to the Ballerina GraphQL server
    const response = await fetch('http://localhost:9090/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
                 query {
  shopByUser(userId: "${userId}") {
    shopId
    shopName
    owner {
      name
      email
      userId
      phone
      address
    }
      description
      logo
      background
      color {
        primary
        secondary
      }
  }
  
}

                `,
      }),
    });
    // console.log(response.json());
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch shop data from GraphQL API');
    }

    const data = await response.json();
    console.log(data);
    // If no shop is found, return a 404 error with the message
    if (data.errors) {
      return NextResponse.json({ error: data.errors[0].message }, { status: 404 });
    }

    // Send the shop data as a JSON response
    return NextResponse.json(data.data.shopByUser);
  } catch (error) {
    console.error('Error fetching shop data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
