import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import type { ClientStatus } from "./types";

interface ClientStatusBadgeProps {
  status: ClientStatus;
}

const variants: Record<ClientStatus, { label: string; variant: "default" | "secondary" | "destructive"; icon: any }> = {
  active: { label: "Active", variant: "default", icon: CheckCircle2 },
  inactive: { label: "Inactive", variant: "destructive", icon: XCircle },
  pending: { label: "Pending", variant: "secondary", icon: Clock },
};

export const ClientStatusBadge = memo(function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  const { label, variant, icon: Icon } = variants[status];
  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});