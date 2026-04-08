/**
 * Types for Primary CSPs View
 */

export type CSPStatus = "active" | "pending" | "suspended";
export type SubscriptionTier = "starter" | "professional" | "enterprise";

export interface PrimaryCSP {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  jurisdiction: string;
  status: CSPStatus;
  kybStatus: "verified" | "pending" | "rejected";
  subscriptionTier: SubscriptionTier;
  monthlyRevenue: number;
  activeClients: number;
  joinDate: string;
}

export interface CSPFilters {
  search: string;
  status: CSPStatus | "all";
  kybStatus: "all" | "verified" | "pending" | "rejected";
  subscriptionTier: SubscriptionTier | "all";
}