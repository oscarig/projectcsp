import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing STRIPE_SECRET_KEY environment variable. Stripe payments will not work.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia', // Use the latest API version or the one installed
  appInfo: {
    name: 'Vetto Platform',
    version: '1.0.0',
  },
});
