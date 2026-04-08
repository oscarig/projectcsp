import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  FileText, 
  Plus,
  Upload,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Bell,
  CheckCircle2
} from "lucide-react";
import { NewEngagementModal } from "./NewEngagementModal";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { engagementService } from "@/services/engagementService";
import { documentService } from "@/services/documentService";

export function HomeView() {
  const { user } = useAuth();
  const [isNewEngagementModalOpen, setIsNewEngagementModalOpen] = useState(false);
  const [engagements, setEngagements] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    active: 0,
    pending: 0,
    notifications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadDashboardData();
    }
  }, [user?.id]);

  const loadDashboardData = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      // Load engagements
      const engagementsData = await engagementService.getEngagementsByClient(user.id);
      setEngagements(engagementsData.slice(0, 2)); // Only show 2 most recent

      // Load documents
      const documentsData = await documentService.getDocumentsByClient(user.id);
      setDocuments(documentsData.slice(0, 3)); // Only show 3 most recent

      // Calculate stats
      const engagementStats = await engagementService.getEngagementStats(user.id, "client");
      setStats({
        active: engagementStats.in_progress || 0,
        pending: engagementStats.pending + engagementStats.awaiting_info || 0,
        notifications: 5, // TODO: Implement notifications system
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickStats = [
    { icon: FileText, label: "Active Engagements", value: stats.active.toString(), color: "text-blue-600" },
    { icon: Clock, label: "Pending Actions", value: stats.pending.toString(), color: "text-orange-600" },
    { icon: Bell, label: "New Notifications", value: stats.notifications.toString(), color: "text-green-600" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
      case "active":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Clock className="mr-1 h-3 w-3" />In Progress</Badge>;
      case "awaiting_info":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100"><AlertTriangle className="mr-1 h-3 w-3" />Action Needed</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="mr-1 h-3 w-3" />Completed</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateProgress = (status: string) => {
    switch (status) {
      case "draft": return 10;
      case "pending": return 25;
      case "in_progress": return 50;
      case "active": return 50;
      case "awaiting_info": return 75;
      case "completed": return 100;
      default: return 0;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Mobile-First Header */}
      <div className="space-y-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Hi, {user?.user_metadata?.full_name || "there"}</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Welcome back to your dashboard
          </p>
        </div>

        {/* Mobile-Optimized Quick Actions */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          <Button 
            onClick={() => setIsNewEngagementModalOpen(true)} 
            className="w-full"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/dashboard/client/documents">
              <Upload className="mr-2 h-4 w-4" />
              Upload Doc
            </Link>
          </Button>
        </div>
      </div>

      {/* Desktop Quick Actions (Hidden on Mobile) */}
      <div className="hidden md:flex gap-2">
        <Button onClick={() => setIsNewEngagementModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Engagement Request
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/client/documents">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Link>
        </Button>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-2 md:p-3 rounded-full bg-muted ${stat.color}`}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Engagements - Mobile Optimized */}
      <Card>
        <CardHeader className="pb-3 md:pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg md:text-xl">Active Engagements</CardTitle>
              <CardDescription className="text-xs md:text-sm mt-1">
                Track progress on your active engagements
              </CardDescription>
            </div>
            <Badge variant="secondary" className="hidden md:inline-flex">
              {engagements.length} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4">
          {engagements.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-sm font-medium mb-1">No active engagements</p>
              <p className="text-xs text-muted-foreground mb-4">
                Create your first engagement to get started
              </p>
              <Button onClick={() => setIsNewEngagementModalOpen(true)} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Engagement
              </Button>
            </div>
          ) : (
            engagements.map((engagement) => (
              <div
                key={engagement.id}
                className="p-3 md:p-4 rounded-lg border hover:border-primary/50 transition-colors space-y-3"
              >
                {/* Mobile: Stacked Layout */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm md:text-base font-semibold flex-1 min-w-0">
                      {engagement.title}
                    </h3>
                    {getStatusBadge(engagement.status)}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">
                        Ref: {engagement.reference_number}
                      </span>
                      <span className="font-medium">{calculateProgress(engagement.status)}%</span>
                    </div>
                    <Progress value={calculateProgress(engagement.status)} className="h-1.5 md:h-2" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3 w-3" />
                      <span className="hidden sm:inline">{engagement.provider?.full_name || "Unassigned"}</span>
                      <span className="sm:hidden">{engagement.provider?.full_name?.split(" ")[0] || "Unassigned"}</span>
                    </div>
                    <span>{new Date(engagement.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Mobile-Optimized Action Button */}
                <Button variant="outline" size="sm" className="w-full md:w-auto" asChild>
                  <Link href={`/dashboard/client/engagements/${engagement.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Two Column Layout for Documents & Notifications - Responsive */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Recent Documents */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base md:text-lg">Recent Documents</CardTitle>
              <Link href="/dashboard/client/documents">
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-6">
                <FileText className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No documents yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{doc.file_name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            {new Date(doc.created_at).toLocaleDateString()}
                          </p>
                          {getDocumentStatusBadge(doc.status)}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base md:text-lg">Notifications</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-200 rounded-lg">
                <Bell className="h-4 w-4 text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Welcome to Vetto!</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    Start by creating your first engagement request
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Just now</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Engagement Modal */}
      <NewEngagementModal 
        open={isNewEngagementModalOpen} 
        onOpenChange={setIsNewEngagementModalOpen}
        onSuccess={loadDashboardData}
      />
    </div>
  );
}