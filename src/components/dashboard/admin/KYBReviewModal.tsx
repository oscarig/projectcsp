import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileCheck,
  Eye,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building,
  User,
  Calendar,
  FileText,
  Shield,
} from "lucide-react";

export type UserType = "primary" | "partner";

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedDate: string;
  fileSize: string;
}

export interface PendingUser {
  id: string;
  company: string;
  legalName: string;
  type: UserType;
  jurisdiction?: string;
  contactName: string;
  email: string;
  submittedDate: string;
  documents: Document[];
  pendingDocs?: string[];
}

interface VerificationCheck {
  id: string;
  label: string;
  checked: boolean;
  description: string;
}

// Comprehensive mock data to support both views
const detailedMockUsers: PendingUser[] = [
  // From Queue View
  {
    id: "001",
    company: "Dubai Corp",
    legalName: "Dubai Corp FZE",
    type: "primary",
    contactName: "Ahmed Al Maktoum",
    email: "ahmed@dubaicorp.ae",
    submittedDate: "14 Apr 24",
    documents: [
      { id: "1", name: "trade_license.pdf", type: "Trade License", uploadedDate: "14 Apr 2024", fileSize: "2.4 MB" },
      { id: "2", name: "passport_ahmed.pdf", type: "Director ID", uploadedDate: "14 Apr 2024", fileSize: "1.8 MB" },
      { id: "3", name: "proof_of_address.pdf", type: "Proof of Address", uploadedDate: "14 Apr 2024", fileSize: "1.2 MB" },
      { id: "4", name: "memorandum.pdf", type: "Memorandum", uploadedDate: "14 Apr 2024", fileSize: "3.1 MB" },
    ],
  },
  {
    id: "002",
    company: "Cayman Fund Services",
    legalName: "Cayman Fund Services Ltd",
    type: "partner",
    jurisdiction: "Cayman Islands",
    contactName: "Robert Smith",
    email: "robert@caymanfund.com",
    submittedDate: "14 Apr 24",
    documents: [
      { id: "5", name: "license.pdf", type: "License", uploadedDate: "14 Apr 2024", fileSize: "2.1 MB" },
      { id: "6", name: "pi_insurance.pdf", type: "PI Insurance", uploadedDate: "14 Apr 2024", fileSize: "1.5 MB" },
      { id: "7", name: "cyber_insurance.pdf", type: "Cyber Insurance", uploadedDate: "14 Apr 2024", fileSize: "1.3 MB" },
    ],
  },
  {
    id: "003",
    company: "Panama Trust",
    legalName: "Panama Trust Services SA",
    type: "partner",
    jurisdiction: "Panama",
    contactName: "Carlos Rivera",
    email: "carlos@panamatrust.com",
    submittedDate: "13 Apr 24",
    documents: [
      { id: "8", name: "license.pdf", type: "License", uploadedDate: "13 Apr 2024", fileSize: "1.9 MB" },
      { id: "9", name: "pi_insurance.pdf", type: "PI Insurance", uploadedDate: "13 Apr 2024", fileSize: "1.4 MB" },
    ],
    pendingDocs: ["Cyber Insurance"],
  },
  // From Providers View (matching IDs "1", "2" etc loosely or mapping them)
  {
    id: "1",
    company: "UK Formation Pros Ltd",
    legalName: "UK Formation Pros Ltd",
    type: "primary",
    jurisdiction: "United Kingdom",
    contactName: "Sarah Jenkins",
    email: "sarah@ukformation.com",
    submittedDate: "10 Feb 24",
    documents: [
      { id: "101", name: "inc_cert.pdf", type: "Certificate of Incorporation", uploadedDate: "10 Feb 2024", fileSize: "1.5 MB" },
    ],
  },
];

