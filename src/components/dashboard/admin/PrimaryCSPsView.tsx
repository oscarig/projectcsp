/**
 * Optimized Primary CSPs View
 * Refactored from 453 lines to ~100 lines
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
import { Download, Plus } from "lucide-react";
import { CSPFilters } from "./primary-csps/CSPFilters";
import { CSPStatsBar } from "./primary-csps/CSPStatsBar";
import { CSPTableRow } from "./primary-csps/CSPTableRow";
import { usePrimaryCSPs } from "./primary-csps/usePrimaryCSPs";

export function PrimaryCSPsView() {
  const {
    csps,
    allCSPs,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
  } = usePrimaryCSPs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Primary CSPs</h1>
          <p className="text-muted-foreground">
            Manage service providers and their subscriptions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add CSP
          </Button>
        </div>
      </div>

      <CSPStatsBar csps={allCSPs} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Primary CSPs</CardTitle>
              <CardDescription>
                {csps.length} of {allCSPs.length} CSPs
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CSPFilters filters={filters} onFiltersChange={handleFiltersChange} />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>KYB</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Clients</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {csps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      No CSPs found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  csps.map((csp) => (
                    <CSPTableRow
                      key={csp.id}
                      csp={csp}
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