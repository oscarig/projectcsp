import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

type PricingTier = {
  id: string;
  name: string;
  price: number;
  billingPeriod: "month" | "year";
  description: string;
  features: Array<{
    id: string;
    description: string;
    included: boolean;
  }>;
  jurisdictionLimit: number | "unlimited";
  status: "active" | "archived";
  subscriberCount: number;
  stripePriceId?: string;
};

interface TierPreviewDialogProps {
  tier: PricingTier | null;
  onClose: () => void;
}

export function TierPreviewDialog({ tier, onClose }: TierPreviewDialogProps) {
  if (!tier) return null;

  return (
    <Dialog open={!!tier} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tier Preview</DialogTitle>
          <DialogDescription>
            How this tier appears to customers
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold">{tier.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {tier.description}
            </p>
          </div>

          <div className="border-t border-b py-6">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold">${tier.price}</span>
              <span className="ml-2 text-muted-foreground">
                /{tier.billingPeriod}
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">What's included:</h4>
            <div className="space-y-3">
              {tier.features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-sm">{feature.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Jurisdiction Coverage:
              </span>
              <span className="font-medium">
                {tier.jurisdictionLimit === "unlimited"
                  ? "All jurisdictions"
                  : `Up to ${tier.jurisdictionLimit} jurisdiction${
                      tier.jurisdictionLimit !== 1 ? "s" : ""
                    }`}
              </span>
            </div>
          </div>

          <Button className="w-full" size="lg" disabled>
            Subscribe to {tier.name}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}