import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, UserPlus, Search, Check, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockClients } from "./mockClients";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function BulkInviteDialog() {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const pendingClients = mockClients.filter(c => c.portalStatus === "pending");
  const filteredClients = pendingClients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(c => c.id));
    }
  };

  const toggleClient = (id: string) => {
    setSelectedClients(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSendInvites = () => {
    if (selectedClients.length === 0) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentCount(selectedClients.length);
      toast({
        title: "Invitations Sent",
        description: `Successfully sent ${selectedClients.length} invitations to the portal.`,
      });
      setSelectedClients([]);
    }, 1500);
  };

  const reset = () => {
    setSelectedClients([]);
    setSentCount(0);
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1 sm:flex-none hover:border-emerald-200 hover:text-emerald-700">
          <Mail className="h-4 w-4 mr-2" />
          Send Bulk Invites
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-emerald-600" />
          </div>
          <DialogTitle>Send Bulk Invitations</DialogTitle>
          <DialogDescription>
            Select clients to invite to the secure portal. Only pending clients are shown.
          </DialogDescription>
        </DialogHeader>

        {sentCount > 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center animate-in zoom-in duration-300">
            <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-slate-900">{sentCount} Invitations Sent!</p>
              <p className="text-muted-foreground max-w-[300px]">
                Your clients have been notified and can now set up their portal access.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pending clients..."
                  className="pl-9 h-10 border-slate-200 focus:border-emerald-500/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSelectAll} 
                className="h-10 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                {selectedClients.length === filteredClients.length ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <ScrollArea className="h-[280px] border border-slate-100 rounded-xl bg-slate-50/50 p-2">
              <div className="space-y-1">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer border border-transparent ${
                      selectedClients.includes(client.id) 
                        ? "bg-white border-emerald-100 shadow-sm" 
                        : "hover:bg-white/80"
                    }`}
                    onClick={() => toggleClient(client.id)}
                  >
                    <Checkbox
                      checked={selectedClients.includes(client.id)}
                      onCheckedChange={() => toggleClient(client.id)}
                      className="rounded-full border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900">{client.name}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">{client.email}</p>
                    </div>
                    {client.inviteSent && (
                      <Badge variant="secondary" className="text-[10px] bg-white border border-slate-100 text-slate-400 font-bold uppercase tracking-wider px-2">
                        Sent {client.inviteSent}
                      </Badge>
                    )}
                  </div>
                ))}
                {filteredClients.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <Users className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No pending clients found</p>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Invitation Logic</p>
                <p className="text-xs text-emerald-700/70 leading-relaxed font-medium">
                  We'll send a personalized welcome link to each selected client. This process is secure and trackable from your dashboard.
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-between items-center bg-muted/30 -mx-6 -mb-6 p-6 rounded-b-lg gap-4">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {selectedClients.length} SELECTED
          </div>
          <div className="flex gap-2">
            {!sentCount ? (
              <>
                <DialogClose asChild>
                  <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleSendInvites} 
                  disabled={selectedClients.length === 0 || isSending}
                  className="min-w-[140px] bg-emerald-600 hover:bg-emerald-700 font-bold uppercase tracking-widest text-xs"
                >
                  {isSending ? "Sending..." : "Send Invites"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setSentCount(0)} className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold uppercase tracking-widest text-xs min-w-[140px]">Done</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

