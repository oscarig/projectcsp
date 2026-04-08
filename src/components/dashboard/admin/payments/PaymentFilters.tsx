import { memo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaymentFilters as PaymentFiltersType } from "./types";

interface PaymentFiltersProps {
  filters: PaymentFiltersType;
  onFiltersChange: (filters: PaymentFiltersType) => void;
}

export const PaymentFilters = memo(function PaymentFilters({
  filters,
  onFiltersChange,
}: PaymentFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <Input
        placeholder="Search by customer or invoice..."
        value={filters.search}
        onChange={(e) =>
          onFiltersChange({ ...filters, search: e.target.value })
        }
        className="md:w-[300px]"
      />

      <Select
        value={filters.status}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, status: value as PaymentFiltersType["status"] })
        }
      >
        <SelectTrigger className="md:w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.customerType}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            customerType: value as PaymentFiltersType["customerType"],
          })
        }
      >
        <SelectTrigger className="md:w-[150px]">
          <SelectValue placeholder="Customer Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="provider">Primary CSP</SelectItem>
          <SelectItem value="partner">Partner</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.method}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, method: value as PaymentFiltersType["method"] })
        }
      >
        <SelectTrigger className="md:w-[150px]">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Methods</SelectItem>
          <SelectItem value="card">Card</SelectItem>
          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
          <SelectItem value="paypal">PayPal</SelectItem>
          <SelectItem value="crypto">Crypto</SelectItem>
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