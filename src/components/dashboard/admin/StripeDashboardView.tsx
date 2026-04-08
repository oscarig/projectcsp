import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, CreditCard, Users, TrendingUp, AlertCircle, DollarSign, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StripeDashboardView() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log("Refreshing Stripe data...");
      setIsRefreshing(false);
    }, 1500);
  };

  const handleOpenStripeDashboard = () => {
    window.open("https://dashboard.stripe.com", "_blank");
    console.log("Opening Stripe Dashboard in new tab");
  };

  const metrics = {
    revenue: {
      total: "$24,580",
      change: "+12.5%",
      period: "This month"
    },
    transactions: {
      total: "156",
      change: "+8.3%",
      period: "This month"
    },
    customers: {
      total: "89",
      change: "+15.2%",
      period: "Active subscriptions"
    },
    disputes: {
      total: "2",
      change: "-50%",
      period: "Open disputes"
    }
  };

  const recentTransactions = [
    {
      id: "pi_3abc123",
      customer: "London CSP Ltd",
      amount: "$1,000",
      status: "succeeded",
      date: "2 hours ago",
      type: "Professional Plan"
    },
    {
      id: "pi_3def456",
      customer: "Singapore Partners",
      amount: "$100",
      status: "succeeded",
      date: "5 hours ago",
      type: "Premium Plan"
    },
    {
      id: "pi_3ghi789",
      customer: "Dubai Consulting",
      amount: "$500",
      status: "succeeded",
      date: "1 day ago",
      type: "Multi-Jurisdiction Listing"
    },
    {
      id: "pi_3jkl012",
      customer: "NYC Legal Services",
      amount: "$3,000",
      status: "succeeded",
      date: "1 day ago",
      type: "Enterprise Plan"
    },
    {
      id: "pi_3mno345",
      customer: "Paris Accountants",
      amount: "$50",
      status: "failed",
      date: "2 days ago",
      type: "Basic Plan"
    }
  ];

  const disputes = [
    {
      id: "dp_abc123",
      customer: "Example Corp",
      amount: "$1,000",
      reason: "Product not received",
      status: "needs_response",
      deadline: "3 days"
    },
    {
      id: "dp_def456",
      customer: "Test Business",
      amount: "$500",
      reason: "Fraudulent",
      status: "under_review",
      deadline: "5 days"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            Stripe Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor payments, subscriptions, and financial metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={handleOpenStripeDashboard}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Full Dashboard
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold mt-2">{metrics.revenue.total}</p>
              <div className="flex items-center gap-1 mt-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400">
                  {metrics.revenue.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{metrics.revenue.period}</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Transactions</p>
              <p className="text-2xl font-bold mt-2">{metrics.transactions.total}</p>
              <div className="flex items-center gap-1 mt-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400">
                  {metrics.transactions.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{metrics.transactions.period}</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
              <p className="text-2xl font-bold mt-2">{metrics.customers.total}</p>
              <div className="flex items-center gap-1 mt-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400">
                  {metrics.customers.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{metrics.customers.period}</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Open Disputes</p>
              <p className="text-2xl font-bold mt-2">{metrics.disputes.total}</p>
              <div className="flex items-center gap-1 mt-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400">
                  {metrics.disputes.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{metrics.disputes.period}</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("https://dashboard.stripe.com/payments", "_blank")}
              >
                View All
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          <div className="divide-y">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{transaction.customer}</p>
                      <Badge
                        variant="outline"
                        className={
                          transaction.status === "succeeded"
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{transaction.type}</p>
                    <p className="text-xs text-muted-foreground font-mono">{transaction.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Active Disputes</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("https://dashboard.stripe.com/disputes", "_blank")}
              >
                View All
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          {disputes.length > 0 ? (
            <div className="divide-y">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{dispute.customer}</p>
                        <Badge
                          variant="outline"
                          className={
                            dispute.status === "needs_response"
                              ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400"
                              : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                          }
                        >
                          {dispute.status === "needs_response" ? "Needs Response" : "Under Review"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{dispute.reason}</p>
                      <p className="text-xs text-muted-foreground font-mono">{dispute.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{dispute.amount}</p>
                      <p className="text-xs text-muted-foreground">Due in {dispute.deadline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No active disputes</p>
              <p className="text-sm mt-1">All disputes have been resolved</p>
            </div>
          )}
        </Card>
      </div>

      <Card className="p-6 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Full Stripe Dashboard Access</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              For detailed analytics, customer management, payment settings, and more, access the full Stripe Dashboard.
            </p>
            <Button
              className="mt-4"
              onClick={handleOpenStripeDashboard}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Stripe Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}