import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, Globe, Filter, Star, CheckCircle2, Loader2, MessageSquare, ShieldCheck, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConnectPartnerDialog } from "./ConnectPartnerDialog";

const mockPartners = [
  {
    id: "p1",
    name: "Singapore Elite CSP",
    email: "contact@singaporeelite.com",
    category: "Corporate Services",
    jurisdiction: "Singapore",
    rating: "4.9",
    engagements: "142",
    verified: true,
    initials: "SE",
  },

  {
    id: "p2",
    name: "London Legal LLP",
    email: "info@londonlegal.co.uk",
    category: "Legal Services",
    jurisdiction: "United Kingdom",
    rating: "4.8",
    engagements: "89",
    verified: true,
    initials: "LL",
  },

  {
    id: "p3",
    name: "Dubai Corporate Services",
    email: "hello@dubaicorp.ae",
    category: "Corporate Services",
    jurisdiction: "United Arab Emirates",
    rating: "4.7",
    engagements: "65",
    verified: false,
    initials: "DC",
  },

  {
    id: "p4",
    name: "Cayman Fund Services",
    email: "partners@caymanfunds.ky",
    category: "Fiduciary",
    jurisdiction: "Cayman Islands",
    rating: "4.9",
    engagements: "210",
    verified: true,
    initials: "CF",
  },

  {
    id: "p5",
    name: "Zurich Wealth Management",
    email: "wealth@zurichwealth.ch",
    category: "Fiduciary",
    jurisdiction: "Switzerland",
    rating: "4.6",
    engagements: "45",
    verified: false,
    initials: "ZW",
  },

];

export function FindPartnerDialog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [jurisdiction, setJurisdiction] = useState("all");

  const filteredPartners = mockPartners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || partner.category.toLowerCase().includes(category.toLowerCase());
    const matchesJurisdiction = jurisdiction === "all" || partner.jurisdiction.toLowerCase().includes(jurisdiction.toLowerCase());
    return matchesSearch && matchesCategory && matchesJurisdiction;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-24 flex-col gap-2 bg-white hover:bg-emerald-50 border-slate-200 hover:border-emerald-200 transition-all group">
          <Search className="h-5 w-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
          <span className="text-center font-medium">Find Partner</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 py-6 border-b bg-slate-50/50">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <Globe className="h-6 w-6 text-emerald-600" />
            Find Cross-Border Partners
          </DialogTitle>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Discover and connect with verified service providers globally.</p>
        </DialogHeader>

        <div className="p-6 space-y-4 border-b">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-11 border-slate-200 bg-white"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] h-11">
                <Filter className="h-4 w-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="corporate">Corporate Services</SelectItem>
                <SelectItem value="legal">Legal Services</SelectItem>
                <SelectItem value="fiduciary">Fiduciary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide py-1">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 whitespace-nowrap">TOP JURISDICTIONS:</span>
             {["Singapore", "United Kingdom", "Cayman Islands", "Switzerland", "UAE"].map((j) => (
               <Badge 
                 key={j} 
                 variant={jurisdiction === j.toLowerCase() ? "default" : "outline"}
                 className={`cursor-pointer transition-colors py-1 px-3 ${
                    jurisdiction === j.toLowerCase() 
                    ? "bg-emerald-600 hover:bg-emerald-700" 
                    : "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                 }`}
                 onClick={() => setJurisdiction(jurisdiction === j.toLowerCase() ? "all" : j.toLowerCase())}
               >
                 {j}
               </Badge>
             ))}
          </div>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="py-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{filteredPartners.length} Results Found</p>
            </div>
            
            {filteredPartners.length > 0 ? (
              filteredPartners.map((partner) => (
                <div key={partner.id} className="group p-5 rounded-xl border border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-500/5 transition-all flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="h-14 w-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-400 text-lg group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-emerald-500 transition-colors shrink-0">
                      {partner.initials}
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{partner.name}</p>
                        {partner.verified && (
                          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-100 uppercase">
                            <ShieldCheck className="h-2.5 w-2.5" />
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                         <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                           <MapPin className="h-3 w-3 text-slate-400" />
                           {partner.jurisdiction}
                         </span>
                         <span className="h-1 w-1 rounded-full bg-slate-200" />
                         <span className="text-xs font-semibold text-slate-500">{partner.category}</span>
                         <span className="h-1 w-1 rounded-full bg-slate-200" />
                         <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                           <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                           <span className="text-slate-900">{partner.rating}</span>
                           <span>({partner.engagements} engagements)</span>
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                     <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-emerald-50 hover:text-emerald-600">
                        <MessageSquare className="h-4 w-4" />
                     </Button>
                     <ConnectPartnerDialog 
                       partnerName={partner.name} 
                       rating={partner.rating} 
                       engagements={partner.engagements} 
                       email={partner.email}
                     />

                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-3 p-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <Search className="h-12 w-12 text-slate-200 mx-auto" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-600">No partners found</p>
                  <p className="text-slate-400 text-sm">Try adjusting your filters or search terms.</p>
                </div>
                <Button variant="outline" onClick={() => { setSearchTerm(""); setCategory("all"); setJurisdiction("all"); }} className="mt-4 border-slate-200 hover:bg-white uppercase text-xs font-bold tracking-widest h-9">
                   Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="bg-slate-50/50 p-4 px-6 border-t flex items-center justify-between">
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
              <ShieldCheck className="h-3 w-3" />
              Trusted Network of Certified Providers
           </p>
           <Button variant="link" className="text-xs text-emerald-600 hover:text-emerald-700 font-bold uppercase tracking-widest p-0 h-auto">
              Request Jurisdiction Guide
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
