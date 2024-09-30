import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { AssetBridge } from '../types/AssetBridge';
import { getAssetBridgeContract } from '../utils/ether';
import detectEthereumProvider from '@metamask/detect-provider';

interface EthereumContextProps {
  account: string;
  setAccount: (account: string) => void;
  contract: AssetBridge | null;
}

export const EthereumContext = createContext<EthereumContextProps>({
  account: '',
  setAccount: () => {},
  contract: null,
});

export const EthereumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string>('');
  const [contract, setContract] = useState<AssetBridge | null>(null);

  useEffect(() => {
    const initEthereum = async () => {
      const provider = await detectEthereumProvider();

      if (!provider) {
        console.error('Please install MetaMask!');
        return;
      }

      // Create an ethers provider
      const ethersProvider = new ethers.BrowserProvider(provider as any);

      // Request user accounts
      const accounts = await ethersProvider.send('eth_requestAccounts');
      if (accounts.length > 0) {
        const userAccount = accounts[0];
        setAccount(userAccount);

        // Get the contract with a signer
        const signer = await ethersProvider.getSigner();
        const assetBridgeContract = await getAssetBridgeContract(signer);
        setContract(assetBridgeContract);
      }
    };

    initEthereum();
  }, []);

  return (
    <EthereumContext.Provider value={{ account, setAccount, contract }}>
      {children}
    </EthereumContext.Provider>
  );
};

