import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import type { Engagement } from "./types";

interface ClientInfoCardProps {
  client: Engagement["client"];
}

export const ClientInfoCard = memo(function ClientInfoCard({
  client,
}: ClientInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Client
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="font-semibold">{client.name}</p>
          {client.aliased && (
            <Badge variant="outline" className="mt-1">
              Aliased
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Jurisdiction: {client.jurisdiction}
        </p>
      </CardContent>
    </Card>
  );
});