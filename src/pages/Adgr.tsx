import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Search,
  LayoutGrid,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  BarChart3,
  PieChart,
  Activity,
  X,
  Settings
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type ReportStatus = "Completed" | "In Progress" | "Scheduled" | "Failed";
type ReportCategory = "Financial" | "Fleet" | "Inventory" | "Human Resources" | "Sales";

interface Report {
  id: number;
  name: string;
  category: ReportCategory;
  generatedBy: string;
  date: string;
  format: "PDF" | "XLS" | "CSV";
  status: ReportStatus;
  size: string;
}

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "erp_adgr_reports";
const ITEMS_PER_PAGE = 8;

const CATEGORIES: ReportCategory[] = ["Financial", "Fleet", "Inventory", "Human Resources", "Sales"];

/* ================= DEFAULT DATA ================= */

const defaultReports: Report[] = [
  { id: 1, name: "Annual Financial Statement 2023", category: "Financial", generatedBy: "System Admin", date: "2024-01-10", format: "PDF", status: "Completed", size: "2.4 MB" },
  { id: 2, name: "Fleet Maintenance Q4 Summary", category: "Fleet", generatedBy: "Deepak Sharma", date: "2024-01-12", format: "XLS", status: "Completed", size: "1.1 MB" },
  { id: 3, name: "Employee Onboarding Audit", category: "Human Resources", generatedBy: "Neha Verma", date: "2024-01-14", format: "PDF", status: "In Progress", size: "---" },
  { id: 4, name: "Inventory Reconciliation Report", category: "Inventory", generatedBy: "Amit Sharma", date: "2024-01-08", format: "CSV", status: "Completed", size: "850 KB" },
  { id: 5, name: "Regional Sales Performance", category: "Sales", generatedBy: "Vikram Malhotra", date: "2024-01-15", format: "PDF", status: "Scheduled", size: "---" },
  { id: 6, name: "Vehicle Inspection Compliance", category: "Fleet", generatedBy: "Rahul Singh", date: "2024-01-05", format: "PDF", status: "Failed", size: "---" },
];

/* ================= MAIN COMPONENT ================= */

