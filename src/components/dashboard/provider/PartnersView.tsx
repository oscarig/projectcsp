import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Globe,
  Mail,
  MoreVertical,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { InvitePartnerModal } from "./InvitePartnerModal";

export function PartnersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const partners = [
    {
      id: "1",
      name: "Singapore CSP Pte Ltd",
      jurisdiction: "Singapore",
      services: "Formation, CoSec",
      rating: 4.9,
      engagements: 24,
      responseTime: "<24 hrs",
      lastUsed: "5 Apr 2024",
      activeEngagements: 1,
      status: "active",
    },
    {
      id: "2",
      name: "BVI Trust Services",
      jurisdiction: "BVI",
      services: "Trusts, CoSec",
      rating: 4.7,
      engagements: 18,
      responseTime: "<48 hrs",
      lastUsed: "2 Mar 2024",
      activeEngagements: 2,
      status: "active",
    },
    {
      id: "3",
      name: "Cayman Fund Services",
      jurisdiction: "Cayman",
      services: "Fund Formation, Registered",
      rating: 4.8,
      engagements: 12,
      responseTime: "<24 hrs",
      lastUsed: "28 Mar 2024",
      activeEngagements: 1,
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">PARTNERS</h1>
        <Button onClick={() => setIsInviteModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Invite Partner
        </Button>
      </div>

      {/* Invite Partner Modal */}
      <InvitePartnerModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSuccess={() => {
          // Optionally refresh partners list here
          console.log("Partner invitation sent successfully");
        }}
      />

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                onClick={() => setFilterStatus("active")}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "jurisdiction" ? "default" : "outline"}
                onClick={() => setFilterStatus("jurisdiction")}
              >
                Jurisdiction
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <span>
              <strong>CONNECTED PARTNERS:</strong> 18
            </span>
            <span className="text-muted-foreground">·</span>
            <span>
              <strong>Pending Invites:</strong> 3
            </span>
            <span className="text-muted-foreground">·</span>
            <span>
              <strong>Available in Directory:</strong> 142
            </span>
          </div>
        </CardContent>
      </Card>

      {/* My Partners */}
      <Card>
        <CardHeader>
          <CardTitle>MY PARTNERS ({partners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="border rounded-lg p-4 space-y-3 hover:border-primary transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Link
                      href={`/dashboard/provider/partners/${partner.id}`}
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {partner.name}
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span>
                        Jurisdiction: {partner.jurisdiction} · Services:{" "}
                        {partner.services}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{partner.rating}</span>
                        <span className="text-muted-foreground">
                          ({partner.engagements} engagements)
                        </span>
                      </div>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">
                        Response: {partner.responseTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>Last used: {partner.lastUsed}</span>
                      <span>·</span>
                      <span>Active engagement: {partner.activeEngagements}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Set as Preferred</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Send Engagement
                  </Button>
                  <Button size="sm" variant="outline">
                    View History
                  </Button>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Discover New Partners */}
      <Card>
        <CardHeader>
          <CardTitle>DISCOVER NEW PARTNERS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Based on your engagement history, you may need:
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="font-medium">Singapore</span>
                <Badge variant="secondary">3 partners available</Badge>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="font-medium">BVI</span>
                <Badge variant="secondary">2 partners available</Badge>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="font-medium">UAE</span>
                <Badge variant="secondary">4 partners available</Badge>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
          </div>
          <Button className="w-full" variant="outline">
            Browse Full Directory
          </Button>
        </CardContent>
      </Card>

      {/* Partner Performance */}
      <Card>
        <CardHeader>
          <CardTitle>PARTNER PERFORMANCE (Last 30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm">
                <strong>Top Performer:</strong> Singapore CSP · 4.9⭐ · 100%
                on-time
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm">
                <strong>Most Used:</strong> BVI Trust · 5 engagements
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm">
                <strong>Fastest Response:</strong> Cayman Funds · avg 4 hrs
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}