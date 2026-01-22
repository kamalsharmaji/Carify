import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Fuel,
  TrendingUp,
  Droplets,
  DollarSign,
  Navigation,
  Activity,
  MapPin,
  Clock
} from "lucide-react";

/* ================= TYPES ================= */
interface FuelEntry {
  id: number;
  vehicleNo: string;
  date: string;
  quantity: string;
  cost: string;
  odometer: string;
  fuelType: string;
  location: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "fleet_fuel_history_v2";

/* ================= DEFAULT DATA ================= */
const seedData: FuelEntry[] = [
  {
    id: 1,
    vehicleNo: "DL09AB1234",
    date: "2025-01-14",
    quantity: "45 L",
    cost: "5400",
    odometer: "45200",
    fuelType: "Diesel",
    location: "Premium Station X-09",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function FuelHistory() {
  const [entries, setEntries] = useState<FuelEntry[]>(() => {
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
  const [viewEntry, setViewEntry] = useState<FuelEntry | null>(null);
  const [editEntry, setEditEntry] = useState<FuelEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const remove = (id: number) => {
    if (window.confirm("Delete this fuel intelligence entry?")) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const saveEntry = (data: FuelEntry) => {
    if (editEntry) {
      setEntries((prev) => prev.map((e) => (e.id === data.id ? data : e)));
    } else {
      setEntries((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditEntry(null);
  };

  const filtered = entries.filter((e) =>
    e.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCost = entries.reduce((acc, curr) => acc + parseFloat(curr.cost || "0"), 0);
  const totalQty = entries.reduce((acc, curr) => acc + parseFloat(curr.quantity || "0"), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Standardized Header Section */}
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
                <Fuel className="text-white w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Fuel <span className="text-emerald-600">Intelligence</span>
                  </h1>
                </div>
                <p className="text-slate-500 mt-1 font-medium text-sm flex items-center gap-2">
                  Fleet Management › Fuel Tracking
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button onClick={() => setView("table")} className={`p-2 rounded-md transition-all ${view === "table" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                  <TableIcon size={18} />
                </button>
                <button onClick={() => setView("card")} className={`p-2 rounded-md transition-all ${view === "card" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                  <LayoutGrid size={18} />
                </button>
              </div>

              <button
                onClick={() => { setEditEntry(null); setShowForm(true); }}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all active:scale-95"
              >
                <Plus size={18} />
                <span>Log Refill</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { label: "Energy Expenditure", value: `₹${totalCost.toLocaleString()}`, icon: DollarSign, color: "emerald" },
              { label: "Total Volume", value: `${totalQty} Liters`, icon: Droplets, color: "blue" },
              { label: "Efficiency Index", value: "94.2%", icon: TrendingUp, color: "orange" },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-4 hover:bg-white transition-colors duration-300">
                <div className={`w-12 h-12 rounded-lg ${stat.color === 'blue' ? 'bg-blue-50' : stat.color === 'emerald' ? 'bg-emerald-50' : 'bg-orange-50'} flex items-center justify-center border border-current opacity-80`}>
                  <stat.icon className={`${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'emerald' ? 'text-emerald-600' : 'text-orange-600'} w-6 h-6`} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by asset ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>

        {view === "table" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Asset ID", "Date", "Quantity", "Exp. Value", "Odometer", "Station", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                            {e.vehicleNo.charAt(0)}
                          </div>
                          <div className="font-semibold text-slate-900">{e.vehicleNo}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{e.date}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{e.quantity}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-emerald-600">₹{parseFloat(e.cost).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-500">{e.odometer} km</td>
                      <td className="px-6 py-4 text-slate-500 truncate max-w-xs">{e.location}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewEntry(e)}>
                            <Eye size={16} />
                          </ActionBtn>
                          <ActionBtn color="orange" onClick={() => { setEditEntry(e); setShowForm(true); }}>
                            <Pencil size={16} />
                          </ActionBtn>
                          <ActionBtn color="red" onClick={() => remove(e.id)}>
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
            {filtered.map((e) => (
              <div key={e.id} className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
                    {e.vehicleNo.charAt(0)}
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                    {e.fuelType}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{e.vehicleNo}</h3>
                  <div className="flex items-center gap-2 text-slate-500 mt-1 text-sm">
                    <MapPin size={14} className="text-slate-400" />
                    {e.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  <CardRow label="Quantity" value={e.quantity} />
                  <CardRow label="Expenditure" value={`₹${parseFloat(e.cost).toLocaleString()}`} isHighlight />
                  <CardRow label="Milestone" value={`${e.odometer} km`} />
                  <CardRow label="Refill Date" value={e.date} />
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewEntry(e)} className="flex-1 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs transition-all hover:bg-slate-800">
                    View Details
                  </button>
                  <button onClick={() => { setEditEntry(e); setShowForm(true); }} className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => remove(e.id)} className="p-2 rounded-lg bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {viewEntry && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-8 relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
                    <Activity className="text-white w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Fuel <span className="text-emerald-600">Details</span></h3>
                    <p className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Refill Record Analysis</p>
                  </div>
                </div>
                <button onClick={() => setViewEntry(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DetailCard label="Asset Identity" value={viewEntry.vehicleNo} icon={Navigation} color="blue" />
                <DetailCard label="Transaction Date" value={viewEntry.date} icon={Clock} color="indigo" />
                <DetailCard label="Energy Volume" value={viewEntry.quantity} icon={Droplets} color="emerald" />
                <DetailCard label="Financial Value" value={`₹${parseFloat(viewEntry.cost).toLocaleString()}`} icon={DollarSign} color="orange" />
                <DetailCard label="Odometer Reading" value={`${viewEntry.odometer} km`} icon={Activity} color="blue" />
                <DetailCard label="Energy Source" value={viewEntry.fuelType} icon={Fuel} color="indigo" />
              </div>

              <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <MapPin className="text-emerald-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Logistics Hub / Location</p>
                  <p className="text-slate-900 font-bold text-lg">{viewEntry.location}</p>
                </div>
              </div>

              <button
                onClick={() => setViewEntry(null)}
                className="w-full mt-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all shadow-sm"
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
          editData={editEntry}
          onClose={() => { setShowForm(false); setEditEntry(null); }}
          onSave={saveEntry}
        />
      )}
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function ActionBtn({ children, color, onClick }: { children: React.ReactNode; color: 'blue' | 'orange' | 'red'; onClick: () => void }) {
  const colors = {
    blue: "text-blue-600 hover:bg-blue-50 border-blue-100",
    orange: "text-orange-600 hover:bg-orange-50 border-orange-100",
    red: "text-red-600 hover:bg-red-50 border-red-100"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-lg border transition-all active:scale-95 ${colors[color]}`}>
      {children}
    </button>
  );
}

function CardRow({ label, value, isHighlight }: { label: string; value: string; isHighlight?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className={`text-sm font-semibold mt-0.5 ${isHighlight ? "text-emerald-600" : "text-slate-900"}`}>{value}</p>
    </div>
  );
}

function DetailCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center ${
        color === 'blue' ? 'bg-blue-50 text-blue-600' :
        color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
        color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
        'bg-orange-50 text-orange-600'
      } border border-current opacity-80`}>
        <Icon size={20} />
      </div>
      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

function FormModal({ editData, onClose, onSave }: { editData: FuelEntry | null; onClose: () => void; onSave: (data: FuelEntry) => void }) {
  const [form, setForm] = useState<FuelEntry>(editData || { id: 0, vehicleNo: "", date: "", quantity: "", cost: "", odometer: "", fuelType: "Diesel", location: "" });

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white rounded-xl w-full max-w-xl shadow-xl overflow-hidden border border-slate-200">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900">{editData ? "Edit" : "New"} <span className="text-emerald-600">Fuel Log</span></h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <FormInput label="Asset Identity" value={form.vehicleNo} onChange={(v) => setForm({ ...form, vehicleNo: v })} placeholder="e.g. DL09AB1234" />
            <FormInput label="Transaction Date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} type="date" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <FormInput label="Volume (L)" value={form.quantity} onChange={(v) => setForm({ ...form, quantity: v })} placeholder="e.g. 45" />
            <FormInput label="Financial Value (₹)" value={form.cost} onChange={(v) => setForm({ ...form, cost: v })} placeholder="e.g. 5400" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <FormInput label="Milestone (km)" value={form.odometer} onChange={(v) => setForm({ ...form, odometer: v })} placeholder="45200" />
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Energy Source</label>
              <select
                value={form.fuelType}
                onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all cursor-pointer"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>
          <FormInput label="Logistics Hub / Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="Refill Station Name" />
          
          <div className="pt-4 flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all">Cancel</button>
            <button onClick={() => onSave(form)} className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-sm">
              {editData ? "Update Log" : "Create Log"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-600 ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
      />
    </div>
  );
}
