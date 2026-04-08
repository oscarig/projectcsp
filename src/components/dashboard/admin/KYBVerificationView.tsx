import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  FileCheck,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle,
  Building,
  Shield,
} from "lucide-react";
import { KYBReviewModal, PendingUser, UserType } from "./KYBReviewModal";

// Local mock data lists (summarized version of data)
const mockKYCQueue: PendingUser[] = [
  {
    id: "001",
    company: "Dubai Corp",
    legalName: "Dubai Corp FZE",
    type: "primary",
    contactName: "Ahmed Al Maktoum",
    email: "ahmed@dubaicorp.ae",
    submittedDate: "14 Apr 24",
    documents: [], // Detail view has docs
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
    documents: [],
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
    documents: [],
    pendingDocs: ["Cyber Insurance"],
  },
];

const mockPartnerQueue: PendingUser[] = [
  {
    id: "004",
    company: "Malta CSP",
    legalName: "Malta Corporate Services Ltd",
    type: "partner",
    jurisdiction: "Malta",
    contactName: "Maria Garcia",
    email: "maria@maltacsp.com",
    submittedDate: "13 Apr 24",
    documents: [],
    pendingDocs: ["Cyber Insurance"],
  },
  {
    id: "005",
    company: "Luxembourg Fund",
    legalName: "Luxembourg Fund Services SA",
    type: "partner",
    jurisdiction: "Luxembourg",
    contactName: "Jean Dupont",
    email: "jean@luxfund.lu",
    submittedDate: "12 Apr 24",
    documents: [],
    pendingDocs: ["PI Insurance", "Cyber Insurance"],
  },
];

export function KYBVerificationView() {
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);

  const getUserTypeBadge = (type: UserType) => {
    const variants = {
      primary: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      partner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    };
    const labels = {
      primary: "Primary CSP",
      partner: "Partner",
    };
    return (
      <Badge className={variants[type]}>
        {labels[type]}
      </Badge>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
            <FileCheck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Pending Approval Queue</h1>
            <p className="text-sm text-muted-foreground">
              Review and verify user applications
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("Refreshing...")}
          className="w-full sm:w-auto"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* KYC Verification Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              KYC Verification ({mockKYCQueue.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockKYCQueue.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No pending KYC verifications
                    </TableCell>
                  </TableRow>
                ) : (
                  mockKYCQueue.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {user.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{user.company}</div>
                          <div className="text-sm text-muted-foreground">{user.contactName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getUserTypeBadge(user.type)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{user.submittedDate}</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                          className="w-full sm:w-auto"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Partner Verification Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
            Partner Verification ({mockPartnerQueue.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPartnerQueue.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No pending partner verifications
                    </TableCell>
                  </TableRow>
                ) : (
                  mockPartnerQueue.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {user.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{user.company}</div>
                          <div className="text-sm text-muted-foreground">{user.contactName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{user.jurisdiction}</span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {user.documents.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                              <span className="text-muted-foreground">{doc.type}</span>
                            </div>
                          ))}
                          {user.pendingDocs?.map((docName) => (
                            <div key={docName} className="flex items-center gap-2 text-sm">
                              <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                              <span className="text-yellow-600 dark:text-yellow-400">{docName}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                          className="w-full sm:w-auto"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Shared Review Modal */}
      <KYBReviewModal 
        userId={selectedUser?.id}
        // In the queue view, we pass the user directly if available, or just ID
        // The modal handles data lookup if needed, but we can just pass the ID for simplicity
        // as the modal has the detailed data.
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}