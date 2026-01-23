import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  CheckCircle,
  XCircle,
  History,
  ChevronRight,
  X,
  ClipboardList
} from "lucide-react";
 
/* ================= TYPES ================= */
interface HistoryItem {
  id: number;
  vehicle: string;
  inspectionName: string;
  inspectionDate: string;
  result: "Passed" | "Failed";
  details: string;
  inspector: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "inspection_history";

/* ================= DEFAULT DATA ================= */
const seedData: HistoryItem[] = [
  {
    id: 1,
    vehicle: "Nissan Altima (2147483647)",
    inspectionName: "Post-accident Inspection",
    inspectionDate: "29-10-2024",
    result: "Passed",
    details: "Vehicle passed all safety requirements after repairs.",
    inspector: "David Wilson"
  },
  {
    id: 2,
    vehicle: "Chevrolet Tahoe (1357924680)",
    inspectionName: "Pre-purchase Inspection",
    inspectionDate: "08-05-2024",
    result: "Failed",
    details: "Significant engine wear detected. Transmission fluid leak found.",
    inspector: "Sarah Brown"
  },
  {
    id: 3,
    vehicle: "Ford Mustang (2147483647)",
    inspectionName: "Emissions Inspection",
    inspectionDate: "27-12-2023",
    result: "Failed",
    details: "Emissions levels exceed regulatory standards.",
    inspector: "Michael Davis"
  },
  {
    id: 4,
    vehicle: "Honda Civic (987654321)",
    inspectionName: "Comprehensive Vehicle Inspection",
    inspectionDate: "17-04-2024",
    result: "Passed",
    details: "Excellent condition. All systems operational.",
    inspector: "John Smith"
  },
];

/* ================= MAIN COMPONENT ================= */
export default function InspectionHistory() {
   const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedData;
      }
    } catch {
      return seedData;
    }
    return seedData;
  });

  const [view, setView] = useState<"table" | "card">("table");
  const [showForm, setShowForm] = useState(false);
  const [viewItem, setViewItem] = useState<HistoryItem | null>(null);
  const [editItem, setEditItem] = useState<HistoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const remove = (id: number) => {
    if (window.confirm("Delete this history record?")) {
      setHistory((prev) => prev.filter((h) => h.id !== id));
    }
  };

  const saveItem = (data: HistoryItem) => {
    if (editItem) {
      setHistory((prev) => prev.map((h) => (h.id === data.id ? data : h)));
    } else {
      setHistory((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditItem(null);
  };

  const filteredHistory = history.filter(
    (h) =>
      h.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.inspectionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Inspection <span className="text-indigo-600">History</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">Vehicle Inspection</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Past Audit Logs</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full lg:w-64"
              />
            </div>

            <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-lg">
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-md transition-all ${
                  view === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2 rounded-md transition-all ${
                  view === "card" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                setEditItem(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>New Record</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <StatCard icon={<History className="text-indigo-600" />} label="Total Audits" value={history.length} />
        <StatCard icon={<CheckCircle className="text-emerald-600" />} label="Passed Inspections" value={history.filter(h => h.result === "Passed").length} />
        <StatCard icon={<XCircle className="text-rose-600" />} label="Failed Inspections" value={history.filter(h => h.result === "Failed").length} />
      </div>

      {/* --- Main Content Area --- */}
      <main className="transition-all duration-300">
        {view === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {[
                      "NO",
                      "VEHICLE & INSPECTOR",
                      "INSPECTION TYPE",
                      "DATE",
                      "RESULT",
                      "OPERATIONS",
                    ].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredHistory.map((h, idx) => (
                    <tr key={h.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4 text-sm font-medium text-slate-400">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base">
                            {h.vehicle.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {h.vehicle}
                            </div>
                            <div className="text-xs text-slate-500">
                              Inspector: {h.inspector || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase border border-slate-200">
                          {h.inspectionName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-600 uppercase">
                          {h.inspectionDate}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                          h.result === "Passed" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}>
                          {h.result === "Passed" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {h.result}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewItem(h)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setEditItem(h); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => remove(h.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredHistory.length === 0 && <EmptyState />}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredHistory.map((h) => (
              <div
                key={h.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                      {h.vehicle.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                        {h.vehicle}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {h.inspectionName}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                    h.result === "Passed" 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                      : "bg-rose-50 text-rose-600 border-rose-100"
                  }`}>
                    {h.result}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <CardRow label="Inspector" value={h.inspector} />
                  <CardRow label="Audit Date" value={h.inspectionDate} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewItem(h)}
                    className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all border border-slate-200"
                  >
                    VIEW
                  </button>
                  <button
                    onClick={() => { setEditItem(h); setShowForm(true); }}
                    className="flex-1 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold transition-all border border-indigo-100"
                  >
                    MODIFY
                  </button>
                  <button
                    onClick={() => remove(h.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- Modals --- */}
      {viewItem && (
        <Modal onClose={() => setViewItem(null)} title="Audit Insight">
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
              <div className="h-24 w-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-500/40 border-4 border-white/10">
                {viewItem.vehicle.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">{viewItem.vehicle}</h2>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm font-medium">{viewItem.inspectionName}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${viewItem.result === "Passed" ? "text-emerald-400" : "text-rose-400"}`}>
                    Audit Status: {viewItem.result}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Inspector</p>
                <p className="text-sm font-black text-slate-800">{viewItem.inspector}</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Audit Date</p>
                <p className="text-sm font-black text-slate-800">{viewItem.inspectionDate}</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl col-span-2">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Details</p>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">{viewItem.details}</p>
              </div>
            </div>
            
            <button
              onClick={() => setViewItem(null)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Analysis
            </button>
          </div>
        </Modal>
      )}

      {showForm && (
        <HistoryForm
          editData={editItem}
          onClose={() => { setShowForm(false); setEditItem(null); }}
          onSave={saveItem}
        />
      )}
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

function ActionBtn({ onClick, icon, color }: any) {
  const styles: any = {
    blue: "text-blue-600 hover:bg-blue-50 border-blue-100",
    indigo: "text-indigo-600 hover:bg-indigo-50 border-indigo-100",
    red: "text-red-600 hover:bg-red-50 border-red-100",
  };
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border transition-all active:scale-90 ${styles[color]}`}
    >
      {icon}
    </button>
  );
}

function CardRow({ label, value, isBadge }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500 font-medium">{label}</span>
      {isBadge ? (
        <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold border border-indigo-100">
          {value}
        </span>
      ) : (
        <span className="text-slate-900 font-semibold">{value}</span>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50">
      <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
        <ClipboardList size={40} />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No records found</h3>
      <p className="text-slate-500 text-sm">Try adjusting your search or add a new record.</p>
    </div>
  );
}

function Modal({ children, onClose, title }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-slate-900">
            <X size={20} />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

function HistoryForm({ editData, onClose, onSave }: any) {
  const [formData, setFormData] = useState(
    editData || {
      vehicle: "",
      inspectionName: "",
      inspectionDate: "",
      result: "Passed",
      details: "",
      inspector: ""
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-900">
            {editData ? "Edit History Record" : "New History Record"}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-slate-900">
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="p-8 space-y-4"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Vehicle</label>
              <input
                required
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                placeholder="e.g. Nissan Altima"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Inspection Name</label>
              <input
                required
                value={formData.inspectionName}
                onChange={(e) => setFormData({ ...formData, inspectionName: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                placeholder="e.g. Annual Safety Check"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Date</label>
                <input
                  required
                  type="text"
                  value={formData.inspectionDate}
                  onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                  placeholder="DD-MM-YYYY"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Result</label>
                <select
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value as any })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                >
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Inspector</label>
              <input
                required
                value={formData.inspector}
                onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Details</label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold min-h-[100px]"
                placeholder="Audit notes and observations..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              {editData ? "Update Record" : "Save Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
