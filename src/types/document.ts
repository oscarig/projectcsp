// Documents
export type DocumentType = 
  | "company_formation"
  | "identity"
  | "proof_of_address"
  | "bank_statement"
  | "tax_document"
  | "contract"
  | "invoice"
  | "other";

export type DocumentStatus = 
  | "pending_upload"
  | "uploaded"
  | "under_review"
  | "approved"
  | "rejected"
  | "expired";

export interface Document {
  id: string;
  engagementId?: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  secureUrl?: string; // External link (Google Drive, Dropbox, etc.)
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  expiryDate?: string;
  notes?: string;
}

// Partner Due Diligence Pack
export type DueDiligenceStatus = 
  | "incomplete"
  | "submitted"
  | "under_review"
  | "evidence_complete"
  | "inconsistent";

export interface PartnerDueDiligencePack {
  id: string;
  partnerId: string;
  partnerName: string;
  status: DueDiligenceStatus;
  companyRegistrationDoc?: Document;
  proofOfAddress?: Document;
  professionalInsurance?: Document;
  references: string[];
  registryCheckStatus: "pending" | "consistent" | "inconsistent";
  registryCheckDate?: string;
  registryCheckNotes?: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  expiryDate?: string;
}