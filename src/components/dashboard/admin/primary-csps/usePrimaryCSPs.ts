import { useState, useCallback, useMemo } from "react";
import { mockCSPs } from "./mockCSPs";
import type { PrimaryCSP, CSPFilters } from "./types";

const INITIAL_FILTERS: CSPFilters = {
  search: "",
  status: "all",
  kybStatus: "all",
  subscriptionTier: "all",
};

export function usePrimaryCSPs() {
  const [csps] = useState<PrimaryCSP[]>(mockCSPs);
  const [filters, setFilters] = useState<CSPFilters>(INITIAL_FILTERS);

  const filteredCSPs = useMemo(() => {
    return csps.filter((csp) => {
      const matchesSearch =
        filters.search === "" ||
        csp.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
        csp.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        csp.contactName.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || csp.status === filters.status;

      const matchesKYB =
        filters.kybStatus === "all" || csp.kybStatus === filters.kybStatus;

      const matchesTier =
        filters.subscriptionTier === "all" ||
        csp.subscriptionTier === filters.subscriptionTier;

      return matchesSearch && matchesStatus && matchesKYB && matchesTier;
    });
  }, [csps, filters]);

  const handleFiltersChange = useCallback((newFilters: CSPFilters) => {
    setFilters(newFilters);
  }, []);

  const handleAction = useCallback((action: string, cspId: string) => {
    console.log(`Action: ${action} for CSP: ${cspId}`);
    // TODO: Implement actual actions (approve, suspend, email, etc.)
  }, []);

  const handleExport = useCallback(() => {
    console.log("Exporting CSPs data...");
    // TODO: Implement export functionality
  }, []);

  return {
    csps: filteredCSPs,
    allCSPs: csps,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
  };
}