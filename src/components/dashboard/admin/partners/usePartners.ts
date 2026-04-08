import { useState, useCallback, useMemo } from "react";
import { mockPartners } from "./mockPartners";
import type { PartnerFilters, Partner } from "./types";

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [filters, setFilters] = useState<PartnerFilters>({
    search: "",
    status: "all",
    kycStatus: "all",
    subscriptionTier: "all",
  });

  const handleFiltersChange = useCallback((newFilters: PartnerFilters) => {
    setFilters(newFilters);
  }, []);

  const handleAction = useCallback((action: string, partnerId: string) => {
    console.log(`${action} partner ${partnerId}`);
    // Implement action logic here
  }, []);

  const handleExport = useCallback(() => {
    console.log("Exporting partners data...");
  }, []);

  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const matchesSearch =
        partner.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        partner.email.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === "all" || partner.status === filters.status;
      const matchesKyc = filters.kycStatus === "all" || partner.kycStatus === filters.kycStatus;
      const matchesTier = filters.subscriptionTier === "all" || partner.subscriptionTier === filters.subscriptionTier;

      return matchesSearch && matchesStatus && matchesKyc && matchesTier;
    });
  }, [partners, filters]);

  return {
    partners: filteredPartners,
    allPartners: partners,
    filters,
    handleFiltersChange,
    handleAction,
    handleExport,
  };
}