import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

interface ListingFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  statusCounts: {
    active: number;
    pending: number;
    expired: number;
  };
}

export function ListingFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  statusCounts,
}: ListingFiltersProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by partner, jurisdiction, or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("all")}
          >
            All Listings
          </Button>
          <Button
            variant={activeFilter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("active")}
          >
            Active
          </Button>
          <Button
            variant={activeFilter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("pending")}
          >
            Pending
          </Button>
          <Button
            variant={activeFilter === "expired" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("expired")}
          >
            Expired
          </Button>
        </div>

        {/* Statistics */}
        <div className="flex flex-wrap gap-4 text-sm">
          <span>
            <strong>Active:</strong> {statusCounts.active}
          </span>
          <span className="text-muted-foreground">·</span>
          <span>
            <strong>Pending:</strong> {statusCounts.pending}
          </span>
          <span className="text-muted-foreground">·</span>
          <span>
            <strong>Expired:</strong> {statusCounts.expired}
          </span>
        </div>
      </div>
    </Card>
  );
}