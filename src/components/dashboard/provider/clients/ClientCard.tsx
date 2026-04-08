import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Settings, FileText, Mail, UserPlus } from "lucide-react";
import { InviteClientDialog } from "../InviteClientDialog";

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

  return (
    <Card className="hover:border-emerald-100 transition-colors">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Link
                href={`/dashboard/provider/clients/${client.id}`}
                className="text-lg font-semibold hover:text-emerald-600 transition-colors"
              >
                {client.name}
              </Link>
              <div className="text-sm text-muted-foreground">
                Contact: {client.contact} · {client.email}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Client
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  View Documents
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="font-medium">Active Engagements:</span> {client.activeEngagements}
            </div>
            <div className="text-muted-foreground">·</div>
            <div>
              <span className="font-medium">Last Activity:</span> {client.lastActivity}
            </div>
          </div>

          {/* Portal Status */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-500 uppercase tracking-wider text-[10px]">Portal Status:</span>
            {client.portalStatus === "active" ? (
              <>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-[10px] uppercase tracking-wider">
                  ● Active
                </Badge>
                <span className="text-muted-foreground">· Last login: {client.lastLogin}</span>
              </>
            ) : (
              <>
                <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-100 font-bold text-[10px] uppercase tracking-wider">
                  ⚠ Invite Pending
                </Badge>
                <span className="text-muted-foreground">· Sent {client.inviteSent}</span>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" asChild className="hover:border-emerald-200 hover:text-emerald-700">
              <Link href={`/dashboard/provider/clients/${client.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View Engagements
              </Link>
            </Button>
            {client.portalStatus === "pending" ? (
              <Button 
                size="sm" 
                variant="outline"
                className="hover:border-emerald-200 hover:text-emerald-700"
                onClick={() => setIsInviteOpen(true)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Resend Invite
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setIsInviteOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite to Portal
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <InviteClientDialog 
        open={isInviteOpen} 
        onOpenChange={setIsInviteOpen}
        name={client.name}
        email={client.email}
        showTrigger={false}
      />
    </Card>
  );
}