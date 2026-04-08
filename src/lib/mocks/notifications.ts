import type { Notification } from "@/types";

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    userId: "prov-001",
    type: "engagement_created",
    priority: "high",
    title: "New Client Engagement",
    message: "Sarah Johnson created a new engagement: UK Limited Company Formation",
    isRead: false,
    actionUrl: "/dashboard/provider/engagements/eng-001",
    actionLabel: "View Engagement",
    metadata: { engagementId: "eng-001", clientId: "cli-001" },
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "notif-002",
    userId: "prov-001",
    type: "document_uploaded",
    priority: "medium",
    title: "Document Uploaded",
    message: "Michael Chen uploaded a new document to Corporate Bank Account Setup",
    isRead: false,
    actionUrl: "/dashboard/provider/engagements/eng-002",
    actionLabel: "View Document",
    metadata: { engagementId: "eng-002", documentId: "doc-001" },
    createdAt: "2024-02-20T13:15:00Z",
  },
  {
    id: "notif-003",
    userId: "prov-001",
    type: "partner_assigned",
    priority: "high",
    title: "Partner Accepted Assignment",
    message: "ExpertLaw Associates accepted the assignment for UK Limited Company Formation",
    isRead: true,
    actionUrl: "/dashboard/provider/engagements/eng-001",
    actionLabel: "View Engagement",
    metadata: { engagementId: "eng-001", partnerId: "part-001" },
    createdAt: "2024-02-20T11:00:00Z",
  },
  {
    id: "notif-004",
    userId: "prov-001",
    type: "engagement_completed",
    priority: "medium",
    title: "Engagement Completed",
    message: "Shareholder Agreement Drafting has been marked as completed",
    isRead: true,
    actionUrl: "/dashboard/provider/engagements/eng-005",
    actionLabel: "View Details",
    metadata: { engagementId: "eng-005" },
    createdAt: "2024-02-03T14:00:00Z",
  },
  {
    id: "notif-005",
    userId: "part-001",
    type: "engagement_created",
    priority: "high",
    title: "New Assignment",
    message: "You have been assigned to: UK Limited Company Formation",
    isRead: false,
    actionUrl: "/dashboard/partner/engagements/eng-001",
    actionLabel: "View Assignment",
    metadata: { engagementId: "eng-001", providerId: "prov-001" },
    createdAt: "2024-02-20T10:30:00Z",
  },
];

export const getNotificationsByUserId = (userId: string): Notification[] => {
  return mockNotifications.filter(notif => notif.userId === userId);
};

export const getUnreadNotifications = (userId: string): Notification[] => {
  return mockNotifications.filter(notif => notif.userId === userId && !notif.isRead);
};