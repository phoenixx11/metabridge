// /app/api/scrollApi/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const SCROLL_API_KEY = process.env.SCROLL_API_KEY; // Ensure this is set in .env.local
const SCROLL_API_URL = `https://scroll-sepolia.g.alchemy.com/v2/${SCROLL_API_KEY}`;

export async function GET() {
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_blockNumber',
    params: [],
  };

  try {
    const response = await axios.post(SCROLL_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Convert hexadecimal block number to decimal for readability
    const blockNumberHex = response.data.result;
    const blockNumber = parseInt(blockNumberHex, 16);

    return NextResponse.json({ blockNumber });
  } catch (error) {
    console.error('Error fetching block number:', error);
    return NextResponse.json(
      { error: 'Failed to fetch block number' },
      { status: 500 }
    );
  }
}
