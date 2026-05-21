import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientCard } from "./clients/ClientCard";
import { AddClientDialog } from "./clients/AddClientDialog";
import { ClientFilters } from "./clients/ClientFilters";
import { ClientStats } from "./clients/ClientStats";
import { BulkActionsCard } from "./clients/BulkActionsCard";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { clientService } from "@/services/clientService";

export function ClientsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  const { user } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClients = useCallback(async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      const dbClients = await clientService.getClientsByProvider(user.id);
      
      const formattedClients = dbClients.map((c: any) => ({
        id: c.id,
        name: c.company_name,
        contact: c.contact_name,
        email: c.contact_email,
        phone: c.contact_phone || "",
        activeEngagements: 0, 
        lastActivity: "Just now", 
        portalStatus: "pending", 
        lastLogin: null,
        clientSince: new Date(c.created_at).toLocaleDateString(),
        status: c.status
      }));
      setClients(formattedClients);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleClientDeleted = useCallback((clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
  }, []);

  const handleClientStatusChanged = useCallback((clientId: string, newStatus: string) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, status: newStatus } : c));
  }, []);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const isArchivedStatus = ["struck-off", "rejected", "resigned"].includes(client.status?.toLowerCase());

    const matchesFilter =
      (filterStatus === "all" && !isArchivedStatus) ||
      (filterStatus === "Archived"
        ? isArchivedStatus
        : client.status === filterStatus);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === "Active").length,
    pending: clients.filter(c => c.status === "Enquiry").length, // Treating Enquiry as pending for stats
    archived: clients.filter(c => ["struck-off", "rejected", "resigned"].includes(c.status?.toLowerCase())).length,
  };

  return (
    <div className="relative space-y-5 pb-10">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10 opacity-40" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Clients</h1>
          <p className="text-slate-500 mt-1">Manage and monitor your client portfolio</p>
        </div>
        <Button 
          onClick={() => setIsAddClientOpen(true)}
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-all active:scale-95"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add Client
        </Button>
        <AddClientDialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen} onSuccess={fetchClients} />
      </div>

      {/* Stats */}
      <ClientStats stats={stats} activeFilter={filterStatus} onFilterChange={setFilterStatus} />

      {/* Filters */}
      <ClientFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* Client List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredClients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.2, 
                delay: Math.min(idx * 0.05, 0.3) 
              }}
              layout
            >
              <ClientCard 
                client={client} 
                onDeleted={() => handleClientDeleted(client.id)}
                onStatusChange={(newStatus) => handleClientStatusChanged(client.id, newStatus)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading ? (
          <div className="py-20 text-center">
            <p className="text-sm text-slate-400 font-medium">Loading clients...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-slate-400 font-medium">No clients found matching your filters.</p>
          </div>
        ) : null}
      </div>

      {/* Bulk Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <BulkActionsCard />
      </motion.div>
    </div>
  );
}