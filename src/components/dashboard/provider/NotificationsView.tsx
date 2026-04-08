import { Bell, CheckCircle2, MessageSquare, AlertCircle, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Notification {
  id: string;
  type: 'engagement' | 'system' | 'billing' | 'team';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: 'engagement',
    title: "New Message on Singapore Corp Engagement",
    description: "John Smith posted a new comment: 'I've uploaded the documents...'",
    timestamp: "2 minutes ago",
    isRead: false,
    priority: 'high'
  },
  {
    id: "2",
    type: 'system',
    title: "KYC Verification Successful",
    description: "The KYC documents for client Acme Corp have been verified by the partner Singapore CSP.",
    timestamp: "1 hour ago",
    isRead: false,
    priority: 'medium'
  },
  {
    id: "3",
    type: 'team',
    title: "New Team Member Joined",
    description: "Sarah Wilson has accepted the invitation and joined the provider team.",
    timestamp: "3 hours ago",
    isRead: false,
    priority: 'low'
  },
  {
    id: "4",
    type: 'billing',
    title: "Invoice Paid",
    description: "Invoice #INV-2024-001 has been marked as paid by the client.",
    timestamp: "Yesterday",
    isRead: true,
    priority: 'medium'
  }
];

export function NotificationsView() {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'engagement': return <MessageSquare className="h-4 w-4" />;
      case 'system': return <CheckCircle2 className="h-4 w-4" />;
      case 'billing': return <AlertCircle className="h-4 w-4" />;
      case 'team': return <Clock className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority'], isRead: boolean) => {
    if (isRead) return "bg-slate-100 text-slate-500 border-slate-100";
    switch (priority) {
      case 'high': return "bg-red-50 text-red-700 border-red-100 animate-pulse";
      case 'medium': return "bg-orange-50 text-orange-700 border-orange-100";
      case 'low': return "bg-emerald-50 text-emerald-700 border-emerald-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with your latest engagement and team activity.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs font-bold uppercase tracking-widest gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600 hover:bg-red-50 gap-2">
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden rounded-2xl bg-white">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="divide-y divide-slate-100">
            {mockNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-6 transition-all hover:bg-slate-50 relative group cursor-pointer ${!notif.isRead ? 'bg-emerald-50/20' : ''}`}
              >
                {!notif.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                    !notif.isRead ? 'bg-white shadow-sm border-slate-100' : 'bg-slate-50 border-transparent opacity-60'
                  }`}>
                    <div className={!notif.isRead ? 'text-emerald-600' : 'text-slate-400'}>
                      {getIcon(notif.type)}
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-bold ${!notif.isRead ? 'text-slate-900' : 'text-slate-500 line-through decoration-slate-300'}`}>
                        {notif.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-widest px-2 h-5 ${getPriorityColor(notif.priority, notif.isRead)}`}>
                          {notif.priority}
                        </Badge>
                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter shrink-0">{notif.timestamp}</span>
                      </div>
                    </div>
                    <p className={`text-sm leading-relaxed ${!notif.isRead ? 'text-slate-600' : 'text-slate-400'}`}>
                      {notif.description}
                    </p>
                    
                    {!notif.isRead && (
                      <div className="flex gap-4 pt-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700">Mark as read</button>
                         <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">Archive</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {mockNotifications.length === 0 && (
            <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center">
                <Bell className="h-8 w-8 text-slate-300" />
              </div>
              <div>
                <p className="text-slate-900 font-bold">All caught up!</p>
                <p className="text-slate-500 text-sm">No new notifications at this time.</p>
              </div>
            </div>
          )}
        </ScrollArea>
      </Card>
      
      <div className="text-center">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Older notifications are automatically archived after 30 days.
        </p>
      </div>
    </div>
  );
}
