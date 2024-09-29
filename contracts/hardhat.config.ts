import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'dotenv/config';
import '@openzeppelin/hardhat-upgrades';


// Hardcoded keys
const PRIVATE_KEY = '0xbd11757a1dda972b7c67f1b1573a0a403f7b1ca8f119ffbf1d96aa7885b4910f';
const SCROLLSCAN_API_KEY = 'SUDPPG2QG728W2G2TWKVBJEFD4GWMQG5VW';
const ALCHEMY_API_KEY = 'ew0W6Qt-DdC85_EPBgLeFpEtzcELieZE';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    scrollSepolia: {
      url: `https://scroll-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY], // Hardcoded private key
    },
    // Optional: If using Alchemy as a provider
    // scrollSepoliaAlchemy: {
    //   url: `https://scroll-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [PRIVATE_KEY],
    // },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: SCROLLSCAN_API_KEY, // Hardcoded ScrollScan API key
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  mocha: {
    timeout: 20000,
  },
};

export default config;
