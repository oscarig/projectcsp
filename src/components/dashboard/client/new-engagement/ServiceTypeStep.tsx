import { memo } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES, JURISDICTIONS } from "./constants";
import type { FormData, ServiceType } from "./types";

interface ServiceTypeStepProps {
  formData: FormData;
  onServiceTypeChange: (value: ServiceType) => void;
  onJurisdictionChange: (value: string) => void;
  onNext: () => void;
  canProceed: boolean;
}

export const ServiceTypeStep = memo(function ServiceTypeStep({
  formData,
  onServiceTypeChange,
  onJurisdictionChange,
  onNext,
  canProceed,
}: ServiceTypeStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-medium">
          What would you like help with?
        </Label>
        <RadioGroup
          value={formData.serviceType}
          onValueChange={onServiceTypeChange}
          className="space-y-3"
        >
          {SERVICE_CATEGORIES.map((service) => (
            <div
              key={service.value}
              className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={service.value} id={service.value} />
              <Label
                htmlFor={service.value}
                className="flex-1 cursor-pointer font-normal"
              >
                {service.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jurisdiction">Jurisdiction of Interest</Label>
        <Select value={formData.jurisdiction} onValueChange={onJurisdictionChange}>
          <SelectTrigger id="jurisdiction">
            <SelectValue placeholder="Select Jurisdiction" />
          </SelectTrigger>
          <SelectContent>
            {JURISDICTIONS.map((jurisdiction) => (
              <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                {jurisdiction.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canProceed}>
          Next Step: Details
        </Button>
      </div>
    </div>
  );
});