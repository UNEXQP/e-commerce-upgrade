
import express from "express"
import crypto from "crypto"

const KEY_ID = '1e261c40c70d2583a489cf149d83702a';
const SECRET = '010c597f8d1ddaf1831cecfcfa2188f642f359fb4083dffaa8aa4b76add240da';

const method = 'POST';
const path = "/api/v1/bankrail/sandbox/simulate-credit";// change per request
const body = JSON.stringify({
  virtualAccount: "9977953287",
  amountKobo: 100000,
  narration: "Sandbox test credit",
  originator: {
    name: "Sandbox Test Sender",
    accountNumber: "0123456789",
    bankCode: "058"
  }
});// change per request, or set to '' for GET

const timestamp = new Date().toISOString();
const nonce = crypto.randomUUID();
const bodyHash = crypto.createHash('sha256').update(body, 'utf8').digest('hex');

const signedHeaders = ['x-bankrail-key-id', 'x-bankrail-timestamp', 'x-bankrail-nonce'];
if (body.length > 0) signedHeaders.push('content-type');

const headerLines = signedHeaders.map(h => {
  const vals: Record<string, string> = {
    'x-bankrail-key-id': KEY_ID,
    'x-bankrail-timestamp': timestamp,
    'x-bankrail-nonce': nonce,
    'content-type': 'application/json',
  };
  return `${h}: ${vals[h]}`;
});

const canonical = `${method}\n${path}\n\n${headerLines.join('\n')}\n${bodyHash}`;
const signature = crypto.createHmac('sha256', SECRET).update(canonical).digest('hex');

console.log('\n--- Paste these headers into Thunder Client ---');
console.log(`X-Bankrail-Key-Id:         ${KEY_ID}`);
console.log(`X-Bankrail-Timestamp:      ${timestamp}`);
console.log(`X-Bankrail-Nonce:          ${nonce}`);
console.log(`X-Bankrail-Signed-Headers: ${signedHeaders.join(',')}`);
console.log(`X-Bankrail-Signature:      ${signature}`);
console.log('\n--- Request body to paste ---');
console.log(body);