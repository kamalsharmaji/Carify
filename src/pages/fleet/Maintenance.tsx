import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Wrench,
  Settings,
  DollarSign,
  Activity,
  Calendar,
  Clock,
  Shield,
  X,
} from "lucide-react";

/* ================= TYPES ================= */
interface Maintenance {
  id: number;
  vehicleNo: string;
  serviceType: string;
  date: string;
  cost: string;
  provider: string;
  nextDue: string;
  status: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "fleet_maintenance_v2";

/* ================= DEFAULT DATA ================= */
const seedData: Maintenance[] = [
  {
    id: 1,
    vehicleNo: "DL09AB1234",
    serviceType: "Oil Change",
    date: "2025-01-10",
    cost: "3000",
    provider: "Auto Care Center",
    nextDue: "2025-04-10",
    status: "Completed",
  },
  {
    id: 2,
    vehicleNo: "MH12CD5678",
    serviceType: "Brake Inspection",
    date: "2025-01-15",
    cost: "1500",
    provider: "City Garage",
    nextDue: "2025-02-15",
    status: "Scheduled",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function Maintenance() {
  const [records, setRecords] = useState<Maintenance[]>(() => {
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
  const [viewRecord, setViewRecord] = useState<Maintenance | null>(null);
  const [editRecord, setEditRecord] = useState<Maintenance | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const remove = (id: number) => {
    if (window.confirm("Delete this maintenance record?")) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const saveRecord = (data: Maintenance) => {
    if (editRecord) {
      setRecords((prev) => prev.map((r) => (r.id === data.id ? data : r)));
    } else {
      setRecords((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditRecord(null);
  };

  const filtered = records.filter((r) =>
    r.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCost = records.reduce((acc, curr) => acc + parseFloat(curr.cost || "0"), 0);
  const activeServices = records.filter(r => r.status === "Scheduled").length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Wrench className="w-8 h-8 text-slate-900" />
              Maintenance Management
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Track and schedule fleet maintenance activities
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
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>Schedule Service</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Expenditure" value={`₹${totalCost.toLocaleString()}`} icon={DollarSign} color="orange" />
          <StatCard label="Scheduled Services" value={activeServices.toString()} icon={Activity} color="blue" />
          <StatCard label="Health Index" value="98.4%" icon={Shield} color="emerald" />
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search vehicles or service type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-sm font-medium"
          />
        </div>

        {view === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["Vehicle No", "Service Type", "Date", "Provider", "Cost", "Status", "Actions"].map((h) => (
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
                          <div className="font-semibold text-slate-900">{r.vehicleNo}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{r.serviceType}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-semibold">{r.date}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Next: {r.nextDue}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{r.provider}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900">₹{parseFloat(r.cost).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={r.status} />
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
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div key={r.id} className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 text-slate-900 flex items-center justify-center font-bold text-xl border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    {r.vehicleNo.charAt(0)}
                  </div>
                  <StatusBadge status={r.status} />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">{r.vehicleNo}</h3>
                  <div className="flex items-center gap-2 text-slate-500 mt-1 font-medium">
                    <Settings size={14} className="text-slate-400" />
                    {r.serviceType}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                  <CardRow label="Provider" value={r.provider} />
                  <CardRow label="Cost" value={`₹${parseFloat(r.cost).toLocaleString()}`} isHighlight />
                  <CardRow label="Service Date" value={r.date} />
                  <CardRow label="Next Due" value={r.nextDue} />
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
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Wrench className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Maintenance Details</h3>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Record ID: #{viewRecord.id}</p>
                </div>
              </div>
              <button onClick={() => setViewRecord(null)} className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <DetailCard label="Vehicle No" value={viewRecord.vehicleNo} icon={Calendar} color="blue" />
                <DetailCard label="Service Type" value={viewRecord.serviceType} icon={Settings} color="orange" />
                <DetailCard label="Total Cost" value={`₹${parseFloat(viewRecord.cost).toLocaleString()}`} icon={DollarSign} color="emerald" />
                <DetailCard label="Next Due" value={viewRecord.nextDue} icon={Clock} color="indigo" />
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Service Provider</p>
                  <p className="text-slate-900 font-semibold">{viewRecord.provider}</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => setViewRecord(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all"
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
    orange: "text-orange-600 bg-orange-50 border-orange-100",
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
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
  const isCompleted = status === "Completed";
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
      isCompleted 
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

function CardRow({ label, value, isHighlight }: { label: string; value: string; isHighlight?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className={`font-semibold text-sm ${isHighlight ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{value}</p>
    </div>
  );
}

function DetailCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100"
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

function FormModal({ editData, onClose, onSave }: { editData: Maintenance | null; onClose: () => void; onSave: (data: Maintenance) => void }) {
  const [form, setForm] = useState<Maintenance>(
    editData || { id: 0, vehicleNo: "", serviceType: "", date: "", cost: "", provider: "", nextDue: "", status: "Scheduled" }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.vehicleNo.trim()) newErrors.vehicleNo = "Vehicle No Required";
    if (!form.serviceType.trim()) newErrors.serviceType = "Service Type Required";
    if (!form.date.trim()) newErrors.date = "Date Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{editData ? "Edit" : "Schedule"} Maintenance</h3>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">Enter maintenance protocol details</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Vehicle No" value={form.vehicleNo} onChange={(v) => setForm({ ...form, vehicleNo: v })} error={errors.vehicleNo} placeholder="e.g. DL01AB1234" />
            <FormInput label="Service Type" value={form.serviceType} onChange={(v) => setForm({ ...form, serviceType: v })} error={errors.serviceType} placeholder="e.g. Oil Change" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Log Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} error={errors.date} />
            <FormInput label="Cost (₹)" value={form.cost} onChange={(v) => setForm({ ...form, cost: v })} placeholder="0.00" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Provider" value={form.provider} onChange={(v) => setForm({ ...form, provider: v })} placeholder="Service Center" />
            <FormInput label="Next Due" type="date" value={form.nextDue} onChange={(v) => setForm({ ...form, nextDue: v })} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
            <div className="flex gap-2">
              {["Scheduled", "Completed"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm({ ...form, status: s })}
                  className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all border ${
                    form.status === s 
                    ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all">Cancel</button>
            <button 
              onClick={() => {
                if (validate()) onSave(form);
              }}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg shadow-slate-900/10 transition-all active:scale-95"
            >
              {editData ? "Update Record" : "Save Record"}
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
