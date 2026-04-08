import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, Shield, Users, Briefcase, User } from "lucide-react";
import { UserTypeBadge } from "./UserTypeBadge";
import type { UserProfile } from "@/types/profile";
import type { UserRole } from "@/types/user";

interface UserTableRowProps {
  user: UserProfile;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onRoleChange: (userId: string, newRole: UserRole) => void;
}

const roleIcons = {
  admin: Shield,
  provider: Briefcase,
  partner: Users,
  client: User
};

const roleLabels = {
  admin: "Admin",
  provider: "Provider",
  partner: "Partner",
  client: "Client"
};

export function UserTableRow({ user, isSelected, onSelect, onRoleChange }: UserTableRowProps) {
  const RoleIcon = roleIcons[user.role];

  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="p-4">
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      </td>
      <td className="p-4">
        <span className="text-xs font-mono text-muted-foreground">
          {user.id.slice(0, 8)}...
        </span>
      </td>
      <td className="p-4">
        <div className="flex flex-col">
          <span className="font-medium">{user.full_name || "No name"}</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      </td>
      <td className="p-4">
        <Select
          value={user.role}
          onValueChange={(value) => onRoleChange(user.id, value as UserRole)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue>
              <div className="flex items-center gap-2">
                <RoleIcon className="h-4 w-4" />
                <span>{roleLabels[user.role]}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </div>
            </SelectItem>
            <SelectItem value="provider">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Provider</span>
              </div>
            </SelectItem>
            <SelectItem value="partner">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Partner</span>
              </div>
            </SelectItem>
            <SelectItem value="client">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Client</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="p-4">
        <span className="text-sm text-muted-foreground">
          {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
        </span>
      </td>
      <td className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Send Message</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Suspend User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}