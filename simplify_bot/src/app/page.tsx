'use client'
import React from 'react';
import { useEffect, useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const createCollection = async () => {
      try {
        const response = await fetch('/api/example', {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to create collection');
        }

        const result = await response.json();
        setMessage(result.message);
      } catch (error) {
        console.error('Error:', error);
        setMessage('Error creating collection');
      }
    };

    createCollection();
  }, []); 

  return (
    <div>
      <h1>Create Collection and Insert Data</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;
