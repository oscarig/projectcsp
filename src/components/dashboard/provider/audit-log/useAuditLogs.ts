import { useState, useCallback, useMemo } from "react";
import { mockAuditLogs } from "./mockAuditLogs";
import type { AuditLog, AuditFilters } from "./types";

const INITIAL_FILTERS: AuditFilters = {
  search: "",
  action: "all",
  severity: "all",
  dateFrom: "",
  dateTo: "",
  userId: "",
};

export function useAuditLogs() {
  const [logs] = useState<AuditLog[]>(mockAuditLogs);
  const [filters, setFilters] = useState<AuditFilters>(INITIAL_FILTERS);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        filters.search === "" ||
        log.user.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.resource.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.details.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.ipAddress.includes(filters.search);

      const matchesAction =
        filters.action === "all" || log.action === filters.action;

      const matchesSeverity =
        filters.severity === "all" || log.severity === filters.severity;

      const matchesDateFrom =
        filters.dateFrom === "" ||
        new Date(log.timestamp) >= new Date(filters.dateFrom);

      const matchesDateTo =
        filters.dateTo === "" ||
        new Date(log.timestamp) <= new Date(filters.dateTo);

      const matchesUser =
        filters.userId === "" || log.user === filters.userId;

      return (
        matchesSearch &&
        matchesAction &&
        matchesSeverity &&
        matchesDateFrom &&
        matchesDateTo &&
        matchesUser
      );
    });
  }, [logs, filters]);

  const handleFiltersChange = useCallback((newFilters: AuditFilters) => {
    setFilters(newFilters);
  }, []);

  const handleAction = useCallback((action: string, logId: string) => {
    console.log(`Action: ${action} for log: ${logId}`);
    // TODO: Implement actual actions (view details, export, etc.)
  }, []);

  const handleExport = useCallback(() => {
    console.log("Exporting audit logs...");
    // TODO: Implement export functionality
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  return {
    logs: filteredLogs,
    allLogs: logs,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
    handleClearFilters,
  };
}