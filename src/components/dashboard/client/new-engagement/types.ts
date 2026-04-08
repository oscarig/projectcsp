/**
 * Types for New Engagement Modal
 */

export type ServiceType =
  | "company-formation"
  | "annual-filing"
  | "registered-agent"
  | "corporate-secretarial"
  | "bank-account"
  | "other";

export interface EngagementFormData {
  serviceType: ServiceType | "";
  jurisdiction: string;
  companyName: string;
  shareCapital: string;
  directors: string;
  shareholders: string;
  notes: string;
  confirmAccurate: boolean;
  confirmDocuments: boolean;
}

// Alias to maintain compatibility with existing steps
export type FormData = EngagementFormData;

export interface ServiceTypeOption {
  value: ServiceType;
  label: string;
}

export interface JurisdictionOption {
  value: string;
  label: string;
}