import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { authService } from "@/services/authService";
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
import { Star, MessageSquare, Send, CheckCircle2, UserPlus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface ConnectPartnerDialogProps {
  partnerName: string;
  rating: string;
  engagements: string;
  email?: string;
}


export function ConnectPartnerDialog({ partnerName, rating, engagements, email = "partner@example.com" }: ConnectPartnerDialogProps) {

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState(`Hello ${partnerName},\n\nWe frequently work in Singapore and would like to connect with your firm to explore a partnership for our cross-border engagements.`);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsSending(true);
    try {
      const user = await authService.getCurrentUser();
      const { error } = await supabase.functions.invoke('invite-user', {
        body: {
          email: email,
          name: partnerName,
          role: 'partner',
          inviterName: user?.user_metadata?.full_name || "a Provider",
          message: message
        }
      });

      if (error) throw error;

      setIsSent(true);
      toast({
        title: "Connection Request Sent",
        description: `Your request to connect with ${partnerName} has been sent.`,
      });
    } catch (err: any) {
      console.error("Error sending partner invite:", err);
      toast({
        title: "Error Sending Request",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };


  const reset = () => {
    setIsSent(false);
    setIsSending(false);
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        <Button size="sm">Connect</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect with Partner</DialogTitle>
          <DialogDescription>
            Send a connection request to {partnerName} to start collaborating.
          </DialogDescription>
        </DialogHeader>

        {isSent ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center animate-in fade-in zoom-in duration-500">
            <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-semibold">Request Sent!</p>
              <p className="text-muted-foreground">
                {partnerName} has been notified. You'll receive a notification
                <br />
                once they accept your invitation.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
              <Clock className="h-4 w-4" />
              <span>Awaiting response</span>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            {/* Partner Card Mini */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-muted-foreground/10">
              <div>
                <p className="font-semibold text-lg">{partnerName}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{rating} ({engagements})</span>
                  <span className="mx-1">•</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-tight text-[10px]">Top Tier Partner</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-background border flex items-center justify-center overflow-hidden">
                <span className="text-xl font-bold text-muted-foreground opacity-20">S</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Personalized Message (Optional)
              </label>
              <Textarea
                className="min-h-[120px] resize-none bg-muted/20 border-muted-foreground/10 focus:border-emerald-500 transition-colors"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <UserPlus className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">Partnership Bonus</p>
                <p className="text-sm text-emerald-800/80 leading-relaxed">
                  Connecting with this partner will unlock shared document workspaces and direct messaging.
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {!isSent && (
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          )}
          {!isSent && (
            <Button 
              onClick={handleConnect} 
              disabled={isSending}
              className="min-w-[140px] bg-emerald-600 hover:bg-emerald-700 shadow-sm"
            >
              {isSending ? "Sending..." : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          )}
          {isSent && (
            <DialogClose asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Close</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
