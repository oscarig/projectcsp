import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";

interface StatusCounts {
  active: number;
  trialing: number;
  past_due: number;
  canceled: number;
}

interface SubscriptionFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: "all" | SubscriptionStatus;
  onFilterChange: (filter: "all" | SubscriptionStatus) => void;
  statusCounts: StatusCounts;
}

export function SubscriptionFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  statusCounts,
}: SubscriptionFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by partner, plan, or subscription ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          All Subscriptions
        </Button>
        <Button
          variant={activeFilter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("active")}
        >
          Active
        </Button>
        <Button
          variant={activeFilter === "trialing" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("trialing")}
        >
          Trialing
        </Button>
        <Button
          variant={activeFilter === "past_due" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("past_due")}
        >
          Past Due
        </Button>
        <Button
          variant={activeFilter === "canceled" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("canceled")}
        >
          Canceled
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        Active: {statusCounts.active} · Trialing: {statusCounts.trialing} ·{" "}
        <span className="text-yellow-600 dark:text-yellow-400">
          Past Due: {statusCounts.past_due}
        </span>{" "}
        · Canceled: {statusCounts.canceled}
      </div>
    </div>
  );
}