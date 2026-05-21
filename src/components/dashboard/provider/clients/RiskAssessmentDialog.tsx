import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RiskAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (riskLevel: "Low" | "Medium" | "High") => void;
}

export function RiskAssessmentDialog({ open, onOpenChange, onSave }: RiskAssessmentDialogProps) {
  const [q1, setQ1] = useState<string>("no");
  const [q2, setQ2] = useState<string>("no");
  const [q3, setQ3] = useState<string>("no");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic logic for risk calculation:
    const yesCount = [q1, q2, q3].filter((ans) => ans === "yes").length;
    let riskLevel: "Low" | "Medium" | "High" = "Low";
    if (yesCount === 1) riskLevel = "Medium";
    if (yesCount >= 2) riskLevel = "High";

    onSave(riskLevel);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Risk Assessment</DialogTitle>
          <DialogDescription>
            Answer the following questions to determine the client's risk level.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Question 1 (Placeholder)</Label>
            <RadioGroup value={q1} onValueChange={setQ1} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="q1-yes" />
                <Label htmlFor="q1-yes" className="font-normal">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="q1-no" />
                <Label htmlFor="q1-no" className="font-normal">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Question 2 (Placeholder)</Label>
            <RadioGroup value={q2} onValueChange={setQ2} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="q2-yes" />
                <Label htmlFor="q2-yes" className="font-normal">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="q2-no" />
                <Label htmlFor="q2-no" className="font-normal">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Question 3 (Placeholder)</Label>
            <RadioGroup value={q3} onValueChange={setQ3} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="q3-yes" />
                <Label htmlFor="q3-yes" className="font-normal">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="q3-no" />
                <Label htmlFor="q3-no" className="font-normal">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="button" variant="outline" className="mr-2" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Save Assessment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
