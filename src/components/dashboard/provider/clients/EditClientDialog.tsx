import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { clientService } from "@/services/clientService";
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

interface EditClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  client: {
    id: string;
    name: string;
    contact: string;
    email: string;
    phone: string;
  };
}

export function EditClientDialog({ open, onOpenChange, onSuccess, client }: EditClientDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: client?.name || "",
    contactName: client?.contact || "",
    contactEmail: client?.email || "",
    contactPhone: client?.phone || "",
  });

  // Effect to update formData when client prop changes
  useEffect(() => {
    if (client) {
      setFormData({
        companyName: client.name || "",
        contactName: client.contact || "",
        contactEmail: client.email || "",
        contactPhone: client.phone || "",
      });
    }
  }, [client, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.contactName || !formData.contactEmail) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to add a client.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await clientService.updateClient(client.id, {
        company_name: formData.companyName,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
      });

      toast({
        title: "Success",
        description: "Client updated successfully.",
      });
      
      setFormData({
        companyName: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
      });
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to update client.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <UserPlus className="h-6 w-6 text-emerald-600" />
          </div>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Update the information for {client.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-5">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="client-name" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Company Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="companyName" 
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Tech Innovators Ltd" 
                  className="pl-10 bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Primary Contact Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="contactName" 
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="John Smith" 
                  className="pl-10 bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="contactEmail" 
                    type="email" 
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="john@tech.com" 
                    className="pl-10 bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50 text-xs"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-phone" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="contactPhone" 
                    type="tel" 
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="+44 20..." 
                    className="pl-10 bg-muted/30 border-muted-foreground/10 focus:border-emerald-500/50 text-xs"
                    disabled={isLoading}
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
                Keep client information up to date to ensure smooth communication.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between items-center bg-muted/30 -mx-6 -mb-6 p-6 rounded-b-lg gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-xs font-bold uppercase tracking-widest">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 font-bold uppercase tracking-widest text-xs min-w-[120px]"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}