import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Plus, CheckCircle2, Loader2, Globe, Building2, Calendar as CalendarIcon, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockClients } from "./clients/mockClients";
import { AddClientDialog } from "./clients/AddClientDialog";
import { AddCategoryDialog } from "./engagements/AddCategoryDialog";
import { AddJurisdictionDialog } from "./engagements/AddJurisdictionDialog";

export function NewEngagementDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingJurisdiction, setIsAddingJurisdiction] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsOpen(false);
    toast({
      title: "Engagement Created",
      description: "A new engagement has been successfully initialized.",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-24 flex-col gap-2 bg-white hover:bg-emerald-50 border-slate-200 hover:border-emerald-200 transition-all group">
            <FileText className="h-5 w-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <span className="text-center font-medium">New Engagement<br />for Client</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-emerald-600" />
              New Client Engagement
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="client" className="text-xs font-bold uppercase tracking-wider text-slate-500">Client</Label>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsAddingClient(true)}
                    className="h-7 text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-2"
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    + Add Client
                  </Button>
                </div>
                <Select required>
                  <SelectTrigger id="client" className="h-11 border-slate-200 focus:ring-emerald-500">
                    <SelectValue placeholder="Select a client..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{client.name}</span>
                          <span className="text-[10px] text-slate-400">{client.contact}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Category</Label>
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsAddingCategory(true)}
                      className="h-7 text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-2"
                    >
                      + Add
                    </Button>
                  </div>
                  <Select required>
                    <SelectTrigger id="category" className="border-slate-200 focus:ring-emerald-500">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formation">Company Formation</SelectItem>
                      <SelectItem value="compliance">Annual Compliance</SelectItem>
                      <SelectItem value="tax">Tax & Accounting</SelectItem>
                      <SelectItem value="legal">Legal Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="jurisdiction" className="text-xs font-bold uppercase tracking-wider text-slate-500">Jurisdiction</Label>
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsAddingJurisdiction(true)}
                      className="h-7 text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-2"
                    >
                      + Add
                    </Button>
                  </div>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Select required>
                      <SelectTrigger id="jurisdiction" className="pl-9 border-slate-200 focus:ring-emerald-500">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sg">Singapore</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="bvi">British Virgin Islands</SelectItem>
                        <SelectItem value="ky">Cayman Islands</SelectItem>
                        <SelectItem value="hk">Hong Kong</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-slate-500">Engagement Title / Reference</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="title" 
                    placeholder="e.g. Q2 Annual Return Filing" 
                    className="pl-9 border-slate-200 focus:ring-emerald-500 h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-xs font-bold uppercase tracking-wider text-slate-500">Expected Deadline</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="deadline" 
                    type="date"
                    className="pl-9 border-slate-200 focus:ring-emerald-500 h-11"
                    required
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Create Engagement
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <AddClientDialog 
        open={isAddingClient} 
        onOpenChange={setIsAddingClient} 
      />
      
      <AddCategoryDialog 
        open={isAddingCategory} 
        onOpenChange={setIsAddingCategory} 
      />
      
      <AddJurisdictionDialog 
        open={isAddingJurisdiction} 
        onOpenChange={setIsAddingJurisdiction} 
      />
    </>
  );
}
