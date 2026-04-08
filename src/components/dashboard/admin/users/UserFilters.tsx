import { Button } from "@/components/ui/button";
import { Shield, Briefcase, Users, User } from "lucide-react";

interface UserFiltersProps {
  activeFilter: "all" | "admin" | "provider" | "partner" | "client";
  onFilterChange: (filter: "all" | "admin" | "provider" | "partner" | "client") => void;
}

export function UserFilters({ activeFilter, onFilterChange }: UserFiltersProps) {
  const filters = [
    { value: "all" as const, label: "All Users", icon: null },
    { value: "admin" as const, label: "Admins", icon: Shield },
    { value: "provider" as const, label: "Providers", icon: Briefcase },
    { value: "partner" as const, label: "Partners", icon: Users },
    { value: "client" as const, label: "Clients", icon: User },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.value)}
          >
            {Icon && <Icon className="h-4 w-4 mr-2" />}
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}