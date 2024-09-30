// components/ConnectWallet.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/connectWallet.module.css';

interface ConnectWalletProps {
  onAccountChange: (account: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onAccountChange }) => {
  const [account, setAccount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      setError('MetaMask is not installed. Please install it to use this DApp.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      onAccountChange(accounts[0]);
      setError('');
    } catch (err) {
      setError('Failed to connect wallet.');
      console.error(err);
    }
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        onAccountChange(accounts[0]);
      } else {
        setAccount('');
        onAccountChange('');
      }
    };

    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if ((window as any).ethereum) {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [onAccountChange]);

  return (
    <div className={styles.connectWallet}>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet} className={styles.button}>
          Connect Wallet
        </button>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ConnectWallet;