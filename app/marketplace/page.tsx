'use client';
import React, { useState } from 'react';
import styles from '../../styles/marketplace.module.css';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const Marketplace: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrade = async () => {
    setError(null); // Reset error state
    setLoading(true); // Set loading state

    // Detect Ethereum provider
    const provider = await detectEthereumProvider();

    if (!provider) {
      setError('Please install MetaMask!');
      setLoading(false);
      return;
    }

    // Create an ethers provider
    const ethersProvider = new ethers.BrowserProvider(provider as any);

    try {
      // Request user accounts
      const accounts = await ethersProvider.send('eth_requestAccounts');
      if (accounts.length === 0) {
        setError('No accounts found. Please log in to MetaMask.');
        return;
      }

      const userAddress = '0x3b0d49C96bCd586e3117B3647b9C7CbD22Ac9533'; // Replace with actual user address
      const recipientAddress = '0x7F513028Fc64a758CD96216d320b3dAa50791361'; // Replace with the recipient address
      const valueInEther = "0.1"; // Example Ether value

      // Convert Ether to Wei and then to a hex string
      const valueInWei = ethers.parseEther(valueInEther).toHexString(); // This will include the '0x' prefix

      // Convert 10 ETH to Wei
       // Ensure this line is included


      // Prepare the raw transaction
      const rawTx = {
        from: userAddress,
        to: recipientAddress,
        value: valueInWei, // This should now be correctly formatted
    };

      // Prepare the request body
      const body = {
        rawTx: {
          from: rawTx.from,
          to: rawTx.to,
          value: rawTx.value.toString(), // Convert value to string for serialization
        },
      };

      // Send the raw transaction to the API
      const response = await fetch('/api/bridge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Ensure the body is serializable
      });

      const data = await response.json();

      // Handle API response
      if (!response.ok) {
        throw new Error(data.error || 'Transaction failed');
      }

      // Show success message
      alert(`Asset bridged successfully! Transaction Hash: ${data.txHash}`);
    } catch (err: any) {
      // Log the error and update the error state
      console.error('Error during trade:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <section className={styles.marketplace}>
      <div className="container">
        <h2 className={styles.title}>Marketplace</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Decentraland Land</h3>
            <p>Value: 10 ETH</p>
            <button 
              className={styles.button} 
              onClick={handleTrade} 
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Trading...' : 'Trade'}
            </button>
            {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
