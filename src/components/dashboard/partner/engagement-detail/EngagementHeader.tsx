import { memo } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Calendar, MoreVertical } from "lucide-react";
import type { Engagement } from "./types";

interface EngagementHeaderProps {
  engagement: Engagement;
  onAction?: (action: string) => void;
}

export const EngagementHeader = memo(function EngagementHeader({
  engagement,
  onAction,
}: EngagementHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 mb-2"
          onClick={() => router.push("/dashboard/partner/engagements")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Engagements
        </Button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">ENGAGEMENT: {engagement.id}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Actions
                <MoreVertical className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onAction?.("complete")}>
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction?.("extend")}>
                Request Extension
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction?.("export")}>
                Export Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onAction?.("cancel")}
              >
                Cancel Engagement
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{engagement.title}</span>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Due: {engagement.dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
});