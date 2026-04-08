type UserStatus = "active" | "pending" | "suspended";

export interface User {
  id: string;
  company: string;
  contactName: string;
  type: "primary" | "partner" | "client";
  status: UserStatus;
  statusDetail?: string;
  joinedDate: string;
  email: string;
  lastActive?: string;
}

export const mockUsers: User[] = [
  {
    id: "001",
    company: "London CSP",
    contactName: "Michael Chen",
    type: "primary",
    status: "active",
    joinedDate: "15 Jan 24",
    email: "michael@londoncsp.com",
    lastActive: "2 hours ago",
  },
  {
    id: "002",
    company: "Singapore CSP",
    contactName: "Sarah Lee",
    type: "partner",
    status: "active",
    joinedDate: "20 Jan 24",
    email: "sarah@singaporecsp.com",
    lastActive: "1 day ago",
  },
  {
    id: "003",
    company: "Tech Innovators",
    contactName: "John Smith",
    type: "client",
    status: "active",
    joinedDate: "10 Apr 24",
    email: "john@techinnovators.com",
    lastActive: "5 hours ago",
  },
  {
    id: "004",
    company: "New York Law",
    contactName: "Sarah Jones",
    type: "primary",
    status: "pending",
    statusDetail: "KYC",
    joinedDate: "14 Apr 24",
    email: "sarah@nylawfirm.com",
  },
  {
    id: "005",
    company: "BVI Trust",
    contactName: "David Wong",
    type: "partner",
    status: "pending",
    statusDetail: "License",
    joinedDate: "13 Apr 24",
    email: "david@bvitrust.com",
  },
  {
    id: "006",
    company: "Global Ventures",
    contactName: "Emma Wilson",
    type: "client",
    status: "active",
    joinedDate: "5 Apr 24",
    email: "emma@globalventures.com",
    lastActive: "3 days ago",
  },
  {
    id: "007",
    company: "Hong Kong Trust",
    contactName: "James Liu",
    type: "primary",
    status: "suspended",
    statusDetail: "Compliance review",
    joinedDate: "1 Mar 24",
    email: "james@hktrust.com",
  },
  {
    id: "008",
    company: "Dubai Partners",
    contactName: "Ahmed Hassan",
    type: "partner",
    status: "active",
    joinedDate: "28 Feb 24",
    email: "ahmed@dubaipartners.com",
    lastActive: "Today",
  },
];