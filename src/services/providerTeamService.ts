import { supabase } from "@/integrations/supabase/client";

export type ProviderTeamRole = "admin" | "partner_manager" | "engagement_manager" | "viewer";

export interface TeamMember {
  id: string;
  user_id: string;
  provider_id: string;
  role: ProviderTeamRole;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export interface TeamInvitation {
  id: string;
  invitee_email: string;
  provider_id: string;
  role: ProviderTeamRole;
  token: string;
  status: "pending" | "used" | "expired" | "cancelled";
  created_at: string;
  expires_at: string;
  invited_by: string;
}

/**
 * Provider Team Management Service
 */
export const providerTeamService = {
  /**
   * Get all team members for a provider
   */
  async getTeamMembers(providerId: string): Promise<{
    members: TeamMember[];
    error: string | null;
  }> {
    try {
      const { data: members, error } = await supabase
        .from("provider_team_members")
        .select(`
          *,
          profiles!provider_team_members_user_id_fkey (
            full_name,
            email
          )
        `)
        .eq("provider_id", providerId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[TEAM] Error fetching team members:", error);
        return { members: [], error: error.message };
      }

      return { members: (members as unknown as TeamMember[]) || [], error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error:", err);
      return {
        members: [],
        error: err instanceof Error ? err.message : "Failed to fetch team members",
      };
    }
  },

  /**
   * Get current user's role in a provider
   */
  async getUserRole(userId: string, providerId: string): Promise<{
    role: ProviderTeamRole | null;
    error: string | null;
  }> {
    try {
      const { data, error } = await supabase
        .from("provider_team_members")
        .select("role")
        .eq("user_id", userId)
        .eq("provider_id", providerId)
        .maybeSingle();

      if (error) {
        console.error("[TEAM] Error fetching user role:", error);
        return { role: null, error: error.message };
      }

      return { role: (data?.role as ProviderTeamRole) || null, error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error:", err);
      return {
        role: null,
        error: err instanceof Error ? err.message : "Failed to fetch user role",
      };
    }
  },

  /**
   * Update team member role (admin only)
   */
  async updateMemberRole(
    memberId: string,
    newRole: ProviderTeamRole
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("provider_team_members")
        .update({ role: newRole })
        .eq("id", memberId);

      if (error) {
        console.error("[TEAM] Error updating role:", error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to update role",
      };
    }
  },

  /**
   * Remove team member (admin only)
   */
  async removeMember(memberId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("provider_team_members")
        .delete()
        .eq("id", memberId);

      if (error) {
        console.error("[TEAM] Error removing member:", error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to remove member",
      };
    }
  },

  /**
   * Create team invitation
   */
  async createInvitation(
    email: string,
    providerId: string,
    role: ProviderTeamRole,
    invitedBy: string
  ): Promise<{ invitation: any | null; error: string | null }> {
    try {
      // Check if user is already a team member
      const { data: existingMember } = await supabase
        .from("provider_team_members")
        .select("id, profiles!inner(email)")
        .eq("provider_id", providerId)
        .eq("profiles.email", email.toLowerCase())
        .maybeSingle();

      if (existingMember) {
        return {
          invitation: null,
          error: "This user is already a team member",
        };
      }

      // Check for existing pending invitation
      const { data: existingInvitation } = await supabase
        .from("provider_team_invitations")
        .select("*")
        .eq("invitee_email", email.toLowerCase())
        .eq("status", "pending")
        .maybeSingle();

      if (existingInvitation) {
        return {
          invitation: null,
          error: "An active invitation already exists for this email",
        };
      }

      // Generate secure token
      const generateToken = () => {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          return crypto.randomUUID() + crypto.randomUUID().replace(/-/g, "");
        }
        return (
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
        );
      };

      const invitationData = {
        invitee_email: email.toLowerCase(),
        provider_id: providerId,
        role,
        invited_by: invitedBy,
        token: generateToken(),
      };

      const { data: invitation, error: insertError } = await supabase
        .from("provider_team_invitations")
        .insert(invitationData)
        .select()
        .single();

      if (insertError) {
        console.error("[TEAM] Error creating invitation:", insertError);
        return { invitation: null, error: insertError.message };
      }

      return { invitation: invitation as unknown as TeamInvitation, error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error:", err);
      return {
        invitation: null,
        error: err instanceof Error ? err.message : "Failed to create invitation",
      };
    }
  },

  /**
   * Get invitations for a provider
   */
  async getInvitations(providerId: string): Promise<{
    invitations: TeamInvitation[];
    error: string | null;
  }> {
    try {
      const { data: invitations, error } = await supabase
        .from("provider_team_invitations")
        .select("*")
        .eq("provider_id", providerId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[TEAM] Error fetching invitations:", error);
        return { invitations: [], error: error.message };
      }

      return { invitations: (invitations as unknown as TeamInvitation[]) || [], error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error:", err);
      return {
        invitations: [],
        error: err instanceof Error ? err.message : "Failed to fetch invitations",
      };
    }
  },

  /**
   * Validate invitation token
   */
  async validateInvitation(token: string): Promise<{
    valid: boolean;
    invitation: TeamInvitation | null;
    error: string | null;
  }> {
    try {
      const { data: invitation, error } = await supabase
        .from("provider_team_invitations")
        .select("*")
        .eq("token", token)
        .maybeSingle();

      if (error) {
        console.error("[TEAM] Error validating invitation:", error);
        return { valid: false, invitation: null, error: error.message };
      }

      if (!invitation) {
        return { valid: false, invitation: null, error: "Invalid invitation token" };
      }

      if (invitation.status === "accepted") {
        return {
          valid: false,
          invitation: null,
          error: "This invitation has already been used",
        };
      }

      if (invitation.status === "expired" || invitation.status === "cancelled") {
        return {
          valid: false,
          invitation: null,
          error: "This invitation is no longer valid",
        };
      }

      const expiresAt = new Date(invitation.expires_at);
      const now = new Date();

      if (expiresAt < now) {
        return {
          valid: false,
          invitation: null,
          error: "This invitation has expired",
        };
      }

      return { valid: true, invitation: invitation as unknown as TeamInvitation, error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error:", err);
      return {
        valid: false,
        invitation: null,
        error: err instanceof Error ? err.message : "Failed to validate invitation",
      };
    }
  },

  /**
   * Mark invitation as used
   */
  async markInvitationUsed(
    token: string,
    userId: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error: updateError } = await supabase.rpc("mark_team_invitation_used", {
        invitation_token: token,
        user_id: userId,
      });

      if (updateError) {
        console.error("[TEAM] Error marking invitation as used:", updateError);
        return { success: false, error: updateError.message };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to mark invitation as used",
      };
    }
  },

  /**
   * Cancel invitation
   */
  async cancelInvitation(invitationId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("provider_team_invitations")
        .update({ status: "expired" })
        .eq("id", invitationId);

      if (error) {
        console.error("[TEAM] Error canceling invitation:", error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to cancel invitation",
      };
    }
  },

  /**
   * Generate invitation URL
   */
  generateInvitationUrl(token: string): string {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/auth/register/team?token=${token}`;
  },

  /**
   * Send invitation email
   */
  async sendInvitationEmail(
    email: string,
    token: string,
    role: ProviderTeamRole,
    inviterName: string,
    providerName: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const invitationUrl = this.generateInvitationUrl(token);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email sending timeout")), 10000)
      );

      const emailPromise = supabase.functions.invoke("team-invitation-email", {
        body: {
          email,
          invitationUrl,
          role,
          inviterName,
          providerName,
        },
      });

      const { data, error } = (await Promise.race([emailPromise, timeoutPromise])) as any;

      if (error) {
        console.error("[TEAM] Error sending email:", error);
        return { success: false, error: error.message || "Failed to send email" };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error("[TEAM] Unexpected error sending email:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to send invitation email",
      };
    }
  },
};