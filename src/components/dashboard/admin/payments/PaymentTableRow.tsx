import { memo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Download, RefreshCw, Ban } from "lucide-react";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { PaymentMethodBadge } from "./PaymentMethodBadge";
import { CustomerTypeBadge } from "./CustomerTypeBadge";
import type { Payment } from "./types";

interface PaymentTableRowProps {
  payment: Payment;
  onAction: (action: string, paymentId: string) => void;
}

export const PaymentTableRow = memo(function PaymentTableRow({
  payment,
  onAction,
}: PaymentTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{payment.customerName}</TableCell>
      <TableCell>
        <CustomerTypeBadge type={payment.customerType} />
      </TableCell>
      <TableCell className="font-medium">
        ${payment.amount.toLocaleString()} {payment.currency}
      </TableCell>
      <TableCell>
        <PaymentStatusBadge status={payment.status} />
      </TableCell>
      <TableCell>
        <PaymentMethodBadge method={payment.method} />
      </TableCell>
      <TableCell>{payment.date}</TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {payment.invoiceId}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction("view", payment.id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("invoice", payment.id)}>
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </DropdownMenuItem>
            {payment.status === "pending" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction("retry", payment.id)}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry Payment
                </DropdownMenuItem>
              </>
            )}
            {payment.status === "completed" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onAction("refund", payment.id)}
                  className="text-destructive"
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Issue Refund
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});