import { Router, Request, Response } from 'express';
import { createPaymentIntent } from '../lib/bankrail';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { orderId, amountKobo, customerName, customerPhone } = req.body;

  if (!orderId || !amountKobo || !customerName || !customerPhone) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const intent = await createPaymentIntent({
      reference: `order_${orderId}_${Date.now()}`,
      amountKobo,
      currency: 'NGN',
      callbackUrl: `${process.env.BACKEND_URL}/webhook`,
      purposeTag: 'ecommerce_checkout',
      virtualAccountHolder: {
        name: customerName.slice(0, 30), // hard 30 char limit
        phone: customerPhone,
      },
    });

    res.status(200).json({
      success: true,
      virtualAccount: intent.virtualAccount,
      virtualAccountName: intent.virtualAccountName,
      bankName: intent.bankName,
      amountKobo,
      reference: intent.reference,
      trackingId: intent.trackingId,
    });
  } catch (error: any) {
    console.error('Payment intent error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

export default router;