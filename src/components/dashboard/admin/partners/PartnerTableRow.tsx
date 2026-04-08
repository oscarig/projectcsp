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
import { MoreHorizontal, Eye, Shield, Ban } from "lucide-react";
import { PartnerStatusBadge } from "./PartnerStatusBadge";
import { KYCStatusBadge } from "./KYCStatusBadge";
import type { Partner } from "./types";

interface PartnerTableRowProps {
  partner: Partner;
  onAction: (action: string, partnerId: string) => void;
}

export const PartnerTableRow = memo(function PartnerTableRow({
  partner,
  onAction,
}: PartnerTableRowProps) {
  const router = useRouter();

  return (
    <TableRow>
      <TableCell className="font-medium">{partner.name}</TableCell>
      <TableCell>{partner.email}</TableCell>
      <TableCell>
        <PartnerStatusBadge status={partner.status} />
      </TableCell>
      <TableCell>
        <KYCStatusBadge status={partner.kycStatus} />
      </TableCell>
      <TableCell className="capitalize">{partner.subscriptionTier}</TableCell>
      <TableCell>${partner.monthlyRevenue.toLocaleString()}</TableCell>
      <TableCell>{new Date(partner.joinDate).toLocaleDateString()}</TableCell>
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
            <DropdownMenuItem onClick={() => router.push(`/dashboard/admin/users/partners/${partner.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAction("verify", partner.id)}>
              <Shield className="mr-2 h-4 w-4" />
              Verify KYC
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onAction("suspend", partner.id)}
            >
              <Ban className="mr-2 h-4 w-4" />
              Suspend Partner
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});