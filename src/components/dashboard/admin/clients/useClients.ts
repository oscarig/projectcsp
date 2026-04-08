import { useState, useCallback, useMemo } from "react";
import { mockClients } from "./mockClients";
import type { ClientFilters, Client } from "./types";

export function useClients() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [filters, setFilters] = useState<ClientFilters>({
    search: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
  });

  const handleFiltersChange = useCallback((newFilters: ClientFilters) => {
    setFilters(newFilters);
  }, []);

  const handleAction = useCallback((action: string, clientId: string) => {
    console.log(`${action} client ${clientId}`);
    // Implement action logic here
  }, []);

  const handleExport = useCallback(() => {
    console.log("Exporting clients data...");
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        client.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        client.company.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = filters.status === "all" || client.status === filters.status;

      const matchesDateFrom =
        !filters.dateFrom || new Date(client.joinDate) >= new Date(filters.dateFrom);

      const matchesDateTo =
        !filters.dateTo || new Date(client.joinDate) <= new Date(filters.dateTo);

      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [clients, filters]);

  return {
    clients: filteredClients,
    allClients: clients,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
  };
}