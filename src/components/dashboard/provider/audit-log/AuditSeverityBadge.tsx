import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info, ShieldAlert } from "lucide-react";
import type { AuditSeverity } from "./types";

interface AuditSeverityBadgeProps {
  severity: AuditSeverity;
}

export const AuditSeverityBadge = memo(function AuditSeverityBadge({
  severity,
}: AuditSeverityBadgeProps) {
  const variants: Record<
    AuditSeverity,
    { icon: typeof Info; label: string; variant: "default" | "secondary" | "destructive" }
  > = {
    low: { icon: Info, label: "Low", variant: "secondary" },
    medium: { icon: AlertCircle, label: "Medium", variant: "default" },
    high: { icon: AlertTriangle, label: "High", variant: "default" },
    critical: { icon: ShieldAlert, label: "Critical", variant: "destructive" },
  };

  const { icon: Icon, label, variant } = variants[severity];

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});