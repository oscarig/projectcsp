/**
 * Types for Audit Log View
 */

export type AuditAction =
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "export"
  | "approve"
  | "reject"
  | "access";

export type AuditSeverity = "low" | "medium" | "high" | "critical";

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: AuditAction;
  resource: string;
  details: string;
  severity: AuditSeverity;
  ipAddress: string;
  userAgent: string;
}

export interface AuditFilters {
  search: string;
  action: AuditAction | "all";
  severity: AuditSeverity | "all";
  dateFrom: string;
  dateTo: string;
  userId: string;
}