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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, CheckCircle2, Send, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InviteClientDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  email?: string;
  name?: string;
  company?: string;
  showTrigger?: boolean;
}

export function InviteClientDialog({ 
  open: controlledOpen, 
  onOpenChange: setControlledOpen,
  email: initialEmail = "",
  name: initialName = "",
  company: initialCompany = "",
  showTrigger = true,
}: InviteClientDialogProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
    company: initialCompany,
  });
  const { toast } = useToast();

  const handleSend = async () => {
    if (!formData.email || !formData.name) {
      toast({
        title: "Validation Error",
        description: "Please provide a name and email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    try {
      const user = await authService.getCurrentUser();
      const { error } = await supabase.functions.invoke('invite-user', {
        body: {
          email: formData.email,
          name: formData.name,
          role: 'client',
          inviterName: user?.user_metadata?.full_name || "a Provider",
          companyName: formData.company,
        }
      });

      if (error) throw error;

      setIsSent(true);
      toast({
        title: "Invitation Sent",
        description: `Successfully sent an invitation to ${formData.email}.`,
      });
    } catch (err: any) {
      console.error("Error sending invite:", err);
      toast({
        title: "Error Sending Invite",
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
    setFormData({ 
      name: initialName, 
      email: initialEmail, 
      company: initialCompany 
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) reset();
    setControlledOpen?.(open);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={handleOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="outline" className="h-24 flex-col gap-2 w-full hover:border-emerald-200 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-all group">
            <UserPlus className="h-5 w-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <span className="text-center font-medium">Invite Client to Portal</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-emerald-600" />
          </div>
          <DialogTitle>Invite Client to Portal</DialogTitle>
          <DialogDescription>
            Grant a new or existing client access to their secure dashboard.
          </DialogDescription>
        </DialogHeader>

        {isSent ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center animate-in zoom-in duration-300">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-semibold">Invitation Sent!</p>
              <p className="text-muted-foreground">
                We've sent a portal setup link to <span className="font-medium text-foreground">{formData.email}</span>.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              <Clock className="h-4 w-4" />
              <span>Pending registration</span>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-5">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="client-name" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Full Name</Label>
                <Input
                  id="client-name"
                  placeholder="e.g. Johnathan Smith"
                  className="bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client-email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email Address</Label>
                <Input
                  id="client-email"
                  type="email"
                  placeholder="name@company.com"
                  className="bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client-company" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Company (Optional)</Label>
                <Input
                  id="client-company"
                  placeholder="Tech Innovators Ltd"
                  className="bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Welcome Email</p>
                <p className="text-xs text-emerald-600/80 leading-relaxed">
                  Sending this invitation will automatically generate a professional welcome email from London CSP.
                </p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-between items-center bg-muted/30 -mx-6 -mb-6 p-6 rounded-b-lg">
          {!isSent && (
            <>
              <Button variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
              <Button 
                onClick={handleSend} 
                disabled={isSending}
                className="min-w-[140px] bg-emerald-600 hover:bg-emerald-700"
              >
                {isSending ? "Sending..." : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Invite
                  </>
                )}
              </Button>
            </>
          )}
          {isSent && (
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={reset}>Invite Another Client</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

