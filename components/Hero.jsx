import React, { useEffect, useState } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useSelector, useDispatch } from 'react-redux';

function ProfilePage() {
  const { user, isLoading } = useUser();
  const [shop, setShop] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwnerDetailsOpen, setOwnerDetailsOpen] = useState(false); // Collapsible for owner details
  const [isShopInsightsOpen, setShopInsightsOpen] = useState(false); // Collapsible for shop insights, default to open
  const dispatch = useDispatch();
  const { shopg, loadingg, errorg } = useSelector((state) => state);

  useEffect(() => {
    const fetchShop = async () => {
      if (user) {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const response = await fetch(`/api/shop/${user.sub}`, {
            method: 'GET',
          });
          const result = await response.json();
          dispatch({ type: 'SET_SHOP', payload: result });
          if (result.shopName) {
            setShop(result);
          } else {
            setError('No shop found for this user.');
            window.location.href = '/profile';
          }
        } catch (error) {
          setError('Error fetching shop data.');
          dispatch({ type: 'SET_ERROR', payload: 'Error fetching shop data' });
        } finally {
          setLoading(false);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };

    if (user) {
      fetchShop();
    } else {
      setLoading(false);
    }
  }, [user, dispatch]);

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your shop.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Hardcoded insights
  const hardcodedInsights = {
    totalViews: 1200,
    totalLikes: 350,
    totalShares: 50,
    totalOrders: 200,
    totalRevenue: 8500,
    totalProducts: 45,
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: shop?.color?.secondary || '#f0f0f0',
        opacity: 0.9 // Apply secondary color as background
      }} // Set background color
    >
      {shop && (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl"
        style={{
          borderColor: shop.color.primary, // Apply primary color for borders or accents
        }}>
          <div className="flex items-center space-x-4">
            {/* Shop Logo */}
            <div className="w-32 h-32">
              <img
                src={shop.logo}
                alt={`${shop.shopName} logo`}
                className="w-full object-cover border"
                
              />
            </div>

            {/* Shop Information */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold "
                style={{
                  color: shop.color.primary, // Use primary color for text
                }}>{shop.shopName}</h1>
              <p className="text-lg text-gray-600 mt-2">{shop.description}</p>
            </div>
          </div>

          {/* Collapsible Owner Information */}
          <div className="mt-8">
            <h2
              className="text-2xl font-semibold cursor-pointer flex items-center justify-between"
              onClick={() => setOwnerDetailsOpen(!isOwnerDetailsOpen)}
            >
              Owner Details
              <span>{isOwnerDetailsOpen ? '▲' : '▼'}</span> {/* Toggle arrow */}
            </h2>

            {isOwnerDetailsOpen && (
              <div className="mt-3 grid grid-cols-2 gap-6">
                <div className=" p-2 rounded-lg">
                  <p className="font-bold text-gray-700">Name</p>
                  <p className="text-gray-600">{shop.owner.name}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <p className="font-bold text-gray-700">Email</p>
                  <p className="text-gray-600">{shop.owner.email}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <p className="font-bold text-gray-700">Phone</p>
                  <p className="text-gray-600">{shop.owner.phone}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <p className="font-bold text-gray-700">Address</p>
                  <p className="text-gray-600">{shop.owner.address}</p>
                </div>
              </div>
            )}
          </div>

          {/* Collapsible Shop Insights */}
          <div className="mt-8">
            <h2
              className="text-2xl font-semibold cursor-pointer flex items-center justify-between"
              onClick={() => setShopInsightsOpen(!isShopInsightsOpen)}
            >
              Shop Insights
              <span>{isShopInsightsOpen ? '▲' : '▼'}</span> {/* Toggle arrow */}
            </h2>

            {isShopInsightsOpen && (
              <div className="mt-2 grid grid-cols-2 gap-6">
                {/* Display hardcoded insights beautifully */}
                <div className="bg-gray-100 p-2 rounded-lg ">
                  <p className="font-bold text-gray-700">Total Views</p>
                  <p className="text-gray-600">{hardcodedInsights.totalViews}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg ">
                  <p className="font-bold text-gray-700">Total Likes</p>
                  <p className="text-gray-600">{hardcodedInsights.totalLikes}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg ">
                  <p className="font-bold text-gray-700">Total Shares</p>
                  <p className="text-gray-600">{hardcodedInsights.totalShares}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg ">
                  <p className="font-bold text-gray-700">Total Orders</p>
                  <p className="text-gray-600">{hardcodedInsights.totalOrders}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg ">
                  <p className="font-bold text-gray-700">Total Revenue</p>
                  <p className="text-gray-600">${hardcodedInsights.totalRevenue}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg ">
                  <p className="font-bold text-gray-700">Total Products</p>
                  <p className="text-gray-600">{hardcodedInsights.totalProducts}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default withPageAuthRequired(ProfilePage);
