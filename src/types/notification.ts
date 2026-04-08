// Notifications
export type NotificationType = 
  | "engagement_created"
  | "engagement_updated"
  | "engagement_completed"
  | "partner_assigned"
  | "document_uploaded"
  | "document_approved"
  | "payment_received"
  | "kyb_status_change"
  | "system_alert";

export type NotificationPriority = "low" | "medium" | "high" | "urgent";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}