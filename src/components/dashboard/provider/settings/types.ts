export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member" | "Viewer";
  status: "Active" | "Pending";
  avatar?: string;
  joinedAt: string;
}

export interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  email: boolean;
  sms: boolean;
  push: boolean;
}