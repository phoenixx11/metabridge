// /utils/scrollApiUtils.ts
import axios from 'axios';

// Scroll Sepolia RPC URL (Replace with your actual API key)
const SCROLL_API_URL = 'https://scroll-sepolia.g.alchemy.com/v2/ew0W6Qt-DdC85_EPBgLeFpEtzcELieZE';

/**
 * Makes a JSON-RPC request to the Scroll Chain.
 * @param method - The JSON-RPC method to call.
 * @param params - The parameters for the method.
 * @returns The result of the JSON-RPC call.
 */
const scrollRpcRequest = async (method: string, params: any[] = []): Promise<any> => {
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  };

  try {
    const response = await axios.post(SCROLL_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error: any) {
    console.error(`Error in ${method}:`, error.message);
    throw new Error(`Scroll RPC Error: ${error.message}`);
  }
};

/**
 * Sends a raw transaction to the Scroll Chain.
 * @param rawTx - The signed raw transaction data.
 * @returns The transaction hash.
 */
export const sendRawTransaction = async (rawTx: string): Promise<string> => {
  return await scrollRpcRequest('eth_sendRawTransaction', [rawTx]);
};

/**
 * Retrieves the transaction receipt for a given transaction hash.
 * @param txHash - The transaction hash.
 * @returns The transaction receipt.
 */
export const getTransactionReceipt = async (txHash: string): Promise<any> => {
  return await scrollRpcRequest('eth_getTransactionReceipt', [txHash]);
};

/**
 * Estimates the gas required for a transaction.
 * @param txObject - The transaction object.
 * @returns The estimated gas as a hexadecimal string.
 */
export const estimateGas = async (txObject: object): Promise<string> => {
  return await scrollRpcRequest('eth_estimateGas', [txObject]);
};

/**
 * Retrieves the current gas price from the network.
 * @returns The gas price as a hexadecimal string.
 */
export const getGasPrice = async (): Promise<string> => {
  return await scrollRpcRequest('eth_gasPrice');
};

/**
 * Retrieves the latest block number from the network.
 * @returns The latest block number as a hexadecimal string.
 */
export const getLatestBlockNumber = async (): Promise<string> => {
  return await scrollRpcRequest('eth_blockNumber');
};

/**
 * Retrieves logs based on a given filter.
 * @param filter - The filter object for logs.
 * @returns An array of log objects.
 */
export const getLogs = async (filter: object): Promise<any[]> => {
  return await scrollRpcRequest('eth_getLogs', [filter]);
};
