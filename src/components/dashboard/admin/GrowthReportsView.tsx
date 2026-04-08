import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileDown, TrendingUp, Users, Zap } from "lucide-react";

export function GrowthReportsView() {
  const [isExporting, setIsExporting] = useState(false);

  // Mock user growth data for the last 12 months
  const userGrowthData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short" }),
    primaryCSPs: Math.floor(Math.random() * 20) + 10 + i * 3,
    partners: Math.floor(Math.random() * 50) + 20 + i * 8,
    clients: Math.floor(Math.random() * 30) + 15 + i * 5,
  }));

  // Mock MRR growth data
  const mrrGrowthData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short" }),
    mrr: Math.floor(Math.random() * 5000) + 10000 + i * 2000,
  }));

  const growthMetrics = {
    primaryCSPs: { current: 132, growth: "124%" },
    partners: { current: 368, growth: "156%" },
    clients: { current: 245, growth: "89%" },
    mrr: { current: "$24,580", growth: "212%" },
    subscribers: {
      primaryCSP: { count: 132, growth: "124%" },
      partner: { count: 24, growth: "300%" },
    },
  };

  const networkMetrics = {
    avgPartnersPerCSP: { value: "4.2", growth: "15%" },
    repeatPartnerRate: { value: "68%", growth: "8%" },
    newPartnerDiscovery: { value: "34%" },
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      console.log("Exporting growth report...");
      setIsExporting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            Growth Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            User growth, MRR trends, and network effects
          </p>
        </div>
        <Button onClick={handleExport} disabled={isExporting}>
          <FileDown className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </div>

      {/* User Growth Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          User Growth - Last 12 Months
        </h2>

        {/* Chart Area */}
        <div className="h-64 relative mb-6">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          {/* Chart bars */}
          <div className="ml-12 h-full flex items-end justify-between gap-2">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                  <div
                    className="w-full bg-blue-500 dark:bg-blue-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ height: `${(data.primaryCSPs / 100) * 100}%` }}
                    title={`Primary CSPs: ${data.primaryCSPs}`}
                  />
                  <div
                    className="w-full bg-purple-500 dark:bg-purple-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ height: `${(data.partners / 100) * 100}%` }}
                    title={`Partners: ${data.partners}`}
                  />
                  <div
                    className="w-full bg-green-500 dark:bg-green-400 rounded-t hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ height: `${(data.clients / 100) * 100}%` }}
                    title={`Clients: ${data.clients}`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend and Growth Metrics */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500 dark:bg-blue-400" />
              <span className="text-sm">Primary CSPs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-500 dark:bg-purple-400" />
              <span className="text-sm">Partners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500 dark:bg-green-400" />
              <span className="text-sm">Clients</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>
              Primary CSPs: <Badge variant="secondary" className="ml-1">▲ {growthMetrics.primaryCSPs.growth} YOY</Badge>
            </div>
            <div>
              Partners: <Badge variant="secondary" className="ml-1">▲ {growthMetrics.partners.growth} YOY</Badge>
            </div>
            <div>
              Clients: <Badge variant="secondary" className="ml-1">▲ {growthMetrics.clients.growth} YOY</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* MRR Growth Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
          MRR Growth - Last 12 Months
        </h2>

        {/* Line Chart */}
        <div className="h-64 relative mb-6">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
            <span>$30k</span>
            <span>$20k</span>
            <span>$10k</span>
            <span>$0</span>
          </div>

          {/* Line chart area */}
          <div className="ml-12 h-full flex items-end justify-between">
            {mrrGrowthData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-2 bg-green-500 dark:bg-green-400 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ height: `${(data.mrr / 30000) * 100}%` }}
                  title={`${data.month}: $${(data.mrr / 1000).toFixed(1)}k`}
                />
                <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MRR Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <div className="text-sm text-muted-foreground">Current MRR</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {growthMetrics.mrr.current}
            </div>
            <Badge variant="secondary" className="mt-1">
              ▲ {growthMetrics.mrr.growth} YOY
            </Badge>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Primary CSP Subscribers</div>
            <div className="text-2xl font-bold">
              {growthMetrics.subscribers.primaryCSP.count}
            </div>
            <Badge variant="secondary" className="mt-1">
              ▲ {growthMetrics.subscribers.primaryCSP.growth} YOY
            </Badge>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Partner Subscribers</div>
            <div className="text-2xl font-bold">
              {growthMetrics.subscribers.partner.count}
            </div>
            <Badge variant="secondary" className="mt-1">
              ▲ {growthMetrics.subscribers.partner.growth} YOY
            </Badge>
          </div>
        </div>
      </Card>

      {/* Network Effects */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          Network Effects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Avg Partners per Primary CSP
            </div>
            <div className="text-3xl font-bold">{networkMetrics.avgPartnersPerCSP.value}</div>
            <Badge variant="secondary">
              ▲ {networkMetrics.avgPartnersPerCSP.growth} YOY
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              Growing network density indicates stronger platform value
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Repeat Partner Rate
            </div>
            <div className="text-3xl font-bold">{networkMetrics.repeatPartnerRate.value}</div>
            <Badge variant="secondary">
              ▲ {networkMetrics.repeatPartnerRate.growth} YOY
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              High repeat rate shows partner satisfaction and trust
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              New Partner Discovery Rate
            </div>
            <div className="text-3xl font-bold">{networkMetrics.newPartnerDiscovery.value}</div>
            <Badge variant="outline">of engagements</Badge>
            <p className="text-sm text-muted-foreground mt-2">
              Primary CSPs discovering new partners through platform
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}