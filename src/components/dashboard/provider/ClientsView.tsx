import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientCard } from "./clients/ClientCard";
import { AddClientDialog } from "./clients/AddClientDialog";
import { ClientFilters } from "./clients/ClientFilters";
import { ClientStats } from "./clients/ClientStats";
import { BulkActionsCard } from "./clients/BulkActionsCard";
import { mockClients } from "./clients/mockClients";

export function ClientsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && client.portalStatus === "active") ||
      (filterStatus === "pending" && client.portalStatus === "pending");

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: 47,
    active: 32,
    pending: 8,
    archived: 7,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
        </div>
        <Button 
          onClick={() => setIsAddClientOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
        <AddClientDialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen} />
      </div>

      {/* Search and Filter */}
      <ClientFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* Stats */}
      <ClientStats stats={stats} />

      {/* Client List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {/* Bulk Actions */}
      <BulkActionsCard />
    </div>
  );
}