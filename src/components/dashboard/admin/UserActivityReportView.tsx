import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileDown, Activity, Users, CheckCircle2 } from "lucide-react";

export function UserActivityReportView() {
  const [isExporting, setIsExporting] = useState(false);

  // Mock DAU data for the last 30 days
  const dauData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    dau: Math.floor(Math.random() * 100) + 300,
  }));

  const avgDAU = Math.floor(dauData.reduce((sum, d) => sum + d.dau, 0) / dauData.length);
  const peakDAU = Math.max(...dauData.map((d) => d.dau));
  const peakDay = dauData.findIndex((d) => d.dau === peakDAU) + 1;

  const activityByUserType = {
    primaryCSPs: { active: 132, total: 147, percentage: "90%" },
    partners: { active: 368, total: 413, percentage: "89%" },
    clients: { active: 245, total: 288, percentage: "85%" },
  };

  const engagementActivity = {
    newToday: 24,
    completedToday: 18,
    avgCompletionTime: "12 days",
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      console.log("Exporting user activity report...");
      setIsExporting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            User Activity Report
          </h1>
          <p className="text-muted-foreground mt-1">
            Daily active users and engagement metrics
          </p>
        </div>
        <Button onClick={handleExport} disabled={isExporting}>
          <FileDown className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </div>

      {/* Daily Active Users Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Daily Active Users - Last 30 Days</h2>

        {/* Chart */}
        <div className="h-64 relative mb-6">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>

          {/* Line chart */}
          <div className="ml-12 h-full flex items-end justify-between gap-1">
            {dauData.map((data) => (
              <div
                key={data.day}
                className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                style={{ height: `${(data.dau / 500) * 100}%` }}
                title={`Day ${data.day}: ${data.dau} users`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 pt-4 border-t text-sm">
          <div>
            <span className="text-muted-foreground">Avg DAU: </span>
            <span className="font-semibold">{avgDAU}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Peak: </span>
            <span className="font-semibold">
              {peakDAU} on Day {peakDay}
            </span>
          </div>
        </div>
      </Card>

      {/* Activity by User Type */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Activity by User Type
        </h2>

        <div className="space-y-6">
          {/* Primary CSPs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-medium">Primary CSPs</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {activityByUserType.primaryCSPs.active} active (
                  {activityByUserType.primaryCSPs.percentage} of total)
                </span>
              </div>
              <Badge variant="secondary">{activityByUserType.primaryCSPs.percentage}</Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-blue-500 dark:bg-blue-400 h-3 rounded-full transition-all"
                style={{ width: activityByUserType.primaryCSPs.percentage }}
              />
            </div>
          </div>

          {/* Partners */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-medium">Partners</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {activityByUserType.partners.active} active (
                  {activityByUserType.partners.percentage} of total)
                </span>
              </div>
              <Badge variant="secondary">{activityByUserType.partners.percentage}</Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-purple-500 dark:bg-purple-400 h-3 rounded-full transition-all"
                style={{ width: activityByUserType.partners.percentage }}
              />
            </div>
          </div>

          {/* Clients */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-medium">Clients</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {activityByUserType.clients.active} active (
                  {activityByUserType.clients.percentage} of total)
                </span>
              </div>
              <Badge variant="secondary">{activityByUserType.clients.percentage}</Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-green-500 dark:bg-green-400 h-3 rounded-full transition-all"
                style={{ width: activityByUserType.clients.percentage }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Engagement Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          Engagement Activity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">New Engagements Today</div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {engagementActivity.newToday}
            </div>
            <p className="text-sm text-muted-foreground">
              New partnerships initiated today
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Completed Engagements Today</div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              {engagementActivity.completedToday}
            </div>
            <p className="text-sm text-muted-foreground">
              Successfully completed partnerships
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Avg Completion Time</div>
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {engagementActivity.avgCompletionTime}
            </div>
            <p className="text-sm text-muted-foreground">
              From initiation to completion
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}