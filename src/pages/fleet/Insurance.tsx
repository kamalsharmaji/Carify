import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  ShieldCheck,
  Calendar,
  DollarSign,
  Briefcase,
  Navigation,
  FileText,
  AlertTriangle,
  Clock,
  X
} from "lucide-react";

/* ================= TYPES ================= */
interface Insurance {
  id: number;
  vehicleNo: string;
  policyNo: string;
  provider: string;
  expiryDate: string;
  coverage: string;
  premium: string;
  status: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "fleet_insurance_v2";

/* ================= DEFAULT DATA ================= */
const seedData: Insurance[] = [
  {
    id: 1,
    vehicleNo: "DL09AB1234",
    policyNo: "POL-2024-001",
    provider: "SBI Insurance",
    expiryDate: "2025-12-31",
    coverage: "Comprehensive",
    premium: "25000",
    status: "Active",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function Insurance() {
  const [records, setRecords] = useState<Insurance[]>(() => {
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
  const [viewRecord, setViewRecord] = useState<Insurance | null>(null);
  const [editRecord, setEditRecord] = useState<Insurance | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const remove = (id: number) => {
    if (window.confirm("Terminate this insurance protocol record?")) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const saveRecord = (data: Insurance) => {
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
    r.policyNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    active: records.filter(r => r.status === "Active").length,
    totalPremium: records.reduce((acc, curr) => acc + parseFloat(curr.premium || "0"), 0),
    expiring: 0 // Placeholder
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Standard Header Section */}
        <header className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg shadow-slate-900/10">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Insurance Protocols</h1>
                <p className="text-slate-500 text-sm flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-500" />
                  Fleet Management › Insurance Protocols
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
                onClick={() => { setEditRecord(null); setShowForm(true); }}
                className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95"
              >
                <Plus size={18} />
                <span>Issue Policy</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: "Active Protocols", value: stats.active, icon: ShieldCheck, color: "blue" },
              { label: "Premium Volume", value: `₹${stats.totalPremium.toLocaleString()}`, icon: DollarSign, color: "emerald" },
              { label: "Renewal Alerts", value: stats.expiring, icon: AlertTriangle, color: "orange" },
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
            placeholder="Search by asset or policy..."
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
                    {["Asset ID", "Policy ID", "Provider", "Coverage", "Expiry", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                            {r.vehicleNo.charAt(0)}
                          </div>
                          <div className="font-semibold text-slate-900">{r.vehicleNo}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-500 text-xs">{r.policyNo}</td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{r.provider}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                          {r.coverage}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{r.expiryDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          r.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-red-50 text-red-600 border-red-100"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
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
        )}

        {view === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div key={r.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                    {r.vehicleNo.charAt(0)}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    r.status === "Active"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-red-50 text-red-600 border-red-100"
                  }`}>
                    {r.status}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">{r.vehicleNo}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                    <Briefcase size={14} className="text-blue-500" />
                    {r.provider}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <CardRow label="Policy ID" value={r.policyNo} />
                  <CardRow label="Premium" value={`₹${parseFloat(r.premium).toLocaleString()}`} isHighlight />
                  <CardRow label="Coverage" value={r.coverage} isBadge />
                  <CardRow label="Expiry" value={r.expiryDate} />
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewRecord(r)} className="flex-1 py-2 rounded-lg bg-slate-900 text-white font-semibold text-sm transition-all hover:bg-slate-800 active:scale-95">
                    View Policy
                  </button>
                  <button onClick={() => { setEditRecord(r); setShowForm(true); }} className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all border border-slate-200">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => remove(r.id)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all border border-slate-200">
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Policy Details</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Asset Protection Protocol</p>
                  </div>
                </div>
                <button onClick={() => setViewRecord(null)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailCard label="Asset Identity" value={viewRecord.vehicleNo} icon={Navigation} color="blue" />
                <DetailCard label="Policy Number" value={viewRecord.policyNo} icon={FileText} color="indigo" />
                <DetailCard label="Provider" value={viewRecord.provider} icon={Briefcase} color="emerald" />
                <DetailCard label="Annual Premium" value={`₹${parseFloat(viewRecord.premium).toLocaleString()}`} icon={DollarSign} color="orange" />
                <DetailCard label="Protection Class" value={viewRecord.coverage} icon={ShieldCheck} color="blue" />
                <DetailCard label="Expiry Horizon" value={viewRecord.expiryDate} icon={Clock} color="red" />
              </div>

              <div className={`mt-6 p-4 rounded-xl border flex items-center gap-4 ${viewRecord.status === 'Active' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                <ShieldCheck className={viewRecord.status === 'Active' ? 'text-emerald-500' : 'text-red-500'} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Protection Status</p>
                  <p className={`font-bold ${viewRecord.status === 'Active' ? 'text-emerald-600' : 'text-red-600'}`}>{viewRecord.status.toUpperCase()} PROTOCOL</p>
                </div>
              </div>
            </div>
            <div className="px-8 py-4 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setViewRecord(null)}
                className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Close Record
              </button>
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

/* ================= SUB-COMPONENTS ================= */

function ActionBtn({ children, color, onClick }: { children: React.ReactNode; color: 'blue' | 'orange' | 'red' | 'indigo'; onClick: () => void }) {
  const colors = {
    blue: "text-blue-600 hover:bg-blue-50 border-blue-50",
    orange: "text-orange-600 hover:bg-orange-50 border-orange-50",
    indigo: "text-indigo-600 hover:bg-indigo-50 border-indigo-50",
    red: "text-red-600 hover:bg-red-50 border-red-50"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-lg border transition-all ${colors[color]}`}>
      {children}
    </button>
  );
}

function CardRow({ label, value, isHighlight, isBadge }: { label: string; value: string; isHighlight?: boolean; isBadge?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      {isBadge ? (
        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-wider border border-blue-100">
          {value}
        </span>
      ) : (
        <p className={`text-sm font-semibold ${isHighlight ? "text-emerald-600" : "text-slate-900"}`}>{value}</p>
      )}
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

function FormModal({ editData, onClose, onSave }: { editData: Insurance | null; onClose: () => void; onSave: (data: Insurance) => void }) {
  const [form, setForm] = useState<Insurance>(editData || { id: 0, vehicleNo: "", policyNo: "", provider: "", expiryDate: "", coverage: "Comprehensive", premium: "", status: "Active" });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">{editData ? "Update" : "Issue"} Policy</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Asset Identity" value={form.vehicleNo} onChange={(v) => setForm({ ...form, vehicleNo: v })} placeholder="e.g. DL09AB1234" />
              <FormInput label="Policy ID" value={form.policyNo} onChange={(v) => setForm({ ...form, policyNo: v })} placeholder="POL-2024-XXX" />
            </div>
            <FormInput label="Insurance Provider" value={form.provider} onChange={(v) => setForm({ ...form, provider: v })} placeholder="e.g. SBI Insurance" />
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Coverage Class" value={form.coverage} onChange={(v) => setForm({ ...form, coverage: v })} placeholder="Comprehensive" />
              <FormInput label="Premium (₹)" value={form.premium} onChange={(v) => setForm({ ...form, premium: v })} placeholder="25000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Expiry Horizon" value={form.expiryDate} onChange={(v) => setForm({ ...form, expiryDate: v })} type="date" />
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Protocol Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            
            <div className="pt-6 flex gap-3">
              <button onClick={onClose} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all">Cancel</button>
              <button onClick={() => onSave(form)} className="flex-1 px-4 py-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-slate-900/10">
                {editData ? "Update Policy" : "Authorize Shield"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
      />
    </div>
  );
}
