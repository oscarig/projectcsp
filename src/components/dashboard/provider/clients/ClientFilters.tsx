import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

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
  return (
    <Card className="border-none shadow-sm bg-slate-50/50">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search clients by name, contact or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-10 border-slate-200 focus:border-emerald-500/50 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => onFilterChange("all")}
              className={`h-10 text-xs font-bold uppercase tracking-widest min-w-[80px] ${
                filterStatus === "all" 
                  ? "bg-emerald-600 hover:bg-emerald-700" 
                  : "hover:border-emerald-200 hover:text-emerald-700"
              }`}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              onClick={() => onFilterChange("active")}
              className={`h-10 text-xs font-bold uppercase tracking-widest min-w-[80px] ${
                filterStatus === "active" 
                  ? "bg-emerald-600 hover:bg-emerald-700" 
                  : "hover:border-emerald-200 hover:text-emerald-700"
              }`}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => onFilterChange("pending")}
              className={`h-10 text-xs font-bold uppercase tracking-widest min-w-[120px] ${
                filterStatus === "pending" 
                  ? "bg-emerald-600 hover:bg-emerald-700" 
                  : "hover:border-emerald-200 hover:text-emerald-700"
              }`}
            >
              Pending Invite
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}