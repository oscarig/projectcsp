import type { UserRole } from "./user";

// Activity Timeline
export type ActivityType = 
  | "engagement_created"
  | "engagement_status_changed"
  | "partner_assigned"
  | "partner_removed"
  | "document_uploaded"
  | "document_approved"
  | "comment_added"
  | "payment_recorded"
  | "deadline_updated";

export interface Activity {
  id: string;
  engagementId: string;
  type: ActivityType;
  userId: string;
  userName: string;
  userRole: UserRole;
  title: string;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}