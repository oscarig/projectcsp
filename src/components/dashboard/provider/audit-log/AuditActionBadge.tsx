import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  LogIn,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Download,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import type { AuditAction } from "./types";

interface AuditActionBadgeProps {
  action: AuditAction;
}

export const AuditActionBadge = memo(function AuditActionBadge({
  action,
}: AuditActionBadgeProps) {
  const variants: Record<
    AuditAction,
    { icon: typeof LogIn; label: string; variant: "default" | "secondary" | "destructive" }
  > = {
    login: { icon: LogIn, label: "Login", variant: "default" },
    logout: { icon: LogOut, label: "Logout", variant: "secondary" },
    create: { icon: Plus, label: "Create", variant: "default" },
    update: { icon: Edit, label: "Update", variant: "secondary" },
    delete: { icon: Trash2, label: "Delete", variant: "destructive" },
    export: { icon: Download, label: "Export", variant: "secondary" },
    approve: { icon: CheckCircle, label: "Approve", variant: "default" },
    reject: { icon: XCircle, label: "Reject", variant: "destructive" },
    access: { icon: Eye, label: "Access", variant: "secondary" },
  };

  const { icon: Icon, label, variant } = variants[action];

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});