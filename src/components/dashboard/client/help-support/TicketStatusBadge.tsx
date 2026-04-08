import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import type { TicketStatus } from "./types";

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

export const TicketStatusBadge = memo(function TicketStatusBadge({
  status,
}: TicketStatusBadgeProps) {
  const variants: Record<
    TicketStatus,
    { icon: typeof Clock; label: string; variant: "default" | "secondary" | "destructive" }
  > = {
    open: { icon: Clock, label: "Open", variant: "default" },
    "in-progress": { icon: AlertCircle, label: "In Progress", variant: "secondary" },
    resolved: { icon: CheckCircle, label: "Resolved", variant: "default" },
    closed: { icon: XCircle, label: "Closed", variant: "secondary" },
  };

  const { icon: Icon, label, variant } = variants[status];

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});