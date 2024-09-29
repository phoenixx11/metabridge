// scripts/scrollApi.ts

import axios, { AxiosResponse } from 'axios'; 

// Define the shape of the JSON-RPC response
interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result: string;
}

// Hardcoded Alchemy API key (replace with your actual API key)
const API_KEY: string = 'ew0W6Qt-DdC85_EPBgLeFpEtzcELieZE'; // <-- Put your actual API key here

// Check if API key exists
if (!API_KEY) {
  console.error('❌ ALCHEMY_API_KEY is not defined.');
  process.exit(1);
}

// Construct URL for the Alchemy API
const url: string = `https://scroll-sepolia.g.alchemy.com/v2/${API_KEY}`;

const payload = {
  jsonrpc: '2.0',
  id: 1,
  method: 'eth_blockNumber',
  params: []
};

// Async function to fetch the current block number
async function getCurrentBlockNumber(): Promise<void> {
  try {
    // Make a POST request to the JSON-RPC API
    const response: AxiosResponse<JsonRpcResponse> = await axios.post<JsonRpcResponse>(url, payload);

    // Check if response contains the block number result
    if (response.data && response.data.result) {
      const blockNumberHex: string = response.data.result;
      const blockNumber: number = parseInt(blockNumberHex, 16); // Convert hex to decimal

      // Log the block number in both hex and decimal formats
      console.log(`📦 Block Number (Hex): ${blockNumberHex}`);
      console.log(`📈 Block Number (Decimal): ${blockNumber}`);
    } else {
      console.error('❌ Invalid response structure:', response.data);
    }
  } catch (error) {
    console.error('❌ Error fetching block number:', error);
  }
}

// Execute the function
getCurrentBlockNumber();
