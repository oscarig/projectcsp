import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Download, Mail, RefreshCw } from "lucide-react";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { CustomerTypeBadge } from "./CustomerTypeBadge";

type InvoiceStatus = "paid" | "pending" | "overdue" | "failed";
type InvoiceType = "primary_csp" | "partner" | "promoted_listing";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customerId: string;
  customerName: string;
  customerType: InvoiceType;
  amount: number;
  status: InvoiceStatus;
  description: string;
}

interface InvoiceTableRowProps {
  invoice: Invoice;
}

export function InvoiceTableRow({ invoice }: InvoiceTableRowProps) {
  const getCustomerLink = (invoice: Invoice) => {
    const basePath = invoice.customerType === "primary_csp" ? "primary-csps" : "partners";
    return `/dashboard/admin/users/${basePath}/${invoice.customerId}`;
  };

  return (
    <TableRow>
      <TableCell className="font-mono text-xs text-muted-foreground">
        {invoice.id.replace("inv_", "")}
      </TableCell>
      <TableCell className="text-sm">{invoice.date}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <Link
            href={getCustomerLink(invoice)}
            className="font-medium hover:underline"
          >
            {invoice.customerName}
          </Link>
          <CustomerTypeBadge type={invoice.customerType} />
        </div>
      </TableCell>
      <TableCell className="font-mono text-sm">
        {invoice.invoiceNumber}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {invoice.description}
      </TableCell>
      <TableCell className="text-right font-semibold">
        ${invoice.amount.toLocaleString()}
      </TableCell>
      <TableCell>
        <InvoiceStatusBadge status={invoice.status} />
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => console.log("View invoice:", invoice.id)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Download PDF:", invoice.id)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </DropdownMenuItem>

            {(invoice.status === "overdue" || invoice.status === "failed") && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => console.log("Send reminder:", invoice.customerId)}
                  className="text-yellow-600 dark:text-yellow-400"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminder
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Retry payment:", invoice.id)}
                  className="text-blue-600 dark:text-blue-400"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry Payment
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}