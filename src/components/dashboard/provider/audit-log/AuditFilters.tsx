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
import type { AuditFilters as AuditFiltersType } from "./types";

interface AuditFiltersProps {
  filters: AuditFiltersType;
  onFiltersChange: (filters: AuditFiltersType) => void;
}

export const AuditFilters = memo(function AuditFilters({
  filters,
  onFiltersChange,
}: AuditFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search logs..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          className="pl-9"
        />
      </div>

      <Select
        value={filters.action}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, action: value as AuditFiltersType["action"] })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Action" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Actions</SelectItem>
          <SelectItem value="login">Login</SelectItem>
          <SelectItem value="logout">Logout</SelectItem>
          <SelectItem value="create">Create</SelectItem>
          <SelectItem value="update">Update</SelectItem>
          <SelectItem value="delete">Delete</SelectItem>
          <SelectItem value="export">Export</SelectItem>
          <SelectItem value="approve">Approve</SelectItem>
          <SelectItem value="reject">Reject</SelectItem>
          <SelectItem value="access">Access</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.severity}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, severity: value as AuditFiltersType["severity"] })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Severity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Severities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={filters.dateFrom}
        onChange={(e) =>
          onFiltersChange({ ...filters, dateFrom: e.target.value })
        }
        placeholder="From Date"
      />

      <Input
        type="date"
        value={filters.dateTo}
        onChange={(e) =>
          onFiltersChange({ ...filters, dateTo: e.target.value })
        }
        placeholder="To Date"
      />
    </div>
  );
});