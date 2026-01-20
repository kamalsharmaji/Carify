import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  MoreVertical,
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
  // Fix: Initialize state directly from localStorage to prevent overwriting on mount
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
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6">
      {/* ================= HEADER ================= */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-8 bg-red-400 rounded-full"></span>
              Manage Drivers
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Fleet Management › Driver Directory
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400 transition-all w-full md:w-64"
              />
            </div>

            <div className="flex border border-slate-200 rounded-xl bg-white p-1">
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-lg transition-all ${
                  view === "table"
                    ? "bg-red-400 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2 rounded-lg transition-all ${
                  view === "card"
                    ? "bg-red-400 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50"
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
              className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-400/20 active:scale-95"
            >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Add Driver</span>
            </button>
          </div>
        </div>

        {/* ================= TABLE VIEW ================= */}
        {view === "table" && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {[
                      "DRIVER INFO",
                      "LICENCE",
                      "TYPE",
                      "HOURS",
                      "EXPIRE",
                      "JOINED",
                      "ACTIONS",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredDrivers.map((d) => (
                    <tr
                      key={d.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold text-sm border border-red-100 uppercase group-hover:scale-110 transition-transform">
                            {d.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">
                              {d.name}
                            </div>
                            <div className="text-xs text-slate-500 font-medium">
                              {d.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {d.licenceNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wide">
                          {d.licenceType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {d.workingHour}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700">
                            {d.licenceExpire}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {d.joinDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1.5">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewDriver(d)}
                          >
                            <Eye size={16} />
                          </ActionBtn>
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditDriver(d);
                              setShowForm(true);
                            }}
                          >
                            <Pencil size={16} />
                          </ActionBtn>
                          <ActionBtn color="red" onClick={() => remove(d.id)}>
                            <Trash2 size={16} />
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredDrivers.length === 0 && (
              <div className="py-20 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                  <Search size={32} />
                </div>
                <p className="text-slate-500 font-medium">No drivers found</p>
              </div>
            )}
          </div>
        )}

        {/* ================= CARD VIEW ================= */}
        {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDrivers.map((d) => (
              <div
                key={d.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-400 to-red-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-red-400/20">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-red-500 transition-colors">
                      {d.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate w-32">
                      {d.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <CardRow label="Licence No" value={d.licenceNumber} />
                  <CardRow label="Type" value={d.licenceType} isBadge />
                  <CardRow label="Hours" value={d.workingHour} />
                  <CardRow label="Expires" value={d.licenceExpire} />
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setViewDriver(d)}
                    className="flex-1 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditDriver(d);
                      setShowForm(true);
                    }}
                    className="flex-1 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 text-xs font-bold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(d.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODALS ================= */}
      {viewDriver && (
        <Modal onClose={() => setViewDriver(null)} title="Driver Details">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
              <div className="h-16 w-16 rounded-2xl bg-red-400 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-red-400/20">
                {viewDriver.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {viewDriver.name}
                </h2>
                <p className="text-sm text-slate-500">{viewDriver.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(viewDriver).map(([k, v]) =>
                k !== "id" && k !== "name" && k !== "email" ? (
                  <div key={k} className="p-3 border border-slate-100 rounded-xl">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">
                      {k.replace(/([A-Z])/g, " $1")}
                    </p>
                    <p className="text-sm font-bold text-slate-700">{v}</p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </Modal>
      )}

      {showForm && (
        <DriverForm
          editData={editDriver}
          onClose={() => {
            setShowForm(false);
            setEditDriver(null);
          }}
          onSave={saveDriver}
        />
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ActionBtn({
  children,
  onClick,
  color,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color: "blue" | "orange" | "red";
}) {
  const styles = {
    blue: "text-blue-500 hover:bg-blue-50 hover:text-blue-600",
    orange: "text-orange-500 hover:bg-orange-50 hover:text-orange-600",
    red: "text-red-500 hover:bg-red-50 hover:text-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all active:scale-90 ${styles[color]}`}
    >
      {children}
    </button>
  );
}

function CardRow({
  label,
  value,
  isBadge,
}: {
  label: string;
  value: string;
  isBadge?: boolean;
}) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-400 font-medium">{label}</span>
      {isBadge ? (
        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-black uppercase">
          {value}
        </span>
      ) : (
        <span className="text-slate-700 font-bold">{value}</span>
      )}
    </div>
  );
}

function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-500"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function DriverForm({
  editData,
  onClose,
  onSave,
}: {
  editData: Driver | null;
  onClose: () => void;
  onSave: (d: Driver) => void;
}) {
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
    if (validate()) {
      onSave(form);
    }
  };

  return (
    <Modal onClose={onClose} title={editData ? "Edit Driver" : "Add New Driver"}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            error={errors.name}
            placeholder="John Doe"
            fullWidth
          />
          <FormInput
            label="Email Address"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            error={errors.email}
            placeholder="john@example.com"
            fullWidth
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Licence Number"
            value={form.licenceNumber}
            onChange={(v) => setForm({ ...form, licenceNumber: v })}
            error={errors.licenceNumber}
            placeholder="LIC-12345"
          />
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
              Licence Type
            </label>
            <select
              value={form.licenceType}
              onChange={(e) => setForm({ ...form, licenceType: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-400/20 focus:border-red-400 outline-none transition-all"
            >
              <option value="">Select Type</option>
              <option value="Commercial">Commercial</option>
              <option value="Private">Private</option>
              <option value="International">International</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Working Hours"
            value={form.workingHour}
            onChange={(v) => setForm({ ...form, workingHour: v })}
            placeholder="e.g. 9AM - 5PM"
          />
          <FormInput
            label="Expiry Date"
            value={form.licenceExpire}
            onChange={(v) => setForm({ ...form, licenceExpire: v })}
            placeholder="DD-MM-YYYY"
          />
        </div>

        <FormInput
          label="Join Date"
          value={form.joinDate}
          onChange={(v) => setForm({ ...form, joinDate: v })}
          placeholder="DD-MM-YYYY"
        />

        <div className="pt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 rounded-2xl bg-red-400 hover:bg-red-500 text-white font-bold transition-all shadow-lg shadow-red-400/20 active:scale-95"
          >
            {editData ? "Update Driver" : "Create Driver"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function FormInput({
  label,
  value,
  onChange,
  error,
  placeholder,
  fullWidth,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "col-span-2" : ""}`}>
      <div className="flex justify-between items-center ml-1">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {label}
        </label>
        {error && <span className="text-[10px] text-red-500 font-bold">{error}</span>}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-slate-50 border ${
          error ? "border-red-300" : "border-slate-200"
        } rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-400/20 focus:border-red-400 outline-none transition-all`}
      />
    </div>
  );
}
