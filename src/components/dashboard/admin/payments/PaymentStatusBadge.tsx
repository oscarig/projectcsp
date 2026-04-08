import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, RotateCcw } from "lucide-react";
import type { PaymentStatus } from "./types";

const variants: Record<
  PaymentStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof CheckCircle }
> = {
  completed: { label: "Completed", variant: "default", icon: CheckCircle },
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  failed: { label: "Failed", variant: "destructive", icon: XCircle },
  refunded: { label: "Refunded", variant: "outline", icon: RotateCcw },
};

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export const PaymentStatusBadge = memo(function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const { label, variant, icon: Icon } = variants[status];

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});