import {ethers} from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();  // Loads environment variables from .env file

async function main() {
  // Get the contract factory to deploy the AssetBridge contract
  const AssetBridge = await ethers.getContractFactory('AssetBridge');

  console.log('Deploying AssetBridge...');

  // Deploy the contract (add any constructor arguments if required)
  const assetBridge = await AssetBridge.deploy();

  // Wait for the deployment to complete
  await assetBridge.deployed();

  // Log the contract address to verify successful deployment
  console.log('AssetBridge deployed to:', assetBridge.address);
}

// Main async function error handling
main().catch((error) => {
  console.error('Error in deployment:', error);
  process.exitCode = 1;
});

