import Stripe from 'stripe';

let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeSingleton) return stripeSingleton;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('Stripe secret key not configured (STRIPE_SECRET_KEY).');
  }
  stripeSingleton = new Stripe(key, { apiVersion: '2025-06-30.basil' });
  return stripeSingleton;
}

export function safeHasStripe(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
