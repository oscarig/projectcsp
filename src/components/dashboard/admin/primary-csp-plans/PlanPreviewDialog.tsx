import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: number;
  billingPeriod: "month" | "year";
  description: string;
  features: { id: string; description: string; included: boolean }[];
  status: "active" | "archived";
  subscriberCount: number;
  stripePriceId?: string;
};

interface PlanPreviewDialogProps {
  plan: Plan | null;
  onClose: () => void;
}

export function PlanPreviewDialog({ plan, onClose }: PlanPreviewDialogProps) {
  if (!plan) return null;

  return (
    <Dialog open={!!plan} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Plan Preview</DialogTitle>
          <DialogDescription>
            How this plan appears to customers
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {plan.description}
            </p>
          </div>

          <div className="border-t border-b py-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/{plan.billingPeriod}</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">What's included:</p>
            {plan.features.map((feature) => (
              <div key={feature.id} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                <span className="text-sm">{feature.description}</span>
              </div>
            ))}
          </div>

          <Button className="w-full" size="lg">
            Subscribe to {plan.name}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}