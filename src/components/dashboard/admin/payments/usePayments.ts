import { useState, useCallback, useMemo } from "react";
import { mockPayments } from "./mockPayments";
import type { PaymentFilters } from "./types";

export function usePayments() {
  const [filters, setFilters] = useState<PaymentFilters>({
    search: "",
    status: "all",
    customerType: "all",
    method: "all",
    dateFrom: "",
    dateTo: "",
  });

  const filteredPayments = useMemo(() => {
    return mockPayments.filter((payment) => {
      // Search filter
      if (
        filters.search &&
        !payment.customerName.toLowerCase().includes(filters.search.toLowerCase()) &&
        !payment.invoiceId.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && payment.status !== filters.status) {
        return false;
      }

      // Customer type filter
      if (
        filters.customerType !== "all" &&
        payment.customerType !== filters.customerType
      ) {
        return false;
      }

      // Payment method filter
      if (filters.method !== "all" && payment.method !== filters.method) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && payment.date < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && payment.date > filters.dateTo) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleFiltersChange = useCallback((newFilters: PaymentFilters) => {
    setFilters(newFilters);
  }, []);

  const handleAction = useCallback((action: string, paymentId: string) => {
    console.log(`Action: ${action} on payment ${paymentId}`);
    // TODO: Implement actual payment actions
  }, []);

  const handleExport = useCallback(() => {
    console.log("Exporting payments data...");
    // TODO: Implement CSV/PDF export
  }, []);

  return {
    payments: filteredPayments,
    allPayments: mockPayments,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
  };
}