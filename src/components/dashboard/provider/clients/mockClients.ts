export interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  activeEngagements: number;
  lastActivity: string;
  portalStatus: "active" | "pending";
  lastLogin: string | null;
  inviteSent?: string;
  clientSince: string;
  status?: "Enquiry" | "CDD" | "Active" | "Struck-off" | "Rejected" | "Resigned";
}

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Tech Innovators Ltd",
    contact: "John Smith",
    email: "john@techinnovators.com",
    phone: "+44 20 1234 5678",
    activeEngagements: 3,
    lastActivity: "Today",
    portalStatus: "active",
    lastLogin: "2 days ago",
    clientSince: "15 Mar 2021",
    status: "Active",
  },
  {
    id: "2",
    name: "Global Trading Co",
    contact: "Sarah Chen",
    email: "sarah@globaltrading.com",
    phone: "+65 9123 4567",
    activeEngagements: 1,
    lastActivity: "Yesterday",
    portalStatus: "active",
    lastLogin: "5 days ago",
    clientSince: "22 Jun 2022",
    status: "CDD",
  },
  {
    id: "3",
    name: "Ocean Holdings Ltd",
    contact: "Michael Wong",
    email: "michael@oceanholdings.com",
    phone: "+852 9876 5432",
    activeEngagements: 2,
    lastActivity: "3 days ago",
    portalStatus: "pending",
    lastLogin: null,
    inviteSent: "2 days ago",
    clientSince: "8 Jan 2024",
    status: "Enquiry",
  },
  {
    id: "4",
    name: "Sunrise Ventures",
    contact: "Emma Thompson",
    email: "emma@sunriseventures.com",
    phone: "+1 212 555 0123",
    activeEngagements: 0,
    lastActivity: "1 week ago",
    portalStatus: "active",
    lastLogin: "1 week ago",
    clientSince: "3 Nov 2023",
    status: "Struck-off",
  },
];