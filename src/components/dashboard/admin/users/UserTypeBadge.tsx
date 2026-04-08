import { Badge } from "@/components/ui/badge";

type UserType = "primary" | "partner" | "client";

interface UserTypeBadgeProps {
  type: UserType;
}

export function UserTypeBadge({ type }: UserTypeBadgeProps) {
  const variants = {
    primary: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    partner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    client: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  const labels = {
    primary: "Primary CSP",
    partner: "Partner",
    client: "Client",
  };

  return (
    <Badge variant="outline" className={variants[type]}>
      {labels[type]}
    </Badge>
  );
}