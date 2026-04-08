// Analytics & Reports
export interface ProviderAnalytics {
  providerId: string;
  period: "week" | "month" | "quarter" | "year";
  totalClients: number;
  activeEngagements: number;
  completedEngagements: number;
  totalRevenue: number;
  averageEngagementValue: number;
  clientSatisfaction: number;
  partnerUtilization: number;
  documentProcessingTime: number; // in hours
}