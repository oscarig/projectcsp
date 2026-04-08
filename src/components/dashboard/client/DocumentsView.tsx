import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Search,
  FileText,
  Eye,
  Download,
  Briefcase,
  ArrowRight,
} from "lucide-react";

type FilterType = "all" | "by-engagement" | "received";

interface Document {
  id: string;
  name: string;
  engagement: string;
  date: string;
  type: "Uploaded" | "Received";
}

interface EngagementGroup {
  name: string;
  count: number;
  id: string;
}

export function DocumentsView() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEngagement, setSelectedEngagement] = useState("singapore");
  const [isDragging, setIsDragging] = useState(false);

  // Sample documents data
  const documents: Document[] = [
    {
      id: "1",
      name: "passport_john.pdf",
      engagement: "Singapore Formation",
      date: "12 Apr 2024",
      type: "Uploaded",
    },
    {
      id: "2",
      name: "utility_bill.pdf",
      engagement: "Singapore Formation",
      date: "12 Apr 2024",
      type: "Uploaded",
    },
    {
      id: "3",
      name: "signed_engagement_letter.pdf",
      engagement: "Singapore Formation",
      date: "10 Apr 2024",
      type: "Received",
    },
    {
      id: "4",
      name: "name_reservation.pdf",
      engagement: "Singapore Formation",
      date: "12 Apr 2024",
      type: "Received",
    },
    {
      id: "5",
      name: "financial_statements.pdf",
      engagement: "BVI Annual Filing",
      date: "8 Apr 2024",
      type: "Uploaded",
    },
    {
      id: "6",
      name: "filing_confirmation.pdf",
      engagement: "BVI Annual Filing",
      date: "9 Apr 2024",
      type: "Received",
    },
  ];

  // Engagement groups
  const engagementGroups: EngagementGroup[] = [
    { id: "1", name: "Singapore Formation", count: 4 },
    { id: "2", name: "BVI Annual Filing", count: 2 },
    { id: "3", name: "UK Company Formation", count: 6 },
  ];

  // Engagement options for selector
  const engagementOptions = [
    { value: "singapore", label: "Singapore Formation" },
    { value: "bvi", label: "BVI Annual Filing" },
    { value: "uk", label: "UK Company Formation" },
  ];

  // Filter documents based on filter type and search query
  const getFilteredDocuments = () => {
    let filtered = documents;

    // Apply filter
    if (filter === "received") {
      filtered = filtered.filter((doc) => doc.type === "Received");
    } else if (filter === "by-engagement") {
      // Group by engagement logic handled separately
      filtered = filtered;
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.engagement.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredDocuments = getFilteredDocuments();

  // Event handlers
  const handleUpload = () => {
    console.log("Open upload modal");
  };

  const handleViewDocument = (id: string) => {
    console.log("View document:", id);
  };

  const handleDownloadDocument = (id: string) => {
    console.log("Download document:", id);
  };

  const handleViewEngagement = (id: string) => {
    console.log("View engagement documents:", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    console.log("Files dropped:", e.dataTransfer.files);
  };

  const handleBrowseFiles = () => {
    console.log("Browse files");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your documents in one place
          </p>
        </div>
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="by-engagement">By Engagement</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Quick Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Upload</CardTitle>
          <CardDescription>
            Upload documents directly to an engagement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop files here or{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold"
                onClick={handleBrowseFiles}
              >
                browse files
              </Button>
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Select engagement:</label>
            <Select
              value={selectedEngagement}
              onValueChange={setSelectedEngagement}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {engagementOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Recent Documents or By Engagement View */}
      {filter === "by-engagement" ? (
        <Card>
          <CardHeader>
            <CardTitle>Documents by Engagement</CardTitle>
            <CardDescription>
              View documents organized by engagement
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {engagementGroups.map((group) => (
                <div
                  key={group.id}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleViewEngagement(group.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{group.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {group.count} document{group.count !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              {filter === "received" ? "Received Documents" : "Recent Documents"}
            </CardTitle>
            <CardDescription>
              {filteredDocuments.length} document
              {filteredDocuments.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {filteredDocuments.length > 0 ? (
              <div className="divide-y">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <FileText className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Engagement: {doc.engagement} · {doc.type}:{" "}
                            {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDocument(doc.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadDocument(doc.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm font-medium mb-1">No documents found</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search"
                    : "Upload your first document to get started"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}