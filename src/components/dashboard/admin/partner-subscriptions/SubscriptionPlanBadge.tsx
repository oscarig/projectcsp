import { Badge } from "@/components/ui/badge";

type SubscriptionPlan = "free" | "basic" | "premium";

interface SubscriptionPlanBadgeProps {
  plan: SubscriptionPlan;
}

export function SubscriptionPlanBadge({ plan }: SubscriptionPlanBadgeProps) {
  const planConfig = {
    free: {
      label: "Free",
      color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    },
    basic: {
      label: "Basic",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    premium: {
      label: "Premium",
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
  };

  const config = planConfig[plan];

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  );
}