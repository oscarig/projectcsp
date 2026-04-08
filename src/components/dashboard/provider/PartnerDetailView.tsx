import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign,
  Plus,
  Star,
  TrendingUp,
} from "lucide-react";

interface PartnerDetailViewProps {
  partnerId?: string;
}

export function PartnerDetailView({ partnerId }: PartnerDetailViewProps) {
  const partner = {
    id: "1",
    name: "Singapore CSP Pte Ltd",
    partnerSince: "15 Jan 2024",
    connectionType: "Direct (invited by you)",
    jurisdiction: "Singapore",
    services: "Formation, CoSec",
    rating: 4.9,
    totalEngagements: 24,
    onTimeDelivery: 96,
    avgResponseTime: "<24 hrs",
    avgEngagementValue: "$3.2K",
    totalValue: "$76,800",
    verification: {
      license: "✓ License verified (ACRA) - expires Dec 2025",
      piInsurance: "✓ PI Insurance: $2M - expires Jun 2025",
      cyberInsurance: "✓ Cyber Insurance: $1M - expires Jun 2025",
      platformSince: "✓ On platform since: Jan 2024",
    },
    activeEngagements: [
      {
        id: "1",
        client: "Tech Innovators",
        title: "Singapore Formation",
        status: "In Progress",
        progress: "Step 2/4",
        dueDate: "15 May",
      },
      {
        id: "2",
        client: "Global Trading",
        title: "Singapore CoSec",
        status: "With Partner",
        note: "Documents pending",
      },
    ],
    history: [
      {
        month: "Apr 2024",
        engagements: 2,
        value: "$6,400",
        rating: 4.8,
      },
      {
        month: "Mar 2024",
        engagements: 3,
        value: "$9,600",
        rating: 5.0,
      },
      {
        month: "Feb 2024",
        engagements: 1,
        value: "$3,200",
        rating: 4.5,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <Link
        href="/dashboard/provider/partners"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Partners
      </Link>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{partner.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Partner since: {partner.partnerSince} · Connection:{" "}
            {partner.connectionType}
          </p>
        </div>
      </div>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle>VERIFICATION STATUS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{partner.verification.license}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{partner.verification.piInsurance}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{partner.verification.cyberInsurance}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{partner.verification.platformSince}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>PERFORMANCE METRICS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">
                  Engagements completed
                </span>
                <span className="text-sm font-bold">
                  {partner.totalEngagements}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">On-time delivery</span>
                <span className="text-sm font-bold">
                  {partner.onTimeDelivery}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">
                  Avg engagement value
                </span>
                <span className="text-sm font-bold">
                  {partner.avgEngagementValue}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Avg response time</span>
                <span className="text-sm font-bold">
                  {partner.avgResponseTime}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Quality rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold">{partner.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Total value</span>
                <span className="text-sm font-bold">{partner.totalValue}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Engagements */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              ACTIVE ENGAGEMENTS WITH THIS PARTNER (
              {partner.activeEngagements.length})
            </CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partner.activeEngagements.map((engagement) => (
              <div
                key={engagement.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold">
                      {engagement.client} - {engagement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="default">● {engagement.status}</Badge>
                      {engagement.progress && <span>| {engagement.progress}</span>}
                      {engagement.dueDate && (
                        <span>| Due {engagement.dueDate}</span>
                      )}
                      {engagement.note && <span>| {engagement.note}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement History */}
      <Card>
        <CardHeader>
          <CardTitle>ENGAGEMENT HISTORY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {partner.history.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{record.month}:</span>
                  <span className="text-sm">
                    {record.engagements} engagements
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-sm">{record.value}</span>
                  <span className="text-muted-foreground">·</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{record.rating}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View Full History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Relationship Health */}
      <Card>
        <CardHeader>
          <CardTitle>RELATIONSHIP HEALTH</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="default">● Active</Badge>
              <span>· 5 engagements in last 90 days</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Recommendation:</strong> Continue using for Singapore work
            </p>
            <div className="flex flex-wrap gap-2">
              <Button>Set as Preferred Partner</Button>
              <Button variant="outline">Archive</Button>
              <Button variant="outline" className="text-destructive">
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}