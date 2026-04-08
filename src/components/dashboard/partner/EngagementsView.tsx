import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Search,
  Filter,
  Briefcase,
  Clock,
  CheckCircle2,
  Calendar,
  Upload,
  AlertCircle,
  Star,
} from "lucide-react";
import { AcceptRequestModal } from "./AcceptRequestModal";
import { mockEngagements, getPartnerEngagements } from "@/lib/mocks/engagements";
import { mockRequests, getPartnerPendingRequests } from "@/lib/mocks/requests";
import type { Engagement, Request } from "@/types";

export function PartnerEngagementsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<{
    ref: string;
    from: string;
    service: string;
    details: string;
  } | null>(null);

  // Mock current partner ID
  const currentPartnerId = "part-001"; // Matched to mock data

  // Get partner-specific data from shared mocks
  const allEngagements = getPartnerEngagements(currentPartnerId);
  const activeEngagements = allEngagements.filter(
    (e) => e.status === "active" || e.status === "with_partner" || e.status === "awaiting_info"
  );
  const completedEngagements = allEngagements.filter((e) => e.status === "completed");
  const pendingRequests = getPartnerPendingRequests(currentPartnerId);

  const getStatusBadge = (status: Engagement["status"]) => {
    const config = {
      draft: { variant: "secondary" as const, className: "bg-gray-100 text-gray-800" },
      active: { variant: "secondary" as const, className: "bg-blue-100 text-blue-800" },
      with_partner: { variant: "secondary" as const, className: "bg-purple-100 text-purple-800" },
      awaiting_info: { variant: "destructive" as const, className: "bg-orange-100 text-orange-800" },
      completed: { variant: "secondary" as const, className: "bg-green-100 text-green-800" },
      cancelled: { variant: "secondary" as const, className: "bg-gray-100 text-gray-800" },
    };
    return config[status] || config.active;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Engagements</h1>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Search and Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search engagements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All ({allEngagements.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeEngagements.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedEngagements.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-8">
            
            {/* Active Engagements */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Active ({activeEngagements.length})</h2>
              </div>
              
              {activeEngagements.map((engagement) => {
                const badge = getStatusBadge(engagement.status);
                return (
                  <Card key={engagement.id} className={engagement.status === "awaiting_info" ? "border-orange-500/50" : ""}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4">
                        {/* Header Row */}
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-xs text-muted-foreground">{engagement.id}</span>
                              <span className="text-muted-foreground">·</span>
                              <h3 className="font-semibold text-lg">{engagement.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Client: <span className="font-medium text-foreground">{engagement.clientName}</span> (via {engagement.providerName}) · Due: {formatDate(engagement.targetCompletionDate)}
                            </p>
                          </div>
                          <Badge variant={badge.variant} className={badge.className}>
                            {engagement.status === "awaiting_info" && <AlertCircle className="h-3 w-3 mr-1" />}
                            {engagement.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{calculateProgress(engagement.status)}%</span>
                          </div>
                          <Progress value={calculateProgress(engagement.status)} className="h-2" />
                        </div>

                        {/* Footer Row */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Last Activity: {formatDate(engagement.updatedAt)}</span>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/dashboard/partner/engagements/${engagement.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-1" />
                              Upload
                            </Button>
                            <Button size="sm">Respond</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pending Requests */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-semibold">Pending Requests ({pendingRequests.length})</h2>
              </div>

              {pendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                          {request.type.toUpperCase()}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">{request.id}</span>
                      </div>
                      <h3 className="font-medium text-lg">{request.description}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        From: <span className="font-medium text-foreground">{request.fromUserName}</span> · Requested: {formatDate(request.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAcceptClick(request)}>
                        Accept Request
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={handleDeclineRequest}>
                        Decline
                      </Button>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Completed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h2 className="text-xl font-semibold">Completed ({completedEngagements.length})</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">View All</Button>
              </div>

              {completedEngagements.map((engagement) => (
                <Card key={engagement.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{engagement.id}</span>
                          <span className="font-medium">{engagement.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {engagement.clientName} · Completed: {formatDate(engagement.completionDate || engagement.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <Button variant="outline" size="sm">View Summary</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <div className="p-8 text-center text-muted-foreground">Active engagements filter...</div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <div className="p-8 text-center text-muted-foreground">Pending requests filter...</div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="p-8 text-center text-muted-foreground">Completed engagements filter...</div>
          </TabsContent>
        </Tabs>
      </div>

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