import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { providerTeamService, type TeamMember, type ProviderTeamRole } from "@/services/providerTeamService";
import { ROLE_LABELS, ROLE_DESCRIPTIONS, hasPermission } from "@/lib/permissions/providerRoles";
import {
  Users,
  UserPlus,
  Shield,
  Eye,
  Briefcase,
  Handshake,
  Search,
  MoreVertical,
  Mail,
  Trash2,
  Crown,
  Loader2,
  Filter,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function TeamManagementView() {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<ProviderTeamRole | null>(null);

  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "viewer" as ProviderTeamRole,
    message: "",
  });

  useEffect(() => {
    if (user?.id && profile?.id) {
      loadTeamMembers();
      loadCurrentUserRole();
    }
  }, [user?.id, profile?.id]);

  const loadCurrentUserRole = async () => {
    if (!user?.id || !profile?.id) return;

    const { role } = await providerTeamService.getUserRole(user.id, profile.id);
    setCurrentUserRole(role);
  };

  const loadTeamMembers = async () => {
    if (!profile?.id) return;

    setLoading(true);
    const { members: teamMembers, error } = await providerTeamService.getTeamMembers(profile.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive",
      });
    } else {
      setMembers(teamMembers);
    }
    setLoading(false);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id || !profile?.id) {
      toast({
        title: "Error",
        description: "You must be logged in",
        variant: "destructive",
      });
      return;
    }

    if (!inviteForm.email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setInviteLoading(true);

    try {
      const { invitation, error: createError } = await providerTeamService.createInvitation(
        inviteForm.email,
        profile.id,
        inviteForm.role,
        user.id
      );

      if (createError || !invitation) {
        toast({
          title: "Error",
          description: createError || "Failed to create invitation",
          variant: "destructive",
        });
        setInviteLoading(false);
        return;
      }

      toast({
        title: "Invitation Created",
        description: "Sending invitation email...",
      });

      providerTeamService
        .sendInvitationEmail(
          inviteForm.email,
          invitation.token,
          inviteForm.role,
          profile?.full_name || "A team admin",
          "Provider Organization"
        )
        .then(({ error: emailError }) => {
          if (emailError) {
            toast({
              title: "Email Warning",
              description: "Invitation created but email may not have been sent",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Success",
              description: "Team invitation sent successfully",
            });
          }
        });

      setInviteForm({ email: "", role: "viewer", message: "" });
      setIsInviteModalOpen(false);
      setInviteLoading(false);
    } catch (err) {
      console.error("[TEAM INVITE] Error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setInviteLoading(false);
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: ProviderTeamRole) => {
    const { success, error } = await providerTeamService.updateMemberRole(memberId, newRole);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Role updated successfully",
      });
      loadTeamMembers();
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) {
      return;
    }

    const { success, error } = await providerTeamService.removeMember(memberId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Team member removed successfully",
      });
      loadTeamMembers();
    }
  };

  const getRoleBadgeColor = (role: ProviderTeamRole) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "partner_manager":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "engagement_manager":
        return "bg-green-100 text-green-800 border-green-200";
      case "viewer":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (role: ProviderTeamRole) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />;
      case "partner_manager":
        return <Handshake className="h-4 w-4" />;
      case "engagement_manager":
        return <Briefcase className="h-4 w-4" />;
      case "viewer":
        return <Eye className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: members.length,
    admins: members.filter((m) => m.role === "admin").length,
    partnerManagers: members.filter((m) => m.role === "partner_manager").length,
    engagementManagers: members.filter((m) => m.role === "engagement_manager").length,
    viewers: members.filter((m) => m.role === "viewer").length,
  };

  const isAdmin = currentUserRole === "admin";
  const canInvite = hasPermission(currentUserRole, "inviteTeamMembers");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-gray-500 mt-1">Manage your team members and their roles</p>
        </div>
        {canInvite && (
          <Button onClick={() => setIsInviteModalOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Members</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
          <CardContent>
            <Users className="h-4 w-4 text-gray-400" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Admins</CardDescription>
            <CardTitle className="text-3xl">{stats.admins}</CardTitle>
          </CardHeader>
          <CardContent>
            <Crown className="h-4 w-4 text-purple-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Partner Managers</CardDescription>
            <CardTitle className="text-3xl">{stats.partnerManagers}</CardTitle>
          </CardHeader>
          <CardContent>
            <Handshake className="h-4 w-4 text-blue-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Engagement Managers</CardDescription>
            <CardTitle className="text-3xl">{stats.engagementManagers}</CardTitle>
          </CardHeader>
          <CardContent>
            <Briefcase className="h-4 w-4 text-green-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Viewers</CardDescription>
            <CardTitle className="text-3xl">{stats.viewers}</CardTitle>
          </CardHeader>
          <CardContent>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
                <SelectItem value="partner_manager">Partner Managers</SelectItem>
                <SelectItem value="engagement_manager">Engagement Managers</SelectItem>
                <SelectItem value="viewer">Viewers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No team members found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {member.profiles?.full_name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-medium">{member.profiles?.full_name || "Unknown"}</p>
                          {member.user_id === user?.id && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {member.profiles?.email || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(member.role)} variant="outline">
                        <span className="mr-1">{getRoleIcon(member.role)}</span>
                        {ROLE_LABELS[member.role]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(member.created_at).toLocaleDateString()}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "admin")}
                              disabled={member.role === "admin" || member.user_id === user?.id}
                            >
                              <Crown className="h-4 w-4 mr-2" />
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "partner_manager")}
                              disabled={member.role === "partner_manager"}
                            >
                              <Handshake className="h-4 w-4 mr-2" />
                              Partner Manager
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "engagement_manager")}
                              disabled={member.role === "engagement_manager"}
                            >
                              <Briefcase className="h-4 w-4 mr-2" />
                              Engagement Manager
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "viewer")}
                              disabled={member.role === "viewer"}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Viewer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-red-600"
                              disabled={member.user_id === user?.id}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Role Permissions Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Overview of what each role can do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(["admin", "partner_manager", "engagement_manager", "viewer"] as ProviderTeamRole[]).map(
              (role) => (
                <div key={role} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getRoleIcon(role)}
                    <h3 className="font-semibold">{ROLE_LABELS[role]}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{ROLE_DESCRIPTIONS[role]}</p>
                  <Badge className={getRoleBadgeColor(role)} variant="outline">
                    {role === "admin" && "Full Access"}
                    {role === "partner_manager" && "Partner Focus"}
                    {role === "engagement_manager" && "Client Focus"}
                    {role === "viewer" && "Read Only"}
                  </Badge>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Invite Member Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your provider team
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleInvite} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={inviteForm.role}
                onValueChange={(value) =>
                  setInviteForm({ ...inviteForm, role: value as ProviderTeamRole })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-purple-500" />
                      Admin - Full access
                    </div>
                  </SelectItem>
                  <SelectItem value="partner_manager">
                    <div className="flex items-center gap-2">
                      <Handshake className="h-4 w-4 text-blue-500" />
                      Partner Manager - Manage partners
                    </div>
                  </SelectItem>
                  <SelectItem value="engagement_manager">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-green-500" />
                      Engagement Manager - Manage clients & engagements
                    </div>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      Viewer - Read-only access
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">{ROLE_DESCRIPTIONS[inviteForm.role]}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Welcome to the team! Looking forward to working with you."
                rows={3}
                value={inviteForm.message}
                onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsInviteModalOpen(false)}
                disabled={inviteLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={inviteLoading}>
                {inviteLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}