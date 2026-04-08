import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, DollarSign, Activity } from "lucide-react";
import type { Client } from "./types";

interface ClientStatsBarProps {
  clients: Client[];
}

export const ClientStatsBar = memo(function ClientStatsBar({ clients }: ClientStatsBarProps) {
  const activeCount = clients.filter((c) => c.status === "active").length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalEngagements = clients.reduce((sum, c) => sum + c.activeEngagements, 0);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
            <h3 className="text-2xl font-bold mt-2">{clients.length}</h3>
          </div>
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
            <h3 className="text-2xl font-bold mt-2">{activeCount}</h3>
          </div>
          <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <UserCheck className="h-6 w-6 text-emerald-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
            <h3 className="text-2xl font-bold mt-2">${totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Engagements</p>
            <h3 className="text-2xl font-bold mt-2">{totalEngagements}</h3>
          </div>
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Activity className="h-6 w-6 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});