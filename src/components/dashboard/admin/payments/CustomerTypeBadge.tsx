import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Building, Handshake } from "lucide-react";
import type { CustomerType } from "./types";

const variants: Record<
  CustomerType,
  { label: string; icon: typeof Building }
> = {
  provider: { label: "Primary CSP", icon: Building },
  partner: { label: "Partner", icon: Handshake },
};

interface CustomerTypeBadgeProps {
  type: CustomerType;
}

export const CustomerTypeBadge = memo(function CustomerTypeBadge({
  type,
}: CustomerTypeBadgeProps) {
  const { label, icon: Icon } = variants[type];

  return (
    <Badge variant="secondary" className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});