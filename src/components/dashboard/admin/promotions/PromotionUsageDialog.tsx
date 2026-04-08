import { Promotion } from "@/types/promotions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface PromotionUsageDialogProps {
  promotion: Promotion | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PromotionUsageDialog({
  promotion,
  open,
  onOpenChange,
}: PromotionUsageDialogProps) {
  if (!promotion) return null;

  const mockRecentUsage = [
    {
      companyName: "London CSP",
      planName: "Pro Plan - Primary CSP",
      usedAt: "2 days ago",
    },
    {
      companyName: "Singapore Partners",
      planName: "Basic Plan - Partner",
      usedAt: "5 days ago",
    },
    {
      companyName: "BVI Trust Services",
      planName: "Pro Plan - Primary CSP",
      usedAt: "1 week ago",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Promotion Usage</DialogTitle>
          <DialogDescription>Usage details for {promotion.code}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Total Uses</div>
              <div className="mt-1 text-2xl font-bold">{promotion.usageCount}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Remaining</div>
              <div className="mt-1 text-2xl font-bold">
                {promotion.usageLimit
                  ? promotion.usageLimit - promotion.usageCount
                  : "∞"}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Success Rate</div>
              <div className="mt-1 text-2xl font-bold">94%</div>
            </Card>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Recent Usage</h4>
            <div className="space-y-3">
              {mockRecentUsage.map((usage, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <div className="font-medium">{usage.companyName}</div>
                    <div className="text-sm text-muted-foreground">{usage.planName}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{usage.usedAt}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-muted p-4">
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div className="flex-1">
              <div className="font-medium">High Performance</div>
              <div className="text-sm text-muted-foreground">
                This promotion is converting well above average
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}