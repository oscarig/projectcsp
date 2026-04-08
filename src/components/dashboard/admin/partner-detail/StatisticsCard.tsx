import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Briefcase, Star, Building } from "lucide-react";

interface Statistics {
  completedEngagements: number;
  activeEngagements: number;
  avgRating: number;
  connectedCSPs: number;
}

interface StatisticsCardProps {
  stats: Statistics;
}

export function StatisticsCard({ stats }: StatisticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
            </div>
            <p className="text-2xl font-bold">{stats.completedEngagements}</p>
            <p className="text-xs text-muted-foreground">engagements</p>
          </div>
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="text-sm font-medium text-muted-foreground">Active</p>
            </div>
            <p className="text-2xl font-bold">{stats.activeEngagements}</p>
            <p className="text-xs text-muted-foreground">engagements</p>
          </div>
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
            </div>
            <p className="text-2xl font-bold">{stats.avgRating}⭐</p>
            <p className="text-xs text-muted-foreground">out of 5.0</p>
          </div>
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <p className="text-sm font-medium text-muted-foreground">Connected</p>
            </div>
            <p className="text-2xl font-bold">{stats.connectedCSPs}</p>
            <p className="text-xs text-muted-foreground">Primary CSPs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}