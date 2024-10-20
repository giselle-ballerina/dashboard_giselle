'use client';

import React, { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector, useDispatch } from 'react-redux';

export default withPageAuthRequired(function CSRPage() {
  const { shopg } = useSelector(state => state); // Get shopg from the Redux store
  const [purchases, setPurchases] = useState([]); // State to store purchases
  
  // Fetch purchases when the component mounts
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        if (shopg && shopg.shopId) { // Ensure shopID is available
          const response = await fetch(`/api/purchase`, {
            method: 'POST', // POST method
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shopID: shopg.shopId }), // Send shopID in request body
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch purchases');
          }
          
          const data = await response.json();
          setPurchases(data); // Update state with fetched purchases
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };
    
    fetchPurchases();
  }, [shopg]);

  return (
    <Table>
      <TableCaption>A list of your recent purchases.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Purchase ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Delivery Status</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Purchase Date</TableHead>
          <TableHead className="text-right">Amount Rs.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.length > 0 ? (
          purchases.map((purchase) => (
            <TableRow key={purchase.purchaseId}>
              <TableCell className="font-medium">{purchase.purchaseId}</TableCell>
              <TableCell className={purchase.paymentStatus === 'Pending' ? 'text-red-500' : 'text-green-500'}>{purchase.paymentStatus}</TableCell>
              <TableCell>{purchase.deliveryStatus}</TableCell>
              <TableCell>{purchase.paymentMethod}</TableCell>
              <TableCell>{new Date(purchase.purchaseDate).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">{`${purchase.totalAmount.toFixed(2)}`}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">No purchases found.</TableCell>
          </TableRow>
        )}
      </TableBody>
      {purchases.length > 0 && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {`${purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0).toFixed(2)}`}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
});
