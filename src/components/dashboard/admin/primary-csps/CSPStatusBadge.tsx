import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import type { CSPStatus } from "./types";

interface CSPStatusBadgeProps {
  status: CSPStatus;
}

export const CSPStatusBadge = memo(function CSPStatusBadge({
  status,
}: CSPStatusBadgeProps) {
  const variants: Record<CSPStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
    active: { label: "Active", variant: "default" },
    pending: { label: "Pending", variant: "secondary" },
    suspended: { label: "Suspended", variant: "destructive" },
  };

  const { label, variant } = variants[status];

  return <Badge variant={variant}>{label}</Badge>;
});