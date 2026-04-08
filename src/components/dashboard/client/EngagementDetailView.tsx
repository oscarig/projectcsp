import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ChevronDown,
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  FileText,
  Upload,
  Eye,
  MoreHorizontal,
  Download,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function EngagementDetailView() {
  // Mock data for the specific engagement
  const engagement = {
    id: "1",
    title: "SINGAPORE PTE LTD FORMATION",
    reference: "SP-2024-042",
    openedDate: "10 Apr 2024",
    status: "in_progress",
    statusText: "In Progress",
    estimatedCompletion: "15 May 2024",
    timeRemaining: "25 days",
    progress: 50,
    currentStep: 2,
    totalSteps: 4,
    details: {
      companyName: "Tech Innovators Pte Ltd",
      jurisdiction: "Singapore",
      structure: "Private Limited Company",
      shareCapital: "SGD 10,000",
      directors: "2 (to be appointed)",
      shareholders: "3 (individuals)"
    }
  };

  const steps = [
    { number: 1, title: "Name Reserved", status: "completed", date: "12 Apr 2024" },
    { number: 2, title: "Name Approval", status: "current", date: "In Progress" },
    { number: 3, title: "Document Filing", status: "pending", date: "Not Started" },
    { number: 4, title: "Certificate Issuance", status: "pending", date: "Not Started" }
  ];

  const timeline = [
    { date: "15 May 2024", title: "Estimated completion", icon: Calendar, color: "text-muted-foreground" },
    { date: "12 Apr 2024", title: "Name reserved", icon: CheckCircle2, color: "text-green-600" },
    { date: "10 Apr 2024", title: "Engagement opened", icon: Clock, color: "text-blue-600" }
  ];

  const documents = {
    user: [
      { name: "passport_john.pdf", date: "12 Apr 2024", type: "Uploaded" },
      { name: "utility_bill.pdf", date: "12 Apr 2024", type: "Uploaded" }
    ],
    team: [
      { name: "name_reservation.pdf", date: "12 Apr 2024", type: "Received" },
      { name: "engagement_letter.pdf", date: "10 Apr 2024", type: "Received" }
    ]
  };

  const nextSteps = [
    { text: "Await name approval (estimated 1-2 days)", completed: false },
    { text: "Upload signed forms (when requested)", completed: false },
    { text: "Review final documents", completed: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress": return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "completed": return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Navigation */}
      <div>
        <Link href="/dashboard/client/engagements" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to My Engagements
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase">{engagement.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Reference: {engagement.reference} · Opened: {engagement.openedDate}
          </p>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Manage Engagement</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" /> Upload Documents
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" /> Download All Files
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <AlertCircle className="mr-2 h-4 w-4" /> Report Issue
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column (Left - 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Current Status</p>
                  <Badge className={getStatusColor(engagement.status)}>
                    {engagement.statusText}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Estimated Completion</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {engagement.estimatedCompletion}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Time Remaining</p>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {engagement.timeRemaining}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracker */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Progress Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Progress value={engagement.progress} className="h-2" />
                <p className="text-sm font-medium">
                  Step {engagement.currentStep} of {engagement.totalSteps}: {steps[engagement.currentStep - 1].title}
                </p>
              </div>

              <div className="space-y-0 relative border-l ml-2 pl-6 py-1">
                {steps.map((step, index) => (
                  <div key={index} className="relative pb-6 last:pb-0">
                    <div className={`absolute -left-[29px] top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center bg-background
                      ${step.status === 'completed' ? 'border-green-600 text-green-600' : 
                        step.status === 'current' ? 'border-blue-600 text-blue-600' : 'border-muted-foreground text-muted-foreground'}`}>
                      {step.status === 'completed' ? <CheckCircle2 className="h-3 w-3 fill-current" /> : 
                       step.status === 'current' ? <div className="h-2 w-2 rounded-full bg-blue-600" /> : 
                       <div className="h-2 w-2 rounded-full bg-muted" />}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className={`text-sm font-medium ${step.status === 'pending' ? 'text-muted-foreground' : ''}`}>
                        Step {step.number}: {step.title}
                      </p>
                      <span className={`text-xs ${step.status === 'current' ? 'text-blue-600 font-medium' : 'text-muted-foreground'}`}>
                        {step.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Engagement Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {Object.entries(engagement.details).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Documents</CardTitle>
              <Button size="sm" variant="outline">
                <Upload className="mr-2 h-3 w-3" /> Upload
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Your Documents</h4>
                <div className="space-y-2">
                  {documents.user.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type} {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Documents from Your Team</h4>
                <div className="space-y-2">
                  {documents.team.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type} {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar Column (Right - 1 col) */}
        <div className="space-y-6">
          
          {/* Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Timeline & Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((event, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5">
                      <event.icon className={`h-4 w-4 ${event.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{event.date}</p>
                      <p className="text-sm text-muted-foreground">{event.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">12 Apr 2024 3:30 PM</p>
                    <p className="text-sm text-muted-foreground">Name reserved by Sarah (Client Manager)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <Upload className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">12 Apr 2024 2:30 PM</p>
                    <p className="text-sm text-muted-foreground">Documents uploaded successfully</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">10 Apr 2024</p>
                    <p className="text-sm text-muted-foreground">Engagement created</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nextSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-5 w-5 flex items-center justify-center shrink-0">
                      <div className="h-4 w-4 border rounded bg-background" />
                    </div>
                    <span className="text-sm text-muted-foreground">{step.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}