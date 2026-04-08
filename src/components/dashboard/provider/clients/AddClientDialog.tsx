import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Building2, User, Mail, Phone, Sparkles } from "lucide-react";

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddClientDialog({ open, onOpenChange }: AddClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <UserPlus className="h-6 w-6 text-emerald-600" />
          </div>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter the professional details to add a new client to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-5">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="client-name" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Company Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="client-name" 
                  placeholder="Tech Innovators Ltd" 
                  className="pl-10 bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Primary Contact Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="contact-name" 
                  placeholder="John Smith" 
                  className="pl-10 bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="contact-email" 
                    type="email" 
                    placeholder="john@tech.com" 
                    className="pl-10 bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50 text-xs"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-phone" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="contact-phone" 
                    type="tel" 
                    placeholder="+44 20..." 
                    className="pl-10 bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Quick Setup</p>
              <p className="text-[10px] text-emerald-700/70 leading-relaxed font-medium">
                Clients added here can be immediately assigned to new engagements.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between items-center bg-muted/30 -mx-6 -mb-6 p-6 rounded-b-lg gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-xs font-bold uppercase tracking-widest">
            Cancel
          </Button>
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-emerald-600 hover:bg-emerald-700 font-bold uppercase tracking-widest text-xs min-w-[120px]"
          >
            Add Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}