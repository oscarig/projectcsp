import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { FormData } from "./types";

interface DetailsStepProps {
  formData: FormData;
  serviceTypeLabel: string;
  jurisdictionLabel: string;
  onFieldChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

export const DetailsStep = memo(function DetailsStep({
  formData,
  serviceTypeLabel,
  jurisdictionLabel,
  onFieldChange,
  onNext,
  onBack,
  canProceed,
}: DetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-muted/50 p-4">
        <p className="text-sm font-medium">
          {serviceTypeLabel} - {jurisdictionLabel}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Proposed Company Name</Label>
          <Input
            id="companyName"
            placeholder="e.g., Tech Innovators Pte Ltd"
            value={formData.companyName}
            onChange={(e) => onFieldChange("companyName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shareCapital">Share Capital</Label>
          <Input
            id="shareCapital"
            placeholder="e.g., SGD 10,000"
            value={formData.shareCapital}
            onChange={(e) => onFieldChange("shareCapital", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="directors">Number of Directors</Label>
          <Select
            value={formData.directors}
            onValueChange={(value) => onFieldChange("directors", value)}
          >
            <SelectTrigger id="directors">
              <SelectValue placeholder="Select number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5+">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shareholders">Number of Shareholders</Label>
          <Select
            value={formData.shareholders}
            onValueChange={(value) => onFieldChange("shareholders", value)}
          >
            <SelectTrigger id="shareholders">
              <SelectValue placeholder="Select number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5+">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any additional information or questions..."
            value={formData.notes}
            onChange={(e) => onFieldChange("notes", e.target.value)}
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed}>
          Next Step: Review
        </Button>
      </div>
    </div>
  );
});