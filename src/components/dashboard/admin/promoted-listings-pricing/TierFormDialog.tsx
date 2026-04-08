import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";

type FormData = {
  name: string;
  price: string;
  billingPeriod: "month" | "year";
  description: string;
  features: string[];
  jurisdictionLimit: string;
};

interface TierFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  isEditing: boolean;
  onFormChange: (data: FormData) => void;
  onSave: () => void;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
  onFeatureChange: (index: number, value: string) => void;
}

export function TierFormDialog({
  isOpen,
  onClose,
  formData,
  isEditing,
  onFormChange,
  onSave,
  onAddFeature,
  onRemoveFeature,
  onFeatureChange,
}: TierFormDialogProps) {
  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.price.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.jurisdictionLimit.trim() !== "" &&
      formData.features.some((f) => f.trim() !== "")
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Tier" : "Create New Tier"}
          </DialogTitle>
          <DialogDescription>
            Configure a new pricing tier for promoted listings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Tier Name</Label>
            <Input
              id="name"
              placeholder="e.g., Multi-Jurisdiction"
              value={formData.name}
              onChange={(e) =>
                onFormChange({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                placeholder="500"
                value={formData.price}
                onChange={(e) =>
                  onFormChange({ ...formData, price: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="period">Billing Period</Label>
              <Select
                value={formData.billingPeriod}
                onValueChange={(value: "month" | "year") =>
                  onFormChange({ ...formData, billingPeriod: value })
                }
              >
                <SelectTrigger id="period">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="jurisdictionLimit">Jurisdiction Limit</Label>
            <Select
              value={formData.jurisdictionLimit}
              onValueChange={(value) =>
                onFormChange({ ...formData, jurisdictionLimit: value })
              }
            >
              <SelectTrigger id="jurisdictionLimit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Jurisdiction</SelectItem>
                <SelectItem value="3">3 Jurisdictions</SelectItem>
                <SelectItem value="5">5 Jurisdictions</SelectItem>
                <SelectItem value="10">10 Jurisdictions</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Brief description of this tier"
              value={formData.description}
              onChange={(e) =>
                onFormChange({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Features</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAddFeature}
              >
                <Plus className="mr-1 h-3 w-3" />
                Add Feature
              </Button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Priority in search results"
                    value={feature}
                    onChange={(e) => onFeatureChange(index, e.target.value)}
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSave} disabled={!isFormValid()}>
              {isEditing ? "Update Tier" : "Create Tier"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}