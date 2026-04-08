import type { Document } from "@/types";

export const mockDocuments: Document[] = [
  {
    id: "doc-001",
    engagementId: "eng-001",
    name: "Certificate of Incorporation",
    type: "company_formation",
    status: "approved",
    secureUrl: "https://drive.google.com/file/d/example-cert-001",
    uploadedBy: "part-001",
    uploadedByName: "ExpertLaw Associates",
    uploadedAt: "2024-02-15T10:00:00Z",
    reviewedBy: "prov-001",
    reviewedAt: "2024-02-15T14:00:00Z",
    notes: "Certificate issued by Companies House",
  },
  {
    id: "doc-002",
    engagementId: "eng-001",
    name: "Articles of Association",
    type: "company_formation",
    status: "approved",
    secureUrl: "https://drive.google.com/file/d/example-articles-001",
    uploadedBy: "part-001",
    uploadedByName: "ExpertLaw Associates",
    uploadedAt: "2024-02-15T10:30:00Z",
    reviewedBy: "prov-001",
    reviewedAt: "2024-02-15T14:30:00Z",
  },
  {
    id: "doc-003",
    engagementId: "eng-002",
    name: "Bank Account Application Form",
    type: "bank_statement",
    status: "under_review",
    secureUrl: "https://dropbox.com/s/example-bank-app-002",
    uploadedBy: "cli-002",
    uploadedByName: "Michael Chen",
    uploadedAt: "2024-02-20T13:00:00Z",
    notes: "Waiting for compliance review",
  },
  {
    id: "doc-004",
    engagementId: "eng-003",
    name: "Annual Financial Statements",
    type: "tax_document",
    status: "approved",
    secureUrl: "https://drive.google.com/file/d/example-statements-003",
    uploadedBy: "part-002",
    uploadedByName: "Numbers CPA",
    uploadedAt: "2024-02-10T11:00:00Z",
    reviewedBy: "prov-001",
    reviewedAt: "2024-02-11T09:00:00Z",
  },
  {
    id: "doc-005",
    engagementId: "eng-005",
    name: "Final Shareholder Agreement",
    type: "contract",
    status: "approved",
    secureUrl: "https://drive.google.com/file/d/example-agreement-005",
    uploadedBy: "part-001",
    uploadedByName: "ExpertLaw Associates",
    uploadedAt: "2024-02-03T12:00:00Z",
    reviewedBy: "prov-001",
    reviewedAt: "2024-02-03T13:00:00Z",
    notes: "Executed and filed",
  },
];

export const getDocumentsByEngagementId = (engagementId: string): Document[] => {
  return mockDocuments.filter(doc => doc.engagementId === engagementId);
};

export const getDocumentById = (id: string): Document | undefined => {
  return mockDocuments.find(doc => doc.id === id);
};