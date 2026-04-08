import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, CreditCard } from "lucide-react";

interface SubscriptionCardProps {
  plan: string;
  status: string;
  since: string;
  nextBilling: string;
}

export function SubscriptionCard({ plan, status, since, nextBilling }: SubscriptionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Subscription (Optional Tier)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Current Plan</Label>
            <p className="mt-1 text-sm font-medium">{plan}</p>
          </div>
          <div>
            <Label>Status</Label>
            <div className="mt-1 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium">{status}</span>
            </div>
          </div>
          <div>
            <Label>Since</Label>
            <p className="mt-1 text-sm text-muted-foreground">{since}</p>
          </div>
          <div>
            <Label>Next Billing</Label>
            <p className="mt-1 text-sm text-muted-foreground">{nextBilling}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Override plan")}
          >
            Override Plan
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Apply discount")}
          >
            Apply Discount
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Cancel subscription")}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}