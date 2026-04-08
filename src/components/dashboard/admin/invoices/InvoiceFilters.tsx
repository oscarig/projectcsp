import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type InvoiceStatus = "paid" | "pending" | "overdue" | "failed";

interface InvoiceFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: InvoiceStatus | "all";
  onFilterChange: (filter: InvoiceStatus | "all") => void;
  statusCounts: {
    paid: number;
    pending: number;
    overdue: number;
    failed: number;
  };
}

export function InvoiceFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  statusCounts,
}: InvoiceFiltersProps) {
  return (
    <div className="space-y-4 p-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by customer, invoice number, or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("all")}
          >
            All Invoices
          </Button>
          <Button
            variant={activeFilter === "paid" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("paid")}
          >
            Paid
          </Button>
          <Button
            variant={activeFilter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("pending")}
          >
            Pending
          </Button>
          <Button
            variant={activeFilter === "overdue" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("overdue")}
          >
            Overdue
          </Button>
          <Button
            variant={activeFilter === "failed" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("failed")}
          >
            Failed
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-4 text-sm text-muted-foreground">
        <span>Paid: {statusCounts.paid}</span>
        <span>·</span>
        <span>Pending: {statusCounts.pending}</span>
        <span>·</span>
        <span className="text-yellow-600 dark:text-yellow-400">
          Overdue: {statusCounts.overdue}
        </span>
        <span>·</span>
        <span className="text-red-600 dark:text-red-400">
          Failed: {statusCounts.failed}
        </span>
      </div>
    </div>
  );
}