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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CreateConfigDialogProps {
  onSubmit: (data: { providerId: string; domain: string; companyName: string }) => void;
}

export function CreateConfigDialog({ onSubmit }: CreateConfigDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Configuration
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create White-Label Configuration</DialogTitle>
          <DialogDescription>
            Set up a new white-label portal for a Primary CSP
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Primary CSP</Label>
            <Select>
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prov-1">Gibraltar Services Ltd</SelectItem>
                <SelectItem value="prov-2">Malta Business Partners</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="domain">Subdomain</Label>
            <div className="flex items-center gap-2">
              <Input id="domain" placeholder="company" className="flex-1" />
              <span className="text-muted-foreground">.vetto.com</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Display Name</Label>
            <Input id="company-name" placeholder="e.g., London CSP Ltd" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}