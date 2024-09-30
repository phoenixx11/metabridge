// utils/ether.ts
import { ethers } from 'ethers';

// Define your contract ABI here
const abi = [
  // Your contract's ABI goes here. Example:
  "function yourFunctionName(uint256 value) external returns (bool)",
  // More functions...
];

const contractAddress = "0x3b0d49C96bCd586e3117B3647b9C7CbD22Ac9533"; // Replace with your contract address

export const getAssetBridgeContract = async (signer: ethers.BrowserProvider) => {
  if (!Array.isArray(abi)) {
    throw new Error('ABI is not an array');
  }

  return new ethers.Contract(contractAddress, abi, signer);
};
