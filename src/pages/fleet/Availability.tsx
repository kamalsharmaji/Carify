import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Navigation,
  ChevronRight,
  Info,
  X
} from "lucide-react";

/* ================= TYPES ================= */
interface Availability {
  id: number;
  vehicleNo: string;
  date: string;
  status: string;
  timeSlot: string;
  notes: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "fleet_availability_v2";

/* ================= DEFAULT DATA ================= */
const seedData: Availability[] = [
  {
    id: 1,
    vehicleNo: "DL09AB1234",
    date: "2025-01-20",
    status: "Available",
    timeSlot: "09:00 - 17:00",
    notes: "Full day available for deployment",
  },
  {
    id: 2,
    vehicleNo: "MH01CD5678",
    date: "2025-01-21",
    status: "Maintenance",
    timeSlot: "10:00 - 14:00",
    notes: "Scheduled engine checkup",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function Availability() {
  const [records, setRecords] = useState<Availability[]>(() => {
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
  const [viewRecord, setViewRecord] = useState<Availability | null>(null);
  const [editRecord, setEditRecord] = useState<Availability | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const remove = (id: number) => {
    if (window.confirm("Remove this availability record?")) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const saveRecord = (data: Availability) => {
    if (editRecord) {
      setRecords((prev) => prev.map((r) => (r.id === data.id ? data : r)));
    } else {
      setRecords((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditRecord(null);
  };

  const filtered = records.filter((r) =>
    r.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: records.length,
    available: records.filter(r => r.status === "Available").length,
    scheduled: records.filter(r => r.status === "Maintenance" || r.status === "Booked").length
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-slate-900" />
              Vehicle Availability
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Manage vehicle readiness and deployment schedules
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-200/50 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-md transition-all ${view === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2 rounded-md transition-all ${view === "card" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => { setEditRecord(null); setShowForm(true); }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95 shadow-sm"
            >
              <Plus size={18} />
              <span>Schedule Asset</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Capacity" value={stats.total.toString()} icon={Calendar} color="blue" />
          <StatCard label="Ready to Deploy" value={stats.available.toString()} icon={CheckCircle2} color="emerald" />
          <StatCard label="Scheduled / Maintenance" value={stats.scheduled.toString()} icon={AlertCircle} color="orange" />
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by vehicle ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-sm"
          />
        </div>

        {view === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["Vehicle ID", "Date", "Time Slot", "Status", "Notes", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-xs border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                            {r.vehicleNo.charAt(0)}
                          </div>
                          <div className="font-bold text-slate-900">{r.vehicleNo}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{r.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-900 font-semibold">
                          <Clock size={14} className="text-slate-400" />
                          {r.timeSlot}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium italic truncate max-w-[200px]">
                        {r.notes}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <ActionBtn color="blue" onClick={() => setViewRecord(r)}>
                            <Eye size={16} />
                          </ActionBtn>
                          <ActionBtn color="orange" onClick={() => { setEditRecord(r); setShowForm(true); }}>
                            <Pencil size={16} />
                          </ActionBtn>
                          <ActionBtn color="red" onClick={() => remove(r.id)}>
                            <Trash2 size={16} />
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="py-20 text-center bg-slate-50/50">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-300 mb-4 shadow-sm">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No records found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div key={r.id} className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-lg bg-slate-50 text-slate-900 flex items-center justify-center font-bold text-xl border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    {r.vehicleNo.charAt(0)}
                  </div>
                  <StatusBadge status={r.status} />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">{r.vehicleNo}</h3>
                  <div className="flex items-center gap-2 text-slate-500 mt-1 font-medium">
                    <Clock size={14} className="text-slate-400" />
                    {r.timeSlot}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                  <CardRow label="Date" value={r.date} />
                  <CardRow label="Status" value={r.status} />
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-500 text-sm font-medium italic">
                  "{r.notes}"
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewRecord(r)} className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-900 font-bold text-sm transition-all hover:bg-slate-200 active:scale-95">
                    View Details
                  </button>
                  <button onClick={() => { setEditRecord(r); setShowForm(true); }} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => remove(r.id)} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {viewRecord && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                  <Info className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Availability Report</h3>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">Asset deployment details</p>
                </div>
              </div>
              <button onClick={() => setViewRecord(null)} className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <DetailCard label="Vehicle ID" value={viewRecord.vehicleNo} icon={Calendar} color="blue" />
                <DetailCard label="Availability Date" value={viewRecord.date} icon={Calendar} color="indigo" />
                <DetailCard label="Time Window" value={viewRecord.timeSlot} icon={Clock} color="orange" />
                <DetailCard label="Current Status" value={viewRecord.status} icon={CheckCircle2} color="emerald" />
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Operational Notes</p>
                <p className="text-slate-600 font-medium italic leading-relaxed text-sm">
                  "{viewRecord.notes}"
                </p>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => setViewRecord(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <FormModal
          editData={editRecord}
          onClose={() => { setShowForm(false); setEditRecord(null); }}
          onSave={saveRecord}
        />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100",
  };
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${colors[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isAvailable = status === "Available";
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
      isAvailable 
      ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
      : "bg-orange-50 text-orange-600 border-orange-100"
    }`}>
      {status}
    </span>
  );
}

function ActionBtn({ children, color, onClick }: { children: React.ReactNode; color: 'blue' | 'orange' | 'red'; onClick: () => void }) {
  const colors = {
    blue: "text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-100",
    orange: "text-orange-600 hover:bg-orange-50 border-transparent hover:border-orange-100",
    red: "text-red-600 hover:bg-red-50 border-transparent hover:border-red-100"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-lg border transition-all active:scale-95 ${colors[color]}`}>
      {children}
    </button>
  );
}

function CardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="font-semibold text-sm text-slate-900">{value}</p>
    </div>
  );
}

function DetailCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100"
  };
  
  return (
    <div className="p-4 bg-white border border-slate-100 rounded-lg flex items-center gap-3 shadow-sm">
      <div className={`w-10 h-10 rounded-lg border ${colors[color] || 'bg-slate-50 text-slate-600'} flex items-center justify-center`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-slate-900 font-bold text-sm">{value}</p>
      </div>
    </div>
  );
}

function FormModal({ editData, onClose, onSave }: { editData: Availability | null; onClose: () => void; onSave: (data: Availability) => void }) {
  const [form, setForm] = useState<Availability>(
    editData || { id: 0, vehicleNo: "", date: "", status: "Available", timeSlot: "", notes: "" }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.vehicleNo.trim()) newErrors.vehicleNo = "Vehicle ID Required";
    if (!form.date.trim()) newErrors.date = "Date Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{editData ? "Edit" : "Schedule"} Availability</h3>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">Asset deployment data entry</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Vehicle ID" value={form.vehicleNo} onChange={(v) => setForm({ ...form, vehicleNo: v })} error={errors.vehicleNo} placeholder="e.g. DL01AB1234" />
            <FormInput label="Deployment Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} error={errors.date} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Time Window" value={form.timeSlot} onChange={(v) => setForm({ ...form, timeSlot: v })} placeholder="e.g. 09:00 - 17:00" />
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
              <select 
                value={form.status} 
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all"
              >
                <option value="Available">Available</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Operational Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Enter deployment notes..."
              rows={3}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all">Cancel</button>
            <button 
              onClick={() => {
                if (validate()) onSave(form);
              }}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg shadow-slate-900/10 transition-all active:scale-95"
            >
              {editData ? "Update Schedule" : "Confirm Schedule"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, error, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all ${
          error ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
        }`}
      />
      {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight ml-1">{error}</p>}
    </div>
  );
}
