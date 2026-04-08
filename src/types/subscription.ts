import type { ProviderSubscriptionTier } from "./user";

// Subscription & Billing
export interface Subscription {
  id: string;
  providerId: string;
  tier: ProviderSubscriptionTier;
  status: "active" | "past_due" | "canceled" | "trialing";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd?: string;
  monthlyPrice: number;
  currency: string;
}

export interface Invoice {
  id: string;
  providerId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: "draft" | "open" | "paid" | "void" | "uncollectible";
  invoiceDate: string;
  dueDate: string;
  paidAt?: string;
  invoiceUrl?: string;
}