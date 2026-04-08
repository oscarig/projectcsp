import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

type UserStatus = "active" | "pending" | "suspended";

interface UserStatusDisplayProps {
  status: UserStatus;
  detail?: string;
  lastActive?: string;
}

export function UserStatusDisplay({ status, detail, lastActive }: UserStatusDisplayProps) {
  const statusConfig = {
    active: {
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      label: "Active",
    },
    pending: {
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-400",
      label: detail ? `Pending ${detail}` : "Pending",
    },
    suspended: {
      icon: AlertCircle,
      color: "text-red-600 dark:text-red-400",
      label: detail || "Suspended",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div>
      <div className="flex items-center gap-2">
        <StatusIcon className={`h-4 w-4 ${config.color}`} />
        <span className="text-sm">{config.label}</span>
      </div>
      {lastActive && status === "active" && (
        <div className="text-xs text-muted-foreground mt-1">Active: {lastActive}</div>
      )}
    </div>
  );
}