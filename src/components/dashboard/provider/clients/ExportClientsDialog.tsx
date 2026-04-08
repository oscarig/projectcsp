import { useState } from "react";
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
import { Download, FileDown, CheckCircle2, Loader2, FileJson, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ExportClientsDialog() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<"csv" | "xlsx" | "json">("csv");
  const { toast } = useToast();

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      toast({
        title: "Export Ready",
        description: `Your client list was exported successfully as ${selectedFormat.toUpperCase()}.`,
      });
    }, 1500);
  };

  const reset = () => {
    setExportComplete(false);
    setIsExporting(false);
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Download className="h-4 w-4 mr-2" />
          Export Client List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Data</DialogTitle>
          <DialogDescription>
            Choose your preferred format to export your client list.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedFormat("csv")}
              className={`flex flex-col items-center justify-center p-4 border rounded-xl gap-2 transition-all hover:border-primary/50 ${
                selectedFormat === "csv" ? "bg-primary/5 border-primary shadow-sm" : "bg-card"
              }`}
            >
              <FileDown className={`h-8 w-8 ${selectedFormat === "csv" ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs font-medium">CSV</span>
            </button>
            <button
              onClick={() => setSelectedFormat("xlsx")}
              className={`flex flex-col items-center justify-center p-4 border rounded-xl gap-2 transition-all hover:border-primary/50 ${
                selectedFormat === "xlsx" ? "bg-primary/5 border-primary shadow-sm" : "bg-card"
              }`}
            >
              <FileSpreadsheet className={`h-8 w-8 ${selectedFormat === "xlsx" ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs font-medium">Excel</span>
            </button>
            <button
              onClick={() => setSelectedFormat("json")}
              className={`flex flex-col items-center justify-center p-4 border rounded-xl gap-2 transition-all hover:border-primary/50 ${
                selectedFormat === "json" ? "bg-primary/5 border-primary shadow-sm" : "bg-card"
              }`}
            >
              <FileJson className={`h-8 w-8 ${selectedFormat === "json" ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs font-medium">JSON</span>
            </button>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settings</p>
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" id="include-inactive" defaultChecked />
              <label htmlFor="include-inactive">Include inactive clients</label>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" id="full-history" />
              <label htmlFor="full-history">Include engagement history</label>
            </div>
          </div>

          {exportComplete && (
            <div className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg border border-green-100 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-medium">Your download is ready!</p>
              <Button variant="ghost" size="sm" className="ml-auto text-green-700 hover:bg-green-100">
                Download Again
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={reset}>Cancel</Button>
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            className="min-w-[124px]"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Preparing...
              </>
            ) : exportComplete ? (
              "Done"
            ) : (
              "Export Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
