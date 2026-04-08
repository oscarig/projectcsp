/**
 * Optimized Payments View
 * Refactored from 388 lines to ~120 lines
 * Performance improvements:
 * - Extracted specialized components with React.memo
 * - Custom hook for data management and filtering
 * - Memoized filtering logic
 * - Separated concerns for better maintainability
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText } from "lucide-react";
import { PaymentFilters } from "./payments/PaymentFilters";
import { PaymentStatsBar } from "./payments/PaymentStatsBar";
import { PaymentTableRow } from "./payments/PaymentTableRow";
import { usePayments } from "./payments/usePayments";

export function PaymentsView() {
  const {
    payments,
    allPayments,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
  } = usePayments();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">
            Manage and track all platform payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <PaymentStatsBar payments={allPayments} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Payments</CardTitle>
              <CardDescription>
                {payments.length} of {allPayments.length} payments
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <PaymentFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground"
                    >
                      No payments found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <PaymentTableRow
                      key={payment.id}
                      payment={payment}
                      onAction={handleAction}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}