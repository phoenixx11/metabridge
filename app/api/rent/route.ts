// /app/api/rent/route.ts
import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { sendRawTransaction, getTransactionReceipt, estimateGas, getGasPrice } from '../../../utils/scrollApiUtils';

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

    return NextResponse.json({ message: 'Asset rented successfully', txHash, receipt, gasEstimate, gasPrice });
  } catch (error: any) {
    console.error('Rent Asset Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
