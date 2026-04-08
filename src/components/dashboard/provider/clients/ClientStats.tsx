import { Card } from "@/components/ui/card";
import { Users, UserCheck, Clock, Archive } from "lucide-react";
import { motion } from "framer-motion";

interface ClientStatsProps {
  stats: {
    total: number;
    active: number;
    pending: number;
    archived: number;
  };
}

export function ClientStats({ stats }: ClientStatsProps) {
  const statItems = [
    { label: "Total Clients", value: stats.total, icon: Users, color: "text-slate-600", bg: "bg-slate-50" },
    { label: "Active Portal", value: stats.active, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Invite", value: stats.pending, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Archived", value: stats.archived, icon: Archive, color: "text-slate-400", bg: "bg-slate-50/50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {statItems.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
            <div className={`h-1 w-full ${item.bg.replace('bg-', 'bg-').split(' ')[0]}`} />
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  {item.label}
                </span>
                <item.icon className={`h-3 w-3 ${item.color} opacity-60`} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-black ${item.color.replace('600', '900')} leading-none`}>
                  {item.value}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}