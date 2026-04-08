import { supabase } from "@/integrations/supabase/client";

export const partnerRequestService = {
  // Get all requests for a partner
  async getRequestsByPartner(partnerId: string) {
    const { data, error } = await supabase
      .from("partner_requests")
      .select(`
        *,
        provider:profiles!partner_requests_from_provider_id_fkey(full_name, email),
        partner:profiles!partner_requests_to_partner_id_fkey(full_name, email)
      `)
      .eq("to_partner_id", partnerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching partner requests:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Get all requests sent by a provider
  async getRequestsByProvider(providerId: string) {
    const { data, error } = await supabase
      .from("partner_requests")
      .select(`
        *,
        provider:profiles!partner_requests_from_provider_id_fkey(full_name, email),
        partner:profiles!partner_requests_to_partner_id_fkey(full_name, email)
      `)
      .eq("from_provider_id", providerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching provider requests:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Create a new request
  async createRequest(request: any) {
    const { data, error } = await supabase
      .from("partner_requests")
      .insert(request)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error creating request:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Failed to create request");
    }

    return data;
  },

  // Update request status (accept/reject)
  async updateRequestStatus(requestId: string, status: string, responseNotes?: string) {
    const { data, error } = await supabase
      .from("partner_requests")
      .update({
        status,
        partner_response: responseNotes,
        responded_at: new Date().toISOString(),
      })
      .eq("id", requestId)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error updating request status:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Request not found");
    }

    return data;
  },

  // Get request statistics for partner
  async getRequestStats(partnerId: string) {
    const { data: requests, error } = await supabase
      .from("partner_requests")
      .select("status")
      .eq("to_partner_id", partnerId);

    if (error) {
      console.error("Error fetching request stats:", error);
      throw error;
    }

    const r = (requests as any[]) || [];

    const stats = {
      total: r.length,
      pending: r.filter(x => x.status === "pending").length,
      accepted: r.filter(x => x.status === "accepted").length,
      rejected: r.filter(x => x.status === "rejected").length,
    };

    return stats;
  },
};