/**
 * Types for Partners View
 */

export type PartnerStatus = "active" | "pending" | "suspended";
export type KYCStatus = "verified" | "pending" | "rejected";
export type SubscriptionTier = "basic" | "premium" | "enterprise";

export interface Partner {
  id: string;
  name: string;
  email: string;
  status: PartnerStatus;
  kycStatus: KYCStatus;
  subscriptionTier: SubscriptionTier;
  monthlyRevenue: number;
  activeEngagements: number;
  joinDate: string;
}

export interface PartnerFilters {
  search: string;
  status: PartnerStatus | "all";
  kycStatus: KYCStatus | "all";
  subscriptionTier: SubscriptionTier | "all";
}