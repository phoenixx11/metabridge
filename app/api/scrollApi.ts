// /app/api/scrollApi.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const SCROLL_API_URL = `https://scroll-mainnet.g.alchemy.com/v2/YOUR_API_KEY`;

export async function GET() {
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_blockNumber',
    params: [],
  };

  try {
    const response = await axios.post(SCROLL_API_URL, payload);
    return NextResponse.json({ blockNumber: response.data.result });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch block number' }, { status: 500 });
  }
}
