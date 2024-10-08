import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';

export function UserD() {
    const { user, error, isLoading } = useUser();
    const [singleUser, setSingleUser] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            console.log("hi")
            if (user) {
                try {
                    const { accessToken } = await getAccessToken();
                    console.log(accessToken);
                    // Fetch the JWT token
                    const res = await fetch('/api/token', {
                        method: 'GET', // Explicitly specify the method as GET
                        headers: {
                            'Content-Type': 'application/json', // Optional, usually not needed for GET
                        },
                    });  // API to get the user token
                    const data = await res.json();

                    const token = data?.idToken; // Extract token
                    console.log(data);
                    setToken(token);
                    // Use token to fetch single user data
                    const response = await fetch('http://localhost:9090/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}` // Include the JWT token
                        },
                        body: JSON.stringify({
                            query: `{
                user(userId: "${user.sub}") {
                  id
                  name
                  email
                }
              }`
                        })
                    });

                    const result = await response.json();
                    setSingleUser(result.data.user);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchUser();
    }, [user]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>{token}</h1>
            <h1>User Profile</h1>
            {singleUser && (
                <ul>
                    <li>ID: {singleUser.id}</li>
                    <li>Name: {singleUser.name}</li>
                    <li>Email: {singleUser.email}</li>
                </ul>
            )}
        </div>
    );
}


