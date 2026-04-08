/**
 * Optimized Audit Log View
 * Refactored from 425 lines to ~90 lines
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
import { Download, RefreshCw } from "lucide-react";
import { AuditFilters } from "./audit-log/AuditFilters";
import { AuditStatsBar } from "./audit-log/AuditStatsBar";
import { AuditTableRow } from "./audit-log/AuditTableRow";
import { useAuditLogs } from "./audit-log/useAuditLogs";

export function AuditLogView() {
  const {
    logs,
    allLogs,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
    handleClearFilters,
  } = useAuditLogs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">
            Track all system activities and security events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleClearFilters}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      <AuditStatsBar logs={allLogs} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                {logs.length} of {allLogs.length} events
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <AuditFilters filters={filters} onFiltersChange={handleFiltersChange} />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>IP / User Agent</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground"
                    >
                      No audit logs found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <AuditTableRow
                      key={log.id}
                      log={log}
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