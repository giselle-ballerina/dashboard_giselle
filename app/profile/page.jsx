'use client';

import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { useState } from 'react';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';
import { ProfileForm } from './form';
import { UserD } from './test';
function Profile() {
  const { user, isLoading } = useUser();
  const [jwtToken, setJwtToken] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch the token from the API route
  const handleGetToken = async () => {
    try {
      const response = await fetch('/api/token', {
        method: 'GET', // Explicitly specify the method as GET
        headers: {
          'Content-Type': 'application/json', // Optional, usually not needed for GET
        },
      }); // Call the API route
      if (!response.ok) {
        throw new Error('Failed to fetch the access token');
      }
      const data = await response.json();
      setJwtToken(data.accessToken);
      console.log(data.accessToken); // Log the token to the console
      const res = await fetch('http://localhost:9090/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}` // Include the JWT token
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
      console.log(result.data.user);
      console.log(data.accessToken); // Log the token to the console
    } catch (error) {
      console.error('Error fetching the access token:', error);
      setError(error.message);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Row className="align-items-center profile-header mb-5 text-center text-md-left" data-testid="profile">
            <Col md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                decode="async"
                data-testid="profile-picture"
              />
            </Col>
            <Col md>
              <h2 data-testid="profile-name">{user.name}</h2>
              <p className="lead text-muted" data-testid="profile-email">
                {user.email}
              </p>
            </Col>
          </Row>
          {/* <Row data-testid="profile-json">
            <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
          </Row> */}
          {/* <UserD userId={user.sub} /> */}
          <ProfileForm />
          <button color="primary" onClick={handleGetToken} className="mt-3">
            Print JWT Token
          </button>

          {/* Display the token on the screen if fetched */}
          {jwtToken && (
            <Row className="mt-3">
              <Col>
                <h5>JWT Token:</h5>
                <pre>{jwtToken}</pre>
              </Col>
            </Row>
          )}

          {/* Display error if any */}
          {error && (
            <Row className="mt-3">
              <Col>
                <p className="text-danger">{error}</p>
              </Col>
            </Row>
          )}

        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
