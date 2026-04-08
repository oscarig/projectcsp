import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, DollarSign, TrendingUp, TrendingDown, Building2, AlertCircle } from "lucide-react";

export function EarningsView() {
  const earningsData = {
    thisMonth: 4200,
    lastMonth: 5800,
    platformFee: 126,
    netYTD: 18500,
    feePercentage: 3,
  };

  const earningsByCSP = [
    {
      name: "London CSP",
      amount: 6200,
      percentage: 40,
      engagements: 8,
    },
    {
      name: "New York Law",
      amount: 4800,
      percentage: 31,
      engagements: 6,
    },
    {
      name: "Hong Kong Trust",
      amount: 2500,
      percentage: 16,
      engagements: 3,
    },
    {
      name: "Dubai Corp",
      amount: 2000,
      percentage: 13,
      engagements: 2,
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      date: "12 Apr 24",
      engagement: "SP-2024-042",
      csp: "London CSP",
      amount: 3200,
      fee: 96,
    },
    {
      id: 2,
      date: "10 Apr 24",
      engagement: "SP-2024-038",
      csp: "Hong Kong Trust",
      amount: 1800,
      fee: 54,
    },
    {
      id: 3,
      date: "08 Apr 24",
      engagement: "SP-2024-035",
      csp: "New York Law",
      amount: 3500,
      fee: 105,
    },
  ];

  const handleExport = () => {
    console.log("Exporting earnings data...");
    // Export logic to be implemented
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Earnings</h1>
          <p className="text-muted-foreground">
            Track your earnings and platform fees
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* This Month */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${earningsData.thisMonth.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">(before fees)</p>
            <div className="mt-2 flex items-center text-xs">
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">
                {(((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100).toFixed(1)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Last Month */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${earningsData.lastMonth.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">(before fees)</p>
          </CardContent>
        </Card>

        {/* Platform Fees */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees ({earningsData.feePercentage}%)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${earningsData.platformFee.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>

        {/* Net Earnings YTD */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Earnings YTD</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${earningsData.netYTD.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">after platform fees</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings by Primary CSP */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings by Primary CSP</CardTitle>
          <CardDescription>
            Your earnings breakdown by primary CSP partners
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {earningsByCSP.map((csp, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{csp.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {csp.engagements} engagement{csp.engagements !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${csp.amount.toLocaleString()}</p>
                  <Badge variant="secondary">{csp.percentage}%</Badge>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${csp.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest earnings from completed engagements
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {transaction.date}
                    </span>
                    <span className="text-sm">•</span>
                    <Badge variant="outline" className="font-mono text-xs">
                      {transaction.engagement}
                    </Badge>
                    <span className="text-sm">•</span>
                    <span className="text-sm font-medium">
                      {transaction.csp}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Platform fee: ${transaction.fee.toLocaleString()} ({earningsData.feePercentage}%)
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Net: ${(transaction.amount - transaction.fee).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Notes */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <div className="space-y-1">
            <p className="font-medium text-orange-900 dark:text-orange-100">
              Payment Notes
            </p>
            <p className="text-sm text-orange-800 dark:text-orange-200">
              Payments are processed externally. This dashboard tracks earnings for your reference only.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}