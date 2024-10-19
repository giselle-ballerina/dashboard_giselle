'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"; // Update to correct paths
import { Input } from "@/components/ui/input"; // Fix imports for Input
import { Label } from "@/components/ui/label"; // Fix imports for Label
// Fix imports for Textarea
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useForm } from 'react-hook-form';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';

function offersPage() {
    const { register, handleSubmit, reset } = useForm();
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch existing offers
    useEffect(() => {
        async function fetchOffers() {
            try {
                const response = await axios.get('/api/offer');
                setOffers(response.data.offers);
            } catch (error) {
                console.error('Error fetching offers:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchOffers();
    }, []);

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            await axios.post('/api/offers', data);
            reset();
            alert('Offer added successfully');
            setOffers([...offers, data]); // Add the new offer to the list
        } catch (error) {
            console.error('Error adding offer:', error);
            alert('Error adding offer');
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Add New Offer</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <Label htmlFor="offerId">Offer ID</Label>
                    <Input id="offerId" {...register('offerId', { required: true })} />
                </div>

                <div>
                    <Label htmlFor="shopId">Shop ID</Label>
                    <Input id="shopId" {...register('shopId', { required: true })} />
                </div>

                <div>
                    <Label htmlFor="offerText">Offer Text</Label>
                    <Input id="offerText" {...register('offerText', { required: true })} />
                </div>

                <div>
                    <Label htmlFor="offerStartDate">Offer Start Date</Label>
                    <Input id="offerStartDate" type="date" {...register('offerStartDate', { required: true })} />
                </div>

                <div>
                    <Label htmlFor="offerEndDate">Offer End Date</Label>
                    <Input id="offerEndDate" type="date" {...register('offerEndDate', { required: true })} />
                </div>

                <div>
                    <Label htmlFor="offerDiscount">Offer Discount (%)</Label>
                    <Input id="offerDiscount" type="number" step="0.01" {...register('offerDiscount', { required: true })} />
                </div>

                <div>
                    <Label htmlFor="offerCode">Offer Code (Optional)</Label>
                    <Input id="offerCode" {...register('offerCode')} />
                </div>

                <div>
                    <Label htmlFor="offerStatus">Offer Status</Label>
                    <Input id="offerStatus" {...register('offerStatus')} />
                </div>

                <div>
                    <Label htmlFor="bannerImage">Banner Image URL (Optional)</Label>
                    <Input id="bannerImage" {...register('bannerImage')} />
                </div>

                <Button type="submit">Add Offer</Button>
            </form>

            <h2 className="text-2xl font-bold mt-10 mb-4">Existing Offers</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : offers.length > 0 ? (
                <ul className="space-y-4">
                    {offers.map((offer) => (
                        <li key={offer.offerId} className="border p-4 rounded-md">
                            <p><strong>Offer ID:</strong> {offer.offerId}</p>
                            <p><strong>Shop ID:</strong> {offer.shopId}</p>
                            <p><strong>Offer Text:</strong> {offer.offerText}</p>
                            <p><strong>Start Date:</strong> {offer.offerStartDate}</p>
                            <p><strong>End Date:</strong> {offer.offerEndDate}</p>
                            <p><strong>Discount:</strong> {offer.offerDiscount}%</p>
                            {offer.offerCode && <p><strong>Offer Code:</strong> {offer.offerCode}</p>}
                            {offer.offerStatus && <p><strong>Status:</strong> {offer.offerStatus}</p>}
                            {offer.bannerImage && <p><strong>Banner Image:</strong> <a href={offer.bannerImage} target="_blank" className="text-blue-500">View</a></p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No offers available.</p>
            )}
        </div>
    );
}

export default withPageAuthRequired(offersPage, {
    onRedirecting: () => <Loading />,
    onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
