import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Upload,
  FileText,
  Download,
  Share2,
  Trash2,
  Eye,
  ChevronRight,
} from "lucide-react";

export function DocumentsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "client" | "engagement">("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const documents = [
    {
      id: "1",
      name: "passport_john.pdf",
      date: "12 Apr 2024",
      client: "Tech Innovators",
      engagement: "Singapore Formation",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "utility_bill.pdf",
      date: "12 Apr 2024",
      client: "Tech Innovators",
      engagement: "Singapore Formation",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "engagement_letter_sp042.pdf",
      date: "10 Apr 2024",
      client: "Tech Innovators",
      engagement: "Singapore Formation",
      size: "485 KB",
    },
    {
      id: "4",
      name: "annual_filing_draft.pdf",
      date: "5 Apr 2024",
      client: "Global Trading",
      engagement: "BVI Filing",
      size: "3.2 MB",
    },
  ];

  const clientDocuments = [
    { client: "Tech Innovators Ltd", count: 8 },
    { client: "Global Trading Co", count: 5 },
    { client: "Ocean Holdings Ltd", count: 6 },
  ];

  const storageUsed = 2.4;
  const storageTotal = 10;
  const storagePercentage = (storageUsed / storageTotal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">DOCUMENTS</h1>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Upload a new document to your document library
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Tech Innovators Ltd</SelectItem>
                    <SelectItem value="global">Global Trading Co</SelectItem>
                    <SelectItem value="ocean">Ocean Holdings Ltd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="engagement">Engagement (Optional)</Label>
                <Select>
                  <SelectTrigger id="engagement">
                    <SelectValue placeholder="Select engagement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sg">Singapore Formation</SelectItem>
                    <SelectItem value="bvi">BVI Filing</SelectItem>
                    <SelectItem value="cayman">Cayman Fund Formation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input id="file" type="file" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setUploadDialogOpen(false)}>Upload</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "client" ? "default" : "outline"}
                onClick={() => setFilterType("client")}
              >
                By Client
              </Button>
              <Button
                variant={filterType === "engagement" ? "default" : "outline"}
                onClick={() => setFilterType("engagement")}
              >
                By Engagement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle>RECENT DOCUMENTS (Last 30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{doc.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {doc.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Client: {doc.client} · Engagement: {doc.engagement}
                    </p>
                    <p className="text-xs text-muted-foreground">{doc.size}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents by Client */}
      <Card>
        <CardHeader>
          <CardTitle>DOCUMENTS BY CLIENT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clientDocuments.map((item) => (
              <div
                key={item.client}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.client}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.count} documents
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Storage */}
      <Card>
        <CardHeader>
          <CardTitle>STORAGE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Used: {storageUsed} GB of {storageTotal} GB
              </span>
              <span className="font-medium">{storagePercentage.toFixed(0)}% used</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all"
                style={{ width: `${storagePercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}