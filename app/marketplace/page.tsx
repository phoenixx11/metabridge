'use client';
import React, { useState } from 'react';
import styles from '../../styles/marketplace.module.css';
import { BrowserProvider, parseEther } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const Marketplace: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrade = async () => {
    setError(null); // Reset error state
    setLoading(true); // Set loading state

    try {
      // Detect Ethereum provider (MetaMask)
      const provider = await detectEthereumProvider();

      if (!provider) {
        throw new Error('Please install MetaMask!');
      }

      // Create ethers provider to interact with MetaMask
      const ethersProvider = new BrowserProvider(provider as any);

      // Request user accounts (MetaMask)
      const accounts = await ethersProvider.send('eth_requestAccounts', []);
      const userAddress = accounts[0]; // Get the user's address from MetaMask

      if (!userAddress) {
        throw new Error('No accounts found. Please log in to MetaMask.');
      }

      // Set recipient address (where Ether will be sent)
      const recipientAddress = '0x7F513028Fc64a758CD96216d320b3dAa50791361'; // Replace this with your recipient address
      const valueInEther = '0.1'; // The Ether value to send

      // Convert Ether to Wei for the transaction
      const valueInWei = parseEther(valueInEther); // Convert Ether to Wei

      // Get the signer (the account sending the transaction)
      const signer = await ethersProvider.getSigner();

      // Fetch gas price using the provider
      const feeData = await ethersProvider.getFeeData(); // Get fee data including gas price
      const gasPrice = feeData.gasPrice; // This is now a BigInt in ethers.js v6

      // Check if gasPrice exists (it might not be available in some networks)
      if (!gasPrice) {
        throw new Error('Gas price not available');
      }

      // Prepare the raw transaction object
      const rawTx = {
        from: userAddress,
        to: recipientAddress,
        value: valueInWei, // Ether amount in Wei as a BigNumber
        gasLimit: BigInt(21000), // Pass gasLimit as BigInt
        gasPrice: gasPrice, // Current gas price fetched from the provider
      };

      // Prepare the request body for backend API call
      const body = {
        rawTx: {
          from: rawTx.from,
          to: rawTx.to,
          value: `0x${rawTx.value.toString(16)}`, // Ensure value has the 0x prefix
          gasLimit: `0x${rawTx.gasLimit.toString(16)}`, // Ensure gasLimit has the 0x prefix
          gasPrice: `0x${rawTx.gasPrice.toString(16)}`, // Ensure gasPrice has the 0x prefix
        },
      };

      // Send the raw transaction to your backend API
      const response = await fetch('/api/bridge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Send the transaction data to backend
      });

      // Parse response from the backend
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Transaction failed');
      }

      // Transaction was successful
      alert(`Asset bridged successfully! Transaction Hash: ${data.txHash}`);
    } catch (err: any) {
      // If any error occurs during trade, show the error message
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
            {/* Display error message if any */}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;









