/**
 * Constants for New Engagement Modal
 */

import type { ServiceTypeOption, JurisdictionOption, EngagementFormData } from "./types";

export const SERVICE_CATEGORIES: ServiceTypeOption[] = [
  { value: "company-formation", label: "Company Formation" },
  { value: "annual-filing", label: "Annual Filing / Compliance" },
  { value: "registered-agent", label: "Registered Agent Services" },
  { value: "corporate-secretarial", label: "Corporate Secretarial (CoSec)" },
  { value: "bank-account", label: "Bank Account Introduction" },
  { value: "other", label: "Other (please describe)" },
];

export const JURISDICTIONS: JurisdictionOption[] = [
  { value: "singapore", label: "Singapore" },
  { value: "bvi", label: "British Virgin Islands" },
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "hong-kong", label: "Hong Kong" },
  { value: "cayman", label: "Cayman Islands" },
];

export const INITIAL_FORM_DATA: EngagementFormData = {
  serviceType: "",
  jurisdiction: "",
  companyName: "",
  shareCapital: "",
  directors: "",
  shareholders: "",
  notes: "",
  confirmAccurate: false,
  confirmDocuments: false,
};