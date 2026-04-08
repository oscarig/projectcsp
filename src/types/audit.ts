import type { UserRole } from "./user";

// Audit Log
export type AuditAction = 
  | "user_created"
  | "user_updated"
  | "user_deleted"
  | "engagement_created"
  | "engagement_updated"
  | "document_uploaded"
  | "document_deleted"
  | "permission_changed"
  | "settings_updated"
  | "payment_processed";

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}