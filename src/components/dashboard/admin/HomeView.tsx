import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building,
  Handshake,
  Briefcase,
  DollarSign,
  TrendingUp,
  Percent,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Activity
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "GOOD MORNING";
  if (hour < 18) return "GOOD AFTERNOON";
  return "GOOD EVENING";
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

const keyMetrics = [
  {
    title: "Total Users",
    value: "847",
    change: "+12% MoM",
    trend: "up",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    title: "Primary CSPs",
    value: "147",
    change: "+8% MoM",
    trend: "up",
    icon: Building,
    color: "text-purple-600 dark:text-purple-400"
  },
  {
    title: "Partners",
    value: "412",
    change: "+15% MoM",
    trend: "up",
    icon: Handshake,
    color: "text-green-600 dark:text-green-400"
  },
  {
    title: "Active Engagements",
    value: "803",
    change: "+18% MoM",
    trend: "up",
    icon: Briefcase,
    color: "text-orange-600 dark:text-orange-400"
  },
  {
    title: "MRR",
    value: "$127,000",
    change: "+8% MoM",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "ARR",
    value: "$1.52M",
    change: "+10% MoM",
    trend: "up",
    icon: TrendingUp,
    color: "text-cyan-600 dark:text-cyan-400"
  },
  {
    title: "Gross Margin",
    value: "78%",
    change: "+2% MoM",
    trend: "up",
    icon: Percent,
    color: "text-indigo-600 dark:text-indigo-400"
  }
];

const pendingActions = [
  {
    id: "1",
    title: "KYC Verification Queue",
    count: 12,
    severity: "high",
    href: "/dashboard/admin/compliance/verification",
    action: "Review Now"
  },
  {
    id: "2",
    title: "Partner Approval Queue",
    count: 8,
    severity: "high",
    href: "/dashboard/admin/users/partners",
    action: "Review Now"
  },
  {
    id: "3",
    title: "Support Tickets",
    count: 3,
    severity: "medium",
    href: "/dashboard/admin/support",
    action: "View"
  },
  {
    id: "4",
    title: "Disputes",
    count: 2,
    severity: "medium",
    href: "/dashboard/admin/disputes",
    action: "Resolve"
  }
];

const recentActivity = [
  {
    id: "1",
    type: "registration",
    message: "New Primary CSP registered: London Law LLP",
    date: "15 Apr",
    icon: Building,
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    id: "2",
    type: "verification",
    message: "Partner verified: Singapore CSP Pte Ltd",
    date: "15 Apr",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400"
  },
  {
    id: "3",
    type: "subscription",
    message: "Subscription upgraded: Hong Kong Trust to Professional",
    date: "14 Apr",
    icon: TrendingUp,
    color: "text-purple-600 dark:text-purple-400"
  },
  {
    id: "4",
    type: "payment",
    message: "Payment received: $3,200 from London CSP",
    date: "14 Apr",
    icon: DollarSign,
    color: "text-emerald-600 dark:text-emerald-400"
  },
  {
    id: "5",
    type: "dispute",
    message: "New dispute filed: BVI Trust vs London CSP",
    date: "13 Apr",
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-400"
  }
];

const systemHealth = [
  {
    service: "Stripe Connection",
    status: "connected",
    label: "Connected"
  },
  {
    service: "Email Service",
    status: "operational",
    label: "Operational"
  },
  {
    service: "Database",
    status: "healthy",
    label: "Healthy"
  },
  {
    service: "API Status",
    status: "healthy",
    label: "99.9% uptime (last 30 days)"
  }
];

export function AdminHomeView() {
  const { profile } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get user's full name or fallback to "Admin"
  const userName = profile?.full_name?.toUpperCase() || "ADMIN";

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            {mounted ? getGreeting() : "WELCOME"}, {userName}
          </h1>
          <p className="text-muted-foreground">
            {mounted ? getCurrentDate() : "Loading..."}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Platform Overview · System Administrator
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div>
        <h2 className="text-base font-semibold mb-4">KEY METRICS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{metric.title.toUpperCase()}</p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pending Actions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">PENDING ACTIONS ({pendingActions.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingActions.map((action) => (
            <div 
              key={action.id}
              className="border rounded-lg p-4 space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlertCircle className={`h-5 w-5 ${
                    action.severity === "high"
                      ? "text-red-600"
                      : "text-orange-600"
                  }`} />
                  <p className="font-medium">{action.title}: {action.count} pending</p>
                </div>
              </div>
              <Link href={action.href}>
                <Button size="sm" variant={action.severity === "high" ? "destructive" : "default"}>
                  {action.action}
                </Button>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">RECENT ACTIVITY</CardTitle>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div 
                key={activity.id}
                className="border rounded-lg p-3"
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">SYSTEM HEALTH</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {systemHealth.map((system, index) => (
            <div 
              key={index}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${
                  system.status === "connected" || system.status === "operational" || system.status === "healthy"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`} />
                <span className="font-medium">{system.service}</span>
              </div>
              <Badge 
                variant="outline"
                className="text-green-600 border-green-600"
              >
                {system.label}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}