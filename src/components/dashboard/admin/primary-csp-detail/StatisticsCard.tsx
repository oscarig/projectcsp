import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Handshake, Users, DollarSign } from "lucide-react";

interface StatisticsCardProps {
  statistics: any;
}

export function StatisticsCard({ statistics }: StatisticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Engagements</div>
              <div className="text-2xl font-bold">{statistics.engagements.total}</div>
              <div className="text-xs text-muted-foreground">
                {statistics.engagements.active} active
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Handshake className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Partners</div>
              <div className="text-2xl font-bold">{statistics.partners}</div>
              <div className="text-xs text-muted-foreground">connected</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Users className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Clients</div>
              <div className="text-2xl font-bold">{statistics.clients}</div>
              <div className="text-xs text-muted-foreground">active</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <div className="text-sm text-muted-foreground">Lifetime Revenue</div>
              <div className="text-2xl font-bold">
                ${statistics.lifetimeRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">total subscriptions</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}