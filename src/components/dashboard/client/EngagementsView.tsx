import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building2, Calendar, DollarSign, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { NewEngagementModal } from "./NewEngagementModal";

export function EngagementsView() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const engagements = [
    {
      id: "1",
      title: "Singapore Pte Ltd Formation",
      provider: "Vanguard Corporate Services",
      status: "In Progress",
      lastUpdate: "2 hours ago",
      amount: "SGD 2,500",
      progress: 60,
      service: "Company Formation",
      statusColor: "default" as const,
    },
    {
      id: "2",
      title: "BVI Annual Filing 2024",
      provider: "Offshore Solutions Ltd",
      status: "Pending Documents",
      lastUpdate: "1 day ago",
      amount: "USD 1,200",
      progress: 30,
      service: "Annual Filing",
      statusColor: "secondary" as const,
    },
    {
      id: "3",
      title: "UK Company Formation",
      provider: "London Corporate Services",
      status: "Completed",
      lastUpdate: "3 days ago",
      amount: "GBP 800",
      progress: 100,
      service: "Company Formation",
      statusColor: "default" as const,
    },
    {
      id: "4",
      title: "Delaware LLC Setup",
      provider: "US Business Solutions",
      status: "Quote Received",
      lastUpdate: "5 days ago",
      amount: "USD 1,500",
      progress: 10,
      service: "Company Formation",
      statusColor: "secondary" as const,
    },
  ];

  const getFilteredEngagements = () => {
    let filtered = engagements;

    if (filter === "active") {
      filtered = filtered.filter(
        (eng) => eng.status === "In Progress" || eng.status === "Pending Documents"
      );
    } else if (filter === "completed") {
      filtered = filtered.filter((eng) => eng.status === "Completed");
    } else if (filter === "quotes") {
      filtered = filtered.filter((eng) => eng.status === "Quote Received");
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (eng) =>
          eng.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          eng.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
          eng.service.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredEngagements = getFilteredEngagements();

  const handleViewEngagement = (id: string) => {
    console.log("View engagement:", id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Pending Documents":
        return <XCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default" as const;
      case "In Progress":
        return "secondary" as const;
      case "Pending Documents":
        return "secondary" as const;
      case "Quote Received":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Engagements</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all your service engagements
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search engagements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {filteredEngagements.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8">
                <Building2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm font-medium mb-1">No engagements found</p>
                <p className="text-xs text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search"
                    : "Create your first engagement to get started"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredEngagements.map((engagement) => (
                <Card
                  key={engagement.id}
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleViewEngagement(engagement.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">
                          {engagement.title}
                        </CardTitle>
                        <CardDescription className="mt-1 truncate">
                          {engagement.provider}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusBadgeVariant(engagement.status)}>
                        {engagement.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">
                          {engagement.service}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {engagement.amount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground text-xs">
                          Updated {engagement.lastUpdate}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{engagement.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${engagement.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(engagement.status)}
                        <span className="text-xs text-muted-foreground">
                          {engagement.status}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <NewEngagementModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}