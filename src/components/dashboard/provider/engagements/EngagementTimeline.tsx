import { useState } from "react";
import { 
  Send, 
  User, 
  System, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  ShieldCheck,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  type: 'comment' | 'system' | 'status' | 'document';
  user: string;
  role: 'provider' | 'client' | 'partner' | 'system';
  content: string;
  timestamp: string;
  isExternal?: boolean;
}

interface EngagementTimelineProps {
  engagementId: string;
  activities: Activity[];
  onAddComment?: (content: string) => void;
}

export function EngagementTimeline({ engagementId, activities: initialActivities, onAddComment }: EngagementTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const activity: Activity = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'comment',
        user: "Michael Chen", // Current user
        role: 'provider',
        content: newComment,
        timestamp: "Just now",
        isExternal: true
      };
      
      setActivities([activity, ...activities]);
      setNewComment("");
      setIsSubmitting(false);
      
      if (onAddComment) onAddComment(newComment);
      
      toast({
        title: "Update Sent",
        description: "Your message has been recorded and emailed to the client.",
      });
    }, 800);
  };

  return (
    <Card className="border-none shadow-sm h-full flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4 bg-slate-50/50">
        <div>
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            Engagement Communication
          </CardTitle>
        </div>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-[10px] uppercase tracking-widest px-2">
          <ShieldCheck className="h-3 w-3 mr-1" /> Transparent Record
        </Badge>
      </CardHeader>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative pl-8 group">
              {/* Vertical line connector */}
              {index !== activities.length - 1 && (
                <div className="absolute left-[15px] top-[24px] bottom-[-32px] w-[2px] bg-slate-100 group-last:hidden" />
              )}
              
              {/* Activity Icon/Avatar */}
              <div className={`absolute left-0 top-0 h-8 w-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 ${
                activity.role === 'system' ? 'bg-slate-100 text-slate-500' :
                activity.role === 'client' ? 'bg-blue-100 text-blue-600' :
                'bg-emerald-100 text-emerald-600'
              }`}>
                {activity.role === 'system' ? <Clock className="h-4 w-4" /> : 
                 activity.type === 'comment' ? <MessageSquare className="h-4 w-4" /> :
                 <User className="h-4 w-4" />}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{activity.user}</span>
                    <Badge variant="secondary" className={`text-[10px] font-bold uppercase tracking-widest px-1.5 h-4 ${
                      activity.role === 'client' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                      activity.role === 'system' ? 'bg-slate-50 text-slate-500' :
                      'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {activity.role}
                    </Badge>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 uppercase">{activity.timestamp}</span>
                </div>
                
                <div className={`p-4 rounded-xl border ${
                  activity.type === 'comment' 
                    ? 'bg-white border-slate-100 shadow-sm' 
                    : 'bg-slate-50/50 border-transparent italic'
                }`}>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activity.content}
                  </p>
                  
                  {activity.isExternal && (
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-50 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      <Mail className="h-3 w-3" />
                      Email Notification Sent
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      <div className="p-4 bg-white">
        <div className="space-y-3">
          <div className="relative">
            <Textarea 
              placeholder="Post a professional update or comment for the client..."
              className="min-h-[100px] bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 resize-none rounded-xl"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
                Press Cmd+Enter to send
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Mail className="h-3.5 w-3.5" />
              This will be emailed to {activities.find(a => a.role === 'client')?.user || 'the client'}
            </div>
            <Button 
              size="sm" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 font-bold uppercase tracking-widest text-xs h-9"
              onClick={handleSend}
              disabled={isSubmitting || !newComment.trim()}
            >
              {isSubmitting ? "Sending..." : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Post Update
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
