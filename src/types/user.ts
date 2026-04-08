// Core User Types
export type UserRole = "provider" | "partner" | "client" | "admin";

export type UserStatus = "active" | "pending" | "suspended" | "inactive";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Provider (Primary CSP)
export type ProviderSubscriptionTier = "free" | "professional" | "enterprise";

export type ProviderKYBStatus = 
  | "pending" 
  | "documents_requested" 
  | "under_review" 
  | "approved" 
  | "rejected";

export interface Provider extends User {
  role: "provider";
  companyName: string;
  registrationNumber?: string;
  jurisdiction: string;
  subscriptionTier: ProviderSubscriptionTier;
  subscriptionStatus: "active" | "past_due" | "canceled" | "trialing";
  kybStatus: ProviderKYBStatus;
  monthlyClients: number;
  totalEngagements: number;
  activePartners: number;
  whiteLabelEnabled: boolean;
  whiteLabelDomain?: string;
}

// Partner (Subcontractor CSP)
export type PartnerStatus = 
  | "invited" 
  | "onboarding" 
  | "active" 
  | "suspended";

export interface Partner extends User {
  role: "partner";
  companyName: string;
  expertise: string[];
  jurisdictions: string[];
  partnerStatus: PartnerStatus;
  dueDiligenceComplete: boolean;
  totalAssignments: number;
  completionRate: number;
  averageRating: number;
}

// Client (End Client)
export interface Client extends User {
  role: "client";
  companyName?: string;
  industry?: string;
  jurisdiction?: string;
  totalEngagements: number;
  activeEngagements: number;
}

// Admin
export interface Admin extends User {
  role: "admin";
  permissions: string[];
  department?: string;
}