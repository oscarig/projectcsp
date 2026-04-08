import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Edit, XCircle, FileText, MoreVertical } from "lucide-react";
import { ListingStatusBadge } from "./ListingStatusBadge";

type ListingStatus = "active" | "pending" | "expired";

interface PromotedListing {
  id: string;
  partnerId: string;
  partnerName: string;
  jurisdiction: string;
  status: ListingStatus;
  startDate: string;
  endDate: string;
  amount: number;
  renewsOn: string;
  category: string;
}

interface ListingTableRowProps {
  listing: PromotedListing;
}

export function ListingTableRow({ listing }: ListingTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs text-muted-foreground">
        {listing.id.replace("pl_", "")}
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <Link
            href={`/dashboard/admin/users/partners/${listing.partnerId}`}
            className="font-medium hover:underline"
          >
            {listing.partnerName}
          </Link>
          <span className="text-xs text-muted-foreground">
            Since {listing.startDate}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{listing.jurisdiction}</span>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs">
          {listing.category}
        </Badge>
      </TableCell>
      <TableCell>
        <ListingStatusBadge status={listing.status} />
      </TableCell>
      <TableCell>
        <span className="text-sm">{listing.renewsOn}</span>
      </TableCell>
      <TableCell className="text-right font-semibold">
        ${listing.amount.toLocaleString()}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {listing.status !== "expired" && (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    console.log("View listing details:", listing.id)
                  }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Edit listing:", listing.id)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Listing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    console.log("View invoices:", listing.partnerId)
                  }
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Invoice History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => console.log("Cancel listing:", listing.id)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Listing
                </DropdownMenuItem>
              </>
            )}
            {listing.status === "expired" && (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    console.log("View listing details:", listing.id)
                  }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    console.log("View invoices:", listing.partnerId)
                  }
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Invoice History
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}