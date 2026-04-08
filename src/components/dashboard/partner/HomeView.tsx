import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Briefcase,
  Upload,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
  Bell,
} from "lucide-react";
import { AcceptRequestModal } from "./AcceptRequestModal";
import { mockEngagements, getPartnerEngagements } from "@/lib/mocks/engagements";
import { mockRequests, getPartnerPendingRequests } from "@/lib/mocks/requests";
import { mockNotifications, getUnreadNotifications } from "@/lib/mocks/notifications";
import type { Engagement, Request, Notification } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export function PartnerHomeView() {
  const { profile } = useAuth();
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<{
    ref: string;
    from: string;
    service: string;
    details: string;
  } | null>(null);

  // Mock current partner ID
  const currentPartnerId = "part-001";

  // Get partner-specific data from shared mocks
  const activeEngagements = getPartnerEngagements(currentPartnerId).filter(
    (e) => e.status === "active" || e.status === "with_partner" || e.status === "awaiting_info"
  );
  const pendingRequests = getPartnerPendingRequests(currentPartnerId);
  const recentNotifications = getUnreadNotifications(currentPartnerId).slice(0, 3);
  
  const calculateProgress = (status: Engagement["status"]) => {
    switch (status) {
      case "draft": return 0;
      case "awaiting_info": return 30;
      case "with_partner": return 50;
      case "active": return 75;
      case "completed": return 100;
      default: return 0;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 18) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  // Get user's full name or fallback to "User"
  const userName = profile?.full_name?.toUpperCase() || "USER";

  const getStatusBadge = (status: Engagement["status"]) => {
    const config = {
      pending: { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
      in_progress: { variant: "secondary" as const, className: "bg-blue-100 text-blue-800" },
      awaiting_info: { variant: "destructive" as const, className: "bg-orange-100 text-orange-800" },
      completed: { variant: "secondary" as const, className: "bg-green-100 text-green-800" },
      cancelled: { variant: "secondary" as const, className: "bg-gray-100 text-gray-800" },
    };
    return config[status] || config.pending;
  };

  const handleAcceptClick = (request: Request) => {
    setSelectedRequest({
      ref: request.id,
      from: request.fromUserName || "Unknown Provider",
      service: request.description,
      details: `Request for ${request.type}.\n\nRequested: ${new Date(request.createdAt).toLocaleDateString()}\n\nPlease review and provide your response.`,
    });
    setAcceptModalOpen(true);
  };

  const handleAcceptRequest = (conflictStatus: string) => {
    console.log("Accepted request with conflict status:", conflictStatus);
    setAcceptModalOpen(false);
  };

  const handleDeclineRequest = () => {
    console.log("Declined request");
    setAcceptModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}, {userName}</h1>
          <span className="text-sm text-muted-foreground">{currentDate}</span>
        </div>
        <p className="text-muted-foreground">
          Singapore CSP Pte Ltd · Member since: Jan 2024
        </p>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/dashboard/partner/engagements">
              <Button variant="outline" className="h-20 w-full flex flex-col gap-2">
                <Briefcase className="h-5 w-5" />
                <span className="text-sm font-medium">View Active Engagements</span>
              </Button>
            </Link>
            <Link href="/dashboard/partner/documents">
              <Button variant="outline" className="h-20 w-full flex flex-col gap-2">
                <Upload className="h-5 w-5" />
                <span className="text-sm font-medium">Upload Documents</span>
              </Button>
            </Link>
            <Button variant="outline" className="h-20 w-full flex flex-col gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">Update Availability</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Engagements</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{activeEngagements.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{pendingRequests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Engagements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Engagements</CardTitle>
              <CardDescription>{activeEngagements.length} engagements in progress</CardDescription>
            </div>
            <Link href="/dashboard/partner/engagements">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeEngagements.map((engagement) => {
            const badge = getStatusBadge(engagement.status);
            return (
              <Card key={engagement.id} className={engagement.status === "awaiting_info" ? "border-orange-500" : ""}>
                <CardContent className="pt-6 space-y-4">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{engagement.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Client: {engagement.clientName}</span>
                      <span>·</span>
                      <span>via {engagement.providerName}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Ref: {engagement.id}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due: {formatDate(engagement.targetCompletionDate)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress value={calculateProgress(engagement.status)} className="h-2" />
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <Badge variant={badge.variant} className={badge.className}>
                      {engagement.status === "awaiting_info" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {engagement.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>

                  {/* Last Activity */}
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Last Activity:</span> {formatDate(engagement.updatedAt)}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/dashboard/partner/engagements/${engagement.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Documents
                    </Button>
                    <Button size="sm">Respond</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>{pendingRequests.length} new requests awaiting response</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{request.type.toUpperCase()}</Badge>
                        <span className="font-semibold">{request.description}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        From: {request.fromUserName} · Received: {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAcceptClick(request)}>
                      Accept Request
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleDeclineRequest}>
                      Decline
                    </Button>
                    <Button size="sm" variant="ghost">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Notifications</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentNotifications.map((notification) => {
              // Map notification types to colors
              const isSuccess = ["engagement_completed", "document_approved", "payment_received"].includes(notification.type);
              const isAlert = ["system_alert", "kyb_status_change"].includes(notification.type);
              
              return (
                <div key={notification.id} className="flex items-center gap-3 text-sm">
                  <Bell
                    className={`h-4 w-4 ${
                      isSuccess
                        ? "text-green-500"
                        : isAlert
                        ? "text-orange-500"
                        : "text-blue-500"
                    }`}
                  />
                  <span className="flex-1">{notification.message}</span>
                  <span className="text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Accept Request Modal */}
      {selectedRequest && (
        <AcceptRequestModal
          open={acceptModalOpen}
          onOpenChange={setAcceptModalOpen}
          request={selectedRequest}
          onAccept={handleAcceptRequest}
          onDecline={handleDeclineRequest}
        />
      )}
    </div>
  );
}