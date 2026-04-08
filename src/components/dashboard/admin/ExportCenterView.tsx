import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileDown,
  Download,
  Calendar,
  Clock,
  FileText,
  Edit,
  Power,
  Plus,
} from "lucide-react";

export function ExportCenterView() {
  const [isNewExportOpen, setIsNewExportOpen] = useState(false);
  const [exportType, setExportType] = useState("financial");
  const [exportFormat, setExportFormat] = useState("pdf");

  const recentExports = [
    {
      id: "export_001",
      name: "Financial Report Q1 2024",
      date: "1 Apr 2024",
      format: "PDF",
      size: "2.4 MB",
    },
    {
      id: "export_002",
      name: "User List",
      date: "15 Apr 2024",
      format: "CSV",
      size: "156 KB",
    },
    {
      id: "export_003",
      name: "Subscription Report",
      date: "15 Apr 2024",
      format: "PDF",
      size: "1.8 MB",
    },
  ];

  const scheduledExports = [
    {
      id: "schedule_001",
      name: "Monthly Financial Report",
      frequency: "1st of month",
      format: "PDF",
      recipients: "admin@globalcspconnect.com",
      status: "active",
    },
    {
      id: "schedule_002",
      name: "Weekly User Report",
      frequency: "Monday",
      format: "CSV",
      recipients: "team@globalcspconnect.com",
      status: "active",
    },
  ];

  const handleDownload = (exportId: string) => {
    console.log(`Downloading export: ${exportId}...`);
  };

  const handleCreateExport = () => {
    console.log("Creating new export:", { exportType, exportFormat });
    setIsNewExportOpen(false);
  };

  const handleToggleSchedule = (scheduleId: string, enabled: boolean) => {
    console.log(`Toggling schedule ${scheduleId}: ${enabled}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileDown className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            Export Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Download reports and manage scheduled exports
          </p>
        </div>
        <Button onClick={() => setIsNewExportOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Export
        </Button>
      </div>

      {/* Recent Exports */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Recent Exports
        </h2>

        <div className="space-y-3">
          {recentExports.map((exportItem) => (
            <div
              key={exportItem.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{exportItem.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Generated {exportItem.date} · {exportItem.format} · {exportItem.size}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(exportItem.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Exports */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Scheduled Exports
        </h2>

        <div className="space-y-3">
          {scheduledExports.map((schedule) => (
            <div
              key={schedule.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center gap-3 flex-1">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{schedule.name}</span>
                    <Badge
                      variant={schedule.status === "active" ? "default" : "secondary"}
                    >
                      {schedule.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {schedule.frequency} · {schedule.format} · {schedule.recipients}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleToggleSchedule(
                      schedule.id,
                      schedule.status !== "active"
                    )
                  }
                >
                  <Power
                    className={`h-4 w-4 ${
                      schedule.status === "active"
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* New Export Dialog */}
      <Dialog open={isNewExportOpen} onOpenChange={setIsNewExportOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Export</DialogTitle>
            <DialogDescription>
              Generate a report or data export
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Export Type */}
            <div className="space-y-2">
              <Label>Export Type</Label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial Report</SelectItem>
                  <SelectItem value="growth">Growth Report</SelectItem>
                  <SelectItem value="activity">User Activity Report</SelectItem>
                  <SelectItem value="users">User List</SelectItem>
                  <SelectItem value="subscriptions">Subscription Data</SelectItem>
                  <SelectItem value="engagements">Engagement Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select defaultValue="last-30-days">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="last-12-months">Last 12 Months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Format */}
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                  <SelectItem value="xlsx">Excel Workbook</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email Option */}
            <div className="flex items-center space-x-2">
              <Checkbox id="email" />
              <Label htmlFor="email" className="text-sm font-normal">
                Email report when ready
              </Label>
            </div>

            {/* Email Recipients (conditional) */}
            <div className="space-y-2">
              <Label htmlFor="recipients">Email Recipients (optional)</Label>
              <Input
                id="recipients"
                placeholder="admin@globalcspconnect.com"
                type="email"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsNewExportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateExport}>
              <FileDown className="h-4 w-4 mr-2" />
              Generate Export
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}