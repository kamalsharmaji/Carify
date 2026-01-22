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
  Settings,
  Shield,
  FileSearch,
  Zap
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
    toast.success("Report generation initiated");
    setShowForm(false);

    setTimeout(() => {
      setReports(prev => prev.map(r => r.id === newReport.id ? { ...r, status: "Completed" as ReportStatus, size: "1.2 MB" } : r));
      toast.success(`'${newReport.name}' is now ready`, { icon: '📊' });
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Automated Reporting (ADGR)
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Advanced data governance and report orchestration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-sm w-full md:w-64"
              />
            </div>

            <div className="flex bg-slate-200/50 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setViewMode("table")} 
                className={`p-2 rounded-md transition-all ${viewMode === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <TableIcon size={18} />
              </button>
              <button 
                onClick={() => setViewMode("card")} 
                className={`p-2 rounded-md transition-all ${viewMode === "card" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Archives" value={reports.length.toString()} icon={FileText} color="blue" />
          <StatCard label="Storage Used" value="124 MB" icon={PieChart} color="orange" />
          <StatCard label="Today's Ops" value="12" icon={Activity} color="emerald" />
          <StatCard label="Uptime Rate" value="99.9%" icon={CheckCircle2} color="indigo" />
        </div>

        {/* Content Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["Report Name", "Category", "Generated By", "Status", "Date", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold text-[10px] border ${
                            report.format === 'PDF' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                            report.format === 'XLS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                            {report.format}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{report.name}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Size: {report.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                          {report.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {report.generatedBy}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {report.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <ActionBtn color="blue" onClick={() => {}} icon={<Download size={16} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(report.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 bg-slate-50/30">
              {paginated.map((report) => (
                <div key={report.id} className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold text-sm border shadow-sm ${
                      report.format === 'PDF' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                      report.format === 'XLS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {report.format}
                    </div>
                    <StatusBadge status={report.status} />
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-slate-900 line-clamp-2 min-h-[3rem] leading-tight tracking-tight">{report.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wider">{report.category}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</p>
                      <p className="font-semibold text-xs text-slate-600">{report.date}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Size</p>
                      <p className="font-semibold text-xs text-slate-600">{report.size}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button className="flex-1 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95">
                      <Download size={14} /> Download
                    </button>
                    <button onClick={() => handleDelete(report.id)} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-bold">{filtered.length}</span> records
            </p>
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`h-8 w-8 rounded-md text-xs font-bold transition-all ${currentPage === p ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
              >
                <ChevronRight size={18} />
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

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
  };
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${colors[color] || colors.blue}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ReportStatus }) {
  const styles: Record<ReportStatus, string> = {
    Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    "In Progress": "bg-blue-50 text-blue-600 border-blue-100 animate-pulse",
    Scheduled: "bg-slate-50 text-slate-500 border-slate-200",
    Failed: "bg-rose-50 text-rose-600 border-rose-100"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: "blue" | "orange" | "red"; onClick: () => void; icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-100",
    orange: "text-orange-600 hover:bg-orange-50 border-transparent hover:border-orange-100",
    red: "text-red-600 hover:bg-red-50 border-transparent hover:border-red-100"
  };

  return (
    <button onClick={onClick} className={`p-2 rounded-lg transition-all active:scale-95 border ${styles[color]}`}>
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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Configure Engine</h3>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Analytical Parameters</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Job Specification Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Q4 Performance Audit"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Context Module</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as ReportCategory})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900 appearance-none"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Export Protocol</label>
              <div className="flex gap-2">
                {["PDF", "XLS", "CSV"].map(fmt => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormData({...formData, format: fmt as any})}
                    className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                      formData.format === fmt 
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
                        : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
              <Shield size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Cross-Module Analysis</p>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                Reconciliation and anomaly detection enabled. System will verify against global data schemas.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-all active:scale-95">
              Abort
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
              Execute Generation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
