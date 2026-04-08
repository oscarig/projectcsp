import { Card, CardContent } from "@/components/ui/card";

interface ClientStatsProps {
  stats: {
    total: number;
    active: number;
    pending: number;
    archived: number;
  };
}

export function ClientStats({ stats }: ClientStatsProps) {
  return (
    <Card className="border-none shadow-sm bg-gradient-to-r from-white to-slate-50/50">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 text-nowrap">Total Clients</span>
            <span className="text-2xl font-black text-slate-900 leading-none">{stats.total}</span>
          </div>
          
          <div className="h-8 w-px bg-slate-100 hidden sm:block" />
          
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest leading-none mb-1 text-nowrap">Active Portal</span>
            <span className="text-2xl font-black text-emerald-600 leading-none">{stats.active}</span>
          </div>

          <div className="h-8 w-px bg-slate-100 hidden sm:block" />

          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-orange-600/60 uppercase tracking-widest leading-none mb-1 text-nowrap">Pending Invite</span>
            <span className="text-2xl font-black text-orange-600 leading-none">{stats.pending}</span>
          </div>

          <div className="h-8 w-px bg-slate-100 hidden sm:block" />

          <div className="flex flex-col text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1 text-nowrap">Archived</span>
            <span className="text-2xl font-black leading-none">{stats.archived}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}