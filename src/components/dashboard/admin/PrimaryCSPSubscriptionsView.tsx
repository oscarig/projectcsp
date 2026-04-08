import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download } from "lucide-react";
import { SubscriptionFilters } from "./primary-csp-subscriptions/SubscriptionFilters";
import { SubscriptionTableRow } from "./primary-csp-subscriptions/SubscriptionTableRow";
import { mockSubscriptions } from "./primary-csp-subscriptions/mockSubscriptions";

type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";

export function PrimaryCSPSubscriptionsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | SubscriptionStatus>("all");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      console.log("Exporting Primary CSP subscription data...");
      setIsExporting(false);
    }, 1500);
  };

  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    const matchesFilter = activeFilter === "all" || sub.status === activeFilter;
    const matchesSearch =
      sub.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    active: mockSubscriptions.filter((s) => s.status === "active").length,
    trialing: mockSubscriptions.filter((s) => s.status === "trialing").length,
    past_due: mockSubscriptions.filter((s) => s.status === "past_due").length,
    canceled: mockSubscriptions.filter((s) => s.status === "canceled").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl font-bold tracking-tight">Primary CSP Subscriptions</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Manage Primary CSP subscription plans and billing
          </p>
        </div>
        <Button onClick={handleExport} disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export Report"}
        </Button>
      </div>

      <Card className="p-6">
        <SubscriptionFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          statusCounts={statusCounts}
        />

        <div className="mt-6 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No subscriptions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscriptions.map((subscription) => (
                  <SubscriptionTableRow key={subscription.id} subscription={subscription} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}