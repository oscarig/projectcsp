import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, XCircle } from "lucide-react";
import type { KYCStatus } from "./types";

interface KYCStatusBadgeProps {
  status: KYCStatus;
}

const variants: Record<KYCStatus, { label: string; variant: "default" | "secondary" | "destructive"; icon: any }> = {
  verified: { label: "Verified", variant: "default", icon: ShieldCheck },
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  rejected: { label: "Rejected", variant: "destructive", icon: XCircle },
};

export const KYCStatusBadge = memo(function KYCStatusBadge({ status }: KYCStatusBadgeProps) {
  const { label, variant, icon: Icon } = variants[status];
  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});