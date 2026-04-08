import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Loader2 } from "lucide-react";
import { UserFilters } from "./users/UserFilters";
import { UserStatsBar } from "./users/UserStatsBar";
import { UserTableRow } from "./users/UserTableRow";
import { BulkActionsBar } from "./users/BulkActionsBar";
import { profileService } from "@/services/profileService";
import type { UserProfile } from "@/types/profile";
import type { UserRole } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

type UserType = "all" | "admin" | "provider" | "partner" | "client";

export function AdminUsersView() {
  const [activeFilter, setActiveFilter] = useState<UserType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, [activeFilter]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      let result;
      
      if (activeFilter === "all") {
        result = await profileService.getAllProfiles();
      } else {
        result = await profileService.getProfilesByRole(activeFilter as UserRole);
      }
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setUsers(result.profiles || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await profileService.updateUserRole(userId, newRole);
      toast({
        title: "Success",
        description: "User role updated successfully"
      });
      await loadUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.includes(searchQuery);
    return matchesSearch;
  });

  const stats = {
    total: users.length,
    admin: users.filter((u) => u.role === "admin").length,
    provider: users.filter((u) => u.role === "provider").length,
    partner: users.filter((u) => u.role === "partner").length,
    client: users.filter((u) => u.role === "client").length,
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const isAllSelected = filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-sm text-muted-foreground">Manage all platform users and their roles</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <UserFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          <UserStatsBar stats={stats} />
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Name / Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    isSelected={selectedUsers.includes(user.id)}
                    onSelect={(checked) => handleSelectUser(user.id, checked)}
                    onRoleChange={handleRoleChange}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Bulk Actions */}
      <BulkActionsBar
        selectedCount={selectedUsers.length}
        onClearSelection={() => setSelectedUsers([])}
      />
    </div>
  );
}