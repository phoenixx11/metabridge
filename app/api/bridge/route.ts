// /app/api/bridge/route.ts
import { NextResponse } from 'next/server';
import { sendRawTransaction, getTransactionReceipt, estimateGas, getGasPrice } from '../../../utils/scrollApiUtils';

/**
 * Handles the bridging of an asset from the metaverse to the real world.
 * Expects a POST request with `rawTx` in the body.
 */
export async function POST(request: Request) {
  try {
    const { rawTx } = await request.json();

    if (!rawTx) {
      return NextResponse.json({ error: 'Missing rawTx in request body' }, { status: 400 });
    }

    // Estimate gas for the transaction
    const gasEstimate = await estimateGas(rawTx);
    
    // Convert gasEstimate to string if it’s a BigInt
    const gasEstimateString = gasEstimate.toString(); 

    // Optionally, get current gas price
    const gasPrice = await getGasPrice();
    
    // Convert gasPrice to string if it’s a BigInt
    const gasPriceString = gasPrice.toString(); 

    // Send the raw transaction
    const txHash = await sendRawTransaction(rawTx);

    // Wait for the transaction receipt
    const receipt = await getTransactionReceipt(txHash);

    return NextResponse.json({ 
      message: 'Asset bridged successfully', 
      txHash: txHash.toString(), // Ensure txHash is a string
      receipt, // Ensure receipt doesn't have BigInt values or convert them
      gasEstimate: gasEstimateString, 
      gasPrice: gasPriceString 
    });
  } catch (error: any) {
    console.error('Bridge Asset Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
