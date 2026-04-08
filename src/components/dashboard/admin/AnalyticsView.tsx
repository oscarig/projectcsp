import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Users,
  Building2,
  FileText,
  TrendingUp,
  Download,
  FileSpreadsheet,
} from "lucide-react";

interface MetricCard {
  label: string;
  value: string;
  icon: typeof Users;
  trend?: string;
}

interface Report {
  id: string;
  name: string;
  description: string;
  icon: typeof FileSpreadsheet;
}

export function AnalyticsView() {
  const [dateRange, setDateRange] = useState("30days");

  const metrics: MetricCard[] = [
    {
      label: "New Users",
      value: "124",
      icon: Users,
      trend: "+12%",
    },
    {
      label: "New Providers",
      value: "12",
      icon: Building2,
      trend: "+8%",
    },
    {
      label: "New Companies",
      value: "89",
      icon: Building2,
      trend: "+15%",
    },
    {
      label: "Quotes",
      value: "342",
      icon: FileText,
      trend: "+23%",
    },
  ];

  const reports: Report[] = [
    {
      id: "financial",
      name: "Monthly Financial Report",
      description: "Revenue, subscriptions, and payment analytics",
      icon: FileSpreadsheet,
    },
    {
      id: "provider-performance",
      name: "Provider Performance Report",
      description: "Quote acceptance rates, response times, and provider rankings",
      icon: FileSpreadsheet,
    },
    {
      id: "user-activity",
      name: "User Activity Report",
      description: "User engagement, company creation, and quote requests",
      icon: FileSpreadsheet,
    },
  ];

  const handleGenerateReport = (reportId: string) => {
    console.log("Generating report:", reportId);
    // TODO: Implement report generation
  };

  const handleExportCSV = (reportId: string) => {
    console.log("Exporting CSV for report:", reportId);
    // TODO: Implement CSV export
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Analytics & Reports</h1>
            <p className="text-sm text-muted-foreground">
              Platform-wide analytics and reporting.
            </p>
          </div>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Date Range:</span>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="365days">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Growth Metrics */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Growth Metrics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="flex flex-col gap-2 rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {metric.label}
                  </span>
                  <Icon className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  {metric.trend && (
                    <span className="flex items-center text-sm text-emerald-600">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {metric.trend}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Reports */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Reports</h2>
        <div className="space-y-3">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-emerald-600" />
                  <div>
                    <h3 className="font-medium">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {report.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateReport(report.id)}
                  >
                    <FileText className="mr-2 h-4 w-4 text-emerald-600" />
                    Generate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportCSV(report.id)}
                  >
                    <Download className="mr-2 h-4 w-4 text-emerald-600" />
                    Export CSV
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}