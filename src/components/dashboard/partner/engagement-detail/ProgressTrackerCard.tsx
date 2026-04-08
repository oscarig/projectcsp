import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";
import type { Engagement, EngagementStep } from "./types";

interface ProgressTrackerCardProps {
  engagement: Pick<Engagement, "progress" | "currentStep" | "totalSteps">;
  steps: EngagementStep[];
}

export const ProgressTrackerCard = memo(function ProgressTrackerCard({
  engagement,
  steps,
}: ProgressTrackerCardProps) {
  const currentStepData = steps.find((s) => s.number === engagement.currentStep);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Tracker</CardTitle>
        <CardDescription>
          Step {engagement.currentStep} of {engagement.totalSteps}:{" "}
          {currentStepData?.title}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={engagement.progress} className="h-2" />
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-3">
              {step.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : step.status === "in-progress" ? (
                <Circle className="h-5 w-5 text-primary fill-primary mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium">
                  Step {step.number}: {step.title}
                </p>
                {step.date && (
                  <p className="text-sm text-muted-foreground">{step.date}</p>
                )}
                {step.status === "in-progress" && (
                  <Badge variant="secondary" className="mt-1">
                    In Progress
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});