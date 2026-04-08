import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Engagement } from "./types";

interface EngagementDetailsCardProps {
  details: Engagement["details"];
}

export const EngagementDetailsCard = memo(function EngagementDetailsCard({
  details,
}: EngagementDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Company Name</p>
            <p className="font-medium">{details.companyName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Jurisdiction</p>
            <p className="font-medium">{details.jurisdiction}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Structure</p>
            <p className="font-medium">{details.structure}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Share Capital</p>
            <p className="font-medium">{details.shareCapital}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Directors</p>
            <p className="font-medium">{details.directors}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Shareholders</p>
            <p className="font-medium">{details.shareholders}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});