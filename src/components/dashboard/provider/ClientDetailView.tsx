import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Eye,
  Mail,
  Upload,
  ExternalLink,
  Bell,
  Plus,
  FileText,
  Trash2,
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Shield,
  Ban,
} from "lucide-react";

import { EditClientDialog } from "./clients/EditClientDialog";
import { RiskAssessmentDialog } from "./clients/RiskAssessmentDialog";
import { clientService } from "@/services/clientService";
import { documentService } from "@/services/documentService";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface ClientDetailViewProps {
  clientId?: string;
}

export function ClientDetailView({ clientId }: ClientDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const [client, setClient] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [riskLevel, setRiskLevel] = useState<"Low" | "Medium" | "High">("Low");
  const [isRiskAssessmentOpen, setIsRiskAssessmentOpen] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchClient = useCallback(async () => {
    if (!clientId) return;
    try {
      setIsLoading(true);
      const data = await clientService.getClientById(clientId);
      if (data) {
        setClient({
          id: data.id,
          name: data.company_name,
          contact: data.contact_name,
          email: data.contact_email,
          phone: data.contact_phone || "",
          clientSince: new Date(data.created_at).toLocaleDateString(),
          portalUrl: "techinnovators.londoncsp.globalcspconnect.com",
          portalStatus: data.status === "Active" ? "active" : "pending",
          lastLogin: "2 days ago",
          status: data.status,
        });
      }
      
      const docsData = await documentService.getDocumentsByClientId(clientId);
      setDocuments(docsData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  if (isLoading) {
    return <div className="py-20 text-center text-slate-500">Loading client details...</div>;
  }

  if (!client) {
    return <div className="py-20 text-center text-slate-500">Client not found.</div>;
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id || !client?.id) return;
    
    // Check file size (limit to 10MB to prevent hanging on slow connections)
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please select a file smaller than 10MB.", variant: "destructive" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    try {
      console.log("Starting upload for file:", file.name, file.size, file.type);
      
      const documentData = {
        client_id: client.id,
        uploaded_by: user.id,
        document_type: "client_file",
        status: "pending"
      };
      
      console.log("Calling documentService.uploadDocument...");
      await documentService.uploadDocument(file, documentData);
      
      console.log("Updating client status to CDD...");
      try {
        await clientService.updateClient(client.id, { status: "CDD" });
      } catch (err) {
        console.error("Failed to update client status to CDD on upload:", err);
      }
      
      console.log("Upload finished. Refetching client and documents...");
      toast({ title: "Success", description: "Document uploaded successfully. Client status updated to CDD." });
      
      await fetchClient();
      console.log("Client and documents refetched successfully.");
    } catch (error: any) {
      console.error("Upload error caught:", error);
      toast({ 
        title: "Failed to upload document", 
        description: error.message || "An unexpected error occurred during upload.", 
        variant: "destructive" 
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    
    try {
      await documentService.deleteDocument(documentId);
      toast({ title: "Success", description: "Document deleted successfully." });
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({ 
        title: "Failed to delete document", 
        description: error.message || "An unexpected error occurred.", 
        variant: "destructive" 
      });
    }
  };

  const activeEngagements = [
    {
      id: "SP-2024-042",
      title: "Singapore Pte Ltd Formation",
      opened: "10 Apr 2024",
      status: "in_progress",
      partner: "Singapore CSP",
      nextAction: "Name approval pending",
    },
    {
      id: "BV-2024-038",
      title: "BVI Holding Company",
      opened: "5 Apr 2024",
      status: "on_hold",
      partner: "BVI Trust",
      nextAction: "Awaiting client documents",
    },
    {
      id: "UK-2024-051",
      title: "UK Ltd Company Formation",
      opened: "18 Apr 2024",
      status: "in_progress",
      partner: "London CSP (Internal)",
      nextAction: "Director verification in progress",
    },
  ];
  const history = {
    totalEngagements: 8,
    completed: 5,
    inProgress: 3,
    avgValue: "$4,200",
    totalBilled: "$33,600",
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/provider/clients"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Clients
      </Link>

      {/* Client Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{client.name}</h1>
              <div className="text-sm text-muted-foreground">
                Contact: {client.contact} · {client.email} · {client.phone}
              </div>
              <div className="text-sm text-muted-foreground">
                Client since: {client.clientSince}
              </div>
              <div className="flex items-center gap-2 pt-1 text-sm">
                <span className="font-medium text-slate-700">Status:</span>
                <Badge variant="default" className={
                  client.status === "Active" ? "bg-emerald-500" :
                  client.status === "CDD" ? "bg-blue-500" :
                  client.status === "Struck-off" ? "bg-red-500" :
                  client.status === "Rejected" ? "bg-rose-500" :
                  client.status === "Resigned" ? "bg-slate-500" : "bg-orange-500"
                }>
                  ● {client.status}
                </Badge>
              </div>
            </div>
            <Button onClick={() => setIsEditOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <EditClientDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        onSuccess={fetchClient}
        client={client}
      />

      {/* Risk Assessment */}
      <Card className={`border-l-4 overflow-hidden shadow-md transition-all duration-500 relative
        ${riskLevel === "Low" ? "border-l-emerald-500 bg-emerald-50/40" : 
          riskLevel === "Medium" ? "border-l-amber-500 bg-amber-50/40" : 
          "border-l-red-500 bg-red-50/40 ring-1 ring-red-500/20"}`
      }>
        {/* Background Watermark Icon */}
        <div className={`absolute -right-4 -top-4 opacity-5 pointer-events-none transform -rotate-12
          ${riskLevel === "Low" ? "text-emerald-900" : 
            riskLevel === "Medium" ? "text-amber-900" : 
            "text-red-900"}`
        }>
          {riskLevel === "Low" ? <ShieldCheck size={180} /> :
           riskLevel === "Medium" ? <AlertTriangle size={180} /> :
           <ShieldAlert size={180} />}
        </div>
        
        <CardHeader className="pb-4 border-b border-black/5 bg-white/40 backdrop-blur-sm relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={`h-5 w-5 ${
                riskLevel === "Low" ? "text-emerald-600" : 
                riskLevel === "Medium" ? "text-amber-600" : 
                "text-red-600"
              }`} />
              <CardTitle className="text-xl">Risk Assessment</CardTitle>
            </div>
            <Button 
              size="sm" 
              onClick={() => setIsRiskAssessmentOpen(true)}
              className={`font-bold shadow-sm transition-transform active:scale-95 ${
                riskLevel === "High" ? "bg-red-600 hover:bg-red-700 text-white shadow-red-200" :
                "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              <Edit className="h-3.5 w-3.5 mr-2" />
              Update Risk Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-full shadow-sm ${
                riskLevel === "Low" ? "bg-emerald-100" : 
                riskLevel === "Medium" ? "bg-amber-100" : 
                "bg-red-100"
              }`}>
                {riskLevel === "Low" ? <ShieldCheck className="h-8 w-8 text-emerald-600" /> :
                 riskLevel === "Medium" ? <AlertTriangle className="h-8 w-8 text-amber-600" /> :
                 <ShieldAlert className="h-8 w-8 text-red-600" />}
              </div>
              <div className="space-y-1.5">
                <span className="font-bold text-slate-600 uppercase tracking-wider text-xs block">Current Risk Level</span>
                <Badge className={`text-sm px-4 py-1.5 font-black uppercase tracking-widest ${
                  riskLevel === "Low" ? "bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-md shadow-emerald-200/50" :
                  riskLevel === "Medium" ? "bg-amber-500 hover:bg-amber-600 text-white border-none shadow-md shadow-amber-200/50" :
                  "bg-red-600 hover:bg-red-700 text-white border-none shadow-md shadow-red-300/50"
                }`}>
                  {riskLevel === "Low" ? "● Low" : 
                   riskLevel === "Medium" ? "● Medium" : 
                   "● High"}
                </Badge>
              </div>
            </div>
            
            <div className={`text-sm font-medium p-4 rounded-xl border max-w-md ${
                riskLevel === "Low" ? "bg-white/60 border-emerald-100 text-slate-600" : 
                riskLevel === "Medium" ? "bg-amber-50/80 border-amber-200 text-amber-900" : 
                "bg-red-50/80 border-red-200 text-red-900"
            }`}>
              {riskLevel === "Low" ? "The client profile is clear. Regular monitoring schedule applies without additional flags." : 
               riskLevel === "Medium" ? "Enhanced Due Diligence (EDD) may be recommended. Monitor significant transactions closely." : 
               "CRITICAL: Immediate Enhanced Due Diligence required. This account is flagged for senior management review."}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <RiskAssessmentDialog 
        open={isRiskAssessmentOpen} 
        onOpenChange={setIsRiskAssessmentOpen} 
        onSave={setRiskLevel}
      />

      {/* Client Portal */}
      <Card>
        <CardHeader>
          <CardTitle>Client Portal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Portal URL:</span>{" "}
              <span className="text-muted-foreground">{client.portalUrl}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Last login:</span>{" "}
              <span className="text-muted-foreground">{client.lastLogin}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview Portal
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Send Login Reminder
            </Button>
            <Button variant="outline" size="sm">
              <Ban className="h-4 w-4 mr-2" />
              Suspend Access
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Engagements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Engagements ({activeEngagements.length})</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Engagement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeEngagements.map((engagement) => (
              <div
                key={engagement.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{engagement.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      Ref: {engagement.id} | Opened: {engagement.opened} |{" "}
                      Status:{" "}
                      {engagement.status === "in_progress" ? (
                        <Badge variant="default" className="bg-blue-500">
                          ● In Progress
                        </Badge>
                      ) : (
                        <Badge variant="secondary">⚠ On Hold</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Partner:</span> {engagement.partner}{" "}
                  · {engagement.nextAction}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement History */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement History (Last 12 months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Total Engagements</div>
              <div className="text-2xl font-bold">{history.totalEngagements}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Completed</div>
              <div className="text-2xl font-bold text-green-600">
                {history.completed}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">In Progress</div>
              <div className="text-2xl font-bold text-blue-600">
                {history.inProgress}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Avg Value</div>
              <div className="text-2xl font-bold">{history.avgValue}</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm">
              <span className="font-medium">Total Billed:</span>{" "}
              <span className="text-lg font-bold">{history.totalBilled}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Documents</CardTitle>
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <Button onClick={handleUploadClick} disabled={isUploading}>
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No documents uploaded yet.</p>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{doc.file_name}</div>
                      <div className="text-sm text-muted-foreground">
                        Uploaded {new Date(doc.created_at).toLocaleDateString()} · {formatBytes(doc.file_size || 0)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={doc.file_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}