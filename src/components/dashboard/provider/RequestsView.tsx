import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Clock, CheckCircle2, ExternalLink, FileText } from "lucide-react";

interface DocumentRequest {
  id: string;
  companyName: string;
  documentType: string;
  requestedDate: string;
  status: "overdue" | "pending" | "fulfilled";
  daysAgo?: number;
  documentLink?: string;
}

export function RequestsView() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  // Mock data
  const overdueRequests: DocumentRequest[] = [
    {
      id: "1",
      companyName: "Acme Ltd",
      documentType: "Proof of Identity",
      requestedDate: "11 Feb",
      status: "overdue",
      daysAgo: 7,
    },
    {
      id: "2",
      companyName: "Beta Corp",
      documentType: "Company Registration",
      requestedDate: "13 Feb",
      status: "overdue",
      daysAgo: 5,
    },
  ];

  const pendingRequests: DocumentRequest[] = [
    {
      id: "3",
      companyName: "Gamma LLC",
      documentType: "Proof of Address",
      requestedDate: "17 Feb",
      status: "pending",
      daysAgo: 1,
    },
    {
      id: "4",
      companyName: "Epsilon Ltd",
      documentType: "Bank Statement",
      requestedDate: "18 Feb",
      status: "pending",
      daysAgo: 0,
    },
    {
      id: "5",
      companyName: "Zeta Holdings",
      documentType: "Tax Certificate",
      requestedDate: "16 Feb",
      status: "pending",
      daysAgo: 2,
    },
  ];

  const fulfilledRequests: DocumentRequest[] = [
    {
      id: "6",
      companyName: "Delta Holdings",
      documentType: "ID",
      requestedDate: "16 Feb",
      status: "fulfilled",
      documentLink: "https://drive.google.com/file/example1",
    },
    {
      id: "7",
      companyName: "Theta Corp",
      documentType: "Proof of Address",
      requestedDate: "15 Feb",
      status: "fulfilled",
      documentLink: "https://drive.google.com/file/example2",
    },
  ];

  const handleRemind = (requestId: string) => {
    console.log("Reminding client about request:", requestId);
  };

  const handleRequestDocument = () => {
    console.log("Requesting document:", {
      documentType: selectedDocumentType,
      description,
      sendEmail,
    });
    setIsRequestModalOpen(false);
    setSelectedDocumentType("");
    setDescription("");
    setSendEmail(true);
  };

  const formatDaysAgo = (daysAgo: number) => {
    if (daysAgo === 0) return "today";
    if (daysAgo === 1) return "1 day ago";
    return `${daysAgo} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
          <FileText className="h-5 w-5 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Document Requests</h1>
      </div>

      {/* Overdue Section */}
      {overdueRequests.length > 0 && (
        <Card>
          <div className="border-b border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h2 className="font-semibold text-red-900">OVERDUE ({overdueRequests.length})</h2>
            </div>
          </div>
          <div className="divide-y divide-red-100">
            {overdueRequests.map((request) => (
              <div key={request.id} className="bg-red-50/50 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {request.companyName} - {request.documentType}
                    </p>
                    <p className="text-sm text-red-600">
                      Requested {request.requestedDate} ({request.daysAgo} days ago)
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemind(request.id)}
                    className="border-red-200 text-red-700 hover:bg-red-100"
                  >
                    Remind
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Pending Section */}
      {pendingRequests.length > 0 && (
        <Card>
          <div className="border-b border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <h2 className="font-semibold text-amber-900">PENDING ({pendingRequests.length})</h2>
            </div>
          </div>
          <div className="divide-y divide-amber-100">
            {pendingRequests.map((request) => (
              <div key={request.id} className="bg-amber-50/50 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {request.companyName} - {request.documentType}
                    </p>
                    <p className="text-sm text-amber-700">
                      Requested {request.requestedDate} ({formatDaysAgo(request.daysAgo!)})
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemind(request.id)}
                    className="border-amber-200 text-amber-700 hover:bg-amber-100"
                  >
                    Remind
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Fulfilled Section */}
      {fulfilledRequests.length > 0 && (
        <Card>
          <div className="border-b border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h2 className="font-semibold text-emerald-900">FULFILLED (Recent)</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {fulfilledRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">{request.companyName}</span> -{" "}
                    {request.documentType} · Received {request.requestedDate}
                  </p>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => window.open(request.documentLink, "_blank")}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  View Link
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Request Document Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>REQUEST DOCUMENT</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Client: Acme Ltd (Sarah Jones)</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Document type:</label>
              <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proof-of-identity">Proof of Identity</SelectItem>
                  <SelectItem value="proof-of-address">Proof of Address</SelectItem>
                  <SelectItem value="company-registration">Company Registration</SelectItem>
                  <SelectItem value="bank-statement">Bank Statement</SelectItem>
                  <SelectItem value="tax-certificate">Tax Certificate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description (optional):</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="We need a valid passport or driving licence for the director."
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="send-email"
                checked={sendEmail}
                onCheckedChange={(checked) => setSendEmail(checked as boolean)}
              />
              <label htmlFor="send-email" className="text-sm text-gray-700">
                Send email notification to client
              </label>
            </div>

            <Button
              onClick={handleRequestDocument}
              disabled={!selectedDocumentType}
              className="w-full"
            >
              Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}