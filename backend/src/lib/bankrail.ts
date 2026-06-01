import crypto from 'crypto';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BANKRAIL_BASE_URL!;
const KEY_ID = process.env.BANKRAIL_KEY_ID!;
const SECRET = process.env.BANKRAIL_SECRET!;

function generateHmacHeaders(method: string, path: string, body: object): Record<string, string> {
  const timestamp = new Date().toISOString();
  const nonce = crypto.randomUUID();
  const bodyString = JSON.stringify(body);

  // hash the body
  const bodyHashHex = crypto.createHash('sha256').update(bodyString, 'utf8').digest('hex');

  // signed header names
  const signedHeaderNames = ['x-bankrail-key-id', 'x-bankrail-timestamp', 'x-bankrail-nonce', 'content-type'];

  // header values map
  const headerValues: Record<string, string> = {
    'x-bankrail-key-id': KEY_ID,
    'x-bankrail-timestamp': timestamp,
    'x-bankrail-nonce': nonce,
    'content-type': 'application/json',
  };

  // header lines: "name: value"
  const headerLines = signedHeaderNames.map(name => `${name}: ${headerValues[name]}`);

  // canonical string: METHOD\nPATH\nQUERY\nheader lines\nBODY_HASH
  const canonicalString = [
    method.toUpperCase(),
    path,
    '', // no query string
    ...headerLines,
    bodyHashHex,
  ].join('\n');

  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(canonicalString)
    .digest('hex');

  return {
    'Content-Type': 'application/json',
    'x-bankrail-key-id': KEY_ID,
    'x-bankrail-timestamp': timestamp,
    'x-bankrail-nonce': nonce,
    'x-bankrail-signed-headers': signedHeaderNames.join(','),
    'x-bankrail-signature': signature,
  };
}

export async function createPaymentIntent(payload: {
  reference: string;
  amountKobo: number;
  currency: string;
  callbackUrl: string;
  purposeTag: string;
  virtualAccountHolder: { name: string; phone: string; };
}) {
  const method = 'POST';
  const path = '/api/v1/bankrail/payment/intent';
  const headers = generateHmacHeaders(method, path, payload);

  console.log('Headers being sent:', JSON.stringify(headers, null, 2));

  const response = await axios.post(
    `${BASE_URL}${path}`,
    payload,
    { headers }
  );

  return response.data;
}