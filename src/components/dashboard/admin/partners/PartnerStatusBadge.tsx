import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import type { PartnerStatus } from "./types";

interface PartnerStatusBadgeProps {
  status: PartnerStatus;
}

const variants: Record<PartnerStatus, { label: string; variant: "default" | "secondary" | "destructive"; icon: any }> = {
  active: { label: "Active", variant: "default", icon: CheckCircle2 },
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  suspended: { label: "Suspended", variant: "destructive", icon: AlertTriangle },
};

export const PartnerStatusBadge = memo(function PartnerStatusBadge({ status }: PartnerStatusBadgeProps) {
  const { label, variant, icon: Icon } = variants[status];
  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});