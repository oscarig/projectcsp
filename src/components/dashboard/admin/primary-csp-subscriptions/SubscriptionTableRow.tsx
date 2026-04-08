import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, FileText, XCircle, Mail, Wallet, Ban, MoreVertical } from "lucide-react";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import { SubscriptionPlanBadge } from "./SubscriptionPlanBadge";

type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";
type SubscriptionPlan = "starter" | "professional" | "enterprise";

interface PrimaryCSPSubscription {
  id: string;
  cspId: string;
  companyName: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  nextBillingDate: string;
  amount: number;
  startDate: string;
}

interface SubscriptionTableRowProps {
  subscription: PrimaryCSPSubscription;
}

export function SubscriptionTableRow({ subscription }: SubscriptionTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs text-muted-foreground">
        {subscription.id.replace("sub_", "")}
      </TableCell>
      <TableCell>
        <div>
          <Link
            href={`/dashboard/admin/users/primary-csps/${subscription.cspId}`}
            className="font-medium hover:underline"
          >
            {subscription.companyName}
          </Link>
          <p className="text-xs text-muted-foreground">Since {subscription.startDate}</p>
        </div>
      </TableCell>
      <TableCell>
        <SubscriptionPlanBadge plan={subscription.plan} />
      </TableCell>
      <TableCell>
        <SubscriptionStatusBadge status={subscription.status} />
      </TableCell>
      <TableCell className="text-sm">{subscription.nextBillingDate}</TableCell>
      <TableCell className="text-right font-semibold">
        ${subscription.amount.toLocaleString()}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("View subscription:", subscription.id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            {(subscription.status === "active" || subscription.status === "trialing") && (
              <>
                <DropdownMenuItem onClick={() => console.log("Edit subscription:", subscription.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Plan
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("View invoices:", subscription.cspId)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Invoice History
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("View payment method:", subscription.cspId)}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Payment Method
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => console.log("Cancel subscription:", subscription.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Subscription
                </DropdownMenuItem>
              </>
            )}
            {subscription.status === "past_due" && (
              <>
                <DropdownMenuItem
                  onClick={() => console.log("Send reminder:", subscription.cspId)}
                  className="text-yellow-600 dark:text-yellow-400"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Payment Reminder
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("View payment method:", subscription.cspId)}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Update Payment Method
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => console.log("Suspend subscription:", subscription.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Suspend Subscription
                </DropdownMenuItem>
              </>
            )}
            {subscription.status === "canceled" && (
              <DropdownMenuItem onClick={() => console.log("View invoices:", subscription.cspId)}>
                <FileText className="mr-2 h-4 w-4" />
                Invoice History
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}