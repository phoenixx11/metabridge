'use client';

import React, { useEffect, useState } from 'react';

const BlockNumber = () => {
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlockNumber = async () => {
      try {
        const response = await fetch('/api/scrollApi');
        const data = await response.json();

        if (response.ok) {
          setBlockNumber(data.blockNumber);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Error fetching block number');
      }
    };

    fetchBlockNumber();
  }, []);

  return (
    <div>
      <h2>Latest Scroll Sepolia Block Number</h2>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : blockNumber !== null ? (
        <p>Block Number: {blockNumber}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlockNumber;
