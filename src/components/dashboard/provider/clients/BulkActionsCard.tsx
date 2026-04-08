import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImportClientsDialog } from "./ImportClientsDialog";
import { ExportClientsDialog } from "./ExportClientsDialog";
import { BulkInviteDialog } from "./BulkInviteDialog";

export function BulkActionsCard() {
  return (
    <Card className="border-none shadow-sm bg-gradient-to-r from-slate-50 to-white overflow-hidden">
      <div className="h-1 bg-blue-600 w-full" />
      <CardHeader>
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Bulk Operations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <ImportClientsDialog />
          <ExportClientsDialog />
          <BulkInviteDialog />
        </div>
      </CardContent>
    </Card>
  );
}