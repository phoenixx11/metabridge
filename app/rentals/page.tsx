'use client';

import React, { useState } from 'react';
import { ethers, Contract } from 'ethers';
import styles from '../../styles/rentals.module.css';
import AssetBridgeABI from '../../contracts/scroll-guides/contract-deploy-demo/artifacts/contracts/AssetBridge.sol/AssetBridge.json'; // Update the path to your ABI file

const Rentals: React.FC = () => {
  const [rentalAmount, setRentalAmount] = useState<string>(''); // Rental amount in ETH
  const [assetId, setAssetId] = useState<string>(''); // Asset ID to rent or withdraw
  const [signer, setSigner] = useState<ethers.Signer | null>(null); // Signer state to interact with the contract

  const contractAddress = '0xYourDeployedContractAddress'; // Replace with your deployed contract address

  // Function to connect to Metamask and get the signer
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request accounts from Metamask
      const signer = await provider.getSigner(); // Get the signer from the provider
      setSigner(signer);
    } else {
      alert("Please install Metamask to use this feature!");
    }
  };

  // Function to handle renting an asset
  const handleRent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert rental amount to Wei (smallest unit of Ether)
    const amountInWei = ethers.parseUnits(rentalAmount, 'ether');

    if (!signer) {
      await connectWallet(); // Connect to wallet if not already connected
    }

    // Create a contract instance
    const contract: Contract = new ethers.Contract(contractAddress, AssetBridgeABI, signer!);

    try {
      // Interact with the smart contract's rentAsset function
      const tx = await contract.rentAsset(assetId, amountInWei, {
        value: amountInWei, // Send ETH as the rental amount
      });
      await tx.wait(); // Wait for the transaction to be mined

      alert('Asset rented successfully!');
    } catch (error) {
      console.error('Error renting asset:', error);
      alert('Failed to rent asset');
    }
  };

  // Function to handle withdrawing an asset
  const handleWithdraw = async () => {
    if (!signer) {
      await connectWallet(); // Connect to wallet if not already connected
    }

    // Create a contract instance
    const contract: Contract = new ethers.Contract(contractAddress, AssetBridgeABI, signer!);

    try {
      // Interact with the smart contract's withdrawAsset function
      const tx = await contract.withdrawAsset(assetId);
      await tx.wait(); // Wait for the transaction to be mined

      alert('Asset withdrawn successfully!');
    } catch (error) {
      console.error('Error withdrawing asset:', error);
      alert('Failed to withdraw asset');
    }
  };

  return (
    <section className={styles.rentals}>
      <div className="container">
        <h2 className={styles.title}>Cross-Metaverse Rentals</h2>
        <div className={styles.grid}>
          {/* Card 1 - Virtual Art Gallery */}
          <div className={styles.card}>
            <h3>Virtual Art Gallery</h3>
            <p>Rent for: 2 ETH / day</p>
            <form onSubmit={handleRent}>
              <input
                type="text"
                placeholder="Rental Amount (in ETH)"
                value={rentalAmount}
                onChange={(e) => setRentalAmount(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Asset ID"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                required
              />
              <button type="submit" className={styles.button}>Rent Now</button>
            </form>
          </div>

          {/* Card 2 - Decentraland Land */}
          <div className={styles.card}>
            <h3>Decentraland Land</h3>
            <p>Rent for: 5 ETH / week</p>
            <form onSubmit={handleRent}>
              <input
                type="text"
                placeholder="Rental Amount (in ETH)"
                value={rentalAmount}
                onChange={(e) => setRentalAmount(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Asset ID"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                required
              />
              <button type="submit" className={styles.button}>Rent Now</button>
            </form>
          </div>

          {/* Withdraw Button */}
          <button onClick={handleWithdraw} className={styles.button}>Withdraw Asset</button>
        </div>
      </div>
    </section>
  );
};

export default Rentals;
