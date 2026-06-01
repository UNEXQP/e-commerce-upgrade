import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import checkoutRouter from './routes/checkout';
import webhookRouter from './routes/webhook';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://e-commerce-upgrade.vercel.app', // replace with your actual frontend URL
  ],
}));

app.use('/webhook', express.raw({ type: 'application/json' }), (req: any, _res, next) => {
  req.body = JSON.parse(req.body);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});
app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/checkout', checkoutRouter);
app.use('/webhook', webhookRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});