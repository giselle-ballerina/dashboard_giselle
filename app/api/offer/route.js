import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

// Define a named export for the GET method
export const GET = async (req) => {
    try {
        const res = new NextResponse();
        const { accessToken } = await getAccessToken(req, res);
        console.log('Access token:', accessToken);
        // Dummy data for offers
        const offers = [
            {
                offerId: "OFFER001",
                shopId: "SHOP123",
                offerText: "20% off on all electronics",
                offerStartDate: "2024-10-01",
                offerEndDate: "2024-10-31",
                offerDiscount: 20.00,
                offerCode: "ELEC20",
                offerStatus: "Active",
                bannerImage: "https://example.com/banner1.jpg"
            },
            {
                offerId: "OFFER002",
                shopId: "SHOP456",
                offerText: "Buy 1 Get 1 Free on all shoes",
                offerStartDate: "2024-10-10",
                offerEndDate: "2024-10-20",
                offerDiscount: 50.00,
                offerCode: "SHOEBOGO",
                offerStatus: "Expired",
                bannerImage: "https://example.com/banner2.jpg"
            },
            {
                offerId: "OFFER003",
                shopId: "SHOP789",
                offerText: "10% off on all groceries",
                offerStartDate: "2024-10-05",
                offerEndDate: "2024-10-15",
                offerDiscount: 10.00,
                offerCode: null, // No offer code
                offerStatus: "Active",
                bannerImage: "https://example.com/banner3.jpg"
            }
        ];

        // Respond with the offers and access token (if needed)
        return NextResponse.json({ accessToken, offers });
    } catch (error) {
        console.error('Error fetching offers:', error);
        return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
    }
};
