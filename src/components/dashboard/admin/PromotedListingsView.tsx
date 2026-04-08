import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, Download } from "lucide-react";
import { ListingFilters } from "./promoted-listings/ListingFilters";
import { ListingTableRow } from "./promoted-listings/ListingTableRow";
import { mockListings } from "./promoted-listings/mockListings";

export function PromotedListingsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isExporting, setIsExporting] = useState(false);

  // Calculate status counts
  const statusCounts = {
    active: mockListings.filter((l) => l.status === "active").length,
    pending: mockListings.filter((l) => l.status === "pending").length,
    expired: mockListings.filter((l) => l.status === "expired").length,
  };

  // Filter listings
  const filteredListings = mockListings.filter((listing) => {
    const matchesFilter =
      activeFilter === "all" || listing.status === activeFilter;
    const matchesSearch =
      listing.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      console.log("Exporting promoted listings data...");
      setIsExporting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Promoted Listings</h1>
            <p className="text-sm text-muted-foreground">
              Manage partner promoted listings and featured placements
            </p>
          </div>
        </div>
        <Button onClick={handleExport} disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export Report"}
        </Button>
      </div>

      {/* Search and Filters */}
      <ListingFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        statusCounts={statusCounts}
      />

      {/* Promoted Listings Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Renews On</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredListings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No promoted listings found
                  </TableCell>
                </TableRow>
              ) : (
                filteredListings.map((listing) => (
                  <ListingTableRow key={listing.id} listing={listing} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}