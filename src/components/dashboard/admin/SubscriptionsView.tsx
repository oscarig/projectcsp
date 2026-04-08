import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, TrendingUp, Users, DollarSign } from "lucide-react";

interface Subscription {
  id: string;
  company: string;
  plan: string;
  mrr: number;
  status: "active" | "past_due" | "canceled";
  nextBilling: string;
}

const mockSubscriptions: Subscription[] = [
  {
    id: "001",
    company: "London CSP",
    plan: "Professional",
    mrr: 1000,
    status: "active",
    nextBilling: "May 15, 2024",
  },
  {
    id: "002",
    company: "Singapore CSP",
    plan: "Professional",
    mrr: 1000,
    status: "active",
    nextBilling: "May 20, 2024",
  },
  {
    id: "003",
    company: "Hong Kong Trust",
    plan: "Enterprise",
    mrr: 3000,
    status: "active",
    nextBilling: "May 10, 2024",
  },
  {
    id: "004",
    company: "New York Law",
    plan: "Starter",
    mrr: 300,
    status: "active",
    nextBilling: "May 14, 2024",
  },
  {
    id: "005",
    company: "Cayman Trust",
    plan: "Enterprise",
    mrr: 3000,
    status: "past_due",
    nextBilling: "Apr 12, 2024",
  },
];

export function SubscriptionsView() {
  const totalMRR = mockSubscriptions
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + s.mrr, 0);
  const activeCount = mockSubscriptions.filter((s) => s.status === "active").length;
  const pastDueCount = mockSubscriptions.filter((s) => s.status === "past_due").length;

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      past_due: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      canceled: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    };
    const labels = {
      active: "Active",
      past_due: "Past Due",
      canceled: "Canceled",
    };
    return {
      className: variants[status as keyof typeof variants],
      label: labels[status as keyof typeof labels],
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Subscription Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of all active subscriptions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total MRR</p>
              <p className="text-2xl font-semibold mt-1">
                ${totalMRR.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-semibold mt-1">{activeCount}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Past Due</p>
              <p className="text-2xl font-semibold mt-1">{pastDueCount}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Growth</p>
              <p className="text-2xl font-semibold mt-1">+12%</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">MRR</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Billing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubscriptions.map((sub) => {
                const statusBadge = getStatusBadge(sub.status);
                return (
                  <TableRow key={sub.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {sub.id}
                    </TableCell>
                    <TableCell className="font-medium">{sub.company}</TableCell>
                    <TableCell>{sub.plan}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${sub.mrr.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusBadge.className}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sub.nextBilling}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}