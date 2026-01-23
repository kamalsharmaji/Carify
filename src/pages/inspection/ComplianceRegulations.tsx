import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  ShieldCheck,
  FileText,
  ChevronRight,
  AlertCircle,
  X
} from "lucide-react";

/* ================= TYPES ================= */
interface Regulation {
  id: number;
  name: string;
  effectiveDate: string;
  description: string;
  status: "Active" | "Draft" | "Archived";
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "inspection_regulations";

/* ================= DEFAULT DATA ================= */
const seedData: Regulation[] = [
  {
    id: 1,
    name: "Anti-Money Laundering (AML)",
    effectiveDate: "21-10-2026",
    description: "Policy and procedures to prevent financial crimes and money laundering activities.",
    status: "Active"
  },
  {
    id: 2,
    name: "Workplace Harassment Policy",
    effectiveDate: "18-06-2026",
    description: "Guidelines for maintaining a professional and safe working environment for all employees.",
    status: "Active"
  },
  {
    id: 3,
    name: "Data Protection Regulation",
    effectiveDate: "26-07-2025",
    description: "Standards for handling sensitive data and ensuring privacy compliance.",
    status: "Active"
  },
  {
    id: 4,
    name: "Occupational Health and Safety",
    effectiveDate: "25-07-2025",
    description: "Safety protocols and health standards for operational tasks.",
    status: "Active"
  },
  {
    id: 5,
    name: "Vehicle Emissions Standard",
    effectiveDate: "20-12-2024",
    description: "Environmental regulations regarding vehicle exhaust and emission levels.",
    status: "Active"
  },
];

/* ================= MAIN COMPONENT ================= */
export default function ComplianceRegulations() {
  const [regulations, setRegulations] = useState<Regulation[]>(() => {
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
  const [viewReg, setViewReg] = useState<Regulation | null>(null);
  const [editReg, setEditReg] = useState<Regulation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(regulations));
  }, [regulations]);

  const remove = (id: number) => {
    if (window.confirm("Delete this regulation?")) {
      setRegulations((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const saveReg = (data: Regulation) => {
    if (editReg) {
      setRegulations((prev) => prev.map((r) => (r.id === data.id ? data : r)));
    } else {
      setRegulations((prev) => [...prev, { ...data, id: Date.now(), status: "Active" }]);
    }
    setShowForm(false);
    setEditReg(null);
  };

  const filteredRegs = regulations.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Compliance <span className="text-indigo-600">Regulations</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">Vehicle Inspection</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Regulatory Standards Hub</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search regulations..."
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
                setEditReg(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>Add Regulation</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <StatCard icon={<FileText className="text-indigo-600" />} label="Total Regulations" value={regulations.length} />
        <StatCard icon={<ShieldCheck className="text-emerald-600" />} label="Active Policies" value={regulations.filter(r => r.status === "Active").length} />
        <StatCard icon={<AlertCircle className="text-amber-600" />} label="Audit Readiness" value="98%" />
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
                      "REGULATION & SCOPE",
                      "EFFECTIVE DATE",
                      "STATUS",
                      "OPERATIONS",
                    ].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRegs.map((r, idx) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4 text-sm font-medium text-slate-400">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base">
                            <ShieldCheck size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {r.name}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-1 max-w-md">
                              {r.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {r.effectiveDate}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase border border-emerald-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          {r.status || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewReg(r)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setEditReg(r); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => remove(r.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredRegs.length === 0 && <EmptyState />}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredRegs.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase border border-emerald-100">
                    Active
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {r.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 h-8">
                    {r.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <CardRow label="Effective Date" value={r.effectiveDate} />
                  <CardRow label="Compliance" value="Verified" isBadge />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewReg(r)}
                    className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all border border-slate-200"
                  >
                    DETAILS
                  </button>
                  <button
                    onClick={() => { setEditReg(r); setShowForm(true); }}
                    className="flex-1 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold transition-all border border-indigo-100"
                  >
                    MODIFY
                  </button>
                  <button
                    onClick={() => remove(r.id)}
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
      {viewReg && (
        <Modal onClose={() => setViewReg(null)} title="Regulation Policy Detail">
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
              <div className="h-24 w-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-500/40 border-4 border-white/10">
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">{viewReg.name}</h2>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm font-medium">Regulatory Standard Hub</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-2">Status: {viewReg.status || "Active"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Effective Date</p>
                <p className="text-sm font-black text-slate-800">{viewReg.effectiveDate}</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Compliance Level</p>
                <p className="text-sm font-black text-slate-800">Standard v2.0</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl col-span-2">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Description</p>
                <p className="text-sm font-medium text-slate-700 leading-relaxed italic">"{viewReg.description}"</p>
              </div>
            </div>
            
            <button
              onClick={() => setViewReg(null)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Policy View
            </button>
          </div>
        </Modal>
      )}

      {showForm && (
        <RegForm
          editData={editReg}
          onClose={() => { setShowForm(false); setEditReg(null); }}
          onSave={saveReg}
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
        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100">
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
        <ShieldCheck size={40} />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No regulations found</h3>
      <p className="text-slate-500 text-sm">Try adjusting your search or add a new regulation.</p>
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

function RegForm({ editData, onClose, onSave }: any) {
  const [formData, setFormData] = useState(
    editData || {
      name: "",
      effectiveDate: "",
      description: "",
      status: "Active"
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-900">
            {editData ? "Edit Regulation" : "New Regulation"}
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
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Regulation Name</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                placeholder="e.g. Anti-Money Laundering"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Effective Date</label>
              <input
                required
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                placeholder="DD-MM-YYYY"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold min-h-[120px]"
                placeholder="Policy details and scope..."
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
              {editData ? "Update Regulation" : "Save Regulation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
