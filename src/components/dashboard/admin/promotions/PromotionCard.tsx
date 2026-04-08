import { Promotion } from "@/types/promotions";
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
import { Edit, Eye, MoreVertical, XCircle, Trash2, CheckCircle2, Clock } from "lucide-react";

interface PromotionCardProps {
  promotion: Promotion;
  onEdit: (promotion: Promotion) => void;
  onViewUsage: (promotion: Promotion) => void;
  onDeactivate: (promoId: string) => void;
  onDelete: (promoId: string) => void;
}

export function PromotionCard({
  promotion,
  onEdit,
  onViewUsage,
  onDeactivate,
  onDelete,
}: PromotionCardProps) {
  const getStatusDisplay = (status: Promotion["status"]) => {
    const statusConfig = {
      active: {
        icon: CheckCircle2,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        label: "Active",
      },
      expired: {
        icon: Clock,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        label: "Expired",
      },
      disabled: {
        icon: XCircle,
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        label: "Disabled",
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`${config.bgColor} ${config.color} border-0`}>
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getAppliesToLabel = (appliesTo: Promotion["appliesTo"]) => {
    const labels = {
      primary_csp: "Primary CSP Subscriptions",
      partner: "Partner Subscriptions",
      promoted_listing: "Promoted Listings",
      all: "All Products",
    };
    return labels[appliesTo];
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold">{promotion.code}</h3>
            {getStatusDisplay(promotion.status)}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{promotion.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Valid until:</span>
              <span className="font-medium">
                {promotion.validUntil === "ongoing"
                  ? "Ongoing"
                  : new Date(promotion.validUntil).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Used:</span>
              <span className="font-medium">
                {promotion.usageCount}
                {promotion.usageLimit && ` / ${promotion.usageLimit}`} times
              </span>
            </div>
          </div>
          <div className="mt-2">
            <Badge variant="outline">{getAppliesToLabel(promotion.appliesTo)}</Badge>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(promotion)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewUsage(promotion)}>
              <Eye className="mr-2 h-4 w-4" />
              View Usage
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDeactivate(promotion.id)}
              className="text-yellow-600 dark:text-yellow-400"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Deactivate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(promotion.id)}
              className="text-red-600 dark:text-red-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 flex items-center gap-6 border-t pt-4">
        <div>
          <span className="text-2xl font-bold">
            {promotion.type === "percentage" ? `${promotion.amount}%` : `$${promotion.amount}`}
          </span>
          <span className="ml-1 text-sm text-muted-foreground">
            {promotion.type === "percentage" ? "off" : "discount"}
          </span>
        </div>
        {promotion.usageLimit && (
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Usage</span>
              <span>
                {promotion.usageCount} / {promotion.usageLimit}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className="h-full bg-purple-600"
                style={{
                  width: `${(promotion.usageCount / promotion.usageLimit) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}