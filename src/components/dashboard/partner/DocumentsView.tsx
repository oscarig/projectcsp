import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Upload,
  Search,
  Eye,
  Share2,
  Download,
} from "lucide-react";

export function DocumentsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [selectedEngagement, setSelectedEngagement] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");

  const engagements = [
    { id: "1", ref: "SP-2024-042", title: "Singapore Formation" },
    { id: "2", ref: "SP-2024-045", title: "Singapore CoSec" },
    { id: "3", ref: "SP-2024-048", title: "Startup Formation" },
  ];

  const documentTypes = [
    "Filing Document",
    "Draft",
    "Final",
    "Client Document",
    "Certificate",
    "Other",
  ];

  const recentDocuments = [
    {
      id: 1,
      name: "name_reservation_SP042.pdf",
      engagement: "SP-2024-042",
      engagementTitle: "Singapore Formation",
      uploaded: "12 Apr 2024",
      type: "Filing Document",
      fromClient: false,
      watermarked: false,
    },
    {
      id: 2,
      name: "filing_draft_SP045.pdf",
      engagement: "SP-2024-045",
      engagementTitle: "Singapore CoSec",
      uploaded: "13 Apr 2024",
      type: "Draft",
      fromClient: false,
      watermarked: false,
    },
    {
      id: 3,
      name: "passport_john.pdf",
      engagement: "SP-2024-042",
      engagementTitle: "Singapore Formation",
      uploaded: "12 Apr 2024",
      type: "Client Document",
      fromClient: true,
      watermarked: true,
    },
    {
      id: 4,
      name: "certificate_SP038.pdf",
      engagement: "SP-2024-038",
      engagementTitle: "HK Company Formation",
      uploaded: "10 Apr 2024",
      type: "Final",
      fromClient: false,
      watermarked: false,
    },
  ];

  const documentsByEngagement = [
    {
      ref: "SP-2024-042",
      title: "Singapore Formation",
      count: 5,
      engagementId: "1",
    },
    {
      ref: "SP-2024-045",
      title: "Singapore CoSec",
      count: 3,
      engagementId: "2",
    },
    {
      ref: "SP-2024-048",
      title: "Startup Formation",
      count: 4,
      engagementId: "3",
    },
  ];

  const handleUpload = () => {
    console.log("Upload document", { selectedEngagement, selectedDocType });
    // Handle file upload logic here
  };

  const filteredDocuments = recentDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterTab === "all" || 
      (filterTab === "client" && doc.fromClient) ||
      (filterTab === "partner" && !doc.fromClient);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage documents for your engagements
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Tabs value={filterTab} onValueChange={setFilterTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="engagement">By Engagement</TabsTrigger>
            <TabsTrigger value="client">Client Docs</TabsTrigger>
            <TabsTrigger value="partner">Your Docs</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Quick Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Upload</CardTitle>
          <CardDescription>
            Upload documents directly to an engagement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Drag & Drop Area */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop files here or
            </p>
            <Button variant="secondary" size="sm">
              Browse Files
            </Button>
          </div>

          {/* Upload Options */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select engagement</label>
              <Select value={selectedEngagement} onValueChange={setSelectedEngagement}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose engagement..." />
                </SelectTrigger>
                <SelectContent>
                  {engagements.map((engagement) => (
                    <SelectItem key={engagement.id} value={engagement.id}>
                      {engagement.ref} - {engagement.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Document type</label>
              <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose type..." />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(" ", "-")}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleUpload}
            disabled={!selectedEngagement || !selectedDocType}
          >
            Upload Document
          </Button>
        </CardContent>
      </Card>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No documents found</p>
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <FileText className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{doc.name}</p>
                    {doc.watermarked && (
                      <Badge variant="secondary" className="text-xs">
                        watermarked
                      </Badge>
                    )}
                    {doc.fromClient && (
                      <Badge variant="outline" className="text-xs">
                        Client
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Engagement: {doc.engagement}</span>
                    <span>•</span>
                    <span>{doc.fromClient ? "From: Client" : `Uploaded: ${doc.uploaded}`}</span>
                    {!doc.fromClient && (
                      <>
                        <span>•</span>
                        <span>Type: {doc.type}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  {!doc.fromClient && (
                    <Button size="sm" variant="ghost">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Documents by Engagement */}
      <Card>
        <CardHeader>
          <CardTitle>Documents by Engagement</CardTitle>
          <CardDescription>
            View all documents organized by engagement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {documentsByEngagement.map((engagement) => (
            <div
              key={engagement.ref}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">
                    {engagement.ref} ({engagement.title})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {engagement.count} document{engagement.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}