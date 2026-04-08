import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Download, 
  TrendingUp, 
  TrendingDown,
  Star,
  Users,
  FileText,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export function ReportsView() {
  const engagementMetrics = [
    { 
      metric: "New Engagements", 
      thisMonth: "12", 
      lastMonth: "10", 
      change: "+20%", 
      isPositive: true 
    },
    { 
      metric: "Completed", 
      thisMonth: "9", 
      lastMonth: "8", 
      change: "+12.5%", 
      isPositive: true 
    },
    { 
      metric: "Avg Duration", 
      thisMonth: "18 days", 
      lastMonth: "21 days", 
      change: "-14%", 
      isPositive: true 
    },
    { 
      metric: "Client Satisfaction", 
      thisMonth: "4.8⭐", 
      lastMonth: "4.7⭐", 
      change: "+2%", 
      isPositive: true 
    },
  ];

  const chartData = [
    { month: "Jan", engagements: 8 },
    { month: "Feb", engagements: 10 },
    { month: "Mar", engagements: 9 },
    { month: "Apr", engagements: 12 },
    { month: "May", engagements: 11 },
    { month: "Jun", engagements: 14 },
    { month: "Jul", engagements: 13 },
    { month: "Aug", engagements: 15 },
    { month: "Sep", engagements: 16 },
    { month: "Oct", engagements: 14 },
    { month: "Nov", engagements: 17 },
    { month: "Dec", engagements: 18 },
  ];

  const maxEngagements = Math.max(...chartData.map(d => d.engagements));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Engagement Metrics Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>ENGAGEMENT METRICS</span>
            <span className="text-sm font-normal text-green-600 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Last 12 months: ▲ 24% growth
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary/20 rounded-t-md relative" 
                       style={{ height: `${(data.engagements / maxEngagements) * 100}%` }}>
                    <div className="absolute inset-0 bg-primary rounded-t-md hover:bg-primary/80 transition-colors">
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                        {data.engagements}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>This Month</TableHead>
                <TableHead>Last Month</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {engagementMetrics.map((metric, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{metric.metric}</TableCell>
                  <TableCell>{metric.thisMonth}</TableCell>
                  <TableCell>{metric.lastMonth}</TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-1 ${
                      metric.isPositive ? "text-green-600" : "text-red-600"
                    }`}>
                      {metric.isPositive ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {metric.change}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Partner Performance */}
      <Card>
        <CardHeader>
          <CardTitle>PARTNER PERFORMANCE</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Top Partner: Singapore CSP</p>
              <p className="text-sm text-muted-foreground">
                8 engagements · 4.9⭐
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium">Most Improved: BVI Trust</p>
              <p className="text-sm text-muted-foreground">
                +25% volume · 4.8⭐
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <TrendingDown className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">At Risk: None</p>
              <p className="text-sm text-muted-foreground">
                All partners performing well
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Activity */}
      <Card>
        <CardHeader>
          <CardTitle>CLIENT ACTIVITY</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Most Active: Tech Innovators</p>
              <p className="text-sm text-muted-foreground">3 engagements</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Portal Usage</p>
              <p className="text-sm text-muted-foreground">
                68% of clients logged in last 30 days
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Documents Uploaded</p>
              <p className="text-sm text-muted-foreground">24 documents</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>EXPORT OPTIONS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download as CSV
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Monthly Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}