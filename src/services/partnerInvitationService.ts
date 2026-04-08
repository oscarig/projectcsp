import { supabase } from "@/integrations/supabase/client";

/**
 * Partner Invitation Service
 * Handles creation, validation, and management of partner invitation tokens
 */

export const partnerInvitationService = {
  /**
   * Create a new partner invitation
   */
  async createInvitation(
    email: string,
    invitedBy: string,
    jurisdiction?: string,
    message?: string
  ): Promise<{ invitation: any | null; error: string | null }> {
    try {
      console.log("[INVITATION] Creating invitation for:", email);

      // Check if there's already a pending invitation for this email
      const { data: existingInvitation } = await supabase
        .from("partner_invitations")
        .select("*")
        .eq("partner_email", email.toLowerCase())
        .eq("status", "pending")
        .maybeSingle();

      if (existingInvitation) {
        return {
          invitation: null,
          error: "An active invitation already exists for this email",
        };
      }

      // Create new invitation
      // Generating a secure random token
      const generateToken = () => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
          return crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '');
        }
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      };

      const invitationData = {
        partner_email: email.toLowerCase(),
        provider_id: invitedBy,
        jurisdiction: jurisdiction || null,
        message: message || null,
        token: generateToken(),
      };

      const { data: invitation, error: insertError } = await supabase
        .from("partner_invitations")
        .insert(invitationData)
        .select()
        .single();

      if (insertError) {
        console.error("[INVITATION] Error creating invitation:", insertError);
        return { invitation: null, error: insertError.message };
      }

      console.log("[INVITATION] Invitation created successfully:", invitation.id);
      return { invitation, error: null };
    } catch (err) {
      console.error("[INVITATION] Unexpected error:", err);
      return {
        invitation: null,
        error: err instanceof Error ? err.message : "Failed to create invitation",
      };
    }
  },

  /**
   * Validate an invitation token
   */
  async validateToken(token: string): Promise<{
    valid: boolean;
    invitation: any | null;
    error: string | null;
  }> {
    try {
      console.log("[INVITATION] Validating token");

      const { data: invitation, error: fetchError } = await supabase
        .from("partner_invitations")
        .select("*")
        .eq("token", token)
        .maybeSingle();

      if (fetchError) {
        console.error("[INVITATION] Error fetching invitation:", fetchError);
        return { valid: false, invitation: null, error: fetchError.message };
      }

      if (!invitation) {
        return { valid: false, invitation: null, error: "Invalid invitation token" };
      }

      // Check if already used
      if (invitation.status === "used") {
        return {
          valid: false,
          invitation: null,
          error: "This invitation has already been used",
        };
      }
      
      if (invitation.status === "expired") {
        return {
          valid: false,
          invitation: null,
          error: "This invitation has expired",
        };
      }

      // Check if expired by date
      const expiresAt = new Date(invitation.expires_at);
      const now = new Date();

      if (now > expiresAt) {
        return {
          valid: false,
          invitation: null,
          error: "This invitation has expired",
        };
      }

      console.log("[INVITATION] Token is valid");
      return { valid: true, invitation, error: null };
    } catch (err) {
      console.error("[INVITATION] Unexpected error:", err);
      return {
        valid: false,
        invitation: null,
        error: err instanceof Error ? err.message : "Failed to validate token",
      };
    }
  },

  /**
   * Mark an invitation as used
   */
  async markAsUsed(token: string, userId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      console.log("[INVITATION] Marking invitation as used");

      const { error: updateError } = await supabase.rpc("mark_invitation_used", {
        invitation_token: token,
        user_id: userId,
      });

      if (updateError) {
        console.error("[INVITATION] Error marking as used:", updateError);
        return { success: false, error: updateError.message };
      }

      console.log("[INVITATION] Invitation marked as used successfully");
      return { success: true, error: null };
    } catch (err) {
      console.error("[INVITATION] Unexpected error:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to mark invitation as used",
      };
    }
  },

  /**
   * Get invitation by token
   */
  async getInvitationByToken(token: string): Promise<{
    invitation: any | null;
    error: string | null;
  }> {
    try {
      const { data: invitation, error: fetchError } = await supabase
        .from("partner_invitations")
        .select("*")
        .eq("token", token)
        .maybeSingle();

      if (fetchError) {
        return { invitation: null, error: fetchError.message };
      }

      return { invitation, error: null };
    } catch (err) {
      return {
        invitation: null,
        error: err instanceof Error ? err.message : "Failed to fetch invitation",
      };
    }
  },

  /**
   * Get all invitations sent by a user
   */
  async getInvitationsByUser(userId: string): Promise<{
    invitations: any[];
    error: string | null;
  }> {
    try {
      const { data: invitations, error: fetchError } = await supabase
        .from("partner_invitations")
        .select("*")
        .eq("provider_id", userId)
        .order("created_at", { ascending: false });

      if (fetchError) {
        return { invitations: [], error: fetchError.message };
      }

      return { invitations: invitations || [], error: null };
    } catch (err) {
      return {
        invitations: [],
        error: err instanceof Error ? err.message : "Failed to fetch invitations",
      };
    }
  },

  /**
   * Generate invitation URL
   */
  generateInvitationUrl(token: string): string {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/auth/register/partner?token=${token}`;
  },

  /**
   * Send invitation email
   */
  async sendInvitationEmail(
    email: string,
    token: string,
    inviterName: string,
    jurisdiction?: string,
    message?: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      console.log("[INVITATION] Sending invitation email to:", email);

      const invitationUrl = this.generateInvitationUrl(token);

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Email sending timeout")), 10000) // 10 second timeout
      );

      const emailPromise = supabase.functions.invoke("partner-invitation-email", {
        body: {
          email,
          invitationUrl,
          inviterName,
          jurisdiction,
          message,
        },
      });

      const { data, error } = await Promise.race([emailPromise, timeoutPromise]) as any;

      if (error) {
        console.error("[INVITATION] Error sending email:", error);
        return { success: false, error: error.message || "Failed to send email" };
      }

      console.log("[INVITATION] Email sent successfully");
      return { success: true, error: null };
    } catch (err) {
      console.error("[INVITATION] Unexpected error sending email:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to send invitation email",
      };
    }
  },
};