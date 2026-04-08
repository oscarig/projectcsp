import type { Partner } from "./types";

export const mockPartners: Partner[] = [
  {
    id: "p1",
    name: "Global Legal Partners",
    email: "contact@globallegal.com",
    status: "active",
    kycStatus: "verified",
    subscriptionTier: "premium",
    monthlyRevenue: 1500,
    activeEngagements: 25,
    joinDate: "2023-11-15",
  },
  {
    id: "p2",
    name: "Tax Advisors LLC",
    email: "info@taxadvisors.com",
    status: "pending",
    kycStatus: "pending",
    subscriptionTier: "basic",
    monthlyRevenue: 0,
    activeEngagements: 0,
    joinDate: "2024-03-01",
  }
];