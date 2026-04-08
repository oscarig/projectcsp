import { memo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Download } from "lucide-react";
import { AuditActionBadge } from "./AuditActionBadge";
import { AuditSeverityBadge } from "./AuditSeverityBadge";
import type { AuditLog } from "./types";

interface AuditTableRowProps {
  log: AuditLog;
  onAction: (action: string, logId: string) => void;
}

export const AuditTableRow = memo(function AuditTableRow({
  log,
  onAction,
}: AuditTableRowProps) {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div>
          <p className="font-medium">{new Date(log.timestamp).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(log.timestamp).toLocaleDateString()}
          </p>
        </div>
      </TableCell>
      <TableCell>{log.user}</TableCell>
      <TableCell>
        <AuditActionBadge action={log.action} />
      </TableCell>
      <TableCell>{log.resource}</TableCell>
      <TableCell className="max-w-[200px] truncate">{log.details}</TableCell>
      <TableCell>
        <AuditSeverityBadge severity={log.severity} />
      </TableCell>
      <TableCell>
        <div>
          <p className="text-sm">{log.ipAddress}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[150px]">
            {log.userAgent}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction("view", log.id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("export", log.id)}>
              <Download className="mr-2 h-4 w-4" />
              Export Log
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});