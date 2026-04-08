import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

interface BulkDiscount {
  title: string;
  description: string;
  appliesTo: string;
}

const bulkDiscounts: BulkDiscount[] = [
  {
    title: "Annual Prepay Discount",
    description: "Get 2 months free when paying annually (16.7% discount)",
    appliesTo: "All Subscriptions",
  },
  {
    title: "Volume Discount",
    description: "20% off for Primary CSPs with 10+ team members",
    appliesTo: "Primary CSP Plans",
  },
  {
    title: "Multi-Listing Discount",
    description: "Save 10% when purchasing 3+ promoted listings",
    appliesTo: "Promoted Listings",
  },
];

export function BulkDiscountsTab() {
  return (
    <div className="space-y-4">
      {bulkDiscounts.map((discount, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{discount.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{discount.description}</p>
              <Badge variant="outline" className="mt-2">
                {discount.appliesTo}
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}