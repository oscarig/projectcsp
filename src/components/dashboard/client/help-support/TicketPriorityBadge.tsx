import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Info, AlertCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import type { TicketPriority } from "./types";

interface TicketPriorityBadgeProps {
  priority: TicketPriority;
}

export const TicketPriorityBadge = memo(function TicketPriorityBadge({
  priority,
}: TicketPriorityBadgeProps) {
  const variants: Record<
    TicketPriority,
    { icon: typeof Info; label: string; variant: "default" | "secondary" | "destructive" }
  > = {
    low: { icon: Info, label: "Low", variant: "secondary" },
    medium: { icon: AlertCircle, label: "Medium", variant: "default" },
    high: { icon: AlertTriangle, label: "High", variant: "default" },
    urgent: { icon: ShieldAlert, label: "Urgent", variant: "destructive" },
  };

  const { icon: Icon, label, variant } = variants[priority];

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});