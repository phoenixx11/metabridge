import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import * as dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    scrollSepolia: {
      url: process.env.SCROLL_SEPOLIA_URL || 'https://sepolia-rpc.scroll.io',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: process.env.SCROLL_API_KEY || '<YOUR_API_KEY>',
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534352,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
    ],
  },
};

export default config;