interface KYBReviewModalProps {
  userId?: string | null;
  user?: PendingUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export function KYBReviewModal({ userId, user: propUser, isOpen, onClose }: KYBReviewModalProps) {
  const [currentUser, setCurrentUser] = useState<PendingUser | null>(null);
  const [notes, setNotes] = useState("");
  const [verificationChecks, setVerificationChecks] = useState<VerificationCheck[]>([
    { id: "1", label: "License Validation", checked: false, description: "Match with registry" },
    { id: "2", label: "Document Authenticity", checked: false, description: "Appears genuine" },
    { id: "3", label: "Sanctions Check", checked: false, description: "No matches" },
  ]);

  useEffect(() => {
    if (isOpen) {
      if (propUser) {
        setCurrentUser(propUser);
      } else if (userId) {
        // Look up user by ID (handling 001 vs 1 logic if needed, simple string match for now)
        const found = detailedMockUsers.find(u => u.id === userId || u.id === `00${userId}`);
        setCurrentUser(found || detailedMockUsers[0]); // Fallback to first if not found for demo
      }
      
      // Reset state
      setNotes("");
      setVerificationChecks([
        { id: "1", label: "License Validation", checked: false, description: "Match with registry" },
        { id: "2", label: "Document Authenticity", checked: false, description: "Appears genuine" },
        { id: "3", label: "Sanctions Check", checked: false, description: "No matches" },
      ]);
    }
  }, [isOpen, userId, propUser]);

  const handleCheckToggle = (checkId: string) => {
    setVerificationChecks(checks =>
      checks.map(check =>
        check.id === checkId ? { ...check, checked: !check.checked } : check
      )
    );
  };

  const handleRunChecks = () => {
    console.log("Running automated checks for:", currentUser?.id);
    setVerificationChecks(checks =>
      checks.map(check => ({ ...check, checked: true }))
    );
  };

  const handleApprove = () => {
    console.log("Approving user:", currentUser?.id, { notes, checks: verificationChecks });
    onClose();
  };

  const handleReject = () => {
    console.log("Rejecting user:", currentUser?.id, { notes });
    onClose();
  };

  const handleRequestMoreInfo = () => {
    console.log("Requesting more info:", currentUser?.id, { notes });
    onClose();
  };

  if (!currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Review KYC: {currentUser.company}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Applicant Information */}
          <div className="space-y-3">
            <h3 className="font-semibold">Applicant Information</h3>
            <Card className="bg-muted/50">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-muted-foreground">{currentUser.legalName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                    {currentUser.type === "primary" ? "Primary CSP" : "Partner"}
                  </Badge>
                  {currentUser.jurisdiction && (
                    <Badge variant="outline">{currentUser.jurisdiction}</Badge>
                  )}
                </div>
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser.contactName}, {currentUser.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p className="text-sm text-muted-foreground">{currentUser.submittedDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents */}
          <div className="space-y-3">
            <h3 className="font-semibold">Documents</h3>
            <div className="space-y-2">
              {currentUser.documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} · {doc.fileSize} · {doc.uploadedDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log("View document:", doc.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log("Download document:", doc.id)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Verification Checks */}
          <div className="space-y-3">
            <h3 className="font-semibold">Verification Checks</h3>
            <Card>
              <CardContent className="p-4 space-y-3">
                {verificationChecks.map((check) => (
                  <div key={check.id} className="flex items-start gap-3">
                    <Checkbox
                      id={check.id}
                      checked={check.checked}
                      onCheckedChange={() => handleCheckToggle(check.id)}
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={check.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {check.label}
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {check.description}
                      </p>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRunChecks}
                  className="w-full mt-2"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Run Automated Checks
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <h3 className="font-semibold">Notes</h3>
            <Textarea
              placeholder="Add any observations or concerns..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Decision */}
          <div className="space-y-3">
            <h3 className="font-semibold">Decision</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleApprove}
                className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                variant="outline"
                onClick={handleRequestMoreInfo}
                className="flex-1"
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Request More Info
              </Button>
              <Button
                variant="outline"
                onClick={handleReject}
                className="flex-1 border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/10"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}