import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Search, Eye, CheckCircle, XCircle, FileText } from "lucide-react";

interface KYCApplication {
  id: string;
  date: string;
  applicant: string;
  type: "Primary CSP" | "Partner";
  status: "Pending" | "In Review" | "Docs Needed" | "Approved" | "Rejected";
  documents: string[];
  submittedBy: string;
  email: string;
}

export function KYCManagementView() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<KYCApplication | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");

  const applications: KYCApplication[] = [
    {
      id: "001",
      date: "15 Apr 24",
      applicant: "Dubai Corp",
      type: "Primary CSP",
      status: "Pending",
      documents: ["Certificate.pdf", "License.pdf", "Insurance.pdf"],
      submittedBy: "John Smith",
      email: "john@dubaicorp.com",
    },
    {
      id: "002",
      date: "15 Apr 24",
      applicant: "Malta CSP",
      type: "Partner",
      status: "Pending",
      documents: ["Registration.pdf", "ID.pdf"],
      submittedBy: "Maria Garcia",
      email: "maria@maltacsp.com",
    },
    {
      id: "003",
      date: "14 Apr 24",
      applicant: "Panama Trust",
      type: "Partner",
      status: "In Review",
      documents: ["Trust Deed.pdf", "License.pdf"],
      submittedBy: "Carlos Rivera",
      email: "carlos@panamatrust.com",
    },
    {
      id: "004",
      date: "14 Apr 24",
      applicant: "Bahamas Ltd",
      type: "Primary CSP",
      status: "Docs Needed",
      documents: ["Certificate.pdf"],
      submittedBy: "Sarah Johnson",
      email: "sarah@bahamasltd.com",
    },
    {
      id: "005",
      date: "13 Apr 24",
      applicant: "Singapore Partners",
      type: "Partner",
      status: "Approved",
      documents: ["License.pdf", "Insurance.pdf", "Registration.pdf"],
      submittedBy: "Wei Chen",
      email: "wei@singaporepartners.com",
    },
  ];

  const stats = {
    pending: 12,
    inProgress: 8,
    completedToday: 6,
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log("Refreshing KYC data...");
      setIsRefreshing(false);
    }, 1000);
  };

  const handleReview = (app: KYCApplication) => {
    setSelectedApplication(app);
    setReviewDialogOpen(true);
  };

  const handleApprove = () => {
    console.log("Approving application:", selectedApplication?.id);
    console.log("Review notes:", reviewNotes);
    setReviewDialogOpen(false);
    setReviewNotes("");
  };

  const handleReject = () => {
    console.log("Rejecting application:", selectedApplication?.id);
    console.log("Rejection reason:", reviewNotes);
    setReviewDialogOpen(false);
    setReviewNotes("");
  };

  const handleRequestDocs = () => {
    console.log("Requesting additional documents from:", selectedApplication?.id);
    console.log("Document request:", reviewNotes);
    setReviewDialogOpen(false);
    setReviewNotes("");
  };

  const getStatusBadge = (status: KYCApplication["status"]) => {
    const variants: Record<KYCApplication["status"], { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> = {
      Pending: { variant: "outline", className: "border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400" },
      "In Review": { variant: "outline", className: "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400" },
      "Docs Needed": { variant: "outline", className: "border-orange-600 text-orange-600 dark:border-orange-400 dark:text-orange-400" },
      Approved: { variant: "outline", className: "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400" },
      Rejected: { variant: "destructive", className: "" },
    };
    return variants[status];
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">KYC Management</h1>
          <p className="text-muted-foreground mt-1">
            Review and approve KYC applications from service providers
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
              <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending KYC</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Today</p>
              <p className="text-2xl font-bold">{stats.completedToday}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, company, or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-mono text-sm">{app.id}</TableCell>
                <TableCell>{app.date}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{app.applicant}</p>
                    <p className="text-sm text-muted-foreground">{app.submittedBy}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{app.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge {...getStatusBadge(app.status)}>{app.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReview(app)}
                  >
                    {app.status === "In Review" ? "Continue" : "Review"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review KYC Application</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Application ID</Label>
                  <p className="text-sm font-mono mt-1">{selectedApplication.id}</p>
                </div>
                <div>
                  <Label>Date Submitted</Label>
                  <p className="text-sm mt-1">{selectedApplication.date}</p>
                </div>
                <div>
                  <Label>Applicant</Label>
                  <p className="text-sm mt-1">{selectedApplication.applicant}</p>
                </div>
                <div>
                  <Label>Type</Label>
                  <Badge variant="outline" className="mt-1">
                    {selectedApplication.type}
                  </Badge>
                </div>
                <div>
                  <Label>Submitted By</Label>
                  <p className="text-sm mt-1">{selectedApplication.submittedBy}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm mt-1">{selectedApplication.email}</p>
                </div>
              </div>

              <div>
                <Label>Documents Submitted</Label>
                <div className="mt-2 space-y-2">
                  {selectedApplication.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doc}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="review-notes">Review Notes</Label>
                <Textarea
                  id="review-notes"
                  placeholder="Add notes about this application..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  onClick={handleApprove}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  onClick={handleRequestDocs}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Request Docs
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={handleReject}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}