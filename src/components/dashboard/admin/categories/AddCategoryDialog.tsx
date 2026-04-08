import { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import type { AddingItemState } from "./types";

interface AddCategoryDialogProps {
  addingState: AddingItemState;
  onClose: () => void;
  onCreate: () => void;
}

export const AddCategoryDialog = memo(function AddCategoryDialog({
  addingState,
  onClose,
  onCreate,
}: AddCategoryDialogProps) {
  if (!addingState) return null;

  return (
    <Dialog open={addingState !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add New {addingState.type === "category" ? "Category" : "Subcategory"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="new-name">Name</Label>
            <Input id="new-name" placeholder="Enter name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-icon">Icon Name</Label>
              <Input id="new-icon" placeholder="e.g. Landmark" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-order">Display Order</Label>
              <Input id="new-order" type="number" placeholder="10" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onCreate} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});