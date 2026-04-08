import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Plus } from "lucide-react";
import { InvoiceFilters } from "./invoices/InvoiceFilters";
import { InvoiceTableRow } from "./invoices/InvoiceTableRow";
import { mockInvoices } from "./invoices/mockInvoices";

type InvoiceStatus = "paid" | "pending" | "overdue" | "failed";

export function InvoicesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<InvoiceStatus | "all">("all");
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Calculate status counts
  const statusCounts = {
    paid: mockInvoices.filter((i) => i.status === "paid").length,
    pending: mockInvoices.filter((i) => i.status === "pending").length,
    overdue: mockInvoices.filter((i) => i.status === "overdue").length,
    failed: mockInvoices.filter((i) => i.status === "failed").length,
  };

  // Filter invoices
  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesFilter = activeFilter === "all" || invoice.status === activeFilter;
    const matchesSearch =
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      console.log("Exporting invoice data...");
      setIsExporting(false);
    }, 1500);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      console.log("Generating new invoices...");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
            <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track all platform invoices
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleGenerate} disabled={isGenerating} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Invoice"}
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? "Exporting..." : "Export Report"}
          </Button>
        </div>
      </div>

      <Card>
        <InvoiceFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          statusCounts={statusCounts}
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    No invoices found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <InvoiceTableRow key={invoice.id} invoice={invoice} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}