import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, Plus, Edit, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Jurisdiction {
  id: string;
  name: string;
  code: string;
  status: "active" | "pending" | "inactive";
  partnerCount: number;
  description: string;
}

export function JurisdictionsManagementView() {
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const jurisdictions: Jurisdiction[] = [
    { id: "1", name: "Singapore", code: "SG", status: "active", partnerCount: 24, description: "Republic of Singapore" },
    { id: "2", name: "British Virgin Islands", code: "VG", status: "active", partnerCount: 18, description: "BVI" },
    { id: "3", name: "Cayman Islands", code: "KY", status: "active", partnerCount: 12, description: "Cayman" },
    { id: "4", name: "UAE (DIFC)", code: "AE", status: "pending", partnerCount: 0, description: "Dubai International Financial Centre" },
    { id: "5", name: "Malta", code: "MT", status: "active", partnerCount: 15, description: "Republic of Malta" },
    { id: "6", name: "Cyprus", code: "CY", status: "active", partnerCount: 10, description: "Republic of Cyprus" },
    { id: "7", name: "Seychelles", code: "SC", status: "active", partnerCount: 8, description: "Republic of Seychelles" },
    { id: "8", name: "Panama", code: "PA", status: "active", partnerCount: 6, description: "Republic of Panama" },
    { id: "9", name: "Hong Kong", code: "HK", status: "active", partnerCount: 20, description: "Hong Kong SAR" },
    { id: "10", name: "Switzerland", code: "CH", status: "active", partnerCount: 14, description: "Swiss Confederation" },
    { id: "11", name: "Luxembourg", code: "LU", status: "active", partnerCount: 9, description: "Grand Duchy of Luxembourg" },
    { id: "12", name: "Bahamas", code: "BS", status: "active", partnerCount: 7, description: "Commonwealth of The Bahamas" },
  ];

  const handleEdit = (jurisdiction: Jurisdiction) => {
    setSelectedJurisdiction(jurisdiction);
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Jurisdiction saved",
      description: "Jurisdiction has been updated successfully.",
    });
    
    setIsSaving(false);
    setAddDialogOpen(false);
    setEditDialogOpen(false);
  };

  const handleStatusChange = async (jurisdiction: Jurisdiction, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `${jurisdiction.name} is now ${newStatus}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-amber-500";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Jurisdictions Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage supported jurisdictions and territories
        </p>
      </div>

      {/* Jurisdictions Table */}
      <Card>
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Active Jurisdictions ({jurisdictions.filter(j => j.status === "active").length})</h2>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Jurisdiction
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Partners</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jurisdictions.map((jurisdiction) => (
                <TableRow key={jurisdiction.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {jurisdiction.id.padStart(3, "0")}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{jurisdiction.name}</p>
                      <p className="text-sm text-muted-foreground">{jurisdiction.description}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{jurisdiction.code}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${getStatusColor(jurisdiction.status)}`} />
                      {jurisdiction.status.charAt(0).toUpperCase() + jurisdiction.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {jurisdiction.partnerCount > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{jurisdiction.partnerCount}</span>
                        <span className="text-xs text-muted-foreground">verified</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(jurisdiction)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {jurisdiction.status === "active" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(jurisdiction, "inactive")}>
                            Deactivate
                          </DropdownMenuItem>
                        )}
                        {jurisdiction.status === "inactive" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(jurisdiction, "active")}>
                            Activate
                          </DropdownMenuItem>
                        )}
                        {jurisdiction.status === "pending" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(jurisdiction, "active")}>
                            Approve Launch
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Jurisdiction Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Jurisdiction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Jurisdiction Name</Label>
              <Input
                id="name"
                placeholder="e.g., Singapore"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="code">Country Code (ISO 3166-1 alpha-2)</Label>
              <Input
                id="code"
                placeholder="e.g., SG"
                maxLength={2}
                className="mt-2 uppercase"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description..."
                rows={3}
                className="mt-2"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Add Jurisdiction"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Jurisdiction Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Jurisdiction</DialogTitle>
          </DialogHeader>
          {selectedJurisdiction && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editName">Jurisdiction Name</Label>
                <Input
                  id="editName"
                  defaultValue={selectedJurisdiction.name}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="editCode">Country Code</Label>
                <Input
                  id="editCode"
                  defaultValue={selectedJurisdiction.code}
                  maxLength={2}
                  className="mt-2 uppercase"
                />
              </div>

              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  defaultValue={selectedJurisdiction.description}
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}