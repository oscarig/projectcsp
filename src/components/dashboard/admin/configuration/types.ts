export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  lastModified: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  active: boolean;
  providerCount: number;
}

export interface PlatformFee {
  id: string;
  type: string;
  percentage: number;
  fixedAmount?: number;
}