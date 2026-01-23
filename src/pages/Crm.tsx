
import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Search,
  LayoutGrid,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  Mail,
   
  X,
  Target,
  Briefcase,
  TrendingUp,
  DollarSign
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";
type LeadSource = "Website" | "Referral" | "Cold Call" | "Social Media" | "Advertisement" | "Direct";

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  value: number;
  assignedTo: string;
  lastContact: string;
}

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "erp_crm_leads";
const ITEMS_PER_PAGE = 8;

const defaultLeads: Lead[] = [
  { id: 1, name: "Rajesh Khanna", company: "Khanna Logistics", email: "rajesh@khannalog.com", phone: "+91 99887 76655", status: "Negotiation", source: "Website", value: 450000, assignedTo: "Amit Sharma", lastContact: "2024-01-14" },
  { id: 2, name: "Sarah Miller", company: "Global Tech Solutions", email: "s.miller@globaltech.com", phone: "+1 415 555 0123", status: "Qualified", source: "Referral", value: 1200000, assignedTo: "Neha Verma", lastContact: "2024-01-12" },
  { id: 3, name: "Vijay Mallya", company: "Kingfisher Exports", email: "v.m@kingfisher.in", phone: "+91 88776 65544", status: "Closed Won", source: "Direct", value: 3500000, assignedTo: "Amit Sharma", lastContact: "2024-01-05" },
  { id: 4, name: "Arjun Reddy", company: "Reddy Pharma", email: "arjun@reddypharma.com", phone: "+91 77665 54433", status: "New", source: "Social Media", value: 250000, assignedTo: "Priya Das", lastContact: "2024-01-15" },
  { id: 5, name: "Lisa Wong", company: "Pacific Rim Logistics", email: "l.wong@pacrim.com", phone: "+852 2345 6789", status: "Proposal", source: "Cold Call", value: 850000, assignedTo: "Neha Verma", lastContact: "2024-01-11" },
  { id: 6, name: "David Brown", company: "Brown & Sons", email: "david@brownsons.co.uk", phone: "+44 20 7946 0123", status: "Closed Lost", source: "Advertisement", value: 500000, assignedTo: "Priya Das", lastContact: "2023-12-28" },
];

/* ================= MAIN COMPONENT ================= */

