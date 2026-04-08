import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityTimelineCardProps {
  engagementId: string;
}

export const ActivityTimelineCard = memo(function ActivityTimelineCard({
  engagementId,
}: ActivityTimelineCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Activity Timeline</CardTitle>
          <a
            href={`/dashboard/partner/engagements/${engagementId}#activity`}
            className="text-sm text-primary hover:underline"
          >
            View Full Activity Timeline
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Activity timeline will be displayed here
        </p>
      </CardContent>
    </Card>
  );
});