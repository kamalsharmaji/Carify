import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  BookOpen,
  Navigation,
  Activity,
  Clock,
  User,
  Milestone,
  X
} from "lucide-react";

/* ================= TYPES ================= */
interface LogEntry {
  id: number;
  vehicleNo: string;
  driver: string;
  date: string;
  startKm: string;
  endKm: string;
  totalKm: string;
  purpose: string;
  status: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "fleet_logbook_v2";

/* ================= DEFAULT DATA ================= */
const seedData: LogEntry[] = [
  {
    id: 1,
    vehicleNo: "DL09AB1234",
    driver: "Amit Kumar",
    date: "2025-01-15",
    startKm: "45200",
    endKm: "45520",
    totalKm: "320",
    purpose: "Client Visit",
    status: "Completed",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function LogBook() {
  const [logs, setLogs] = useState<LogEntry[]>(() => {
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
  const [viewLog, setViewLog] = useState<LogEntry | null>(null);
  const [editLog, setEditLog] = useState<LogEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const remove = (id: number) => {
    if (window.confirm("Delete this log intelligence entry?")) {
      setLogs((prev) => prev.filter((l) => l.id !== id));
    }
  };

  const saveLog = (data: LogEntry) => {
    if (editLog) {
      setLogs((prev) => prev.map((l) => (l.id === data.id ? data : l)));
    } else {
      setLogs((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditLog(null);
  };

  const filteredLogs = logs.filter(
    (l) =>
      l.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalKm = logs.reduce((acc, curr) => acc + parseFloat(curr.totalKm || "0"), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Standard Header Section */}
        <header className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg shadow-slate-900/10">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">LogBook Intelligence</h1>
                <p className="text-slate-500 text-sm flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-500" />
                  Fleet Management › Operational Logs
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button onClick={() => setView("table")} className={`p-2 rounded-md transition-all ${view === "table" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                  <TableIcon size={18} />
                </button>
                <button onClick={() => setView("card")} className={`p-2 rounded-md transition-all ${view === "card" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                  <LayoutGrid size={18} />
                </button>
              </div>

              <button
                onClick={() => { setEditLog(null); setShowForm(true); }}
                className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95"
              >
                <Plus size={18} />
                <span>Create Entry</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: "Total Missions", value: logs.length, icon: Activity, color: "blue" },
              { label: "Cumulative Distance", value: `${totalKm.toLocaleString()} km`, icon: Milestone, color: "emerald" },
              { label: "Active Deployments", value: logs.filter(l => l.status === "In Progress").length, icon: Clock, color: "orange" },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-lg flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg ${stat.color === 'blue' ? 'bg-blue-500/10' : stat.color === 'emerald' ? 'bg-emerald-500/10' : 'bg-orange-500/10'} flex items-center justify-center`}>
                  <stat.icon className={`${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'emerald' ? 'text-emerald-600' : 'text-orange-600'} w-5 h-5`} />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold text-slate-900 leading-none mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by asset or personnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        {view === "table" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    {["Asset ID", "Personnel", "Date", "Distance (KM)", "Purpose", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredLogs.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                            {l.vehicleNo.charAt(0)}
                          </div>
                          <div className="font-semibold text-slate-900">{l.vehicleNo}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                          <User size={14} className="text-blue-500" />
                          {l.driver}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{l.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{l.totalKm} km</td>
                      <td className="px-6 py-4 text-slate-500 text-sm truncate max-w-xs">{l.purpose}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          l.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-blue-50 text-blue-600 border-blue-100"
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewLog(l)}>
                            <Eye size={16} />
                          </ActionBtn>
                          <ActionBtn color="orange" onClick={() => { setEditLog(l); setShowForm(true); }}>
                            <Pencil size={16} />
                          </ActionBtn>
                          <ActionBtn color="red" onClick={() => remove(l.id)}>
                            <Trash2 size={16} />
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLogs.map((l) => (
              <div key={l.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                    {l.vehicleNo.charAt(0)}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    l.status === "Completed"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-blue-50 text-blue-600 border-blue-100"
                  }`}>
                    {l.status}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">{l.vehicleNo}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                    <User size={14} className="text-blue-500" />
                    {l.driver}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <CardRow label="Distance" value={`${l.totalKm} km`} isHighlight />
                  <CardRow label="Date" value={l.date} />
                  <CardRow label="Start" value={`${l.startKm} km`} />
                  <CardRow label="End" value={`${l.endKm} km`} />
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-500 text-xs italic">
                  "{l.purpose}"
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewLog(l)} className="flex-1 py-2 rounded-lg bg-slate-900 text-white font-semibold text-sm transition-all hover:bg-slate-800 active:scale-95">
                    Analyze Entry
                  </button>
                  <button onClick={() => { setEditLog(l); setShowForm(true); }} className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all border border-slate-200">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => remove(l.id)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all border border-slate-200">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {viewLog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Log Intelligence</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Operational Registry</p>
                  </div>
                </div>
                <button onClick={() => setViewLog(null)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailCard label="Asset ID" value={viewLog.vehicleNo} icon={Navigation} color="blue" />
                <DetailCard label="Personnel" value={viewLog.driver} icon={User} color="indigo" />
                <DetailCard label="Mission Date" value={viewLog.date} icon={Clock} color="emerald" />
                <DetailCard label="Total Distance" value={`${viewLog.totalKm} km`} icon={Milestone} color="orange" />
                <DetailCard label="Start Milestone" value={`${viewLog.startKm} km`} icon={Activity} color="blue" />
                <DetailCard label="End Milestone" value={`${viewLog.endKm} km`} icon={Activity} color="indigo" />
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-500 text-sm">
                "{viewLog.purpose}"
              </div>
            </div>
            <div className="px-8 py-4 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setViewLog(null)}
                className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Close Registry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <FormModal
          editData={editLog}
          onClose={() => { setShowForm(false); setEditLog(null); }}
          onSave={saveLog}
        />
      )}
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function ActionBtn({ children, color, onClick }: { children: React.ReactNode; color: 'blue' | 'orange' | 'red'; onClick: () => void }) {
  const colors = {
    blue: "text-blue-600 hover:bg-blue-50 border-blue-50",
    orange: "text-orange-600 hover:bg-orange-50 border-orange-50",
    red: "text-red-600 hover:bg-red-50 border-red-50"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-lg border transition-all ${colors[color]}`}>
      {children}
    </button>
  );
}

function CardRow({ label, value, isHighlight }: { label: string; value: string; isHighlight?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className={`text-sm font-semibold ${isHighlight ? "text-emerald-600" : "text-slate-900"}`}>{value}</p>
    </div>
  );
}

function DetailCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  return (
    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
      <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${
        color === 'blue' ? 'bg-blue-50 text-blue-600' :
        color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
        color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
        'bg-orange-50 text-orange-600'
      }`}>
        <Icon size={16} />
      </div>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function FormModal({ editData, onClose, onSave }: { editData: LogEntry | null; onClose: () => void; onSave: (data: LogEntry) => void }) {
  const [form, setForm] = useState<LogEntry>(editData || { id: 0, vehicleNo: "", driver: "", date: "", startKm: "", endKm: "", totalKm: "", purpose: "", status: "Completed" });

  useEffect(() => {
    const start = parseFloat(form.startKm) || 0;
    const end = parseFloat(form.endKm) || 0;
    if (end >= start) {
      setForm(prev => ({ ...prev, totalKm: (end - start).toString() }));
    }
  }, [form.startKm, form.endKm]);

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">{editData ? "Update" : "Create"} Entry</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Asset ID" value={form.vehicleNo} onChange={(v) => setForm({ ...form, vehicleNo: v })} placeholder="e.g. DL09AB1234" />
              <FormInput label="Personnel" value={form.driver} onChange={(v) => setForm({ ...form, driver: v })} placeholder="Driver Name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Mission Date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} type="date" />
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormInput label="Start KM" value={form.startKm} onChange={(v) => setForm({ ...form, startKm: v })} placeholder="0" />
              <FormInput label="End KM" value={form.endKm} onChange={(v) => setForm({ ...form, endKm: v })} placeholder="0" />
              <FormInput label="Total KM" value={form.totalKm} onChange={() => {}} placeholder="0" disabled />
            </div>
            <FormInput label="Purpose / Mission" value={form.purpose} onChange={(v) => setForm({ ...form, purpose: v })} placeholder="Reason for travel..." />
            
            <div className="pt-6 flex gap-3">
              <button onClick={onClose} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all">Cancel</button>
              <button onClick={() => onSave(form)} className="flex-1 px-4 py-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-slate-900/10">
                {editData ? "Update Entry" : "Establish Entry"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder, type = "text", disabled = false }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; disabled?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}
