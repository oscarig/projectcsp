import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, DollarSign, CheckCircle2 } from "lucide-react";
import type { PrimaryCSP } from "./types";

interface CSPStatsBarProps {
  csps: PrimaryCSP[];
}

export const CSPStatsBar = memo(function CSPStatsBar({ csps }: CSPStatsBarProps) {
  const stats = {
    total: csps.length,
    active: csps.filter((c) => c.status === "active").length,
    verified: csps.filter((c) => c.kybStatus === "verified").length,
    totalRevenue: csps.reduce((sum, c) => sum + c.monthlyRevenue, 0),
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total CSPs
              </p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active CSPs
              </p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                KYB Verified
              </p>
              <p className="text-2xl font-bold">{stats.verified}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Monthly Revenue
              </p>
              <p className="text-2xl font-bold">
                ${(stats.totalRevenue / 1000).toFixed(1)}k
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});