export default function ADGR() {
  const [reports, setReports] = useState<Report[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultReports;
      }
    } catch {
      return defaultReports;
    }
    return defaultReports;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  }, [reports]);

  /* ---------- ACTIONS ---------- */

  const handleDelete = (id: number) => {
    if (window.confirm("Permanent delete this report from archives?")) {
      setReports(prev => prev.filter(r => r.id !== id));
      toast.success("Report deleted successfully");
    }
  };

  const handleGenerate = (reportData: Report) => {
    const newReport = { 
      ...reportData, 
      id: Date.now(), 
      date: new Date().toISOString().split('T')[0],
      status: "In Progress" as ReportStatus,
      size: "---"
    };
    setReports(prev => [newReport, ...prev]);
    toast.success("Report generation sequence initiated");
    setShowForm(false);

    // Simulate completion
    setTimeout(() => {
      setReports(prev => prev.map(r => r.id === newReport.id ? { ...r, status: "Completed" as ReportStatus, size: "1.2 MB" } : r));
      toast.success(`'${newReport.name}' is now available for download`, { icon: '📊' });
    }, 3000);
  };

  /* ---------- FILTER & PAGINATION ---------- */

  const filtered = reports.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.generatedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-brand rounded-full"></span>
              Analytical Engine
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <BarChart3 size={16} />
              ADGR › Advanced Report Generation System
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search archives..."
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
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-brand hover:opacity-90 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Generate New</span>
              <span className="sm:hidden">Generate</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Archives" value={reports.length.toString()} icon={<FileText size={24} />} trend="Global storage" color="bg-slate-700" />
          <StatCard title="Storage Used" value="124 MB" icon={<PieChart size={24} />} trend="15% of quota" color="bg-indigo-500" />
          <StatCard title="Today's Ops" value="12" icon={<Activity size={24} />} trend="Live requests" color="bg-brand" />
          <StatCard title="Uptime Rate" value="99.9%" icon={<CheckCircle2 size={24} />} trend="Stable system" color="bg-emerald-500" />
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["Report Name", "Category", "Generated By", "Status", "Date", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xs border group-hover:scale-110 transition-transform shadow-sm ${
                            report.format === 'PDF' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                            report.format === 'XLS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                            {report.format}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-[15px]">{report.name}</div>
                            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Size: {report.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                          {report.category}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-slate-900 font-bold text-sm">
                        {report.generatedBy}
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="px-8 py-5 text-slate-500 font-bold text-sm">
                        {report.date}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => {}} icon={<Download size={18} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(report.id)} icon={<Trash2 size={18} />} />
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
            {paginated.map((report) => (
              <div key={report.id} className="bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-[120px] -mr-10 -mt-10 transition-all group-hover:scale-125 ${
                   report.format === 'PDF' ? 'bg-rose-500' : report.format === 'XLS' ? 'bg-emerald-500' : 'bg-blue-500'
                }`}></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className={`h-16 w-16 rounded-[20px] flex items-center justify-center font-black text-lg shadow-xl group-hover:rotate-6 transition-transform ${
                    report.format === 'PDF' ? 'bg-rose-500 text-white' : report.format === 'XLS' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {report.format}
                  </div>
                  <StatusBadge status={report.status} />
                </div>

                <div className="mb-8">
                  <h3 className="font-black text-xl text-slate-900 line-clamp-2 min-h-[3.5rem] tracking-tight">{report.name}</h3>
                  <p className="text-[10px] text-brand font-black mt-1 uppercase tracking-widest">{report.category}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-slate-500 text-[13px] font-bold">
                    <Calendar size={16} className="text-slate-400" />
                    {report.date}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-[13px] font-bold">
                    <Clock size={16} className="text-slate-400" />
                    {report.size}
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-50">
                  <button className="flex-1 py-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    <Download size={14} /> Download
                  </button>
                  <button onClick={() => handleDelete(report.id)} className="p-4 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> Archived Reports
            </p>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-black transition-all ${currentPage === p ? 'bg-brand text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <ReportGeneratorModal 
          onClose={() => setShowForm(false)} 
          onGenerate={handleGenerate} 
        />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatCard({ title, value, icon, trend, color }: { title: string; value: string; icon: React.ReactNode; trend: string; color: string }) {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-150`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{title}</h3>
        <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        <p className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-1">
          <Activity size={12} className="text-emerald-500" />
          {trend}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ReportStatus }) {
  const styles = {
    "Completed": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "In Progress": "bg-blue-50 text-blue-600 border-blue-100 animate-pulse",
    "Scheduled": "bg-slate-100 text-slate-600 border-slate-200",
    "Failed": "bg-rose-50 text-rose-600 border-rose-100"
  };

  return (
    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
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

function ReportGeneratorModal({ onClose, onGenerate }: { onClose: () => void; onGenerate: (data: Report) => void }) {
  const [formData, setFormData] = useState<Partial<Report>>({
    name: "",
    category: "Financial",
    format: "PDF",
    generatedBy: "System Admin"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) onGenerate(formData as Report);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-xl shadow-2xl overflow-hidden border border-white/20 scale-in-center">
        <div className="bg-slate-900 p-8 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-400/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Configure Analytical Job</h2>
            <p className="text-slate-400 text-sm font-medium mt-1">Select parameters for engine generation</p>
          </div>
          <button onClick={onClose} className="relative z-10 h-12 w-12 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-red-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Report Specification Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Monthly Revenue Optimization Analysis"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-red-400/10 focus:border-red-400 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Data Source Module</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as ReportCategory})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-red-400/10 focus:border-red-400 outline-none transition-all"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Output Format</label>
              <div className="flex gap-2">
                {["PDF", "XLS", "CSV"].map(fmt => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormData({...formData, format: fmt as any})}
                    className={`flex-1 py-3 rounded-xl border-2 font-black transition-all ${
                      formData.format === fmt ? 'border-red-400 bg-red-50 text-red-500' : 'border-slate-100 text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-start gap-4">
            <div className="p-2 bg-white rounded-lg text-slate-400">
              <Settings size={20} className="animate-spin-slow" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Advanced Extraction</p>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                The engine will perform cross-module reconciliation and anomaly detection during the generation process. This may take up to 60 seconds for large datasets.
              </p>
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-8 py-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
            <button type="submit" className="flex-1 px-8 py-4 rounded-2xl bg-red-400 hover:bg-red-500 text-white font-black uppercase tracking-widest shadow-xl shadow-red-400/20 transition-all active:scale-95">
              Execute Generation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
