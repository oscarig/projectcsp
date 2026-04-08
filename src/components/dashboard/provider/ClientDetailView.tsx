import { useState } from "react";
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
  Ban,
  Plus,
  FileText,
} from "lucide-react";

interface ClientDetailViewProps {
  clientId?: string;
}

export function ClientDetailView({ clientId }: ClientDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const client = {
    id: "1",
    name: "Tech Innovators Ltd",
    contact: "John Smith",
    email: "john@techinnovators.com",
    phone: "+44 20 1234 5678",
    clientSince: "15 Mar 2021",
    portalUrl: "techinnovators.londoncsp.globalcspconnect.com",
    portalStatus: "active",
    lastLogin: "2 days ago",
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

  const documents = [
    {
      id: "1",
      name: "engagement_letter_sp042.pdf",
      uploaded: "10 Apr 2024",
      size: "245 KB",
    },
    {
      id: "2",
      name: "passport_john.pdf",
      uploaded: "12 Apr 2024",
      size: "1.2 MB",
    },
    {
      id: "3",
      name: "utility_bill.pdf",
      uploaded: "12 Apr 2024",
      size: "890 KB",
    },
    {
      id: "4",
      name: "proof_of_address.pdf",
      uploaded: "15 Apr 2024",
      size: "756 KB",
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
            </div>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

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
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Status:</span>
              <Badge variant="default" className="bg-green-500">
                ● Active
              </Badge>
              <span className="text-muted-foreground">
                · Last login: {client.lastLogin}
              </span>
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
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Uploaded {doc.uploaded} · {doc.size}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}