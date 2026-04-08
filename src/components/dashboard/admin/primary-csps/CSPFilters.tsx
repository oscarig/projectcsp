import { memo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type { CSPFilters as CSPFiltersType } from "./types";

interface CSPFiltersProps {
  filters: CSPFiltersType;
  onFiltersChange: (filters: CSPFiltersType) => void;
}

export const CSPFilters = memo(function CSPFilters({
  filters,
  onFiltersChange,
}: CSPFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search CSPs..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          className="pl-9"
        />
      </div>

      <Select
        value={filters.status}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, status: value as CSPFiltersType["status"] })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.kybStatus}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, kybStatus: value as CSPFiltersType["kybStatus"] })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="KYB Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All KYB Status</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.subscriptionTier}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            subscriptionTier: value as CSPFiltersType["subscriptionTier"],
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Subscription" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plans</SelectItem>
          <SelectItem value="starter">Starter</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});