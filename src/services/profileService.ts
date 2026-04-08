import { supabase } from "@/integrations/supabase/client";
import type { UserProfile, ProfileUpdateData } from "@/types/profile";
import type { UserRole } from "@/types/user";

export const profileService = {
  // Get current user's profile
  async getCurrentProfile(): Promise<{ profile: UserProfile | null; error: string | null }> {
    try {
      // First get the session to ensure user is authenticated
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("[PROFILE SERVICE] Session error:", sessionError);
        return { profile: null, error: sessionError.message };
      }

      if (!session?.user) {
        console.error("[PROFILE SERVICE] No authenticated user in session");
        return { profile: null, error: "No authenticated user" };
      }

      const userId = session.user.id;
      console.log("[PROFILE SERVICE] Fetching profile for user:", userId);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("[PROFILE SERVICE] Error fetching profile:", error);
        return { profile: null, error: error.message };
      }

      if (!data) {
        console.error("[PROFILE SERVICE] No profile found for user:", userId);
        return { profile: null, error: "Profile not found" };
      }

      console.log("[PROFILE SERVICE] Profile loaded successfully:", data.role);
      return { profile: data as UserProfile, error: null };
    } catch (err) {
      console.error("[PROFILE SERVICE] Unexpected error:", err);
      return { profile: null, error: "An unexpected error occurred" };
    }
  },

  // Get profile by ID (admin only)
  async getProfileById(userId: string): Promise<{ profile: UserProfile | null; error: string | null }> {
    try {
      console.log("[PROFILE SERVICE] Fetching profile by ID:", userId);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("[PROFILE SERVICE] Error fetching profile by ID:", error);
        return { profile: null, error: error.message };
      }

      if (!data) {
        console.error("[PROFILE SERVICE] No profile found for ID:", userId);
        return { profile: null, error: "Profile not found" };
      }

      console.log("[PROFILE SERVICE] Profile loaded by ID:", { id: data.id, role: data.role });
      return { profile: data as UserProfile, error: null };
    } catch (err) {
      console.error("[PROFILE SERVICE] Unexpected error:", err);
      return { profile: null, error: "An unexpected error occurred" };
    }
  },

  // Update current user's profile
  async updateProfile(updates: ProfileUpdateData): Promise<{ profile: UserProfile | null; error: string | null }> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return { profile: null, error: "No authenticated user" };
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq("id", session.user.id)
        .select()
        .maybeSingle();

      if (error) {
        console.error("Error updating profile:", error);
        return { profile: null, error: error.message };
      }

      if (!data) {
        return { profile: null, error: "Profile not found" };
      }

      return { profile: data as UserProfile, error: null };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { profile: null, error: "An unexpected error occurred" };
    }
  },

  // Update user role (admin only)
  async updateUserRole(userId: string, role: UserRole): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          role,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId);

      if (error) {
        console.error("Error updating role:", error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { success: false, error: "An unexpected error occurred" };
    }
  },

  // Get all profiles (admin only)
  async getAllProfiles(): Promise<{ profiles: UserProfile[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching profiles:", error);
        return { profiles: [], error: error.message };
      }

      return { profiles: data as UserProfile[], error: null };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { profiles: [], error: "An unexpected error occurred" };
    }
  },

  // Get profiles by role (admin only)
  async getProfilesByRole(role: UserRole): Promise<{ profiles: UserProfile[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", role)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching profiles:", error);
        return { profiles: [], error: error.message };
      }

      return { profiles: data as UserProfile[], error: null };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { profiles: [], error: "An unexpected error occurred" };
    }
  },

  // Check if user has specific role
  async hasRole(role: UserRole): Promise<boolean> {
    try {
      const { profile } = await this.getCurrentProfile();
      return profile?.role === role;
    } catch {
      return false;
    }
  },

  // Check if user has any of the specified roles
  async hasAnyRole(roles: UserRole[]): Promise<boolean> {
    try {
      const { profile } = await this.getCurrentProfile();
      return profile ? roles.includes(profile.role) : false;
    } catch {
      return false;
    }
  }
};