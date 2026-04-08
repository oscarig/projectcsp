/**
 * Types for Engagement Detail View
 */

export interface Engagement {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
  currentStep: number;
  totalSteps: number;
  client: {
    name: string;
    aliased: boolean;
    jurisdiction: string;
  };
  primaryCSP: {
    name: string;
    contact: string;
    email: string;
  };
  details: {
    companyName: string;
    jurisdiction: string;
    structure: string;
    shareCapital: string;
    directors: number;
    shareholders: number;
  };
}

export interface EngagementStep {
  number: number;
  title: string;
  status: "completed" | "in-progress" | "pending";
  date: string | null;
}

export interface Communication {
  id: number;
  date: string;
  from: string;
  type: "request" | "response";
  subject: string;
  message: string;
  isYou: boolean;
}

export interface Document {
  id: number;
  name: string;
  date: string;
  watermarked?: boolean;
}