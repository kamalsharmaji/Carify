import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  User,
  Activity
} from "lucide-react";

/* ================= TYPES ================= */
interface Schedule {
  id: number;
  inspectionName: string;
  scheduleDate: string;
  inspector: string;
  status: "Completed" | "Cancelled" | "Scheduled";
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "inspection_schedules";

/* ================= DEFAULT DATA ================= */
const seedData: Schedule[] = [
  {
    id: 1,
    inspectionName: "Post-accident Inspection",
    scheduleDate: "21-08-2026",
    inspector: "David Wilson",
    status: "Completed",
  },
  {
    id: 2,
    inspectionName: "Pre-purchase Inspection",
    scheduleDate: "24-07-2024",
    inspector: "Sarah Brown",
    status: "Completed",
  },
  {
    id: 3,
    inspectionName: "Emissions Inspection",
    scheduleDate: "15-04-2025",
    inspector: "Michael Davis",
    status: "Cancelled",
  },
  {
    id: 4,
    inspectionName: "Basic Vehicle Inspection",
    scheduleDate: "12-12-2025",
    inspector: "John Smith",
    status: "Scheduled",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function InspectionSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>(() => {
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
  const [viewSchedule, setViewSchedule] = useState<Schedule | null>(null);
  const [editSchedule, setEditSchedule] = useState<Schedule | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  }, [schedules]);

  const remove = (id: number) => {
    if (window.confirm("Delete this schedule?")) {
      setSchedules((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const saveSchedule = (data: Schedule) => {
    if (editSchedule) {
      setSchedules((prev) => prev.map((s) => (s.id === data.id ? data : s)));
    } else {
      setSchedules((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditSchedule(null);
  };

  const filteredSchedules = schedules.filter(
    (s) =>
      s.inspectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.inspector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Cancelled":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-sky-50 text-sky-600 border-sky-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Operational <span style={{ color: "#dc2626" }}>Schedule</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-slate-400" />
              Vehicle Inspection › Resource Planning
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search schedule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-[20px] text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-full md:w-64 shadow-sm font-medium"
              />
            </div>

            <div className="flex border border-slate-200 rounded-[20px] bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setView("table")}
                className={`p-2.5 rounded-xl transition-all ${
                  view === "table"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
                style={{ backgroundColor: view === "table" ? "#dc2626" : undefined }}
              >
                <TableIcon size={20} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2.5 rounded-xl transition-all ${
                  view === "card"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
                style={{ backgroundColor: view === "card" ? "#dc2626" : undefined }}
              >
                <LayoutGrid size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setEditSchedule(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 text-white px-8 py-3.5 rounded-[20px] text-sm font-black transition-all shadow-xl active:scale-95 whitespace-nowrap"
              style={{ backgroundColor: "#dc2626", boxShadow: `0 10px 25px -5px #dc262640` }}
            >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">New Booking</span>
            </button>
          </div>
        </div>

        {/* Dynamic View */}
        {view === "table" ? (
          <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    {[
                      "NO",
                      "INSPECTION TYPE",
                      "DATE & TIME",
                      "ASSIGNED INSPECTOR",
                      "STATUS",
                      "ACTIONS",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredSchedules.map((s, idx) => (
                    <tr
                      key={s.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-10 py-6 font-black text-slate-300">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div 
                            className="h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg border group-hover:scale-110 transition-transform shadow-sm"
                            style={{ backgroundColor: "#dc262610", color: "#dc2626", borderColor: "#dc262620" }}
                          >
                            <Activity size={22} />
                          </div>
                          <span className="font-black text-slate-900 text-base tracking-tight">{s.inspectionName}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 text-slate-500 font-black text-[11px] uppercase tracking-widest bg-slate-100/50 px-4 py-2 rounded-xl border border-slate-200/50 w-fit">
                          <Calendar size={14} className="text-slate-400" />
                          {s.scheduleDate}
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                            {s.inspector.charAt(0)}
                          </div>
                          <span className="font-black text-slate-700 text-sm tracking-tight">{s.inspector}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusBadge(s.status)}`}>
                          {s.status === "Completed" ? <CheckCircle2 size={12} /> : s.status === "Cancelled" ? <XCircle size={12} /> : <Clock size={12} />}
                          {s.status}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex gap-2">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewSchedule(s)}
                            icon={<Eye size={18} />}
                          />
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditSchedule(s);
                              setShowForm(true);
                            }}
                            icon={<Pencil size={18} />}
                          />
                          <ActionBtn 
                            color="red" 
                            onClick={() => remove(s.id)} 
                            icon={<Trash2 size={18} />}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSchedules.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-[80px] -mr-8 -mt-8 opacity-5 transition-all group-hover:scale-110"
                  style={{ backgroundColor: "#dc2626" }}
                ></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusBadge(s.status)}`}>
                    {s.status}
                  </span>
                  <Calendar size={20} className="text-slate-200 group-hover:text-brand transition-colors" style={{ '--tw-group-hover-text': "#dc2626" } as any} />
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                  <h3 className="font-black text-slate-900 group-hover:text-brand transition-colors line-clamp-1 text-lg tracking-tight" style={{ '--tw-group-hover-text': "#dc2626" } as any}>
                    {s.inspectionName}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 pt-6 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Inspection Date</p>
                      <p className="text-xs font-bold text-slate-600 tracking-tight italic">{s.scheduleDate}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Inspector</p>
                      <p className="text-xs font-black text-slate-900 tracking-tight">{s.inspector}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 relative z-10">
                  <button
                    onClick={() => setViewSchedule(s)}
                    className="flex-1 py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-slate-200"
                  >
                    View Card
                  </button>
                  <button
                    onClick={() => {
                      setEditSchedule(s);
                      setShowForm(true);
                    }}
                    className="p-4 rounded-2xl bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all border border-brand/10"
                    style={{ '--tw-hover-bg': "#dc2626" } as any}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => remove(s.id)}
                    className="p-4 rounded-2xl bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {viewSchedule && (
        <Modal onClose={() => setViewSchedule(null)} title="Schedule Details">
          <div className="space-y-8">
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-between relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 w-40 h-40 rounded-bl-[100px] -mr-8 -mt-8 opacity-10 transition-all group-hover:scale-110"
                style={{ backgroundColor: "#dc2626" }}
              ></div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div 
                  className="h-16 w-16 rounded-[20px] flex items-center justify-center font-black text-lg border bg-white shadow-xl"
                  style={{ color: "#dc2626", borderColor: "#dc262620" }}
                >
                  <Calendar size={32} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Execution Date</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{viewSchedule.scheduleDate}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border relative z-10 ${getStatusBadge(viewSchedule.status)}`}>
                {viewSchedule.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 border border-slate-100 rounded-[32px] bg-white shadow-sm md:col-span-2">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">Inspection Type</p>
                <p className="text-xl font-black text-slate-900 tracking-tight" style={{ color: "#dc2626" }}>{viewSchedule.inspectionName}</p>
              </div>
              <div className="p-8 border border-slate-100 rounded-[32px] bg-white shadow-sm md:col-span-2 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Assigned Specialist</p>
                  <p className="text-base font-black text-slate-700 tracking-tight">{viewSchedule.inspector}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                  <User size={24} />
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewSchedule(null)}
              className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Schedule Record
            </button>
          </div>
        </Modal>
      )}

      {/* Form Modal */}
      {showForm && (
        <ScheduleForm
          editData={editSchedule}
          onClose={() => {
            setShowForm(false);
            setEditSchedule(null);
          }}
          onSave={saveSchedule}
        />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function ActionBtn({
  icon,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  color: "blue" | "orange" | "red";
}) {
  const styles = {
    blue: "text-blue-500 hover:bg-blue-50 border-blue-100",
    orange: "text-orange-500 hover:bg-orange-50 border-orange-100",
    red: "text-rose-500 hover:bg-rose-50 border-rose-100",
  };
  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-xl transition-all border border-transparent hover:border-current active:scale-90 ${styles[color]}`}
    >
      {icon}
    </button>
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="px-10 py-8 bg-slate-900 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brand" style={{ backgroundColor: "#dc2626" }}></div>
          <div 
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "#dc2626" }}
          ></div>
          
          <h3 className="text-2xl font-black text-white relative z-10 tracking-tight uppercase tracking-[0.05em]">{title}</h3>
          <button
            onClick={onClose}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-white relative z-10 active:scale-90"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        <div className="p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

function ScheduleForm({
  editData,
  onClose,
  onSave,
}: {
  editData: Schedule | null;
  onClose: () => void;
  onSave: (data: Schedule) => void;
}) {
  const [formData, setFormData] = useState<Schedule>(
    editData || {
      id: 0,
      inspectionName: "",
      scheduleDate: "",
      inspector: "",
      status: "Scheduled",
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="px-12 py-10 bg-slate-900 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brand" style={{ backgroundColor: "#dc2626" }}></div>
          <div 
            className="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "#dc2626" }}
          ></div>
          
          <div>
            <h3 className="text-3xl font-black text-white relative z-10 tracking-tight uppercase">
              {editData ? "Update Slot" : "Book Slot"}
            </h3>
            <p className="text-slate-400 text-sm mt-2 relative z-10 font-bold uppercase tracking-widest">Calendar Scheduling Engine</p>
          </div>
          <button
            onClick={onClose}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-white relative z-10 active:scale-90"
          >
            <X size={28} strokeWidth={3} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormInput
              label="Inspection Category"
              value={formData.inspectionName}
              onChange={(v) => setFormData({ ...formData, inspectionName: v })}
              placeholder="e.g. Structural Integrity Audit"
              colSpan={2}
            />
            <FormInput
              label="Operational Date"
              value={formData.scheduleDate}
              onChange={(v) => setFormData({ ...formData, scheduleDate: v })}
              placeholder="DD-MM-YYYY"
            />
            <FormInput
              label="Assigned Specialist"
              value={formData.inspector}
              onChange={(v) => setFormData({ ...formData, inspector: v })}
              placeholder="Inspector Name"
            />
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3 ml-1">
                <div className="w-1.5 h-4 bg-brand rounded-full" style={{ backgroundColor: "#dc2626" }}></div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Initial Status</label>
              </div>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-slate-900 font-bold shadow-inner appearance-none"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="mt-12 flex gap-5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-5 rounded-[24px] border-2 border-slate-100 text-slate-400 font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-5 rounded-[24px] text-white font-black uppercase tracking-widest hover:opacity-90 shadow-2xl transition-all active:scale-[0.98]"
              style={{ backgroundColor: "#dc2626", boxShadow: `0 20px 30px -10px #dc262640` }}
            >
              {editData ? "Confirm Update" : "Finalize Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  colSpan = 1
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  colSpan?: number;
}) {
  return (
    <div className={`space-y-4 ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
      <div className="flex items-center gap-3 ml-1">
        <div className="w-1.5 h-4 bg-brand rounded-full" style={{ backgroundColor: "#dc2626" }}></div>
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
          {label}
        </label>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-slate-900 font-bold shadow-inner"
      />
    </div>
  );
}
