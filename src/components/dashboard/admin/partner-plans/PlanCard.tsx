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
import { Edit, Copy, Eye, Archive, MoreVertical, Check } from "lucide-react";

type PlanFeature = {
  id: string;
  description: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  price: number;
  billingPeriod: "month" | "year";
  description: string;
  features: PlanFeature[];
  status: "active" | "archived";
  subscriberCount: number;
  stripePriceId?: string;
};

interface PlanCardProps {
  plan: Plan;
  onEdit: (plan: Plan) => void;
  onDuplicate: (plan: Plan) => void;
  onPreview: (plan: Plan) => void;
  onArchive: (planId: string) => void;
}

export function PlanCard({ plan, onEdit, onDuplicate, onPreview, onArchive }: PlanCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Plan Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              {plan.status === "active" && (
                <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">
                  Active
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {plan.subscriberCount} subscriber{plan.subscriberCount !== 1 ? "s" : ""}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(plan)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Plan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(plan)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPreview(plan)}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onArchive(plan.id)}
                className="text-red-600 dark:text-red-400"
              >
                <Archive className="mr-2 h-4 w-4" />
                Archive Plan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">${plan.price}</span>
            <span className="text-muted-foreground">/{plan.billingPeriod}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {plan.features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              <span className="text-sm">{feature.description}</span>
            </div>
          ))}
        </div>

        {/* Stripe Integration Badge */}
        {plan.stripePriceId && (
          <div className="pt-4 border-t">
            <Badge variant="outline" className="text-xs">
              Stripe: {plan.stripePriceId}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}