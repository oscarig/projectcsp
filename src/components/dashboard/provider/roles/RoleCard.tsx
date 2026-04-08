import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface RoleCardProps {
  role: string;
  roleName: string;
  description: string;
  userCount: number;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export function RoleCard({
  role,
  roleName,
  description,
  userCount,
  color,
  isSelected,
  onClick,
}: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-colors ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-3 h-3 rounded-full ${color} mt-1.5`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium">{roleName}</p>
            <Badge variant="secondary" className="text-xs">
              {userCount}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}