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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown, TrendingUp, DollarSign, Calendar } from "lucide-react";

export function FinancialReportsView() {
  const [dateRange, setDateRange] = useState("last-30-days");

  // Mock revenue data for the last 30 days
  const dailyRevenue = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    revenue: Math.floor(Math.random() * 5000) + 2000,
  }));

  const revenueSummary = {
    total: "$127,450",
    primaryCSP: { amount: "$112,000", percentage: "88%" },
    partner: { amount: "$12,000", percentage: "9%" },
    promoted: { amount: "$3,200", percentage: "3%" },
    refunds: "-$250",
    net: "$127,200",
  };

  const revenueByPlan = [
    { plan: "Professional (Primary CSP)", revenue: "$72,000", percentage: "56%" },
    { plan: "Starter (Primary CSP)", revenue: "$24,000", percentage: "19%" },
    { plan: "Enterprise (Primary CSP)", revenue: "$15,000", percentage: "12%" },
    { plan: "Partner Plans", revenue: "$12,000", percentage: "9%" },
    { plan: "Promoted Listings", revenue: "$3,200", percentage: "3%" },
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting financial report as ${format}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            Financial Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Revenue breakdown and financial performance metrics
          </p>
        </div>
        <Button onClick={() => handleExport("pdf")}>
          <FileDown className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Date Range Selector */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Date Range:</span>
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="last-12-months">Last 12 Months</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            Apply
          </Button>
          <Button variant="outline" size="sm">
            Custom Range
          </Button>
        </div>
      </Card>

      {/* Revenue Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue by Day - Last 30 Days</h2>
        <div className="h-64 flex items-end justify-between gap-1">
          {dailyRevenue.map((day) => (
            <div
              key={day.day}
              className="flex-1 bg-gradient-to-t from-green-500 to-green-300 dark:from-green-600 dark:to-green-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
              style={{ height: `${(day.revenue / 7000) * 100}%` }}
              title={`Day ${day.day}: $${day.revenue.toLocaleString()}`}
            />
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Daily Revenue Trend
        </div>
      </Card>

      {/* Revenue Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
          Revenue Summary
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total Revenue</TableCell>
              <TableCell className="text-right font-semibold text-lg">
                {revenueSummary.total}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-8">Primary CSP Subscriptions</TableCell>
              <TableCell className="text-right">
                {revenueSummary.primaryCSP.amount}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({revenueSummary.primaryCSP.percentage})
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-8">Partner Subscriptions</TableCell>
              <TableCell className="text-right">
                {revenueSummary.partner.amount}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({revenueSummary.partner.percentage})
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-8">Promoted Listings</TableCell>
              <TableCell className="text-right">
                {revenueSummary.promoted.amount}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({revenueSummary.promoted.percentage})
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-red-600 dark:text-red-400">
                Refunds
              </TableCell>
              <TableCell className="text-right text-red-600 dark:text-red-400">
                {revenueSummary.refunds}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted/50">
              <TableCell className="font-bold">Net Revenue</TableCell>
              <TableCell className="text-right font-bold text-lg text-green-600 dark:text-green-400">
                {revenueSummary.net}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Revenue by Plan */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue by Plan</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueByPlan.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.plan}</TableCell>
                <TableCell className="text-right">
                  {item.revenue}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({item.percentage})
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Export Options */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Export Options</h2>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <FileDown className="h-4 w-4 mr-2" />
            Download as PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <FileDown className="h-4 w-4 mr-2" />
            Download as CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("schedule")}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Monthly Report
          </Button>
        </div>
      </Card>
    </div>
  );
}