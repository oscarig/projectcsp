import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  Copy,
  Filter,
  Mail,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { partnerInvitationService } from "@/services/partnerInvitationService";
import { InvitePartnerModal } from "./InvitePartnerModal";
import { useToast } from "@/hooks/use-toast";

interface Invitation {
  id: string;
  partner_email: string;
  provider_id: string;
  token: string;
  jurisdiction: string | null;
  message: string | null;
  status: "pending" | "used" | "expired";
  created_at: string;
  expires_at: string;
  used_at: string | null;
  used_by: string | null;
}

type FilterStatus = "all" | "pending" | "used" | "expired";

export function InvitationsView() {
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [filteredInvitations, setFilteredInvitations] = useState<Invitation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [loading, setLoading] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Load invitations
  useEffect(() => {
    if (user?.id) {
      loadInvitations();
    }
  }, [user?.id]);

  // Filter invitations
  useEffect(() => {
    let filtered = invitations;

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((inv) => inv.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((inv) =>
        inv.partner_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInvitations(filtered);
  }, [invitations, filterStatus, searchTerm]);

  const loadInvitations = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { invitations: data, error } =
        await partnerInvitationService.getInvitationsByUser(user.id);

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      setInvitations(data || []);
    } catch (err) {
      console.error("[INVITATIONS] Error loading:", err);
      toast({
        title: "Error",
        description: "Failed to load invitations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "used":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();

    if (diff <= 0) {
      return "Expired";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    }
    return `${hours}h remaining`;
  };

  const handleCopyLink = (token: string) => {
    const url = partnerInvitationService.generateInvitationUrl(token);
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: "Invitation link copied to clipboard",
    });
  };

  const handleResendEmail = async (invitation: Invitation) => {
    try {
      const { error } = await partnerInvitationService.sendInvitationEmail(
        invitation.partner_email,
        invitation.token,
        profile?.full_name || "A provider",
        invitation.jurisdiction || undefined,
        invitation.message || undefined
      );

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Email Sent",
        description: "Invitation email resent successfully",
      });
    } catch (err) {
      console.error("[INVITATIONS] Error resending email:", err);
      toast({
        title: "Error",
        description: "Failed to resend email",
        variant: "destructive",
      });
    }
  };

  const handleExpireInvitation = async (invitationId: string) => {
    // This would call a service method to mark invitation as expired
    // For now, just show a toast
    toast({
      title: "Feature Coming Soon",
      description: "Expire invitation functionality will be implemented",
    });
    // TODO: Implement expire invitation in service
  };

  const handleViewDetails = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsDetailsModalOpen(true);
  };

  const stats = {
    total: invitations.length,
    pending: invitations.filter((inv) => inv.status === "pending").length,
    used: invitations.filter((inv) => inv.status === "used").length,
    expired: invitations.filter((inv) => inv.status === "expired").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Partner Invitations</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track invitations sent to potential partners
          </p>
        </div>
        <Button onClick={() => setIsInviteModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Invitation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Invitations</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.used}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expired}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by partner email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "used" ? "default" : "outline"}
                onClick={() => setFilterStatus("used")}
              >
                Accepted
              </Button>
              <Button
                variant={filterStatus === "expired" ? "default" : "outline"}
                onClick={() => setFilterStatus("expired")}
              >
                Expired
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invitations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invitations ({filteredInvitations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInvitations.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No invitations found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your filters"
                  : "Start by sending your first partner invitation"}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Button onClick={() => setIsInviteModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner Email</TableHead>
                    <TableHead>Jurisdiction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell className="font-medium">
                        {invitation.partner_email}
                      </TableCell>
                      <TableCell>
                        {invitation.jurisdiction || (
                          <span className="text-muted-foreground">Not specified</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(invitation.status)}</TableCell>
                      <TableCell>
                        {new Date(invitation.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {invitation.status === "pending" ? (
                          <span className="text-sm text-muted-foreground">
                            {getTimeRemaining(invitation.expires_at)}
                          </span>
                        ) : invitation.status === "used" ? (
                          <span className="text-sm text-green-600">
                            Accepted {new Date(invitation.used_at!).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-sm text-red-600">Expired</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(invitation)}
                            >
                              <AlertCircle className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {invitation.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleCopyLink(invitation.token)}
                                >
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Link
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleResendEmail(invitation)}
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Resend Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleExpireInvitation(invitation.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Cancel Invitation
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Partner Modal */}
      <InvitePartnerModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSuccess={() => {
          loadInvitations();
        }}
      />

      {/* Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invitation Details</DialogTitle>
            <DialogDescription>
              Complete information about this partner invitation
            </DialogDescription>
          </DialogHeader>
          {selectedInvitation && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Partner Email</label>
                <p className="text-sm text-muted-foreground">
                  {selectedInvitation.partner_email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <div className="mt-1">{getStatusBadge(selectedInvitation.status)}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Jurisdiction</label>
                <p className="text-sm text-muted-foreground">
                  {selectedInvitation.jurisdiction || "Not specified"}
                </p>
              </div>
              {selectedInvitation.message && (
                <div>
                  <label className="text-sm font-medium">Personal Message</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedInvitation.message}
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Sent Date</label>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedInvitation.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Expires At</label>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedInvitation.expires_at).toLocaleString()}
                </p>
              </div>
              {selectedInvitation.status === "used" && selectedInvitation.used_at && (
                <div>
                  <label className="text-sm font-medium">Accepted At</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedInvitation.used_at).toLocaleString()}
                  </p>
                </div>
              )}
              {selectedInvitation.status === "pending" && (
                <div>
                  <label className="text-sm font-medium">Invitation Link</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={partnerInvitationService.generateInvitationUrl(
                        selectedInvitation.token
                      )}
                      readOnly
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleCopyLink(selectedInvitation.token)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}