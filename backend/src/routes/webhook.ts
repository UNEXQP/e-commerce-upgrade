import { Router, Request, Response } from 'express';
import crypto from 'crypto';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const signatureHeader = req.headers['x-bankrail-signature'] as string | undefined;

  // if no signature header, bankrail hasn't provisioned a callback-signing
  // credential yet (sandbox default) — accept but log
  if (!signatureHeader) {
    console.log('Webhook received (no signature — sandbox mode)');
    handleEvent(req.body);
    res.status(200).json({ received: true });
    return;
  }

  // signature format is "v1=<hex>"
  const receivedHex = signatureHeader.replace('v1=', '');

  // canonical string: v1\ndelivery-id\nattempt\nfirst-attempt-at\nsha256(body)
  const rawBody = JSON.stringify(req.body);
  const bodyHashHex = crypto.createHash('sha256').update(rawBody, 'utf8').digest('hex');

  const originalDeliveryId = req.headers['x-bankrail-original-delivery-id'] as string;
  const deliveryAttempt = req.headers['x-bankrail-delivery-attempt'] as string;
  const firstAttemptAt = req.headers['x-bankrail-first-attempt-at'] as string;

  const canonical = [
    'v1',
    originalDeliveryId,
    deliveryAttempt,
    firstAttemptAt,
    bodyHashHex,
  ].join('\n');

  const expectedHex = crypto
    .createHmac('sha256', process.env.BANKRAIL_CALLBACK_SECRET!)
    .update(canonical)
    .digest('hex');

  // constant-time comparison to prevent timing attacks
  const received = Buffer.from(receivedHex, 'hex');
  const expected = Buffer.from(expectedHex, 'hex');

  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) {
    console.warn('Webhook signature mismatch — rejected');
    res.status(401).json({ error: 'Invalid signature' });
    return;
  }

  // idempotency — log the delivery ID so you can dedup in DB later
  console.log(`Webhook delivery: ${originalDeliveryId} attempt ${deliveryAttempt}`);

  handleEvent(req.body);
  res.status(200).json({ received: true });
});

function handleEvent(body: any) {
  console.log(`Payment confirmed:
    reference:      ${body.reference}
    amount:         ₦${(body.amountKobo / 100).toLocaleString()}
    virtualAccount: ${body.virtualAccount}
    provider:       ${body.provider}
    confirmedAt:    ${body.confirmedAt}
  `);
  // TODO: update order status in DB using body.reference
}

export default router;