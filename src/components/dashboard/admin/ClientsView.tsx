/**
 * Optimized Clients View
 * Refactored from 343 lines to ~100 lines
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
import { Download, UserPlus } from "lucide-react";
import { ClientFilters } from "./clients/ClientFilters";
import { ClientStatsBar } from "./clients/ClientStatsBar";
import { ClientTableRow } from "./clients/ClientTableRow";
import { useClients } from "./clients/useClients";

export function ClientsView() {
  const {
    clients,
    allClients,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
  } = useClients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">
            Manage client accounts and engagements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      <ClientStatsBar clients={allClients} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Clients</CardTitle>
              <CardDescription>
                {clients.length} of {allClients.length} clients
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ClientFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Engagements</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center text-muted-foreground"
                    >
                      No clients found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <ClientTableRow
                      key={client.id}
                      client={client}
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