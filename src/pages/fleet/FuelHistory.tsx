import { useState, useEffect } from "react";
import { Plus, Eye, Pencil, Trash2, LayoutGrid, Table as TableIcon, Search } from "lucide-react";

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

const STORAGE_KEY = "fleet_fuel_history";

const seedData: FuelEntry[] = [
  {
    id: 1,
    vehicleNo: "DL09AB1234",
    date: "14-01-2025",
    quantity: "45 L",
    cost: "₹5,400",
    odometer: "45200",
    fuelType: "Diesel",
    location: "Fuel Station ABC",
  },
];

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
    if (window.confirm("Delete this fuel entry?")) {
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

  const filtered = entries.filter((e) => e.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-8 bg-red-400 rounded-full"></span>
              Fuel History
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Fleet Management › Fuel Tracking</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-400 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400 transition-all w-full md:w-64"
              />
            </div>

            <div className="flex border border-slate-200 rounded-xl bg-white p-1">
              <button onClick={() => setView("table")} className={`p-2 rounded-lg transition-all ${view === "table" ? "bg-red-400 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>
                <TableIcon size={18} />
              </button>
              <button onClick={() => setView("card")} className={`p-2 rounded-lg transition-all ${view === "card" ? "bg-red-400 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>
                <LayoutGrid size={18} />
              </button>
            </div>

            <button onClick={() => { setEditEntry(null); setShowForm(true); }} className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-400/20 active:scale-95">
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Add Entry</span>
            </button>
          </div>
        </div>

        {view === "table" && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["VEHICLE", "DATE", "QUANTITY", "COST", "ODOMETER", "FUEL TYPE", "LOCATION", "ACTIONS"].map((h) => (
                      <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm border border-red-100 group-hover:scale-110 transition-transform">
                            {e.vehicleNo.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900">{e.vehicleNo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{e.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{e.quantity}</td>
                      <td className="px-6 py-4 font-bold text-green-600">{e.cost}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{e.odometer}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-wide">
                          {e.fuelType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{e.location}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1.5">
                          <button onClick={() => setViewEntry(e)} className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => { setEditEntry(e); setShowForm(true); }} className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => remove(e.id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600">
                            <Trash2 size={16} />
                          </button>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((e) => (
              <div key={e.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-400 to-red-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-red-400/20">
                    {e.vehicleNo.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{e.vehicleNo}</h3>
                    <p className="text-xs text-slate-500">{e.date}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Quantity</span><span className="font-bold">{e.quantity}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Cost</span><span className="font-bold text-green-600">{e.cost}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Odometer</span><span className="font-bold font-mono">{e.odometer}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Fuel Type</span><span className="font-bold">{e.fuelType}</span></div>
                  <div className="text-slate-600 text-xs mt-2">📍 {e.location}</div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewEntry(e)} className="flex-1 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold">View</button>
                  <button onClick={() => { setEditEntry(e); setShowForm(true); }} className="flex-1 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold">Edit</button>
                  <button onClick={() => remove(e.id)} className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewEntry && (
        <Modal onClose={() => setViewEntry(null)} title="Fuel Entry Details">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
              <div className="h-16 w-16 rounded-2xl bg-red-400 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-red-400/20">
                {viewEntry.vehicleNo.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{viewEntry.vehicleNo}</h2>
                <p className="text-sm text-slate-500">{viewEntry.date}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(viewEntry).map(([k, v]) =>
                k !== "id" && k !== "vehicleNo" ? (
                  <div key={k} className="p-3 border border-slate-100 rounded-xl">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">{k.replace(/([A-Z])/g, " $1")}</p>
                    <p className="text-sm font-bold text-slate-700">{v}</p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </Modal>
      )}

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

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-tight">{title}</h3>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-500">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function FormModal({ editData, onClose, onSave }: { editData: FuelEntry | null; onClose: () => void; onSave: (data: FuelEntry) => void }) {
  const [form, setForm] = useState<FuelEntry>(
    editData || { id: 0, vehicleNo: "", date: "", quantity: "", cost: "", odometer: "", fuelType: "Diesel", location: "" }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.vehicleNo.trim()) newErrors.vehicleNo = "Required";
    if (!form.date.trim()) newErrors.date = "Required";
    if (!form.quantity.trim()) newErrors.quantity = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) onSave(form);
  };

  return (
    <Modal onClose={onClose} title={editData ? "Edit Entry" : "Add Entry"}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Vehicle No" value={form.vehicleNo} onChange={(v) => setForm({ ...form, vehicleNo: v })} error={errors.vehicleNo} />
          <FormInput label="Date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} error={errors.date} placeholder="DD-MM-YYYY" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Quantity" value={form.quantity} onChange={(v) => setForm({ ...form, quantity: v })} error={errors.quantity} placeholder="45 L" />
          <FormInput label="Cost" value={form.cost} onChange={(v) => setForm({ ...form, cost: v })} placeholder="₹" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Odometer" value={form.odometer} onChange={(v) => setForm({ ...form, odometer: v })} placeholder="45200" />
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Fuel Type</label>
            <select value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-400/20 focus:border-red-400 outline-none">
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>
        <FormInput label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="Fuel Station Name" fullWidth />
        <div className="pt-6 flex gap-3">
          <button onClick={onClose} className="flex-1 px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
          <button onClick={handleSave} className="flex-1 px-6 py-3 rounded-2xl bg-red-400 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-400/20">{editData ? "Update" : "Create"}</button>
        </div>
      </div>
    </Modal>
  );
}

function FormInput({ label, value, onChange, error, placeholder, fullWidth }: { label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; fullWidth?: boolean }) {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "col-span-2" : ""}`}>
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">{label} {error && <span className="text-red-400">*</span>}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`w-full bg-slate-50 border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-400/20 focus:border-red-400 outline-none ${error ? "border-red-300" : "border-slate-200"}`} />
      {error && <p className="text-[10px] text-red-500 font-medium ml-1">{error}</p>}
    </div>
  );
}
