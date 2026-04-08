import { supabase } from "@/integrations/supabase/client";

export const engagementService = {
  // Get all engagements for a client
  async getEngagementsByClient(clientUserId: string) {
    const { data, error } = await supabase
      .from("engagements")
      .select(`
        *,
        client:clients(company_name, contact_name, contact_email),
        provider:profiles!engagements_provider_id_fkey(full_name, email),
        partner:profiles!engagements_partner_id_fkey(full_name, email)
      `)
      .eq("client_user_id", clientUserId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching engagements:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Get all engagements for a provider
  async getEngagementsByProvider(providerId: string) {
    const { data, error } = await supabase
      .from("engagements")
      .select(`
        *,
        client:clients(company_name, contact_name, contact_email),
        provider:profiles!engagements_provider_id_fkey(full_name, email),
        partner:profiles!engagements_partner_id_fkey(full_name, email)
      `)
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching engagements:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Get all engagements for a partner
  async getEngagementsByPartner(partnerId: string) {
    const { data, error } = await supabase
      .from("engagements")
      .select(`
        *,
        client:clients(company_name, contact_name, contact_email),
        provider:profiles!engagements_provider_id_fkey(full_name, email),
        partner:profiles!engagements_partner_id_fkey(full_name, email)
      `)
      .eq("partner_id", partnerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching engagements:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Get a single engagement by ID
  async getEngagementById(engagementId: string) {
    const { data, error } = await supabase
      .from("engagements")
      .select(`
        *,
        client:clients(company_name, contact_name, contact_email, contact_phone),
        provider:profiles!engagements_provider_id_fkey(full_name, email),
        partner:profiles!engagements_partner_id_fkey(full_name, email)
      `)
      .eq("id", engagementId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching engagement:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Engagement not found");
    }

    return data;
  },

  // Create a new engagement
  async createEngagement(engagement: any) {
    const { data, error } = await supabase
      .from("engagements")
      .insert(engagement)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error creating engagement:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Failed to create engagement");
    }

    return data;
  },

  // Update an engagement
  async updateEngagement(engagementId: string, updates: any) {
    const { data, error } = await supabase
      .from("engagements")
      .update(updates)
      .eq("id", engagementId)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error updating engagement:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Engagement not found");
    }

    return data;
  },

  // Get engagement statistics
  async getEngagementStats(userId: string, role: string) {
    let query = supabase.from("engagements").select("status");

    if (role === "client") {
      query = query.eq("client_user_id", userId);
    } else if (role === "provider") {
      query = query.eq("provider_id", userId);
    } else if (role === "partner") {
      query = query.eq("partner_id", userId);
    }

    const { data: engagements, error } = await query;

    if (error) {
      console.error("Error fetching engagement stats:", error);
      throw error;
    }

    const e = (engagements as any[]) || [];

    const stats = {
      total: e.length,
      draft: e.filter(x => x.status === "draft").length,
      pending: e.filter(x => x.status === "pending").length,
      in_progress: e.filter(x => x.status === "in_progress" || x.status === "active").length,
      awaiting_info: e.filter(x => x.status === "awaiting_info").length,
      completed: e.filter(x => x.status === "completed").length,
      cancelled: e.filter(x => x.status === "cancelled").length,
    };

    return stats;
  },

  // Get activities for an engagement
  async getActivities(engagementId: string) {
    const { data, error } = await supabase
      .from("activities")
      .select(`
        *,
        user:profiles(full_name, role)
      `)
      .eq("engagement_id", engagementId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching activities:", error);
      throw error;
    }

    return (data as any[]) || [];
  },

  // Add a communication/comment activity
  async addComment(engagementId: string, userId: string, content: string) {
    const { data, error } = await supabase
      .from("activities")
      .insert({
        engagement_id: engagementId,
        user_id: userId,
        activity_type: 'comment_added',
        title: 'New Communication',
        description: content,
        metadata: { is_external: true }
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error adding comment:", error);
      throw error;
    }

    return data;
  },
};