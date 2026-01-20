import { useState, useEffect } from "react";
import { Plus, Eye, Pencil, Trash2, LayoutGrid, Table as TableIcon, Search } from "lucide-react";

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

const STORAGE_KEY = "fleet_maintenance";

const seedData: Maintenance[] = [
  {
    id: 1,
    vehicleNo: "DL09AB1234",
    serviceType: "Oil Change",
    date: "10-01-2025",
    cost: "₹3,000",
    provider: "Auto Care Center",
    nextDue: "10-04-2025",
    status: "Completed",
  },
];

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

  const filtered = records.filter((r) => r.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-8 bg-red-400 rounded-full"></span>
              Maintenance Records
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Fleet Management › Maintenance Tracking</p>
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

            <button onClick={() => { setEditRecord(null); setShowForm(true); }} className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-400/20 active:scale-95">
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Add Service</span>
            </button>
          </div>
        </div>

        {view === "table" && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["VEHICLE", "SERVICE TYPE", "DATE", "PROVIDER", "COST", "NEXT DUE", "STATUS", "ACTIONS"].map((h) => (
                      <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm border border-red-100 group-hover:scale-110 transition-transform">
                            {r.vehicleNo.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900">{r.vehicleNo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{r.serviceType}</td>
                      <td className="px-6 py-4 font-medium text-slate-600">{r.date}</td>
                      <td className="px-6 py-4 text-slate-600">{r.provider}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{r.cost}</td>
                      <td className="px-6 py-4 text-slate-600">{r.nextDue}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wide">
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1.5">
                          <button onClick={() => setViewRecord(r)} className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => { setEditRecord(r); setShowForm(true); }} className="p-2 rounded-lg text-orange-500 hover:bg-orange-50 hover:text-orange-600">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => remove(r.id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600">
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
            {filtered.map((r) => (
              <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-400 to-red-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-red-400/20">
                    {r.vehicleNo.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{r.vehicleNo}</h3>
                    <p className="text-xs text-slate-500">{r.serviceType}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Provider</span><span className="font-bold text-right">{r.provider}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Date</span><span className="font-bold">{r.date}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Cost</span><span className="font-bold text-red-600">{r.cost}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Next Due</span><span className="font-bold">{r.nextDue}</span></div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewRecord(r)} className="flex-1 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold">View</button>
                  <button onClick={() => { setEditRecord(r); setShowForm(true); }} className="flex-1 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold">Edit</button>
                  <button onClick={() => remove(r.id)} className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewRecord && (
        <Modal onClose={() => setViewRecord(null)} title="Maintenance Details">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
              <div className="h-16 w-16 rounded-2xl bg-red-400 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-red-400/20">
                {viewRecord.vehicleNo.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{viewRecord.vehicleNo}</h2>
                <p className="text-sm text-slate-500">{viewRecord.serviceType}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(viewRecord).map(([k, v]) =>
                k !== "id" && k !== "vehicleNo" && k !== "serviceType" ? (
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
          editData={editRecord}
          onClose={() => { setShowForm(false); setEditRecord(null); }}
          onSave={saveRecord}
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

function FormModal({ editData, onClose, onSave }: { editData: Maintenance | null; onClose: () => void; onSave: (data: Maintenance) => void }) {
  const [form, setForm] = useState<Maintenance>(
    editData || { id: 0, vehicleNo: "", serviceType: "", date: "", cost: "", provider: "", nextDue: "", status: "Completed" }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.vehicleNo.trim()) newErrors.vehicleNo = "Required";
    if (!form.serviceType.trim()) newErrors.serviceType = "Required";
    if (!form.date.trim()) newErrors.date = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) onSave(form);
  };

  return (
    <Modal onClose={onClose} title={editData ? "Edit Service" : "Add Service"}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Vehicle No" value={form.vehicleNo} onChange={(v) => setForm({ ...form, vehicleNo: v })} error={errors.vehicleNo} />
          <FormInput label="Service Type" value={form.serviceType} onChange={(v) => setForm({ ...form, serviceType: v })} error={errors.serviceType} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} error={errors.date} placeholder="DD-MM-YYYY" />
          <FormInput label="Cost" value={form.cost} onChange={(v) => setForm({ ...form, cost: v })} placeholder="₹" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Provider" value={form.provider} onChange={(v) => setForm({ ...form, provider: v })} />
          <FormInput label="Next Due" value={form.nextDue} onChange={(v) => setForm({ ...form, nextDue: v })} placeholder="DD-MM-YYYY" />
        </div>
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
