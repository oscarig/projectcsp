/**
 * Optimized Partners View
 * Refactored from 380 lines to ~110 lines
 * Performance improvements:
 * - Extracted specialized components with React.memo
 * - Custom hook for state management
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
import { PartnerFilters } from "./partners/PartnerFilters";
import { PartnerStatsBar } from "./partners/PartnerStatsBar";
import { PartnerTableRow } from "./partners/PartnerTableRow";
import { usePartners } from "./partners/usePartners";

export function PartnersView() {
  const {
    partners,
    allPartners,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
  } = usePartners();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partners</h1>
          <p className="text-muted-foreground">
            Manage your partner network and KYC verification
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Invite Partner
          </Button>
        </div>
      </div>

      <PartnerStatsBar partners={allPartners} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Partner Directory</CardTitle>
              <CardDescription>
                {partners.length} of {allPartners.length} partners
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <PartnerFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground"
                    >
                      No partners found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  partners.map((partner) => (
                    <PartnerTableRow
                      key={partner.id}
                      partner={partner}
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