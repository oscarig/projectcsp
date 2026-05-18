import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface ClientFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (status: string) => void;
}

export function ClientFilters({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}: ClientFiltersProps) {
  const statuses = [
    { id: "all", label: "All" },
    { id: "Enquiry", label: "Enquiry" },
    { id: "CDD", label: "CDD" },
    { id: "Active", label: "Active" },
    { id: "Stracoff", label: "Stracoff" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Filter by name, email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9 border-slate-200 focus:border-emerald-500/50 bg-white/50 backdrop-blur-sm text-sm"
        />
      </div>

      {/* Segmented Control */}
      <div className="flex bg-slate-100/50 backdrop-blur-sm p-1 rounded-lg border border-slate-200 w-full md:w-auto">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => onFilterChange(status.id)}
            className={`relative flex-1 md:flex-none px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 z-10 ${
              filterStatus === status.id ? "text-emerald-700" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {status.label}
            {filterStatus === status.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-md shadow-sm -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}