import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../create-context';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// In production, these should be loaded from environment variables
const RAZORPAY_KEY_ID = 'rzp_test_T5lX5DVtNDEUmz';
const RAZORPAY_KEY_SECRET = 'BMg2nborqOX6cpnfMXbFW2Uv';

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export const paymentRouter = createTRPCRouter({
  createOrder: publicProcedure
    .input(z.object({
      amount: z.number(), // Amount in normal INR
      currency: z.string().default('INR'),
    }))
    .mutation(async ({ input }) => {
      try {
        const options = {
          amount: Math.round(input.amount * 100), // convert to paise
          currency: input.currency,
          receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        return { success: true, orderId: order.id, amount: order.amount };
      } catch (error: any) {
        console.error("Razorpay Create Order Error:", error);
        throw new Error(error.message || 'Failed to create Razorpay order');
      }
    }),

  verifyPayment: publicProcedure
    .input(z.object({
      razorpay_order_id: z.string(),
      razorpay_payment_id: z.string(),
      razorpay_signature: z.string(),
    }))
    .mutation(async ({ input }) => {
      const shasum = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
      shasum.update(`${input.razorpay_order_id}|${input.razorpay_payment_id}`);
      const digest = shasum.digest('hex');

      if (digest === input.razorpay_signature) {
        // Payment is legit
        return { success: true };
      } else {
        throw new Error('Invalid signature. Payment verification failed.');
      }
    }),
});
