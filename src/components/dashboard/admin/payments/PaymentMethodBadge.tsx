import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Building2, Wallet, Bitcoin } from "lucide-react";
import type { PaymentMethod } from "./types";

const variants: Record<
  PaymentMethod,
  { label: string; icon: typeof CreditCard }
> = {
  card: { label: "Card", icon: CreditCard },
  bank_transfer: { label: "Bank Transfer", icon: Building2 },
  paypal: { label: "PayPal", icon: Wallet },
  crypto: { label: "Crypto", icon: Bitcoin },
};

interface PaymentMethodBadgeProps {
  method: PaymentMethod;
}

export const PaymentMethodBadge = memo(function PaymentMethodBadge({
  method,
}: PaymentMethodBadgeProps) {
  const { label, icon: Icon } = variants[method];

  return (
    <Badge variant="outline" className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
});