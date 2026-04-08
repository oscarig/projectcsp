import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Edit3, 
  Save, 
  X, 
  ExternalLink,
  ChevronRight,
  User,
  MapPin,
  Calendar,
  MessageSquare,
  ChevronDown,
  Mail,
  ShieldCheck,
  Download
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EngagementTimeline } from "./engagements/EngagementTimeline";

interface Engagement {
  id: string;
  title: string;
  client: string;
  status: string;
  step: string;
  due: string;
  partner: string;
  lastAction: string;
}

interface ViewEngagementDialogProps {
  engagement: Engagement;
  onUpdate?: (updatedEngagement: Engagement) => void;
}

export function ViewEngagementDialog({ engagement, onUpdate }: ViewEngagementDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(engagement.title);
  const [editedDue, setEditedDue] = useState(engagement.due);
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdate) {
      onUpdate({
        ...engagement,
        title: editedTitle,
        due: editedDue,
      });
    }
    toast({
      title: "Engagement Updated",
      description: "Changes have been saved and reflected on your dashboard.",
    });
  };

  const steps = [
    { name: "Initial Review", status: "completed", date: "10 Apr 2024" },
    { name: "Name Reservation", status: "completed", date: "12 Apr 2024" },
    { name: "Document Preparation", status: "current", date: "Pending" },
    { name: "Submission to ACRA", status: "upcoming", date: "Pending" },
    { name: "Final Incorporation", status: "upcoming", date: "Pending" },
  ];

  const mockActivities: any[] = [
    { id: "1", type: "comment", user: "Michael Chen", role: "provider", content: "I've reviewed the documents and everything looks good. I'm submitting the name reservation now.", timestamp: "2 hours ago", isExternal: true },
    { id: "2", type: "system", user: "System", role: "system", content: "KYC documents verified by Singapore CSP.", timestamp: "Yesterday", isExternal: false },
    { id: "3", type: "comment", user: "John Smith", role: "client", content: "I just uploaded the utility bill. Let me know if you need anything else.", timestamp: "Yesterday", isExternal: true },
    { id: "4", type: "system", user: "System", role: "system", content: "Engagement opened and partner assigned.", timestamp: "2 days ago", isExternal: false }
  ];

  return (
    <Dialog onOpenChange={(open) => !open && setIsEditing(false)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hover:border-emerald-200 hover:text-emerald-700 transition-colors">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px] gap-0 p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
          
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-white border-white/20 bg-white/5 font-normal tracking-widest text-[10px]">
                  {engagement.id}
                </Badge>
                <Badge className="bg-emerald-600 hover:bg-emerald-700 border-none font-bold text-[10px] uppercase tracking-widest">
                  {engagement.status}
                </Badge>
              </div>
              {isEditing ? (
                <div className="space-y-3 mt-4">
                  <Input
                    className="bg-white/10 border-white/20 text-white text-xl font-bold h-10 focus:ring-emerald-500"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                </div>
              ) : (
                <h2 className="text-2xl font-bold tracking-tight">{engagement.title}</h2>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white/50 hover:text-white hover:bg-white/10"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <X className="h-5 w-5" /> : <Edit3 className="h-5 w-5" />}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Client</p>
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-emerald-400" />
                <p className="text-sm font-medium">{engagement.client}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Jurisdiction</p>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                <p className="text-sm font-medium">Singapore</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Due Date</p>
              {isEditing ? (
                <Input
                  className="bg-white/10 border-white/20 text-white text-xs h-7 px-2 focus:ring-emerald-500"
                  value={editedDue}
                  onChange={(e) => setEditedDue(e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  <p className="text-sm font-medium">{engagement.due}</p>
                </div>
              )}
            </div>
            <div className="space-y-1 text-emerald-400">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Partner</p>
              <p className="text-sm font-bold">{engagement.partner}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="progress" className="w-full">
          <div className="px-8 bg-slate-50 border-b border-slate-100">
            <TabsList className="bg-transparent h-12 gap-6">
              <TabsTrigger 
                value="progress" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-12 text-xs font-bold uppercase tracking-widest bg-transparent"
              >
                Workflow Progress
              </TabsTrigger>
              <TabsTrigger 
                value="communication" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-12 text-xs font-bold uppercase tracking-widest bg-transparent flex items-center gap-2"
              >
                Communication
                <Badge className="bg-emerald-600 h-4 w-4 p-0 flex items-center justify-center text-[8px]">3</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="progress" className="m-0">
            <div className="p-8 bg-white grid md:grid-cols-[1.5fr,1fr] gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Step Timeline</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-tighter italic">40% Complete</span>
                </div>
                
                <div className="space-y-0.5">
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative pb-6 last:pb-0">
                      {idx !== steps.length - 1 && (
                        <div className="absolute left-[11px] top-[24px] bottom-0 w-[2px] bg-slate-100" />
                      )}
                      <div className="flex items-start gap-3">
                        <div className={`z-10 h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all ${
                          step.status === 'completed' ? 'bg-emerald-600 border-emerald-600 text-white' :
                          step.status === 'current' ? 'bg-white border-emerald-600 text-emerald-600 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]' :
                          'bg-white border-slate-200 text-slate-300'
                        }`}>
                          {step.status === 'completed' ? <CheckCircle2 className="h-3.5 w-3.5" /> : 
                           step.status === 'current' ? <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" /> : 
                           <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm font-bold ${step.status === 'upcoming' ? 'text-slate-400' : 'text-slate-900'}`}>{step.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{step.date}</p>
                          </div>
                          {step.status === 'current' && (
                            <p className="text-xs text-slate-500 mt-1 italic font-medium">Pending partner review of uploaded KYC documents.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Engagement Hub</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between text-xs group py-5 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all" size="sm">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold">Document Vault</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-tighter">8 files uploaded</p>
                        </div>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between text-xs group py-5 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all" size="sm">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold">Workflow Overview</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Full breakdown</p>
                        </div>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </div>

                <div className="p-5 bg-orange-50 border border-orange-100 rounded-2xl space-y-3 shadow-sm shadow-orange-500/5">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Critical Alert</span>
                  </div>
                  <p className="text-xs text-orange-800/80 font-bold leading-relaxed">
                    KYC verification due in 3 days. Action required to avoid incorporation delays.
                  </p>
                  <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700 h-9 text-[10px] uppercase font-black tracking-widest mt-2 rounded-lg">
                    Contact Partner
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="communication" className="m-0 h-[500px]">
             <EngagementTimeline 
                engagementId={engagement.id} 
                activities={mockActivities} 
              />
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center gap-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-auto">
            Last active: Today by {engagement.partner}
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="text-xs font-bold uppercase tracking-widest h-10 px-6">Cancel</Button>
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 px-8 h-10 text-xs font-black uppercase tracking-widest">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => window.location.reload()} className="bg-slate-900 hover:bg-slate-800 text-white px-10 h-10 text-xs font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                Close Detail
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
