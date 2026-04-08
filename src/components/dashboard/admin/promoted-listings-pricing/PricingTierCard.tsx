import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Archive, Eye, Copy, MoreVertical, Check } from "lucide-react";

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

interface PricingTierCardProps {
  tier: PricingTier;
  onEdit: (tier: PricingTier) => void;
  onDuplicate: (tier: PricingTier) => void;
  onPreview: (tier: PricingTier) => void;
  onArchive: (tierId: string) => void;
}

export function PricingTierCard({
  tier,
  onEdit,
  onDuplicate,
  onPreview,
  onArchive,
}: PricingTierCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold">{tier.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-0 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            >
              {tier.status === "active" ? "Active" : "Archived"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {tier.subscriberCount} subscriber
              {tier.subscriberCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(tier)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Tier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(tier)}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPreview(tier)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onArchive(tier.id)}
              className="text-red-600 dark:text-red-400"
            >
              <Archive className="mr-2 h-4 w-4" />
              Archive Tier
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">${tier.price}</span>
          <span className="ml-1 text-muted-foreground">
            /{tier.billingPeriod}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {tier.description}
        </p>
      </div>

      <div className="mt-6 space-y-2">
        {tier.features.map((feature) => (
          <div key={feature.id} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
            <span className="text-sm">{feature.description}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Jurisdiction Limit:</span>
          <span className="font-medium">
            {tier.jurisdictionLimit === "unlimited"
              ? "Unlimited"
              : tier.jurisdictionLimit}
          </span>
        </div>
      </div>

      {tier.stripePriceId && (
        <div className="mt-4 border-t pt-4">
          <Badge variant="outline" className="text-xs">
            Stripe: {tier.stripePriceId}
          </Badge>
        </div>
      )}
    </Card>
  );
}