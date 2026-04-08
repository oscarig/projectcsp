import { Promotion, PromotionFormData } from "@/types/promotions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface PromotionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingPromo: Promotion | null;
  formData: PromotionFormData;
  onFormChange: (data: Partial<PromotionFormData>) => void;
  onSave: () => void;
}

export function PromotionFormDialog({
  open,
  onOpenChange,
  editingPromo,
  formData,
  onFormChange,
  onSave,
}: PromotionFormDialogProps) {
  const isFormValid = () => {
    return (
      formData.code.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.amount.trim() !== "" &&
      formData.appliesTo.trim() !== ""
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingPromo ? "Edit Promotion" : "Create New Promotion"}
          </DialogTitle>
          <DialogDescription>
            Configure a discount code or promotional offer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="code">Promotion Code</Label>
            <Input
              id="code"
              placeholder="e.g., SAVE20"
              value={formData.code}
              onChange={(e) => onFormChange({ code: e.target.value.toUpperCase() })}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={2}
              placeholder="e.g., 20% off first 6 months"
              value={formData.description}
              onChange={(e) => onFormChange({ description: e.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="type">Discount Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "percentage" | "fixed") =>
                  onFormChange({ type: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">
                {formData.type === "percentage" ? "Percentage" : "Amount (USD)"}
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder={formData.type === "percentage" ? "20" : "50"}
                value={formData.amount}
                onChange={(e) => onFormChange({ amount: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="appliesTo">Applies To</Label>
            <Select
              value={formData.appliesTo}
              onValueChange={(value) => onFormChange({ appliesTo: value })}
            >
              <SelectTrigger id="appliesTo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="primary_csp">Primary CSP Subscriptions</SelectItem>
                <SelectItem value="partner">Partner Subscriptions</SelectItem>
                <SelectItem value="promoted_listing">Promoted Listings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="validUntil">Valid Until (Optional)</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) => onFormChange({ validUntil: e.target.value })}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Leave blank for ongoing promotion
              </p>
            </div>

            <div>
              <Label htmlFor="usageLimit">Usage Limit (Optional)</Label>
              <Input
                id="usageLimit"
                type="number"
                placeholder="e.g., 100"
                value={formData.usageLimit}
                onChange={(e) => onFormChange({ usageLimit: e.target.value })}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Leave blank for unlimited usage
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSave} disabled={!isFormValid()}>
              {editingPromo ? "Update Promotion" : "Create Promotion"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}