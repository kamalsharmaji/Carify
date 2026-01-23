import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Users,
  ShieldCheck,
  Clock,
  ChevronRight,
  X,
} from "lucide-react";

/* ================= TYPES ================= */
interface Driver {
  id: number;
  name: string;
  email: string;
  licenceNumber: string;
  licenceType: string;
  workingHour: string;
  licenceExpire: string;
  joinDate: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "fleet_drivers";

/* ================= DEFAULT DATA ================= */
const seedData: Driver[] = [
  {
    id: 1,
    name: "Deepak Sharma",
    email: "deepak.sharma@example.com",
    licenceNumber: "123456",
    licenceType: "Commercial",
    workingHour: "10AM - 6PM",
    licenceExpire: "15-01-2025",
    joinDate: "03-09-2024",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function Driver() {
  /* ---------- STATES ---------- */
  const [drivers, setDrivers] = useState<Driver[]>(() => {
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
  const [viewDriver, setViewDriver] = useState<Driver | null>(null);
  const [editDriver, setEditDriver] = useState<Driver | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  /* ====================================================
     SAVE DATA TO LOCAL STORAGE (AUTO)
     ==================================================== */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drivers));
  }, [drivers]);

  /* ====================================================
     DELETE DRIVER
     ==================================================== */
  const remove = (id: number) => {
    if (window.confirm("Delete this driver?")) {
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    }
  };

  /* ====================================================
     ADD / EDIT DRIVER
     ==================================================== */
  const saveDriver = (data: Driver) => {
    if (editDriver) {
      setDrivers((prev) => prev.map((d) => (d.id === data.id ? data : d)));
    } else {
      setDrivers((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditDriver(null);
  };

  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Driver <span className="text-indigo-600">Personnel</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">Fleet Management</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Personnel Directory</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
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
                <LayoutGrid size={18} data-testid="layout-grid-icon" />
              </button>
            </div>

            <button
              onClick={() => {
                setEditDriver(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>Onboard Driver</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <StatCard icon={<Users className="text-indigo-600" />} label="Total Fleet Personnel" value={drivers.length} />
        <StatCard icon={<ShieldCheck className="text-indigo-600" />} label="Certified & Active" value={drivers.length} />
        <StatCard icon={<Clock className="text-indigo-600" />} label="Expiring Licences" value={0} />
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
                      "Personnel Profile",
                      "Licence Credential",
                      "Duty Classification",
                      "Availability",
                      "Expiry Status",
                      "Operations",
                    ].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDrivers.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base">
                            {d.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {d.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {d.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          {d.licenceNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-semibold uppercase border border-indigo-100">
                          {d.licenceType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-700">{d.workingHour}</span>
                          <span className="text-[10px] text-slate-400 font-medium">Standard Shift</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800">
                            {d.licenceExpire}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Valid Status</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDriver(d)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setEditDriver(d); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => remove(d.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredDrivers.length === 0 && <EmptyState />}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredDrivers.map((d) => (
              <div
                key={d.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                    {d.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {d.name}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">
                      {d.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <CardRow label="Credential ID" value={d.licenceNumber} />
                  <CardRow label="Classification" value={d.licenceType} isBadge />
                  <CardRow label="Shift Hours" value={d.workingHour} />
                  <CardRow label="Contract Exp" value={d.licenceExpire} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewDriver(d)}
                    className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all border border-slate-200"
                  >
                    PREVIEW
                  </button>
                  <button
                    onClick={() => { setEditDriver(d); setShowForm(true); }}
                    className="flex-1 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold transition-all border border-indigo-100"
                  >
                    MODIFY
                  </button>
                  <button
                    onClick={() => remove(d.id)}
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
      {viewDriver && (
        <Modal onClose={() => setViewDriver(null)} title="Personnel Profile Analysis">
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
              <div className="h-24 w-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-500/40 border-4 border-white/10">
                {viewDriver.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">{viewDriver.name}</h2>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm font-medium">{viewDriver.email}</span>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-2">Certified Personnel</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(viewDriver).map(([k, v]) =>
                !["id", "name", "email"].includes(k) ? (
                  <div key={k} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-indigo-200 transition-colors">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">
                      {k.replace(/([A-Z])/g, " $1")}
                    </p>
                    <p className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{v}</p>
                  </div>
                ) : null
              )}
            </div>
            
            <button
              onClick={() => setViewDriver(null)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Analysis
            </button>
          </div>
        </Modal>
      )}

      {showForm && (
        <DriverForm
          editData={editDriver}
          onClose={() => { setShowForm(false); setEditDriver(null); }}
          onSave={saveDriver}
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
    <div className="flex justify-between items-center text-xs">
      <span className="text-slate-500 font-medium uppercase tracking-wider">{label}</span>
      {isBadge ? (
        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-semibold uppercase border border-indigo-100">
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
    <div className="py-20 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50 text-slate-300 mb-4 border border-slate-100">
        <Users size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No Personnel Records</h3>
      <p className="text-slate-500 text-sm max-w-xs mx-auto">Try refining your search or onboard a new driver.</p>
    </div>
  );
}

function Modal({ children, onClose, title }: any) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all" role="dialog">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function DriverForm({ editData, onClose, onSave }: any) {
  const [form, setForm] = useState<Driver>(
    editData || {
      id: 0,
      name: "",
      email: "",
      licenceNumber: "",
      licenceType: "",
      workingHour: "",
      licenceExpire: "",
      joinDate: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    if (!form.licenceNumber.trim()) newErrors.licenceNumber = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) onSave(form);
  };

  return (
    <Modal onClose={onClose} title={editData ? "Edit Personnel Record" : "Register New Personnel"}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Legal Name"
            value={form.name}
            onChange={(v: string) => setForm({ ...form, name: v })}
            error={errors.name}
            placeholder="e.g. Deepak Sharma"
            fullWidth
          />
          <FormInput
            label="Corporate Email"
            value={form.email}
            onChange={(v: string) => setForm({ ...form, email: v })}
            error={errors.email}
            placeholder="deepak@company.com"
            fullWidth
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Licence ID"
            value={form.licenceNumber}
            onChange={(v: string) => setForm({ ...form, licenceNumber: v })}
            error={errors.licenceNumber}
            placeholder="LIC-001"
          />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 ml-1">
              Category
            </label>
            <select
              value={form.licenceType}
              onChange={(e) => setForm({ ...form, licenceType: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all cursor-pointer"
            >
              <option value="">Select Category</option>
              <option value="Commercial">Commercial</option>
              <option value="Private">Private</option>
              <option value="International">International</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Shift Schedule"
            value={form.workingHour}
            onChange={(v: string) => setForm({ ...form, workingHour: v })}
            placeholder="9AM - 6PM"
          />
          <FormInput
            label="Credential Expiry"
            value={form.licenceExpire}
            onChange={(v: string) => setForm({ ...form, licenceExpire: v })}
            placeholder="DD-MM-YYYY"
          />
        </div>

        <FormInput
          label="Registration Date"
          value={form.joinDate}
          onChange={(v: string) => setForm({ ...form, joinDate: v })}
          placeholder="DD-MM-YYYY"
        />

        <div className="pt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
          >
            {editData ? "Update Asset" : "Register Personnel"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function FormInput({ label, value, onChange, error, placeholder, fullWidth }: any) {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "col-span-2" : ""}`}>
      <div className="flex justify-between items-center ml-1">
        <label className="text-xs font-semibold text-slate-600">
          {label}
        </label>
        {error && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{error}</span>}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-slate-50 border ${
          error ? "border-red-300 ring-2 ring-red-500/10" : "border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        } rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-300`}
      />
    </div>
  );
}
