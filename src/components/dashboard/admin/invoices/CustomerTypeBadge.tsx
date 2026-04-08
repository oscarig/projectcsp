import { Badge } from "@/components/ui/badge";

type InvoiceType = "primary_csp" | "partner" | "promoted_listing";

interface CustomerTypeBadgeProps {
  type: InvoiceType;
}

export function CustomerTypeBadge({ type }: CustomerTypeBadgeProps) {
  const typeConfig = {
    primary_csp: { 
      label: "Primary", 
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" 
    },
    partner: { 
      label: "Partner", 
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
    },
    promoted_listing: { 
      label: "Promoted", 
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
    },
  };

  const config = typeConfig[type];

  return (
    <Badge variant="outline" className={`${config.color} text-xs`}>
      {config.label}
    </Badge>
  );
}