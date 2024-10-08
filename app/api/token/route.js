import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

// Define a named export for the GET method
export const GET = async (req) => {
    try {
        const res = new NextResponse();
        const { accessToken } = await getAccessToken(req, res);

        // Respond with the access token
        return NextResponse.json({ accessToken });
    } catch (error) {
        console.error('Error fetching access token:', error);
        return NextResponse.json({ error: 'Failed to fetch access token' }, { status: 500 });
    }
};
