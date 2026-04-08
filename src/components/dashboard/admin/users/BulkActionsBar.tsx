import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Mail, UserX } from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export function BulkActionsBar({ selectedCount, onClearSelection }: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <Card className="p-6 bg-muted/50 border-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox checked={true} disabled />
          <span className="font-medium">
            {selectedCount} user{selectedCount !== 1 ? "s" : ""} selected
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button variant="outline" size="sm" className="text-red-600">
            <UserX className="h-4 w-4 mr-2" />
            Suspend
          </Button>
        </div>
      </div>
    </Card>
  );
}