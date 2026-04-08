import { memo } from "react";
import { useRouter } from "next/router";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Mail, Ban, CheckCircle } from "lucide-react";
import { CSPStatusBadge } from "./CSPStatusBadge";
import { KYBStatusBadge } from "./KYBStatusBadge";
import type { PrimaryCSP } from "./types";

interface CSPTableRowProps {
  csp: PrimaryCSP;
  onAction: (action: string, cspId: string) => void;
}

export const CSPTableRow = memo(function CSPTableRow({
  csp,
  onAction,
}: CSPTableRowProps) {
  const router = useRouter();

  const tierColors: Record<string, string> = {
    starter: "secondary",
    professional: "default",
    enterprise: "default",
  };

  return (
    <TableRow className="cursor-pointer hover:bg-muted/50">
      <TableCell
        onClick={() => router.push(`/dashboard/admin/users/primary-csps/${csp.id}`)}
      >
        <div>
          <p className="font-medium">{csp.companyName}</p>
          <p className="text-sm text-muted-foreground">{csp.email}</p>
        </div>
      </TableCell>
      <TableCell onClick={() => router.push(`/dashboard/admin/users/primary-csps/${csp.id}`)}>
        {csp.contactName}
      </TableCell>
      <TableCell onClick={() => router.push(`/dashboard/admin/users/primary-csps/${csp.id}`)}>
        {csp.jurisdiction}
      </TableCell>
      <TableCell onClick={() => router.push(`/dashboard/admin/users/primary-csps/${csp.id}`)}>
        <CSPStatusBadge status={csp.status} />
      </TableCell>
      <TableCell onClick={() => router.push(`/dashboard/admin/users/primary-csps/${csp.id}`)}>
        <KYBStatusBadge status={csp.kybStatus} />
      </TableCell>
      <TableCell onClick={() => router.push(`/dashboard/admin/users/primary-csps/${csp.id}`)}>
        <Badge variant={tierColors[csp.subscriptionTier] as "default" | "secondary"}>
          {csp.subscriptionTier}
        </Badge>
      </TableCell>
      <TableCell onClick={() => router.push(`/dashboard/admin/users/primary-csps/${csp.id}`)}>
        {csp.activeClients}
      </TableCell>
      <TableCell onClick={() => router.push(`/dashboard/admin/users/primary-csps/${csp.id}`)}>
        ${csp.monthlyRevenue.toLocaleString()}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/admin/users/primary-csps/${csp.id}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("email", csp.id)}>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {csp.kybStatus === "pending" && (
              <DropdownMenuItem onClick={() => onAction("approve", csp.id)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve KYB
              </DropdownMenuItem>
            )}
            {csp.status === "active" ? (
              <DropdownMenuItem
                onClick={() => onAction("suspend", csp.id)}
                className="text-destructive"
              >
                <Ban className="mr-2 h-4 w-4" />
                Suspend Account
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onAction("activate", csp.id)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Activate Account
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});