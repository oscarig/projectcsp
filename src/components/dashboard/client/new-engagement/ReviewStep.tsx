import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { FormData } from "./types";

interface ReviewStepProps {
  formData: FormData;
  serviceTypeLabel: string;
  jurisdictionLabel: string;
  onConfirmChange: (field: "confirmAccurate" | "confirmDocuments", value: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  canSubmit: boolean;
}

export const ReviewStep = memo(function ReviewStep({
  formData,
  serviceTypeLabel,
  jurisdictionLabel,
  onConfirmChange,
  onSubmit,
  onBack,
  canSubmit,
}: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Please review your request before submitting.
      </p>

      <div className="space-y-4 rounded-lg border p-4">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground">SERVICE</p>
            <p className="text-sm font-medium">{serviceTypeLabel}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">JURISDICTION</p>
            <p className="text-sm font-medium">{jurisdictionLabel}</p>
          </div>

          <Separator />

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">DETAILS</p>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Company Name:</span> {formData.companyName}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Share Capital:</span> {formData.shareCapital}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Directors:</span> {formData.directors}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <span className="font-medium">Shareholders:</span> {formData.shareholders}
                </span>
              </li>
            </ul>
          </div>

          {formData.notes && (
            <>
              <Separator />
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">NOTES</p>
                <p className="text-sm whitespace-pre-wrap">{formData.notes}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="confirm-accurate"
            checked={formData.confirmAccurate}
            onCheckedChange={(checked) =>
              onConfirmChange("confirmAccurate", checked === true)
            }
          />
          <Label
            htmlFor="confirm-accurate"
            className="text-sm font-normal cursor-pointer"
          >
            I confirm that the information provided is accurate
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="confirm-documents"
            checked={formData.confirmDocuments}
            onCheckedChange={(checked) =>
              onConfirmChange("confirmDocuments", checked === true)
            }
          />
          <Label
            htmlFor="confirm-documents"
            className="text-sm font-normal cursor-pointer"
          >
            I understand that additional documents may be required
          </Label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={!canSubmit}>
          Submit Request
        </Button>
      </div>
    </div>
  );
});