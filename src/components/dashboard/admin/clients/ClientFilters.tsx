import { memo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ClientFilters as ClientFiltersType } from "./types";

interface ClientFiltersProps {
  filters: ClientFiltersType;
  onFiltersChange: (filters: ClientFiltersType) => void;
}

export const ClientFilters = memo(function ClientFilters({
  filters,
  onFiltersChange,
}: ClientFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <Input
        placeholder="Search clients..."
        value={filters.search}
        onChange={(e) =>
          onFiltersChange({ ...filters, search: e.target.value })
        }
        className="md:w-[300px]"
      />

      <Select
        value={filters.status}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, status: value as ClientFiltersType["status"] })
        }
      >
        <SelectTrigger className="md:w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={filters.dateFrom}
        onChange={(e) =>
          onFiltersChange({ ...filters, dateFrom: e.target.value })
        }
        placeholder="From Date"
        className="md:w-[150px]"
      />

      <Input
        type="date"
        value={filters.dateTo}
        onChange={(e) =>
          onFiltersChange({ ...filters, dateTo: e.target.value })
        }
        placeholder="To Date"
        className="md:w-[150px]"
      />
    </div>
  );
});