export default function CRM() {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultLeads;
      }
    } catch {
      return defaultLeads;
    }
    return defaultLeads;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewDetails, setViewDetails] = useState<Lead | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to remove this lead?")) {
      setLeads(prev => prev.filter(l => l.id !== id));
      toast.success("Lead record deleted");
    }
  };

  const handleSave = (leadData: Lead) => {
    if (selectedLead) {
      setLeads(prev => prev.map(l => l.id === leadData.id ? leadData : l));
      toast.success("Lead profile updated");
    } else {
      setLeads(prev => [...prev, { ...leadData, id: Date.now() }]);
      toast.success("New lead captured successfully");
    }
    setShowForm(false);
    setSelectedLead(null);
  };

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalPipeline = leads.filter(l => l.status !== "Closed Won" && l.status !== "Closed Lost").reduce((acc, curr) => acc + curr.value, 0);
  const wonValue = leads.filter(l => l.status === "Closed Won").reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Deal <span className="text-indigo-600">Pipeline</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">CRM</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Advanced Lead Management</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full lg:w-64"
              />
            </div>

            <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-lg">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "card" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedLead(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <UserPlus size={18} />
              <span>Capture Lead</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard icon={<Briefcase className="text-indigo-600" />} label="Pipeline Value" value={`₹${(totalPipeline / 100000).toFixed(1)}L`} />
        <StatCard icon={<TrendingUp className="text-indigo-600" />} label="Won Deals" value={`₹${(wonValue / 100000).toFixed(1)}L`} />
        <StatCard icon={<Target className="text-indigo-600" />} label="Conversion Rate" value="24.8%" />
        <StatCard icon={<Users className="text-indigo-600" />} label="Total Leads" value={leads.length.toString()} />
      </div>

      {/* --- Main Content Area --- */}
      <main className="transition-all duration-300">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Lead & Company", "Status", "Source", "Deal Value", "Last Contact", "Operations"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{lead.name}</div>
                            <div className="text-xs text-slate-500">{lead.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase border border-slate-200">
                          {lead.source}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900 text-sm">
                        ₹{lead.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {lead.lastContact}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(lead)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setSelectedLead(lead); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(lead.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4 bg-slate-50/50">
              {paginated.map((lead) => (
                <div key={lead.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                      {lead.name.charAt(0)}
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{lead.name}</h3>
                    <p className="text-xs text-indigo-600 font-semibold">{lead.company}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <Mail size={14} className="text-slate-400" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-900 text-base font-bold">
                      <DollarSign size={16} className="text-emerald-500" />
                      ₹{lead.value.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setViewDetails(lead)} className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all border border-slate-200">HISTORY</button>
                    <button onClick={() => { setSelectedLead(lead); setShowForm(true); }} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all border border-indigo-100"><Pencil size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Showing <span className="text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of {filtered.length} leads
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-9 w-9 rounded-lg text-xs font-bold transition-all ${
                    currentPage === i + 1 ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modals and Forms (keeping existing logic but updating styling if needed) */}
      {showForm && (
        <LeadForm
          lead={selectedLead}
          onClose={() => { setShowForm(false); setSelectedLead(null); }}
          onSave={handleSave}
        />
      )}
      {viewDetails && <DetailsModal lead={viewDetails} onClose={() => setViewDetails(null)} />}
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatCard({ icon, label, value }: any) {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">{icon}</div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const styles: Record<LeadStatus, string> = {
    "New": "bg-blue-50 text-blue-600 border-blue-100",
    "Contacted": "bg-indigo-50 text-indigo-600 border-indigo-100",
    "Qualified": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Proposal": "bg-amber-50 text-amber-600 border-amber-100",
    "Negotiation": "bg-orange-50 text-orange-600 border-orange-100",
    "Closed Won": "bg-green-50 text-green-700 border-green-200",
    "Closed Lost": "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
}

function ActionBtn({ onClick, icon, color }: any) {
  const styles: any = {
    blue: "text-blue-600 hover:bg-blue-50 border-blue-100",
    indigo: "text-indigo-600 hover:bg-indigo-50 border-indigo-100",
    red: "text-red-600 hover:bg-red-50 border-red-100",
    orange: "text-orange-600 hover:bg-orange-50 border-orange-100",
  };
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border border-transparent transition-all active:scale-90 ${styles[color]}`}
    >
      {icon}
    </button>
  );
}

/* --- Modal Components --- */

function LeadForm({ lead, onClose, onSave }: any) {
  const [formData, setFormData] = useState<Lead>(lead || {
    id: 0,
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "New",
    source: "Website",
    value: 0,
    assignedTo: "Amit Sharma",
    lastContact: new Date().toISOString().split('T')[0]
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{lead ? "Edit Lead Profile" : "New Lead Capture"}</h2>
            <p className="text-sm text-slate-500 font-medium">Record and track potential business opportunities</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-900 shadow-sm"><X size={20}/></button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-8 grid grid-cols-2 gap-6">
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none" placeholder="e.g. Rahul Verma"/>
          </div>
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Organization</label>
            <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none" placeholder="Company Name"/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none" placeholder="name@company.com"/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none" placeholder="+91 XXXXX XXXXX"/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Pipeline Stage</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as LeadStatus})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none appearance-none">
              {["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Deal Value (₹)</label>
            <input type="number" required value={formData.value} onChange={e => setFormData({...formData, value: Number(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none" placeholder="0.00"/>
          </div>
          <div className="col-span-2 pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95">Discard Changes</button>
            <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">Commit Record</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DetailsModal({ lead, onClose }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
        <div className="relative p-10 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white"><X size={20}/></button>
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl font-black mb-6 border border-white/20 shadow-2xl">{lead.name.charAt(0)}</div>
            <h2 className="text-3xl font-black tracking-tight mb-2 text-center">{lead.name}</h2>
            <div className="px-4 py-1.5 bg-indigo-500/30 backdrop-blur-md border border-indigo-400/30 rounded-full text-xs font-bold uppercase tracking-widest">{lead.company}</div>
          </div>
        </div>
        <div className="p-8 grid grid-cols-2 gap-4 bg-slate-50/50">
          {[
            { label: "Status", value: lead.status, full: true },
            { label: "Email", value: lead.email },
            { label: "Phone", value: lead.phone },
            { label: "Source", value: lead.source },
            { label: "Value", value: `₹${lead.value.toLocaleString()}` },
            { label: "Owner", value: lead.assignedTo },
            { label: "Last Contact", value: lead.lastContact },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 bg-white border border-slate-100 rounded-2xl shadow-sm ${item.full ? 'col-span-2' : ''}`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">{item.label}</p>
              <p className="text-sm font-bold text-slate-800">{item.value}</p>
            </div>
          ))}
          <button onClick={onClose} className="col-span-2 mt-4 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">Close Profile</button>
        </div>
      </div>
    </div>
  );
}
