import type { Request } from "@/types";

export const mockRequests: Request[] = [
  {
    id: "req-001",
    type: "partner_assignment",
    engagementId: "eng-001",
    fromUserId: "prov-001",
    fromUserName: "Global CSP Ltd",
    toUserId: "part-001",
    toUserName: "ExpertLaw Associates",
    status: "accepted",
    title: "Partner Assignment Request",
    description: "We would like to assign you to the UK Limited Company Formation engagement for TechStartup Inc",
    dueDate: "2024-02-05T10:00:00Z",
    respondedAt: "2024-02-02T09:00:00Z",
    createdAt: "2024-02-01T14:00:00Z",
  },
  {
    id: "req-002",
    type: "document_request",
    engagementId: "eng-002",
    fromUserId: "prov-001",
    fromUserName: "Global CSP Ltd",
    toUserId: "cli-002",
    toUserName: "Michael Chen",
    status: "completed",
    title: "Document Request",
    description: "Please upload the completed bank account application form",
    dueDate: "2024-02-25T09:00:00Z",
    respondedAt: "2024-02-20T13:00:00Z",
    completedAt: "2024-02-20T13:00:00Z",
    createdAt: "2024-02-18T10:00:00Z",
  },
  {
    id: "req-003",
    type: "information_request",
    engagementId: "eng-004",
    fromUserId: "prov-001",
    fromUserName: "Global CSP Ltd",
    toUserId: "cli-004",
    toUserName: "David Martinez",
    status: "pending",
    title: "Additional Information Required",
    description: "We need details about your current data processing activities for the GDPR assessment",
    dueDate: "2024-02-28T11:00:00Z",
    createdAt: "2024-02-20T11:00:00Z",
  },
  {
    id: "req-004",
    type: "approval_request",
    engagementId: "eng-003",
    fromUserId: "part-002",
    fromUserName: "Numbers CPA",
    toUserId: "prov-001",
    toUserName: "Global CSP Ltd",
    status: "accepted",
    title: "Final Review Approval",
    description: "Annual financial statements completed and ready for final approval",
    dueDate: "2024-02-12T09:00:00Z",
    respondedAt: "2024-02-11T09:00:00Z",
    createdAt: "2024-02-10T16:00:00Z",
  },
];

export const getRequestsByEngagementId = (engagementId: string): Request[] => {
  return mockRequests.filter(request => request.engagementId === engagementId);
};

export const getPendingRequestsByUserId = (userId: string): Request[] => {
  return mockRequests.filter(request => request.toUserId === userId && request.status === "pending");
};

export const getPartnerPendingRequests = getPendingRequestsByUserId;