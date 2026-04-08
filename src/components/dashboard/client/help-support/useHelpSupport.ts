import { useState, useCallback } from "react";
import type { SupportTicket, FAQItem, NewTicketForm } from "./types";

const mockTickets: SupportTicket[] = [
  {
    id: "ticket-1",
    subject: "Cannot access engagement documents",
    category: "technical",
    status: "in-progress",
    priority: "high",
    createdAt: "2024-03-05T10:00:00Z",
    updatedAt: "2024-03-07T09:30:00Z",
    messages: 3,
  },
  {
    id: "ticket-2",
    subject: "Question about billing cycle",
    category: "billing",
    status: "resolved",
    priority: "low",
    createdAt: "2024-03-01T14:20:00Z",
    updatedAt: "2024-03-03T11:15:00Z",
    messages: 5,
  },
];

const mockFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I submit a new engagement request?",
    answer: "Navigate to the 'Engagements' page and click the 'New Engagement' button. Fill out the required information and submit the form.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "What documents do I need to provide?",
    answer: "Required documents vary by service type and jurisdiction. Typically, you'll need company registration documents, proof of address, and identification documents for directors.",
    category: "documents",
  },
  {
    id: "faq-3",
    question: "How long does KYC verification take?",
    answer: "Standard KYC verification typically takes 2-3 business days. Expedited processing is available for urgent cases.",
    category: "kyc",
  },
  {
    id: "faq-4",
    question: "Can I track my engagement progress?",
    answer: "Yes, you can track your engagement progress in real-time from the engagement detail page. You'll receive notifications for major milestones.",
    category: "engagements",
  },
  {
    id: "faq-5",
    question: "How do I update my account information?",
    answer: "Go to your Profile page and click 'Edit Profile'. You can update your personal information, contact details, and preferences.",
    category: "account",
  },
];

const initialFormData: NewTicketForm = {
  subject: "",
  category: "general",
  priority: "medium",
  message: "",
};

export function useHelpSupport() {
  const [tickets] = useState<SupportTicket[]>(mockTickets);
  const [faqs] = useState<FAQItem[]>(mockFAQs);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [formData, setFormData] = useState<NewTicketForm>(initialFormData);

  const handleNewTicket = useCallback(() => {
    setShowNewTicket(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setShowNewTicket(false);
    setFormData(initialFormData);
  }, []);

  const handleFieldChange = useCallback(
    (field: keyof NewTicketForm, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(() => {
    console.log("Submitting ticket:", formData);
    // TODO: Implement actual ticket submission
    handleCloseDialog();
  }, [formData, handleCloseDialog]);

  const handleViewTicket = useCallback((ticketId: string) => {
    console.log("Viewing ticket:", ticketId);
    // TODO: Navigate to ticket detail page
  }, []);

  return {
    tickets,
    faqs,
    showNewTicket,
    formData,
    handleNewTicket,
    handleCloseDialog,
    handleFieldChange,
    handleSubmit,
    handleViewTicket,
  };
}