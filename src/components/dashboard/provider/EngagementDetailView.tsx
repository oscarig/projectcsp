import Link from "next/link";
import { 
  ArrowLeft, 
  MoreVertical, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  FileText, 
  Upload, 
  AlertCircle,
  Download,
  ExternalLink,
  ChevronDown,
  Mail
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EngagementTimeline } from "./engagements/EngagementTimeline";

interface EngagementDetailViewProps {
  engagementId?: string;
}

export function EngagementDetailView({ engagementId }: EngagementDetailViewProps) {
  // Mock data based on the ID or default
  const engagement = {
    id: engagementId || "SP-2024-042",
    title: "Singapore Pte Ltd Formation",
    ref: "SP-2024-042",
    opened: "10 Apr 2024",
    due: "15 May 2024",
    status: "In Progress",
    step: 2,
    totalSteps: 4,
    stepName: "Name Approval",
    
    client: {
      name: "Tech Innovators Ltd",
      contact: "John Smith",
      email: "john@techinnovators.com",
      phone: "+44 20 1234 5678",
      id: "client-1"
    },
    
    partner: {
      name: "Singapore CSP Pte Ltd",
      rating: 4.9,
      engagements: 24,
      id: "partner-1"
    },

    details: {
      companyName: "Tech Innovators Pte Ltd",
      jurisdiction: "Singapore",
      structure: "Private Limited Company",
      capital: "SGD 10,000",
      directors: "2 (to be appointed)",
      shareholders: "3 (individuals)"
    },

    timeline: [
      { step: "Name reserved", date: "12 Apr 2024", status: "completed" },
      { step: "Name approval", date: "Pending", status: "current" },
      { step: "Document filing", date: "Est: 15 Apr", status: "upcoming" },
      { step: "Certificate issued", date: "Est: 20 Apr", status: "upcoming" }
    ],

    documents: [
      { name: "passport_john.pdf", date: "12 Apr 2024", size: "2.4 MB", type: "pdf" },
      { name: "utility_bill.pdf", date: "12 Apr 2024", size: "1.1 MB", type: "pdf" },
      { name: "name_reservation.pdf", date: "12 Apr 2024", size: "0.5 MB", type: "pdf" }
    ]
  };

  const mockActivities: any[] = [
    { id: "1", type: "comment", user: "Michael Chen", role: "provider", content: "I've reviewed the documents and everything looks good. I'm submitting the name reservation now.", timestamp: "2 hours ago", isExternal: true },
    { id: "2", type: "system", user: "System", role: "system", content: "KYC documents verified by Singapore CSP.", timestamp: "Yesterday", isExternal: false },
    { id: "3", type: "comment", user: "John Smith", role: "client", content: "I just uploaded the utility bill. Let me know if you need anything else.", timestamp: "Yesterday", isExternal: true },
    { id: "4", type: "system", user: "System", role: "system", content: "Engagement opened and partner assigned.", timestamp: "2 days ago", isExternal: false }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div>
        <Link href="/dashboard/provider/engagements" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
          <ArrowLeft className="mr-1 h-3 w-3" /> Back to Engagements
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">{engagement.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Ref: {engagement.ref}</span>
            <span>•</span>
            <span>Opened: {engagement.opened}</span>
            <span>•</span>
            <span>Due: {engagement.due}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white hover:bg-emerald-50 border-slate-200 hover:border-emerald-200 transition-all">
            <Upload className="mr-2 h-4 w-4 text-emerald-600" /> Upload Documents
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                More <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Put On Hold</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Cancel Engagement</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Client & Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:border-emerald-100 transition-colors">
          <CardContent className="p-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Client</div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{engagement.client.name}</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium italic">Contact: {engagement.client.contact}</p>
                <div className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {engagement.client.email}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild className="hover:border-emerald-200 hover:bg-emerald-50">
                <Link href={`/dashboard/provider/clients/${engagement.client.id}`}>View Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-100 transition-colors">
          <CardContent className="p-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Partner</div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{engagement.partner.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-[10px] uppercase">⭐ {engagement.partner.rating}</Badge>
                  <span className="text-xs text-slate-400 font-medium">({engagement.partner.engagements} engagements)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="hover:border-emerald-200 hover:bg-emerald-50">
                  <Link href={`/dashboard/provider/partners/${engagement.partner.id}`}>View Provider</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracker */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-end mb-3">
              <div>
                <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                  Step {engagement.step} of {engagement.totalSteps}: 
                  <span className="text-emerald-600 underline underline-offset-4 decoration-emerald-200">{engagement.stepName}</span>
                </h3>
              </div>
              <Badge className="bg-emerald-600 hover:bg-emerald-700 font-black text-[10px] uppercase tracking-widest px-3">
                {Math.round((engagement.step / engagement.totalSteps) * 100)}% Complete
              </Badge>
            </div>
            <Progress value={(engagement.step / engagement.totalSteps) * 100} className="h-2 bg-emerald-50 [&>div]:bg-emerald-600" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {engagement.timeline.map((item, index) => (
              <div key={index} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                item.status === 'completed' ? 'bg-emerald-50/50 border-emerald-100' : 
                item.status === 'current' ? 'bg-white border-emerald-200 shadow-sm ring-1 ring-emerald-500/10' : 
                'bg-slate-50 border-slate-100 opacity-60'
              }`}>
                {item.status === 'completed' ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                ) : item.status === 'current' ? (
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <div className="h-3 w-3 rounded-full bg-emerald-600 animate-pulse" />
                  </div>
                ) : (
                  <Circle className="h-6 w-6 text-slate-300 shrink-0" />
                )}
                <div className="min-w-0">
                  <div className={`text-sm font-bold truncate ${
                    item.status === 'current' ? 'text-emerald-900' : 
                    item.status === 'completed' ? 'text-emerald-800' : 
                    'text-slate-500'
                  }`}>
                    {item.step}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details & Documents */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b border-slate-50">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Engagement Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                <DetailItem label="Company Name" value={engagement.details.companyName} />
                <DetailItem label="Jurisdiction" value={engagement.details.jurisdiction} />
                <DetailItem label="Structure" value={engagement.details.structure} />
                <DetailItem label="Share Capital" value={engagement.details.capital} />
                <DetailItem label="Directors" value={engagement.details.directors} />
                <DetailItem label="Shareholders" value={engagement.details.shareholders} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Document Vault</CardTitle>
              <Button size="sm" variant="ghost" className="text-xs font-bold text-emerald-600 uppercase tracking-widest hover:bg-emerald-50">
                View All
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {engagement.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-100">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{doc.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-widest">{doc.date} • {doc.size}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-emerald-600">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-emerald-600">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Communication Timeline */}
        <div className="lg:h-[calc(100vh-20rem)] sticky top-6">
          <EngagementTimeline 
             engagementId={engagement.id} 
             activities={mockActivities} 
           />
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
      <div className="font-bold text-slate-900">{value}</div>
    </div>
  );
}