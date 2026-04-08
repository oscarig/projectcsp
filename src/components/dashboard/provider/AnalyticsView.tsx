import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Clock, Download } from "lucide-react";

export function AnalyticsView() {
  const kpis = [
    { label: "QUOTES SENT", value: "42" },
    { label: "ACCEPTED", value: "12" },
    { label: "CONVERSION RATE", value: "28.6%" },
    { label: "REVENUE (EST.)", value: "£14,388" },
  ];

  const jurisdictionData = [
    { jurisdiction: "United Kingdom", quotesSent: 28, conversion: "35.7%" },
    { jurisdiction: "Germany", quotesSent: 8, conversion: "25.0%" },
    { jurisdiction: "USA - Delaware", quotesSent: 4, conversion: "0%" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <Card>
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="text-center">
                <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                  {kpi.label}
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Conversion by Jurisdiction */}
      <Card>
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Conversion by Jurisdiction
          </h2>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jurisdiction
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quotes Sent
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jurisdictionData.map((row) => (
                  <tr key={row.jurisdiction}>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {row.jurisdiction}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {row.quotesSent}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {row.conversion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Response Time Analysis */}
      <Card>
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Response Time Analysis
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="h-4 w-4 text-purple-600" />
            <span>
              Your avg: <span className="font-semibold">4.2h</span> · Platform
              avg: <span className="font-semibold">6.8h</span> ·{" "}
              <span className="text-green-600 font-semibold">
                You're 38% faster
              </span>
            </span>
          </div>
        </div>
      </Card>

      {/* Export Button */}
      <div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
}