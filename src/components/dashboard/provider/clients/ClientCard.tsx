import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Settings, FileText, Mail, UserPlus, Briefcase, Calendar } from "lucide-react";
import { InviteClientDialog } from "../InviteClientDialog";
import { motion } from "framer-motion";

interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  activeEngagements: number;
  lastActivity: string;
  portalStatus: "active" | "pending";
  lastLogin: string | null;
  inviteSent?: string;
  clientSince: string;
}

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-md transition-all duration-300 border-slate-200 overflow-hidden bg-white/80 backdrop-blur-sm group">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Main Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border-2 border-slate-100 group-hover:border-emerald-200 transition-colors">
                <AvatarFallback className="bg-emerald-50 text-emerald-700 font-bold text-xs">
                  {getInitials(client.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <Link
                  href={`/dashboard/provider/clients/${client.id}`}
                  className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors block"
                >
                  {client.name}
                </Link>
                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2">
                  <span>{client.contact}</span>
                  <span className="text-slate-300">|</span>
                  <span>{client.email}</span>
                </div>
              </div>
            </div>

            {/* Metrics & Status */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:justify-end">
              <div className="flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Briefcase className="h-3.5 w-3.5 opacity-60" />
                  <span className="font-bold text-slate-700">{client.activeEngagements}</span>
                  <span className="text-[10px] uppercase tracking-tighter opacity-70">Active</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="h-3.5 w-3.5 opacity-60" />
                  <span className="text-[10px] uppercase tracking-tighter opacity-70">Activity:</span>
                  <span className="font-medium text-slate-700">{client.lastActivity}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {client.portalStatus === "active" ? (
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100 text-[10px] py-0.5 font-bold uppercase tracking-wider">
                    ● Active
                  </Badge>
                ) : (
                  <Badge className="bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100 text-[10px] py-0.5 font-bold uppercase tracking-wider">
                    ⚠ Pending
                  </Badge>
                )}
                
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                    <Link href={`/dashboard/provider/clients/${client.id}`}>
                      <Eye className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </Link>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4 text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        <Eye className="h-3.5 w-3.5 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        <Settings className="h-3.5 w-3.5 mr-2" /> Manage Client
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        <FileText className="h-3.5 w-3.5 mr-2" /> View Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-xs font-bold uppercase tracking-wider text-emerald-600"
                        onClick={() => setIsInviteOpen(true)}
                      >
                        {client.portalStatus === "pending" ? (
                          <><Mail className="h-3.5 w-3.5 mr-2" /> Resend Invite</>
                        ) : (
                          <><UserPlus className="h-3.5 w-3.5 mr-2" /> Invite Portal</>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <InviteClientDialog 
        open={isInviteOpen} 
        onOpenChange={setIsInviteOpen}
        name={client.name}
        email={client.email}
        showTrigger={false}
      />
    </motion.div>
  );
}