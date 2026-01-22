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
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-6 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Deal <span className="text-indigo-600">Pipeline</span>
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  Advanced Lead Management & Conversion Engine
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all w-64 lg:w-80 font-bold placeholder:text-slate-400"
                />
              </div>

              <div className="flex border border-slate-200 rounded-xl bg-white p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "table"
                      ? "bg-slate-900 text-white shadow-md"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  }`}
                >
                  <TableIcon size={20} />
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "card"
                      ? "bg-slate-900 text-white shadow-md"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
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
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95"
              >
                <UserPlus size={18} />
                <span>CAPTURE LEAD</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Pipeline Value" value={`₹${(totalPipeline / 1000000).toFixed(1)}M`} icon={<Briefcase size={24} />} trend="Active leads" color="slate" />
          <StatCard title="Won Deals" value={`₹${(wonValue / 1000000).toFixed(1)}M`} icon={<TrendingUp size={24} />} trend="Lifetime revenue" color="emerald" />
          <StatCard title="Conversion Rate" value="24.8%" icon={<Target size={24} />} trend="+2.4% vs LY" color="emerald" />
          <StatCard title="Total Leads" value={leads.length.toString()} icon={<Users size={24} />} trend="Across all sources" color="blue" />
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          {viewMode === "table" ? (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["Lead & Company", "Status", "Source", "Deal Value", "Last Contact", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm border border-slate-200">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lead.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                          {lead.source}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                        ₹{lead.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium text-sm">
                        {lead.lastContact}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(lead)} icon={<Eye size={16} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedLead(lead); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(lead.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {paginated.map((lead) => (
                <div key={lead.id} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                      {lead.name.charAt(0)}
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{lead.name}</h3>
                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{lead.company}</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <Mail size={14} className="text-slate-400" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <Globe size={14} className="text-slate-400" />
                      {lead.source}
                    </div>
                    <div className="flex items-center gap-2 text-slate-900 text-base font-black">
                      <DollarSign size={16} className="text-emerald-500" />
                      ₹{lead.value.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6 pt-4 border-t border-slate-50">
                    <button onClick={() => setViewDetails(lead)} className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-[10px] font-bold uppercase tracking-wider transition-colors">History</button>
                    <button onClick={() => { setSelectedLead(lead); setShowForm(true); }} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"><Pencil size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing <span className="text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900">{filtered.length}</span> Leads
            </p>
            <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-9 w-9 rounded-lg text-xs font-bold transition-all ${
                      currentPage === i + 1 ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronRight size={20} />
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

function StatCard({ title, value, icon, trend, color }: { title: string; value: string; icon: React.ReactNode; trend: string; color: "blue" | "emerald" | "purple" | "slate" | "indigo" }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 shadow-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 shadow-emerald-100",
    purple: "bg-purple-50 text-purple-600 shadow-purple-100",
    slate: "bg-slate-50 text-slate-600 shadow-slate-100",
    indigo: "bg-indigo-50 text-indigo-600 shadow-indigo-100"
  };

  const iconBgMap = {
    blue: "bg-blue-600",
    emerald: "bg-emerald-600",
    purple: "bg-purple-600",
    slate: "bg-slate-900",
    indigo: "bg-indigo-600"
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-16 h-16 ${iconBgMap[color]} opacity-[0.03] rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-150`}></div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${colorMap[color]}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md">
          <TrendingUp size={12} />
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h3>
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
    "Closed Won": "bg-emerald-600 text-white border-transparent",
    "Closed Lost": "bg-slate-100 text-slate-500 border-slate-200"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border shadow-sm ${styles[status]}`}>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: "blue" | "orange" | "red"; onClick: () => void; icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white border-blue-100",
    orange: "text-orange-600 bg-orange-50 hover:bg-orange-600 hover:text-white border-orange-100",
    red: "text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white border-rose-100"
  };

  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-xl border transition-all hover:scale-110 active:scale-95 shadow-sm ${styles[color]}`}
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
