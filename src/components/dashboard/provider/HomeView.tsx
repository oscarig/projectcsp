import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  Clock,
  Upload,
  Users,
  TrendingUp,
  TrendingDown,
  FileText,
  UserPlus,
  Search,
  AlertCircle,
  Star,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ViewEngagementDialog } from "./ViewEngagementDialog";
import { UploadDocumentDialog } from "./UploadDocumentDialog";
import { InviteClientDialog } from "./InviteClientDialog";
import { ConnectPartnerDialog } from "./ConnectPartnerDialog";
import { NewEngagementDialog } from "./NewEngagementDialog";
import { FindPartnerDialog } from "./FindPartnerDialog";
import { AddClientDialog } from "./clients/AddClientDialog";

export function HomeView() {
  const { profile } = useAuth();
  
  // Localized state for active engagements
  const [activeEngagements, setActiveEngagements] = useState([
    {
      id: "SP-2024-042",
      title: "Tech Innovators Ltd · Singapore Pte Ltd Formation",
      client: "Tech Innovators Ltd",
      status: "In Progress",
      step: "Step 2/4",
      due: "15 May",
      partner: "Singapore CSP",
      lastAction: "Today",
    },
    {
      id: "BV-2024-038",
      title: "Global Trading · BVI Annual Filing",
      client: "Global Trading",
      status: "Awaiting Documents",
      step: "⚠ Critical",
      due: "22 May",
      partner: "BVI Trust Services",
      lastAction: "2 days ago",
    },
    {
      id: "CY-2024-022",
      title: "Ocean Holdings · Cayman Fund Formation",
      client: "Ocean Holdings",
      status: "With Partner",
      step: "Step 3/5",
      due: "30 May",
      partner: "Cayman Fund Services",
      lastAction: "Today",
    }
  ]);

  const updateEngagement = (updated: any) => {
    setActiveEngagements(prev => 
      prev.map(e => e.id === updated.id ? updated : e)
    );
  };

  // Get current time for greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "GOOD MORNING" : hour < 18 ? "GOOD AFTERNOON" : "GOOD EVENING";
  
  // Format current date
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Get user's full name or fallback to "User"
  const userName = profile?.full_name?.toUpperCase() || "USER";

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{greeting}, {userName}</h1>
            <p className="text-muted-foreground">Welcome back! Here's your latest activity</p>
          </div>
          <p className="text-muted-foreground">{currentDate}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          London CSP · Professional Plan · Next billing: 15 May 2024
        </p>
      </div>

      {/* Quick Actions */}
      <Card className="border-none shadow-sm bg-gradient-to-r from-slate-50 to-white">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">QUICK ACTIONS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NewEngagementDialog />
            <AddClientAction />
            <FindPartnerDialog />
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 ml-1">KEY METRICS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="pt-6 relative">
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">ACTIVE ENGAGEMENTS</p>
                <p className="text-4xl font-black text-slate-900">{activeEngagements.length}</p>
                <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>12% MoM</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <FileText className="h-16 w-16" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="pt-6 relative">
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">PENDING ACTIONS</p>
                <p className="text-4xl font-black text-slate-900">8</p>
                <div className="flex items-center text-xs font-semibold text-orange-600 bg-orange-50 w-fit px-2 py-0.5 rounded-full">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  <span>3 from yesterday</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Clock className="h-16 w-16" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="pt-6 relative">
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">PARTNERS CONNECTED</p>
                <p className="text-4xl font-black text-slate-900">18</p>
                <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>2 this week</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Users className="h-16 w-16" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="pt-6 relative">
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">UTILIZATION</p>
                <p className="text-4xl font-black text-slate-900">68%</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">of active plan</p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <TrendingUp className="h-16 w-16" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Active Engagements */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
          <div>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">ACTIVE ENGAGEMENTS ({activeEngagements.length})</CardTitle>
          </div>
          <Link href="/dashboard/provider/engagements">
            <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
              View All
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {activeEngagements.map((engagement) => (
              <div key={engagement.id} className="group border rounded-xl p-5 space-y-4 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-500/5 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <p className="font-bold text-lg text-slate-900 truncate">{engagement.title}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className={
                        engagement.status.includes('Critical') || engagement.status.includes('Awaiting') 
                        ? 'bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-50 font-bold text-[10px] uppercase tracking-wider border whitespace-nowrap' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 font-bold text-[10px] uppercase tracking-wider border whitespace-nowrap'
                      }>
                        ● {engagement.status}
                      </Badge>
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {engagement.step}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due {engagement.due}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 flex items-center gap-1 font-medium italic mt-1">
                      Partner: <span className="text-slate-700 not-italic font-bold">{engagement.partner}</span> 
                      <span className="mx-1">•</span>
                      Last action: {engagement.lastAction}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <ViewEngagementDialog engagement={engagement} onUpdate={updateEngagement} />
                    <UploadDocumentDialog engagementTitle={engagement.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Invitations */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">PENDING INVITATIONS (3)</CardTitle>
            <Link href="/dashboard/provider/partners">
              <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center gap-4 p-4 border rounded-xl bg-white hover:border-orange-200 transition-colors">
              <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Singapore CSP Pte Ltd</p>
                <p className="text-xs text-slate-500 font-medium">Awaiting acceptance (sent 2d ago)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-xl bg-white hover:border-orange-200 transition-colors">
              <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Dubai Corporate Services</p>
                <p className="text-xs text-slate-500 font-medium">Awaiting acceptance (sent 3d ago)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-xl bg-white hover:border-orange-200 transition-colors">
              <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">New York Law LLP</p>
                <p className="text-xs text-slate-500 font-medium">Awaiting acceptance (sent today)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Partners */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4 bg-slate-50/50">
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">RECOMMENDED PARTNERS</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 space-y-4">
                <p className="text-xs font-bold text-emerald-900/60 uppercase tracking-widest">High activity in Singapore</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-slate-50 flex items-center justify-center border font-bold text-slate-400">SE</div>
                      <div>
                        <p className="font-bold text-slate-900">Singapore Elite CSP</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-0.5">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>4.9 (24 engagements)</span>
                        </div>
                      </div>
                    </div>
                    <ConnectPartnerDialog partnerName="Singapore Elite CSP" rating="4.9" engagements="24" email="contact@singaporeelite.com" />

                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-slate-50 flex items-center justify-center border font-bold text-slate-400">SC</div>
                      <div>
                        <p className="font-bold text-slate-900">Singapore Corporate</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-0.5">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>4.7 (18 engagements)</span>
                        </div>
                      </div>
                    </div>
                    <ConnectPartnerDialog partnerName="Singapore Corporate" rating="4.7" engagements="18" email="contact@singaporecorporate.sg" />

                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Sub-components used locally or moved to separate files
function AddClientAction() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="h-24 flex-col gap-2 bg-white hover:bg-emerald-50 border-slate-200 hover:border-emerald-200 transition-all group w-full"
      >
        <UserPlus className="h-5 w-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
        <span className="text-center font-medium">Add Client</span>
      </Button>
      <AddClientDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
    </svg>
  );
}