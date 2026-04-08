import { memo } from "react";
import { useRouter } from "next/router";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Mail, Ban } from "lucide-react";
import { ClientStatusBadge } from "./ClientStatusBadge";
import type { Client } from "./types";

interface ClientTableRowProps {
  client: Client;
  onAction: (action: string, clientId: string) => void;
}

export const ClientTableRow = memo(function ClientTableRow({
  client,
  onAction,
}: ClientTableRowProps) {
  const router = useRouter();

  return (
    <TableRow>
      <TableCell className="font-medium">{client.name}</TableCell>
      <TableCell>{client.email}</TableCell>
      <TableCell>{client.company}</TableCell>
      <TableCell>
        <ClientStatusBadge status={client.status} />
      </TableCell>
      <TableCell>{client.activeEngagements}</TableCell>
      <TableCell>${client.totalSpent.toLocaleString()}</TableCell>
      <TableCell>{new Date(client.joinDate).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(client.lastActivity).toLocaleDateString()}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push(`/dashboard/admin/users/clients/${client.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAction("email", client.id)}>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onAction("deactivate", client.id)}
            >
              <Ban className="mr-2 h-4 w-4" />
              Deactivate Client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});