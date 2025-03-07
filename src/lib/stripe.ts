import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error('Missing Stripe public key');
}

export const stripePromise = loadStripe(stripePublicKey);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    });
    
    return { success: true, subscription };
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
} 