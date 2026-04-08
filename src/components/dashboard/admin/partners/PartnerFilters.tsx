import { memo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PartnerFilters as PartnerFiltersType } from "./types";

interface PartnerFiltersProps {
  filters: PartnerFiltersType;
  onFiltersChange: (filters: PartnerFiltersType) => void;
}

export const PartnerFilters = memo(function PartnerFilters({
  filters,
  onFiltersChange,
}: PartnerFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <Input
        placeholder="Search partners..."
        value={filters.search}
        onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        className="md:w-[300px]"
      />

      <Select
        value={filters.status}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, status: value as PartnerFiltersType["status"] })
        }
      >
        <SelectTrigger className="md:w-[150px]">
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
        value={filters.kycStatus}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, kycStatus: value as PartnerFiltersType["kycStatus"] })
        }
      >
        <SelectTrigger className="md:w-[150px]">
          <SelectValue placeholder="KYC Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All KYC</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});