import { supabase } from "@/integrations/supabase/client";

export const supportTicketService = {
  // Get all tickets for a client
  async getTicketsByClient(userId: string) {
    const { data, error } = await supabase
      .from("support_tickets")
      .select(`
        *,
        client:profiles!support_tickets_user_id_fkey(full_name, email)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching support tickets:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Get all tickets (admin view)
  async getAllTickets() {
    const { data, error } = await supabase
      .from("support_tickets")
      .select(`
        *,
        client:profiles!support_tickets_user_id_fkey(full_name, email)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all support tickets:", error);
      throw error;
    }

    return (data as any) || [];
  },

  // Create a new ticket
  async createTicket(ticket: any) {
    const { data, error } = await supabase
      .from("support_tickets")
      .insert(ticket)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error creating support ticket:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Failed to create support ticket");
    }

    return data;
  },

  // Update ticket status
  async updateTicketStatus(ticketId: string, status: string, resolution?: string) {
    const { data, error } = await supabase
      .from("support_tickets")
      .update({
        status,
        resolution,
        resolved_at: status === "resolved" ? new Date().toISOString() : null,
      })
      .eq("id", ticketId)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error updating ticket status:", error);
      throw error;
    }

    if (!data) {
      throw new Error("Ticket not found");
    }

    return data;
  },

  // Get ticket statistics
  async getTicketStats(userId?: string) {
    let query = supabase.from("support_tickets").select("status, priority");

    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data: tickets, error } = await query;

    if (error) {
      console.error("Error fetching ticket stats:", error);
      throw error;
    }

    const t = (tickets as any[]) || [];

    const stats = {
      total: t.length,
      open: t.filter(x => x.status === "open").length,
      in_progress: t.filter(x => x.status === "in_progress").length,
      resolved: t.filter(x => x.status === "resolved").length,
      high_priority: t.filter(x => x.priority === "high").length,
    };

    return stats;
  },
};