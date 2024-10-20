'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useForm } from 'react-hook-form';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';
import { useSelector } from 'react-redux';

function OffersPage() {
    const { shopg } = useSelector(state => state); 
    const { register, handleSubmit, reset } = useForm();
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [expandedOfferId, setExpandedOfferId] = useState(null); // To track expanded offer

    // Fetch existing offers
    useEffect(() => {
        async function fetchOffers() {
            if (shopg && shopg.shopId) { // Ensure shopId is available
                try {
                    const response = await axios.post('/api/offer', { shopID: shopg.shopId });
                    setOffers(response.data); // Assuming the data structure matches
                } catch (error) {
                    console.error('Error fetching offers:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchOffers();
    }, [shopg]);

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

    // Toggle the visibility of the collapsible content for an offer
    const toggleOffer = (offerId) => {
        if (expandedOfferId === offerId) {
            setExpandedOfferId(null); // Collapse if already expanded
        } else {
            setExpandedOfferId(offerId); // Expand selected offer
        }
    };

    const Form = () => {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">Add New Offer</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Form Fields */}
                    <div>
                        <Label htmlFor="offerId">Offer ID</Label>
                        <Input id="offerId" {...register('offerId', { required: true })} />
                    </div>
                    <div>
                        <Label htmlFor="shopId">Shop ID</Label>
                        <Input id="shopId" value={shopg.shopId} readOnly />
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
            </div>
        );
    };

    return (
        <div className="container mx-auto p-8">
            <Button onClick={() => setShowForm(!showForm)} variant="secondary" className="text-gray-100">
                {showForm ? 'Hide Form' : 'Add New Offer'}
            </Button>

            {showForm && <Form />}

            <h2 className="text-2xl font-bold mt-10 mb-4">Existing Offers</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : offers.length > 0 ? (
                <ul className="space-y-4">
                    {offers.map((offer) => (
                        <li key={offer.offerId} className="border p-4 rounded-md">
                            <button
                                className="w-full text-left"
                                onClick={() => toggleOffer(offer.offerId)}
                            >
                                <p className="font-bold">{offer.offerText}</p>
                                <p className="text-gray-600">Shop ID: {offer.shopId}</p>
                                <p className="text-gray-600">Discount: {offer.offerDiscount}%</p>
                            </button>
                            {expandedOfferId === offer.offerId && (
                                <div className="mt-4">
                                    <p><strong>Offer ID:</strong> {offer.offerId}</p>
                                    <p><strong>Start Date:</strong> {offer.offerStartDate}</p>
                                    <p><strong>End Date:</strong> {offer.offerEndDate}</p>
                                    {offer.offerCode && <p><strong>Offer Code:</strong> {offer.offerCode}</p>}
                                    {offer.offerStatus && <p><strong>Status:</strong> {offer.offerStatus}</p>}
                                    {offer.bannerImage && (
                                        <p>
                                            <strong>Banner Image:</strong> 
                                            <a href={offer.bannerImage} target="_blank" className="text-blue-500">View</a>
                                        </p>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No offers available.</p>
            )}
        </div>
    );
}

export default withPageAuthRequired(OffersPage, {
    onRedirecting: () => <Loading />,
    onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
