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
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ImportClientsDialog() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const { toast } = useToast();

  const handleUpload = () => {
    setIsUploading(true);
    setUploadStatus("uploading");
    setUploadProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          setIsUploading(false);
          toast({
            title: "Import Successful",
            description: "42 clients have been imported successfully.",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const reset = () => {
    setUploadStatus("idle");
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Upload className="h-4 w-4 mr-2" />
          Import Clients (CSV)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Clients</DialogTitle>
          <DialogDescription>
            Upload a CSV file to bulk import clients into your portal.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {uploadStatus === "idle" && (
            <div 
              className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
              onClick={handleUpload}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">CSV files only (max. 10MB)</p>
              </div>
            </div>
          )}

          {uploadStatus === "uploading" && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/20">
                <FileText className="h-8 w-8 text-blue-500" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">clients_export_april.csv</p>
                  <p className="text-sm text-muted-foreground">1.2 MB</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={reset}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span className="font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-semibold">Import Complete</p>
                <p className="text-muted-foreground">
                  42 clients were successfully added to your database.
                  <br />
                  3 records were skipped due to existing emails.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">CSV Schema Requirements</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="font-medium">name</span> - Required
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="font-medium">email</span> - Required
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span>phone</span> - Optional
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span>company</span> - Optional
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between items-center">
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            Download Template
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={reset}>Cancel</Button>
            {uploadStatus === "success" ? (
              <Button onClick={() => window.location.reload()}>Finish</Button>
            ) : (
              <Button disabled={isUploading || uploadStatus === "idle"}>Confirm Import</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
