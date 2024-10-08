// import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

// // Function to call your Ballerina backend and insert the user
// async function insertUserToDB(user) {
//     const { sub: userId, name, email } = user;

//     const response = await fetch('http://localhost:9091/user', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             userId,
//             name,
//             email,
//             phone: null,   // You can update this with actual phone data if available
//             address: null, // You can update this with actual address data if available
//             orders: [],
//             cart: [],
//             wishlist: [],
//             notifications: []
//         }),
//     });

//     if (!response.ok) {
//         console.error('Failed to insert user into the database');
//     }
// }

// // Custom callback with Auth0 redirection flow
// export const GET = handleAuth({
//     async callback(req, res) {
//         try {
//             console.log('Custom callback called');
//             const { user } = await handleCallback(req, res);

//             // Insert the user into the database
//             await insertUserToDB(user);

//             // Continue with Auth0's default redirect behavior
//             return handleCallback(req, res);
//         } catch (error) {
//             console.error('Error during authentication or user insertion:', error);
//             res.status(error.status || 500).end(error.message);
//         }
//     }
// });
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();