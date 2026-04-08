import { useState, useCallback, useMemo } from "react";
import type { Engagement, EngagementStep, Document } from "./types";

/**
 * Custom hook for engagement data and actions
 * Centralizes state management and business logic
 */
export function useEngagementData() {
  const [message, setMessage] = useState("");
  const [requestType, setRequestType] = useState("general");

  // Mock engagement data (replace with API call)
  const engagement: Engagement = useMemo(
    () => ({
      id: "SP-2024-042",
      title: "Singapore Pte Ltd Formation",
      dueDate: "15 May 2024",
      progress: 50,
      currentStep: 2,
      totalSteps: 4,
      client: {
        name: "Tech Innovators Ltd",
        aliased: true,
        jurisdiction: "UK",
      },
      primaryCSP: {
        name: "London CSP",
        contact: "Michael Chen",
        email: "michael@londoncsp.com",
      },
      details: {
        companyName: "Tech Innovators Pte Ltd",
        jurisdiction: "Singapore",
        structure: "Private Limited",
        shareCapital: "SGD 10,000",
        directors: 2,
        shareholders: 3,
      },
    }),
    []
  );

  const steps: EngagementStep[] = useMemo(
    () => [
      {
        number: 1,
        title: "Name Reserved",
        status: "completed",
        date: "12 Apr 2024",
      },
      {
        number: 2,
        title: "Name Approval",
        status: "in-progress",
        date: null,
      },
      {
        number: 3,
        title: "Document Filing",
        status: "pending",
        date: null,
      },
      {
        number: 4,
        title: "Certificate Issuance",
        status: "pending",
        date: null,
      },
    ],
    []
  );

  const clientDocuments: Document[] = useMemo(
    () => [
      {
        id: 1,
        name: "passport_john.pdf",
        date: "12 Apr 2024",
        watermarked: true,
      },
      {
        id: 2,
        name: "utility_bill.pdf",
        date: "12 Apr 2024",
        watermarked: true,
      },
    ],
    []
  );

  const yourDocuments: Document[] = useMemo(
    () => [
      {
        id: 1,
        name: "name_reservation.pdf",
        date: "12 Apr 2024",
      },
      {
        id: 2,
        name: "filing_draft.pdf",
        date: "13 Apr 2024",
      },
    ],
    []
  );

  // Actions
  const handleAction = useCallback((action: string) => {
    console.log("Action:", action);
    // TODO: Implement action handlers
  }, []);

  const handleEmailContact = useCallback(() => {
    console.log("Email contact");
    // TODO: Implement email functionality
  }, []);

  const handleUpload = useCallback(() => {
    console.log("Upload document");
    // TODO: Implement upload functionality
  }, []);

  const handleViewDocument = useCallback((docId: number) => {
    console.log("View document:", docId);
    // TODO: Implement view functionality
  }, []);

  const handleShareDocument = useCallback((docId: number) => {
    console.log("Share document:", docId);
    // TODO: Implement share functionality
  }, []);

  const handleSendUpdate = useCallback(() => {
    console.log("Send update:", { message, requestType });
    // TODO: Implement send functionality
    setMessage("");
  }, [message, requestType]);

  const handleAttachFiles = useCallback(() => {
    console.log("Attach files");
    // TODO: Implement attach functionality
  }, []);

  const handleAddRecipients = useCallback(() => {
    console.log("Add recipients");
    // TODO: Implement recipients functionality
  }, []);

  return {
    engagement,
    steps,
    clientDocuments,
    yourDocuments,
    message,
    requestType,
    setMessage,
    setRequestType,
    handleAction,
    handleEmailContact,
    handleUpload,
    handleViewDocument,
    handleShareDocument,
    handleSendUpdate,
    handleAttachFiles,
    handleAddRecipients,
  };
}