import { supabase } from "@/integrations/supabase/client";

export const clientService = {
  // Get all clients for a provider
  async getClientsByProvider(providerId: string) {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("provider_id", providerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Get a single client by ID
  async getClientById(clientId: string) {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching client:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Client not found");
    }

    return data;
  },

  // Create a new client
  async createClient(client: any) {
    const { data, error } = await supabase
      .from("clients")
      .insert(client)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error creating client:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Failed to create client");
    }

    return data;
  },

  // Update a client
  async updateClient(clientId: string, updates: any) {
    const { data, error } = await supabase
      .from("clients")
      .update(updates)
      .eq("id", clientId)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error updating client:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Client not found");
    }

    return data;
  },

  // Delete a client
  async deleteClient(clientId: string) {
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", clientId);

    if (error) {
      console.error("Error deleting client:", error);
      throw error;
    }

    return true;
  },

  // Get client statistics
  async getClientStats(providerId: string) {
    const { data: clients, error } = await supabase
      .from("clients")
      .select("status")
      .eq("provider_id", providerId);

    if (error) {
      console.error("Error fetching client stats:", error);
      throw error;
    }

    const c = (clients as any[]) || [];

    const stats = {
      total: c.length,
      active: c.filter(x => x.status === "active").length,
      inactive: c.filter(x => x.status === "inactive").length,
      pending: c.filter(x => x.status === "pending").length,
    };

    return stats;
  },
};