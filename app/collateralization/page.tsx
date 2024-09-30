'use client';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import styles from '../../styles/collateralization.module.css';
import AssetBridge from '../../contracts/scroll-guides/contract-deploy-demo/artifacts/contracts/AssetBridge.sol/AssetBridge.json'; // Import the ABI

const Collateralization = () => {
  const [assetId, setAssetId] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [error, setError] = useState('');

  // Update this line with your deployed contract address
  const contractAddress = "0x3b0d49C96bCd586e3117B3647b9C7CbD22Ac9533";

  const collateralizeAsset = async (e) => {
    e.preventDefault();

    // Check if the user has a wallet (like MetaMask) installed
    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return;
    }

    try {
      // Request the user's Ethereum account
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, AssetBridge.abi, signer);

      // Call the collateralizeAsset function
      const tx = await contract.collateralizeAsset(
        assetId,
        ethers.parseUnits(loanAmount, 18) // Ethers v6 uses parseUnits instead of utils.parseUnits
      );
      
      // Wait for the transaction to be mined
      await tx.wait();
      alert('Asset collateralized successfully!');
      setAssetId('');
      setLoanAmount('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className={styles.collateralization}>
      <div className="container">
        <h2 className={styles.title}>Asset Collateralization</h2>
        <form className={styles.form} onSubmit={collateralizeAsset}>
          <input 
            type="text" 
            placeholder="Enter Asset ID" 
            className={styles.input} 
            value={assetId} 
            onChange={(e) => setAssetId(e.target.value)} 
            required
          />
          <input 
            type="number" 
            placeholder="Loan Amount" 
            className={styles.input} 
            value={loanAmount} 
            onChange={(e) => setLoanAmount(e.target.value)} 
            required
          />
          {/* Apply the button class from the CSS module */}
          <button type="submit" className={styles.button}>Collateralize Now</button>
          {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
        </form>
      </div>
    </section>
  );
};

export default Collateralization;

