import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  Eye,
  FileText,
} from "lucide-react";

type KYBStatus = "pending" | "approved" | "rejected";

interface Provider {
  id: string;
  company: string;
  contactName: string;
  email: string;
  services: string[];
  kybStatus: KYBStatus;
  submittedDate: string;
}

const mockProviders: Provider[] = [
  {
    id: "001",
    company: "London CSP",
    contactName: "Michael Chen",
    email: "michael@londoncsp.com",
    services: ["Company Formation", "Bank Accounts", "Accounting"],
    kybStatus: "approved",
    submittedDate: "15 Jan 24",
  },
  {
    id: "002",
    company: "Singapore CSP",
    contactName: "Sarah Lee",
    email: "sarah@singaporecsp.com",
    services: ["Company Formation", "Virtual Office"],
    kybStatus: "approved",
    submittedDate: "20 Jan 24",
  },
  {
    id: "003",
    company: "New York Law",
    contactName: "Sarah Jones",
    email: "sarah@nylawfirm.com",
    services: ["Legal Services"],
    kybStatus: "pending",
    submittedDate: "14 Apr 24",
  },
  {
    id: "004",
    company: "BVI Trust",
    contactName: "David Wong",
    email: "david@bvitrust.com",
    services: ["Trust Services", "Company Formation"],
    kybStatus: "pending",
    submittedDate: "13 Apr 24",
  },
  {
    id: "005",
    company: "Dubai Accounting",
    contactName: "Ahmed Hassan",
    email: "ahmed@dubaiaccounting.com",
    services: ["Accounting", "Tax Advisory"],
    kybStatus: "rejected",
    submittedDate: "10 Apr 24",
  },
];

export function ProvidersView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | KYBStatus>("all");

  const filteredProviders = mockProviders.filter((provider) => {
    const matchesFilter = activeFilter === "all" || provider.kybStatus === activeFilter;
    const matchesSearch =
      provider.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.id.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: mockProviders.length,
    approved: mockProviders.filter((p) => p.kybStatus === "approved").length,
    pending: mockProviders.filter((p) => p.kybStatus === "pending").length,
    rejected: mockProviders.filter((p) => p.kybStatus === "rejected").length,
  };

  const getStatusBadge = (status: KYBStatus) => {
    const config = {
      approved: {
        icon: CheckCircle2,
        label: "Approved",
        className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      },
      pending: {
        icon: Clock,
        label: "Pending Review",
        className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      },
      rejected: {
        icon: XCircle,
        label: "Rejected",
        className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      },
    };
    return config[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Provider KYB Verification</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review and approve service provider applications
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by company, name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
            >
              All Providers
            </Button>
            <Button
              variant={activeFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={activeFilter === "approved" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("approved")}
            >
              Approved
            </Button>
            <Button
              variant={activeFilter === "rejected" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("rejected")}
            >
              Rejected
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Total: {stats.total}</span>
            <span>•</span>
            <span className="text-green-600 dark:text-green-400">Approved: {stats.approved}</span>
            <span>•</span>
            <span className="text-yellow-600 dark:text-yellow-400">Pending: {stats.pending}</span>
            <span>•</span>
            <span className="text-red-600 dark:text-red-400">Rejected: {stats.rejected}</span>
          </div>
        </div>
      </Card>

      {/* Providers Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No providers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProviders.map((provider) => {
                  const statusBadge = getStatusBadge(provider.kybStatus);
                  const StatusIcon = statusBadge.icon;

                  return (
                    <TableRow key={provider.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {provider.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{provider.company}</div>
                          <div className="text-sm text-muted-foreground">{provider.contactName}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{provider.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {provider.services.slice(0, 2).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {provider.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{provider.services.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusBadge.className}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {provider.submittedDate}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/admin/providers/kyb-queue`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Review Application
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Documents
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {provider.kybStatus === "pending" && (
                              <>
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}