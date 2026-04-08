import { useState } from "react";
import { Card } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, FileText, Shield, CheckCircle, XCircle, Eye } from "lucide-react";

interface VerificationItem {
  id: string;
  submitted: string;
  company: string;
  jurisdiction: string;
  documents: string[];
  type: "license" | "insurance";
  expiryDate?: string;
  status: "pending" | "verified" | "rejected";
}

export function VerificationQueueView() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState("");

  const licenseVerifications: VerificationItem[] = [
    {
      id: "005",
      submitted: "14 Apr 24",
      company: "Malta CSP",
      jurisdiction: "Malta",
      documents: ["License.pdf", "Insurance.pdf"],
      type: "license",
      expiryDate: "31 Dec 2024",
      status: "pending",
    },
    {
      id: "007",
      submitted: "13 Apr 24",
      company: "Dubai Formation",
      jurisdiction: "UAE",
      documents: ["Trade License.pdf"],
      type: "license",
      expiryDate: "15 Aug 2024",
      status: "pending",
    },
    {
      id: "008",
      submitted: "12 Apr 24",
      company: "Singapore Trust",
      jurisdiction: "Singapore",
      documents: ["License.pdf", "Registration.pdf"],
      type: "license",
      expiryDate: "30 Jun 2025",
      status: "pending",
    },
  ];

  const insuranceVerifications: VerificationItem[] = [
    {
      id: "006",
      submitted: "13 Apr 24",
      company: "BVI Trust",
      jurisdiction: "BVI",
      documents: ["PI Renewal.pdf"],
      type: "insurance",
      expiryDate: "20 May 2024",
      status: "pending",
    },
    {
      id: "009",
      submitted: "12 Apr 24",
      company: "London Accountants",
      jurisdiction: "UK",
      documents: ["PI Certificate.pdf"],
      type: "insurance",
      expiryDate: "01 Jul 2024",
      status: "pending",
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log("Refreshing verification queue...");
      setIsRefreshing(false);
    }, 1000);
  };

  const handleVerify = (item: VerificationItem) => {
    setSelectedItem(item);
    setVerifyDialogOpen(true);
  };

  const handleApprove = () => {
    console.log("Approving verification:", selectedItem?.id);
    console.log("Notes:", verificationNotes);
    setVerifyDialogOpen(false);
    setVerificationNotes("");
  };

  const handleReject = () => {
    console.log("Rejecting verification:", selectedItem?.id);
    console.log("Reason:", verificationNotes);
    setVerifyDialogOpen(false);
    setVerificationNotes("");
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 60 && daysUntilExpiry >= 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Verification Queue</h1>
          <p className="text-muted-foreground mt-1">
            Review license and insurance documentation
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

      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">License Verification</h2>
              <p className="text-sm text-muted-foreground">
                {licenseVerifications.length} pending verifications
              </p>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Jurisdiction</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {licenseVerifications.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-sm">{item.id}</TableCell>
                <TableCell>{item.submitted}</TableCell>
                <TableCell className="font-medium">{item.company}</TableCell>
                <TableCell>{item.jurisdiction}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.expiryDate}</span>
                    {isExpiringSoon(item.expiryDate) && (
                      <Badge variant="outline" className="border-amber-600 text-amber-600">
                        Expiring Soon
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {item.documents.map((doc, idx) => (
                      <span key={idx} className="text-sm text-muted-foreground">
                        {doc}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerify(item)}
                  >
                    Verify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Insurance Verification</h2>
              <p className="text-sm text-muted-foreground">
                {insuranceVerifications.length} pending verifications
              </p>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Jurisdiction</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insuranceVerifications.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-sm">{item.id}</TableCell>
                <TableCell>{item.submitted}</TableCell>
                <TableCell className="font-medium">{item.company}</TableCell>
                <TableCell>{item.jurisdiction}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.expiryDate}</span>
                    {isExpiringSoon(item.expiryDate) && (
                      <Badge variant="outline" className="border-amber-600 text-amber-600">
                        Expiring Soon
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {item.documents.map((doc, idx) => (
                      <span key={idx} className="text-sm text-muted-foreground">
                        {doc}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerify(item)}
                  >
                    Verify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Verify {selectedItem?.type === "license" ? "License" : "Insurance"}
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Verification ID</Label>
                  <p className="text-sm font-mono mt-1">{selectedItem.id}</p>
                </div>
                <div>
                  <Label>Date Submitted</Label>
                  <p className="text-sm mt-1">{selectedItem.submitted}</p>
                </div>
                <div>
                  <Label>Company</Label>
                  <p className="text-sm mt-1">{selectedItem.company}</p>
                </div>
                <div>
                  <Label>Jurisdiction</Label>
                  <p className="text-sm mt-1">{selectedItem.jurisdiction}</p>
                </div>
                <div>
                  <Label>Expiry Date</Label>
                  <p className="text-sm mt-1">{selectedItem.expiryDate || "N/A"}</p>
                </div>
                <div>
                  <Label>Type</Label>
                  <Badge variant="outline" className="mt-1">
                    {selectedItem.type === "license" ? "License" : "Insurance"}
                  </Badge>
                </div>
              </div>

              <div>
                <Label>Documents</Label>
                <div className="mt-2 space-y-2">
                  {selectedItem.documents.map((doc, idx) => (
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
                <Label htmlFor="verification-notes">Verification Notes</Label>
                <Textarea
                  id="verification-notes"
                  placeholder="Add notes about this verification..."
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
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