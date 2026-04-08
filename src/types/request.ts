// Request (for partner assignments, info requests, etc.)
export type RequestType = 
  | "partner_assignment"
  | "document_request"
  | "information_request"
  | "approval_request";

export type RequestStatus = 
  | "pending"
  | "accepted"
  | "declined"
  | "completed"
  | "expired";

export interface Request {
  id: string;
  type: RequestType;
  engagementId: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  status: RequestStatus;
  title: string;
  description: string;
  dueDate?: string;
  respondedAt?: string;
  completedAt?: string;
  createdAt: string;
}