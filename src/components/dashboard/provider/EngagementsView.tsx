import { useState } from "react";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  FileText,
  Upload,
  Calendar,
  Users,
  ArrowRight
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function EngagementsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const engagements = [
    {
      id: "SP-2024-042",
      title: "Singapore Pte Ltd Formation",
      client: "Tech Innovators Ltd",
      ref: "SP-2024-042",
      opened: "10 Apr 2024",
      due: "15 May 2024",
      status: "In Progress",
      step: "Step 2/4",
      statusColor: "text-blue-600 bg-blue-50 border-blue-200",
      partner: "Singapore CSP",
      partnerId: "sg-csp",
      nextAction: "Name approval pending",
      lastAction: "Today",
      lastActionBy: "Partner"
    },
    {
      id: "BV-2024-038",
      title: "BVI Annual Filing",
      client: "Global Trading Co",
      ref: "BV-2024-038",
      opened: "5 Apr 2024",
      due: "30 May 2024",
      status: "On Hold",
      step: "Awaiting Docs",
      statusColor: "text-amber-600 bg-amber-50 border-amber-200",
      partner: "BVI Trust Services",
      partnerId: "bvi-trust",
      nextAction: "Client documents needed",
      lastAction: "2 days ago",
      lastActionBy: "System"
    },
    {
      id: "CY-2024-022",
      title: "Cayman Fund Formation",
      client: "Ocean Holdings Ltd",
      ref: "CY-2024-022",
      opened: "8 Apr 2024",
      due: "30 May 2024",
      status: "With Partner",
      step: "Step 3/5",
      statusColor: "text-purple-600 bg-purple-50 border-purple-200",
      partner: "Cayman Funds",
      partnerId: "cayman-funds",
      nextAction: "Regulatory filing",
      lastAction: "Today",
      lastActionBy: "Partner"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Engagements</h1>
          <p className="text-muted-foreground">Manage active client engagements and partner assignments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> New Engagement
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search engagements, clients, or refs..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            className={filterStatus === "all" ? "bg-slate-800" : ""}
          >
            All
          </Button>
          <Button 
            variant={filterStatus === "active" ? "default" : "outline"}
            onClick={() => setFilterStatus("active")}
            className={filterStatus === "active" ? "bg-slate-800" : ""}
          >
            Active
          </Button>
          <Button 
            variant={filterStatus === "completed" ? "default" : "outline"}
            onClick={() => setFilterStatus("completed")}
            className={filterStatus === "completed" ? "bg-slate-800" : ""}
          >
            Completed
          </Button>
          <Button 
            variant="outline"
            className="hidden sm:flex"
          >
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>
      </div>

      {/* Engagements List */}
      <div className="space-y-4">
        {engagements.map((engagement) => (
          <Card key={engagement.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: engagement.status === 'On Hold' ? '#d97706' : '#2563eb' }}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6 justify-between">
                
                {/* Main Info */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Link href={`/dashboard/provider/engagements/${engagement.id}`} className="hover:text-blue-600 transition-colors">
                          {engagement.title}
                        </Link>
                        <Badge variant="outline" className={`${engagement.statusColor} font-normal`}>
                          {engagement.status} ({engagement.step})
                        </Badge>
                      </h3>
                      <div className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          Client: <span className="font-medium text-foreground">{engagement.client}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          Ref: {engagement.ref}
                        </span>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Upload Documents</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Cancel Engagement</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Opened: <span className="text-foreground">{engagement.opened}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Due: <span className="text-foreground">{engagement.due}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md border border-slate-100 text-sm grid sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold block mb-1">Partner</span>
                      <div className="font-medium flex items-center gap-1.5">
                        {engagement.partner}
                        <Link href={`/dashboard/provider/partners/${engagement.partnerId}`} className="text-blue-600 hover:underline text-xs">
                          (View)
                        </Link>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold block mb-1">Status Update</span>
                      <div className="text-slate-700">
                        <span className="font-medium">{engagement.nextAction}</span>
                        <span className="text-xs text-muted-foreground ml-2">• Last action: {engagement.lastAction}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col justify-end lg:justify-start gap-2 border-t lg:border-t-0 pt-4 lg:pt-0 mt-2 lg:mt-0 min-w-[140px]">
                  <Button variant="outline" size="sm" className="flex-1 justify-start" asChild>
                    <Link href={`/dashboard/provider/engagements/${engagement.id}`}>
                      <FileText className="mr-2 h-4 w-4 text-slate-500" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 justify-start">
                    <Upload className="mr-2 h-4 w-4 text-slate-500" />
                    Upload
                  </Button>
                  {engagement.status === 'In Progress' && (
                    <Button variant="default" size="sm" className="flex-1 justify-start bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Complete
                    </Button>
                  )}
                  {engagement.status === 'On Hold' && (
                    <Button variant="default" size="sm" className="flex-1 justify-start bg-amber-600 hover:bg-amber-700 text-white">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Remind
                    </Button>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Completion Time</p>
              <h3 className="text-2xl font-bold mt-1">18 days</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Partner Response</p>
              <h3 className="text-2xl font-bold mt-1">1.2 days</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Client Satisfaction</p>
              <h3 className="text-2xl font-bold mt-1">4.8/5.0</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}