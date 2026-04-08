import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface KYBStatusBadgeProps {
  status: "verified" | "pending" | "rejected";
}

export const KYBStatusBadge = memo(function KYBStatusBadge({
  status,
}: KYBStatusBadgeProps) {
  const variants = {
    verified: {
      icon: CheckCircle2,
      label: "Verified",
      variant: "default" as const,
    },
    pending: {
      icon: Clock,
      label: "Pending",
      variant: "secondary" as const,
    },
    rejected: {
      icon: XCircle,
      label: "Rejected",
      variant: "destructive" as const,
    },
  };

  const { icon: Icon, label, variant } = variants[status];

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});