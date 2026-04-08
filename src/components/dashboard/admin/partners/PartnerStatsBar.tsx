import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ShieldCheck, DollarSign, Activity } from "lucide-react";
import type { Partner } from "./types";

interface PartnerStatsBarProps {
  partners: Partner[];
}

export const PartnerStatsBar = memo(function PartnerStatsBar({ partners }: PartnerStatsBarProps) {
  const activeCount = partners.filter((p) => p.status === "active").length;
  const verifiedCount = partners.filter((p) => p.kycStatus === "verified").length;
  const totalRevenue = partners.reduce((sum, p) => sum + p.monthlyRevenue, 0);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Partners</p>
            <h3 className="text-2xl font-bold mt-2">{partners.length}</h3>
          </div>
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Partners</p>
            <h3 className="text-2xl font-bold mt-2">{activeCount}</h3>
          </div>
          <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <Activity className="h-6 w-6 text-emerald-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">KYC Verified</p>
            <h3 className="text-2xl font-bold mt-2">{verifiedCount}</h3>
          </div>
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-purple-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
            <h3 className="text-2xl font-bold mt-2">${totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});