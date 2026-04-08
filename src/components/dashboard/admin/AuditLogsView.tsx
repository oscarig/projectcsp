import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, RefreshCw } from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
  userAgent: string;
}

export function AuditLogsView() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [dateRange, setDateRange] = useState("7days");
  const [userFilter, setUserFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");

  const auditLogs: AuditLog[] = [
    {
      id: "001",
      timestamp: "15 Apr 10:30",
      user: "admin@platform.com",
      action: "User Approved",
      details: "Dubai Corp approved",
      ipAddress: "192.168.1.1",
      userAgent: "Chrome/122.0",
    },
    {
      id: "002",
      timestamp: "15 Apr 09:15",
      user: "system",
      action: "Subscription Payment",
      details: "London CSP · $1,000 received",
      ipAddress: "stripe.com",
      userAgent: "Stripe Webhook",
    },
    {
      id: "003",
      timestamp: "14 Apr 16:20",
      user: "london@csp.com",
      action: "Document Uploaded",
      details: "passport.pdf viewed by partner",
      ipAddress: "82.45.123.45",
      userAgent: "Safari/17.2",
    },
    {
      id: "004",
      timestamp: "14 Apr 14:10",
      user: "admin@platform.com",
      action: "Plan Updated",
      details: "Professional price changed from $99 to $89",
      ipAddress: "192.168.1.1",
      userAgent: "Chrome/122.0",
    },
    {
      id: "005",
      timestamp: "14 Apr 11:45",
      user: "malta@csp.com",
      action: "Quote Sent",
      details: "Quote #Q-2024-156 sent to Acme Corp",
      ipAddress: "94.23.45.67",
      userAgent: "Firefox/124.0",
    },
    {
      id: "006",
      timestamp: "13 Apr 18:30",
      user: "admin@platform.com",
      action: "User Rejected",
      details: "Suspicious Activity Ltd rejected",
      ipAddress: "192.168.1.1",
      userAgent: "Chrome/122.0",
    },
    {
      id: "007",
      timestamp: "13 Apr 15:20",
      user: "dubai@formation.com",
      action: "License Renewed",
      details: "Trade License renewed until 2025",
      ipAddress: "156.78.90.12",
      userAgent: "Edge/122.0",
    },
    {
      id: "008",
      timestamp: "13 Apr 12:00",
      user: "system",
      action: "Invoice Generated",
      details: "Invoice #INV-2024-345 for Singapore Partners",
      ipAddress: "stripe.com",
      userAgent: "Stripe Webhook",
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log("Refreshing audit logs...");
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      console.log("Exporting audit logs as CSV...");
      setIsExporting(false);
    }, 1500);
  };

  const getActionBadge = (action: string) => {
    const actionTypes: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
      "User Approved": { variant: "outline", className: "border-green-600 text-green-600" },
      "User Rejected": { variant: "destructive", className: "" },
      "Subscription Payment": { variant: "outline", className: "border-blue-600 text-blue-600" },
      "Document Uploaded": { variant: "outline", className: "border-purple-600 text-purple-600" },
      "Plan Updated": { variant: "outline", className: "border-amber-600 text-amber-600" },
      "Quote Sent": { variant: "outline", className: "border-cyan-600 text-cyan-600" },
      "License Renewed": { variant: "outline", className: "border-teal-600 text-teal-600" },
      "Invoice Generated": { variant: "outline", className: "border-indigo-600 text-indigo-600" },
    };
    return actionTypes[action] || { variant: "outline" as const, className: "" };
  };

  const filteredLogs = auditLogs.filter((log) => {
    if (userFilter !== "all" && !log.user.includes(userFilter)) return false;
    if (actionFilter !== "all" && log.action !== actionFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">
            Track all system activities and user actions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-6 border-b">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Date Range:</span>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="12months">Last 12 Months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">User:</span>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="admin">Admin Only</SelectItem>
                  <SelectItem value="system">System Only</SelectItem>
                  <SelectItem value="csp">CSP Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Action:</span>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="User Approved">User Approved</SelectItem>
                  <SelectItem value="User Rejected">User Rejected</SelectItem>
                  <SelectItem value="Subscription Payment">Subscription Payment</SelectItem>
                  <SelectItem value="Document Uploaded">Document Uploaded</SelectItem>
                  <SelectItem value="Plan Updated">Plan Updated</SelectItem>
                  <SelectItem value="Quote Sent">Quote Sent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{log.user}</span>
                    {log.user === "system" && (
                      <Badge variant="secondary" className="text-xs">
                        System
                      </Badge>
                    )}
                    {log.user.includes("admin") && (
                      <Badge variant="secondary" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge {...getActionBadge(log.action)}>{log.action}</Badge>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{log.details}</p>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {log.ipAddress}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}