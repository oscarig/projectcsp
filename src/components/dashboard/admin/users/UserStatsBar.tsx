import { Card } from "@/components/ui/card";

interface UserStatsBarProps {
  stats: {
    total: number;
    admin: number;
    provider: number;
    partner: number;
    client: number;
  };
}

export function UserStatsBar({ stats }: UserStatsBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Total Users</div>
        <div className="text-2xl font-bold">{stats.total}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Admins</div>
        <div className="text-2xl font-bold">{stats.admin}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Providers</div>
        <div className="text-2xl font-bold">{stats.provider}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Partners</div>
        <div className="text-2xl font-bold">{stats.partner}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Clients</div>
        <div className="text-2xl font-bold">{stats.client}</div>
      </Card>
    </div>
  );
}