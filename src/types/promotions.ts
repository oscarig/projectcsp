export type PromotionType = "percentage" | "fixed";
export type PromotionAppliesTo = "primary_csp" | "partner" | "promoted_listing" | "all";
export type PromotionStatus = "active" | "expired" | "disabled";

export interface Promotion {
  id: string;
  code: string;
  description: string;
  type: PromotionType;
  amount: number;
  appliesTo: PromotionAppliesTo;
  validUntil: string | "ongoing";
  usageCount: number;
  usageLimit?: number;
  status: PromotionStatus;
}

export interface PromotionFormData {
  code: string;
  description: string;
  type: PromotionType;
  amount: string;
  appliesTo: string;
  validUntil: string;
  usageLimit: string;
}

export interface PromotionUsageDetails {
  totalUses: number;
  remaining: number | "∞";
  successRate: number;
  recentUsage: {
    companyName: string;
    planName: string;
    userType: string;
    usedAt: string;
  }[];
}