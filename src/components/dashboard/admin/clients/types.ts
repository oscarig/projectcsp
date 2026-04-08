/**
 * Types for Clients View
 */

export type ClientStatus = "active" | "inactive" | "pending";

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: ClientStatus;
  activeEngagements: number;
  totalSpent: number;
  joinDate: string;
  lastActivity: string;
}

export interface ClientFilters {
  search: string;
  status: ClientStatus | "all";
  dateFrom: string;
  dateTo: string;
}