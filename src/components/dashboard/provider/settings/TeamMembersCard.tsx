import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { providerTeamService, type TeamMember, type ProviderTeamRole } from "@/services/providerTeamService";
import { ROLE_LABELS, ROLE_DESCRIPTIONS } from "@/lib/permissions/providerRoles";
import { UserPlus, MoreVertical, Mail, Trash2, Shield, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function TeamMembersCard() {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
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
      // Create invitation
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

      // Show immediate feedback
      toast({
        title: "Invitation Created",
        description: "Sending invitation email...",
      });

      // Send email asynchronously
      providerTeamService
        .sendInvitationEmail(
          inviteForm.email,
          invitation.token,
          inviteForm.role,
          profile?.full_name || "A team admin",
          "Provider Organization" // TODO: Get actual provider name
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

      // Reset form and close modal
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
        return "bg-purple-100 text-purple-800";
      case "partner_manager":
        return "bg-blue-100 text-blue-800";
      case "engagement_manager":
        return "bg-green-100 text-green-800";
      case "viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isAdmin = currentUserRole === "admin";

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their roles</CardDescription>
            </div>
            {isAdmin && (
              <Button onClick={() => setIsInviteModalOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No team members yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {member.profiles?.full_name || "Unknown"}
                    </TableCell>
                    <TableCell>{member.profiles?.email || "N/A"}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(member.role)}>
                        {ROLE_LABELS[member.role]}
                      </Badge>
                    </TableCell>
                    <TableCell>
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
                              disabled={member.role === "admin"}
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "partner_manager")}
                              disabled={member.role === "partner_manager"}
                            >
                              Change to Partner Manager
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "engagement_manager")}
                              disabled={member.role === "engagement_manager"}
                            >
                              Change to Engagement Manager
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(member.id, "viewer")}
                              disabled={member.role === "viewer"}
                            >
                              Change to Viewer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-red-600"
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
                  <SelectItem value="admin">Admin - Full access</SelectItem>
                  <SelectItem value="partner_manager">
                    Partner Manager - Manage partners
                  </SelectItem>
                  <SelectItem value="engagement_manager">
                    Engagement Manager - Manage clients & engagements
                  </SelectItem>
                  <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
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
    </>
  );
}