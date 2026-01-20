import React, { useState, useEffect } from "react";
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
  Phone,
  Building2,
  X,
  Target,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Globe,
  Calendar,
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

const SOURCES: LeadSource[] = ["Website", "Referral", "Cold Call", "Social Media", "Advertisement", "Direct"];
const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

/* ================= DEFAULT DATA ================= */

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

  /* ---------- ACTIONS ---------- */

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

  /* ---------- FILTER & PAGINATION ---------- */

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
    <div 
      className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500 p-4 md:p-8"
    >
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 brand rounded-full"></span>
              Deal Pipeline
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <Target size={16} />
              CRM › Lead & Customer Management
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-64 shadow-sm font-medium"
              />
            </div>

            <div className="flex border border-slate-200 rounded-2xl bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "table"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <TableIcon size={20} />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "card"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedLead(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              <UserPlus size={18} />
              <span className="hidden sm:inline">Add Lead</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Pipeline Value" value={`₹${(totalPipeline / 1000000).toFixed(1)}M`} icon={<Briefcase size={24} />} trend="Active leads" color="bg-indigo-500" />
          <StatCard title="Won Deals" value={`₹${(wonValue / 1000000).toFixed(1)}M`} icon={<TrendingUp size={24} />} trend="Lifetime revenue" color="bg-emerald-500" />
          <StatCard title="Conversion Rate" value="24.8%" icon={<Target size={24} />} trend="+2.4% vs LY" color="bg-blue-500" />
          <StatCard title="Total Leads" value={leads.length.toString()} icon={<Users size={24} />} trend="Across all sources" color="bg-slate-700" />
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Lead & Company", "Status", "Source", "Deal Value", "Last Contact", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-black text-lg border border-brand/20 group-hover:scale-110 transition-transform shadow-sm">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-base">{lead.name}</div>
                            <div className="text-xs text-slate-400 font-medium">{lead.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {lead.source}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-black text-slate-900 text-sm">
                        ₹{lead.value.toLocaleString()}
                      </td>
                      <td className="px-8 py-5 text-slate-500 font-bold text-sm">
                        {lead.lastContact}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(lead)} icon={<Eye size={18} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedLead(lead); setShowForm(true); }} icon={<Pencil size={18} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(lead.id)} icon={<Trash2 size={18} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginated.map((lead) => (
              <div key={lead.id} className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-[120px] -mr-10 -mt-10 transition-all group-hover:scale-125"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="h-16 w-16 rounded-[24px] bg-brand text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-brand/30 group-hover:rotate-6 transition-transform">
                    {lead.name.charAt(0)}
                  </div>
                  <StatusBadge status={lead.status} />
                </div>

                <div className="mb-8">
                  <h3 className="font-black text-xl text-slate-900 line-clamp-1">{lead.name}</h3>
                  <p className="text-sm text-brand font-black mt-1 uppercase tracking-wider">{lead.company}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <Mail size={16} className="text-slate-400" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <Globe size={16} className="text-slate-400" />
                    {lead.source}
                  </div>
                  <div className="flex items-center gap-3 text-slate-900 text-base font-black">
                    <DollarSign size={18} className="text-emerald-500" />
                    ₹{lead.value.toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
                  <button onClick={() => setViewDetails(lead)} className="flex-1 py-3.5 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-black uppercase transition-colors">History</button>
                  <button onClick={() => { setSelectedLead(lead); setShowForm(true); }} className="p-3.5 rounded-2xl bg-brand/5 text-brand hover:bg-brand hover:text-white transition-all shadow-sm"><Pencil size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> Business Leads
            </p>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-2 rounded-[24px] shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-10 w-10 rounded-xl text-xs font-black transition-all ${
                      currentPage === i + 1 ? 'bg-brand text-white shadow-lg shadow-brand/30 scale-110' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <LeadForm
          editData={selectedLead}
          onClose={() => {
            setShowForm(false);
            setSelectedLead(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Details View Modal */}
      {viewDetails && (
        <LeadDetailsModal lead={viewDetails} onClose={() => setViewDetails(null)} />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatCard({ title, value, icon, trend, color }: { title: string; value: string; icon: React.ReactNode; trend: string; color: string }) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-150`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</h3>
        <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1">
          <TrendingUp size={12} className="text-emerald-500" />
          {trend}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const styles = {
    "New": "bg-blue-50 text-blue-600 border-blue-100",
    "Contacted": "bg-indigo-50 text-indigo-600 border-indigo-100",
    "Qualified": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Proposal": "bg-amber-50 text-amber-600 border-amber-100",
    "Negotiation": "bg-orange-50 text-orange-600 border-orange-100",
    "Closed Won": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Closed Lost": "bg-rose-50 text-rose-600 border-rose-100"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: "blue" | "orange" | "red"; onClick: () => void; icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-500 hover:bg-blue-50 border-blue-100",
    orange: "text-orange-500 hover:bg-orange-50 border-orange-100",
    red: "text-rose-500 hover:bg-rose-50 border-rose-100"
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-xl border transition-all hover:scale-110 active:scale-90 ${styles[color]}`}
    >
      {icon}
    </button>
  );
}

function LeadForm({ editData, onClose, onSave }: { editData: Lead | null; onClose: () => void; onSave: (lead: Lead) => void }) {
  const [formData, setFormData] = useState<Lead>(
    editData || {
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
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[24px] w-full max-w-2xl shadow-2xl overflow-hidden border border-white/20 scale-in-center">
        <div className="bg-slate-900 p-8 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              {editData ? "Refine Prospect" : "New Lead Acquisition"}
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-1">Capture business opportunity details</p>
          </div>
          <button onClick={onClose} className="relative z-10 h-12 w-12 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-brand transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Primary Contact" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} placeholder="Full name" />
            <FormInput label="Company Name" value={formData.company} onChange={(v) => setFormData({...formData, company: v})} placeholder="Organization" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Email Address" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} placeholder="email@example.com" />
            <FormInput label="Phone Number" value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} placeholder="+91 00000 00000" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Pipeline Status</label>
              <select 
                value={formData.status} 
                onChange={(e) => setFormData({...formData, status: e.target.value as LeadStatus})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all"
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Lead Source</label>
              <select 
                value={formData.source} 
                onChange={(e) => setFormData({...formData, source: e.target.value as LeadSource})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all"
              >
                {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <FormInput label="Deal Value (₹)" value={formData.value.toString()} onChange={(v) => setFormData({...formData, value: parseInt(v) || 0})} type="number" />
          </div>

          <div className="pt-6 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-8 py-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Discard</button>
            <button type="submit" className="flex-1 px-8 py-4 rounded-2xl bg-brand text-white font-black uppercase tracking-widest shadow-xl shadow-brand/20 transition-all active:scale-95">
              {editData ? "Update Deal" : "Initialize Deal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all"
      />
    </div>
  );
}

function LeadDetailsModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 bg-gradient-to-br from-slate-50 to-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 h-10 w-10 rounded-xl bg-white text-slate-400 flex items-center justify-center shadow-sm hover:bg-rose-50 hover:text-rose-500 transition-all">
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-[24px] bg-brand text-white flex items-center justify-center shadow-2xl shadow-brand/30 mb-6">
              <Building2 size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{lead.company}</h2>
            <p className="text-brand font-black uppercase tracking-widest text-sm mt-1">{lead.name}</p>
            <div className="mt-4">
              <StatusBadge status={lead.status} />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div className="text-sm font-bold text-slate-700">{lead.email}</div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div className="text-sm font-bold text-slate-700">{lead.phone}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Source</p>
                <p className="text-sm font-bold text-slate-700">{lead.source}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Deal Value</p>
                <p className="text-sm font-black text-slate-900">₹{lead.value.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 flex gap-4">
            <button className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <MessageSquare size={18} /> Send Mail
            </button>
            <button className="flex-1 py-4 rounded-2xl bg-slate-50 text-slate-600 font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2 border border-slate-200">
              <Calendar size={18} /> Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
