import { useState, useEffect } from "react";
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

const STORAGE_KEY = "fleet_logbook";

const seedData: LogEntry[] = [
  {
    id: 1,
    vehicleNo: "DL09AB1234",
    driver: "Amit Kumar",
    date: "15-01-2025",
    startKm: "45200",
    endKm: "45520",
    totalKm: "320",
    purpose: "Client Visit",
    status: "Completed",
  },
];

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
    if (window.confirm("Delete this log entry?")) {
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

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-8 bg-red-400 rounded-full"></span>
              Vehicle Log Book
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Fleet Management › Log Book Entries
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
                placeholder="Search logs..."
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
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                setEditLog(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-400/20 active:scale-95"
            >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Add Entry</span>
            </button>
          </div>
        </div>

        {view === "table" && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {[
                      "VEHICLE",
                      "DRIVER",
                      "DATE",
                      "START KM",
                      "END KM",
                      "TOTAL KM",
                      "PURPOSE",
                      "STATUS",
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
                  {filteredLogs.map((l) => (
                    <tr
                      key={l.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold text-sm border border-red-100 uppercase group-hover:scale-110 transition-transform">
                            {l.vehicleNo.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900">
                            {l.vehicleNo}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {l.driver}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {l.date}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-600">
                        {l.startKm}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-600">
                        {l.endKm}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {l.totalKm} km
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {l.purpose}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-wide">
                          {l.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1.5">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewLog(l)}
                          >
                            <Eye size={16} />
                          </ActionBtn>
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditLog(l);
                              setShowForm(true);
                            }}
                          >
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
            {filteredLogs.length === 0 && (
              <div className="py-20 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                  <Search size={32} />
                </div>
                <p className="text-slate-500 font-medium">No log entries found</p>
              </div>
            )}
          </div>
        )}

        {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLogs.map((l) => (
              <div
                key={l.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-400 to-red-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-red-400/20">
                    {l.vehicleNo.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      {l.vehicleNo}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {l.driver}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <CardRow label="Date" value={l.date} />
                  <CardRow label="Total KM" value={`${l.totalKm} km`} />
                  <CardRow label="Purpose" value={l.purpose} />
                  <CardRow label="Status" value={l.status} isBadge />
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setViewLog(l)}
                    className="flex-1 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditLog(l);
                      setShowForm(true);
                    }}
                    className="flex-1 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(l.id)}
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

      {viewLog && (
        <Modal onClose={() => setViewLog(null)} title="Log Entry Details">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
              <div className="h-16 w-16 rounded-2xl bg-red-400 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-red-400/20">
                {viewLog.vehicleNo.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {viewLog.vehicleNo}
                </h2>
                <p className="text-sm text-slate-500">{viewLog.driver}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(viewLog).map(([k, v]) =>
                k !== "id" && k !== "vehicleNo" && k !== "driver" ? (
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
        <LogForm
          editData={editLog}
          onClose={() => {
            setShowForm(false);
            setEditLog(null);
          }}
          onSave={saveLog}
        />
      )}
    </div>
  );
}

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

function LogForm({
  editData,
  onClose,
  onSave,
}: {
  editData: LogEntry | null;
  onClose: () => void;
  onSave: (l: LogEntry) => void;
}) {
  const [form, setForm] = useState<LogEntry>(
    editData || {
      id: 0,
      vehicleNo: "",
      driver: "",
      date: "",
      startKm: "",
      endKm: "",
      totalKm: "",
      purpose: "",
      status: "Completed",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.vehicleNo.trim()) newErrors.vehicleNo = "Required";
    if (!form.driver.trim()) newErrors.driver = "Required";
    if (!form.date.trim()) newErrors.date = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      const totalKm = (
        parseInt(form.endKm || "0") - parseInt(form.startKm || "0")
      ).toString();
      onSave({ ...form, totalKm });
    }
  };

  return (
    <Modal onClose={onClose} title={editData ? "Edit Log Entry" : "Add Log Entry"}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Vehicle No"
            value={form.vehicleNo}
            onChange={(v) => setForm({ ...form, vehicleNo: v })}
            error={errors.vehicleNo}
            placeholder="DL09AB1234"
          />
          <FormInput
            label="Driver Name"
            value={form.driver}
            onChange={(v) => setForm({ ...form, driver: v })}
            error={errors.driver}
            placeholder="John Doe"
          />
        </div>

        <FormInput
          label="Date"
          value={form.date}
          onChange={(v) => setForm({ ...form, date: v })}
          error={errors.date}
          placeholder="DD-MM-YYYY"
          fullWidth
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Start KM"
            value={form.startKm}
            onChange={(v) => setForm({ ...form, startKm: v })}
            placeholder="45200"
          />
          <FormInput
            label="End KM"
            value={form.endKm}
            onChange={(v) => setForm({ ...form, endKm: v })}
            placeholder="45520"
          />
        </div>

        <FormInput
          label="Purpose"
          value={form.purpose}
          onChange={(v) => setForm({ ...form, purpose: v })}
          placeholder="e.g. Client Visit"
          fullWidth
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
            {editData ? "Update Entry" : "Create Entry"}
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
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
        {label} {error && <span className="text-red-400">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-slate-50 border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-400/20 focus:border-red-400 outline-none transition-all ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      />
      {error && <p className="text-[10px] text-red-500 font-medium ml-1">{error}</p>}
    </div>
  );
}
