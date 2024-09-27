// /app/api/rent/route.ts
import { NextResponse } from 'next/server';
import { sendRawTransaction, getTransactionReceipt, estimateGas, getGasPrice, getLogs } from '../../../utils/scrollApiUtils';

/**
 * Handles renting out an asset.
 * Expects a POST request with `rawTx` in the body.
 */
export async function POST(request: Request) {
  try {
    const { rawTx } = await request.json();

    if (!rawTx) {
      return NextResponse.json({ error: 'Missing rawTx in request body' }, { status: 400 });
    }

    // Estimate gas for the transaction
    const gasEstimate = await estimateGas({ data: rawTx });

    // Optionally, get current gas price
    const gasPrice = await getGasPrice();

    // Send the raw transaction
    const txHash = await sendRawTransaction(rawTx);

    // Wait for the transaction receipt
    const receipt = await getTransactionReceipt(txHash);

    // Fetch related event logs (e.g., AssetRentalStarted)
    const filter = {
      fromBlock: receipt.blockNumber,
      toBlock: receipt.blockNumber,
      address: receipt.to, // Address of the AssetBridge contract
      topics: [
        ethers.utils.id('AssetRentalStarted(uint256,address,uint256)'), // Event signature
      ],
    };

    const logs = await getLogs(filter);

    return NextResponse.json({ message: 'Asset rented successfully', txHash, receipt, gasEstimate, gasPrice, logs });
  } catch (error: any) {
    console.error('Rent Asset Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
