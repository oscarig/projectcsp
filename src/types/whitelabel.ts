export interface WhiteLabelConfig {
  id: string;
  providerId: string;
  providerName: string;
  status: "active" | "pending" | "suspended";
  domain: string;
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  faviconUrl?: string;
  senderName: string;
  senderEmail: string;
  replyToEmail: string;
  portalEnabled: boolean;
  documentUploadEnabled: boolean;
  engagementTrackingEnabled: boolean;
  publicDirectoryEnabled: boolean;
  sslCertificate: "active" | "pending" | "expired";
  dnsStatus: "configured" | "pending" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface WhiteLabelFormData {
  providerId: string;
  domain: string;
  companyName: string;
}