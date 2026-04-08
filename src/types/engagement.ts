import type { Document } from "./document";
import type { Activity } from "./activity";

// Engagement (main workflow object)
export type EngagementStatus = 
  | "draft"
  | "active" 
  | "awaiting_info"
  | "with_partner"
  | "completed" 
  | "cancelled";

export type EngagementType = 
  | "company_formation"
  | "bank_account"
  | "accounting"
  | "legal"
  | "tax_advisory"
  | "compliance"
  | "other";

export interface Engagement {
  id: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  partnerId?: string;
  partnerName?: string;
  type: EngagementType;
  title: string;
  description: string;
  status: EngagementStatus;
  isOutsourced: boolean;
  jurisdiction: string;
  value?: number;
  currency?: string;
  startDate: string;
  targetCompletionDate?: string;
  completionDate?: string;
  documents: Document[];
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}