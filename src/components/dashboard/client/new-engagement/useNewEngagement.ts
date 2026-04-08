import { useState } from "react";
import { SERVICE_CATEGORIES, JURISDICTIONS, INITIAL_FORM_DATA } from "./constants";
import type { EngagementFormData } from "./types";
import { useAuth } from "@/hooks/useAuth";
import { engagementService } from "@/services/engagementService";
import { useToast } from "@/hooks/use-toast";

export function useNewEngagement(
  onOpenChange: (open: boolean) => void,
  onSuccess?: () => void
) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EngagementFormData>(INITIAL_FORM_DATA);

  const serviceTypeLabel = SERVICE_CATEGORIES.find(
    (cat) => cat.value === formData.serviceType
  )?.label || "";

  const jurisdictionLabel = JURISDICTIONS.find(
    (jur) => jur.value === formData.jurisdiction
  )?.label || "";

  const canProceedToStep2 = !!(formData.serviceType && formData.jurisdiction);
  const canProceedToStep3 = !!(formData.companyName && formData.directors && formData.shareholders);
  const canSubmit = formData.confirmAccurate && formData.confirmDocuments && !isSubmitting;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value as any }));
  };

  const handleJurisdictionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, jurisdiction: value }));
  };

  const handleFieldChange = (field: keyof EngagementFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirmChange = (field: "confirmAccurate" | "confirmDocuments", value: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!canSubmit || !user?.id) return;

    setIsSubmitting(true);

    try {
      // Build a comprehensive description from the form details
      const description = [
        formData.notes ? `Notes: ${formData.notes}\n` : "",
        `Share Capital: ${formData.shareCapital}`,
        `Directors: ${formData.directors}`,
        `Shareholders: ${formData.shareholders}`
      ].filter(Boolean).join("\n");

      const engagementData = {
        client_user_id: user.id,
        title: `${serviceTypeLabel} - ${formData.companyName}`,
        service_type: formData.serviceType,
        jurisdiction: formData.jurisdiction,
        description,
        urgency: "standard",
        status: "pending" as const,
      };

      await engagementService.createEngagement(engagementData);

      toast({
        title: "Engagement Created",
        description: "Your engagement request has been submitted successfully.",
      });

      setFormData(INITIAL_FORM_DATA);
      setStep(1);
      
      if (onSuccess) {
        onSuccess();
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Error creating engagement:", error);
      toast({
        title: "Error",
        description: "Failed to create engagement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
    onOpenChange(false);
  };

  return {
    step,
    formData,
    serviceTypeLabel,
    jurisdictionLabel,
    canProceedToStep2,
    canProceedToStep3,
    canSubmit,
    isSubmitting,
    handleNext,
    handleBack,
    handleServiceTypeChange,
    handleJurisdictionChange,
    handleFieldChange,
    handleConfirmChange,
    handleSubmit,
    handleCancel,
  };
}