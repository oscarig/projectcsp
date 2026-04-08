/**
 * New Engagement Modal - Connected to Supabase
 * Allows clients to create new engagement requests
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ServiceTypeStep } from "./new-engagement/ServiceTypeStep";
import { DetailsStep } from "./new-engagement/DetailsStep";
import { ReviewStep } from "./new-engagement/ReviewStep";
import { useNewEngagement } from "./new-engagement/useNewEngagement";

interface NewEngagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NewEngagementModal({
  open,
  onOpenChange,
  onSuccess,
}: NewEngagementModalProps) {
  const {
    step,
    formData,
    serviceTypeLabel,
    jurisdictionLabel,
    canProceedToStep2,
    canProceedToStep3,
    canSubmit,
    handleNext,
    handleBack,
    handleServiceTypeChange,
    handleJurisdictionChange,
    handleFieldChange,
    handleConfirmChange,
    handleSubmit,
    handleCancel,
  } = useNewEngagement(onOpenChange, onSuccess);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>New Engagement Request</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Step {step} of 3:{" "}
            {step === 1 && "Service Type"}
            {step === 2 && "Engagement Details"}
            {step === 3 && "Review & Submit"}
          </p>
        </DialogHeader>

        <Separator />

        {step === 1 && (
          <ServiceTypeStep
            formData={formData}
            onServiceTypeChange={handleServiceTypeChange}
            onJurisdictionChange={handleJurisdictionChange}
            onNext={handleNext}
            canProceed={canProceedToStep2}
          />
        )}

        {step === 2 && (
          <DetailsStep
            formData={formData}
            serviceTypeLabel={serviceTypeLabel}
            jurisdictionLabel={jurisdictionLabel}
            onFieldChange={handleFieldChange}
            onNext={handleNext}
            onBack={handleBack}
            canProceed={canProceedToStep3}
          />
        )}

        {step === 3 && (
          <ReviewStep
            formData={formData}
            serviceTypeLabel={serviceTypeLabel}
            jurisdictionLabel={jurisdictionLabel}
            onConfirmChange={handleConfirmChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
            canSubmit={canSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}