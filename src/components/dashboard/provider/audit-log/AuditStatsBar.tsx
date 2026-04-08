import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, AlertTriangle, ShieldAlert, Users } from "lucide-react";
import type { AuditLog } from "./types";

interface AuditStatsBarProps {
  logs: AuditLog[];
}

export const AuditStatsBar = memo(function AuditStatsBar({
  logs,
}: AuditStatsBarProps) {
  const stats = {
    total: logs.length,
    critical: logs.filter((log) => log.severity === "critical").length,
    highSeverity: logs.filter((log) => log.severity === "high").length,
    uniqueUsers: new Set(logs.map((log) => log.user)).size,
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Events
              </p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Activity className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Critical Events
              </p>
              <p className="text-2xl font-bold">{stats.critical}</p>
            </div>
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                High Severity
              </p>
              <p className="text-2xl font-bold">{stats.highSeverity}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Users
              </p>
              <p className="text-2xl font-bold">{stats.uniqueUsers}</p>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});