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
import type { EditingItemState } from "./types";

interface EditCategoryDialogProps {
  editingState: EditingItemState;
  onClose: () => void;
  onSave: () => void;
}

export const EditCategoryDialog = memo(function EditCategoryDialog({
  editingState,
  onClose,
  onSave,
}: EditCategoryDialogProps) {
  if (!editingState) return null;

  return (
    <Dialog open={editingState !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Edit {editingState.type === "category" ? "Category" : "Subcategory"}:{" "}
            {editingState.item.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              defaultValue={editingState.item.name}
              placeholder="Enter name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-icon">Icon Name</Label>
              <Input
                id="edit-icon"
                defaultValue="Icon Name"
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-order">Display Order</Label>
              <Input
                id="edit-order"
                type="number"
                defaultValue={editingState.item.displayOrder}
                placeholder="10"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});