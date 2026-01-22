import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Bell,
  MessageSquare,
  X,
  History,
  Calendar
} from "lucide-react";
 

/* ================= TYPES ================= */
interface Reminder {
  id: number;
  vehicle: string;
  reminderDate: string;
  message: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "inspection_reminders";

/* ================= DEFAULT DATA ================= */
const seedData: Reminder[] = [
  {
    id: 1,
    vehicle: "BMW X5 (2147483647)",
    reminderDate: "27-10-2028",
    message: "Scheduled annual safety check for fleet vehicle. Full diagnostic required.",
  },
  {
    id: 2,
    vehicle: "Chevrolet Tahoe (1357924680)",
    reminderDate: "16-10-2027",
    message: "Quarterly emissions test due. Check exhaust system integrity.",
  },
  {
    id: 3,
    vehicle: "Ford Mustang (2147483647)",
    reminderDate: "19-09-2026",
    message: "Brake system inspection required before high-speed testing phase.",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function InspectionReminder() {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
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
  const [viewReminder, setViewReminder] = useState<Reminder | null>(null);
  const [editReminder, setEditReminder] = useState<Reminder | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  }, [reminders]);

  const remove = (id: number) => {
    if (window.confirm("Delete this reminder?")) {
      setReminders((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const saveReminder = (data: Reminder) => {
    if (editReminder) {
      setReminders((prev) => prev.map((r) => (r.id === data.id ? data : r)));
    } else {
      setReminders((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditReminder(null);
  };

  const filteredReminders = reminders.filter(
    (r) =>
      r.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen bg-[#F1F5F9] p-4 md:p-6 lg:p-10 animate-in fade-in duration-700"
    >
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Cinematic Header Section */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] p-8 md:p-10 shadow-2xl shadow-slate-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center shadow-2xl shadow-slate-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                <Bell className="text-white w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Smart <span className="text-brand">Reminders</span>
                  </h1>
                  <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                    ALERTS v2.0
                  </span>
                </div>
                <p className="text-slate-500 mt-2 font-semibold text-lg">
                  Vehicle Inspection › Alert Notifications
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group flex-1 md:flex-none">
                <Search
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 pr-6 py-4 bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-full md:w-64 shadow-xl shadow-slate-200/50"
                />
              </div>

              <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white shadow-xl">
                <button
                  onClick={() => setView("table")}
                  className={`p-3 rounded-xl transition-all ${
                    view === "table"
                      ? "bg-slate-900 text-white shadow-lg scale-105"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <TableIcon size={20} />
                </button>
                <button
                  onClick={() => setView("card")}
                  className={`p-3 rounded-xl transition-all ${
                    view === "card"
                      ? "bg-slate-900 text-white shadow-lg scale-105"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <LayoutGrid size={20} />
                </button>
              </div>

              <button
                onClick={() => {
                  setEditReminder(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-brand/20 active:scale-95 group"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                <span>Set Alert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic List View */}
        {view === "table" ? (
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    {[
                      "NO",
                      "VEHICLE DESIGNATION",
                      "ALERT DATE",
                      "NOTIFICATION",
                      "ACTIONS",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredReminders.map((r, idx) => (
                    <tr
                      key={r.id}
                      className="hover:bg-white/80 transition-all group"
                    >
                      <td className="px-10 py-8 font-black text-slate-300 text-base">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div 
                            className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-xl group-hover:rotate-6 transition-transform"
                           >
                            <Bell size={24} />
                          </div>
                          <div>
                            <span className="font-black text-slate-900 text-lg tracking-tight block">{r.vehicle}</span>
                            <span className="text-[10px] font-black text-brand uppercase tracking-widest">Alert ID: {r.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest bg-slate-900 px-5 py-2 rounded-xl shadow-lg w-fit">
                          <Calendar size={14} className="text-white" />
                          {r.reminderDate}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4 text-sm text-slate-500 font-semibold max-w-md italic leading-relaxed">
                          <MessageSquare size={18} className="text-slate-300 shrink-0" />
                          {r.message}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex gap-3">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewReminder(r)}
                            icon={<Eye size={20} />}
                          />
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditReminder(r);
                              setShowForm(true);
                            }}
                            icon={<Pencil size={20} />}
                          />
                          <ActionBtn 
                            color="red" 
                            onClick={() => remove(r.id)} 
                            icon={<Trash2 size={20} />}
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
            {filteredReminders.map((r) => (
              <div
                key={r.id}
                className="group bg-white/70 backdrop-blur-xl rounded-[40px] p-8 border border-white/50 shadow-2xl shadow-slate-200/50 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="h-20 w-20 rounded-[30px] bg-slate-900 text-white flex items-center justify-center font-black text-2xl shadow-2xl shadow-slate-900/20 group-hover:rotate-12 transition-transform duration-500">
                    <Bell size={32} />
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                    <p className="text-xs font-black text-white bg-slate-900 px-4 py-1.5 rounded-xl shadow-lg">{r.reminderDate}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Asset</p>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-brand transition-colors tracking-tight line-clamp-1">
                      {r.vehicle}
                    </h3>
                  </div>
                  <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50 group-hover:bg-white group-hover:shadow-inner transition-all">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                      <MessageSquare size={14} className="text-brand" />
                      Alert Context
                    </p>
                    <p className="text-sm text-slate-600 font-semibold line-clamp-3 italic leading-relaxed">"{r.message}"</p>
                  </div>
                </div>

                <div className="flex gap-3 relative z-10">
                  <button
                    onClick={() => setViewReminder(r)}
                    className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 active:scale-95 shadow-xl"
                  >
                    View Alert
                  </button>
                  <button
                    onClick={() => {
                      setEditReminder(r);
                      setShowForm(true);
                    }}
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => remove(r.id)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-brand hover:bg-brand/5 hover:border-brand/10 transition-all active:scale-95 shadow-sm"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {viewReminder && (
        <Modal onClose={() => setViewReminder(null)} title="Reminder Insight">
          <div className="space-y-8">
            <div className="p-8 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 w-40 h-40 rounded-bl-[100px] -mr-8 -mt-8 opacity-10 transition-all group-hover:scale-110"
                style={{ backgroundColor: "#dc2626" }}
              ></div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div 
                  className="h-20 w-20 rounded-xl flex items-center justify-center border shadow-2xl"
                  style={{ backgroundColor: `#dc262610`, color: "#dc2626", borderColor: `#dc262620` }}
                >
                  <Bell size={40} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Target Inspection Date</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{viewReminder.reminderDate}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 border border-slate-100 rounded-xl bg-white shadow-sm relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-6 bg-brand rounded-full" style={{ backgroundColor: "#dc2626" }}></div>
                  <p className="text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Vehicle Entity</p>
                </div>
                <p className="text-xl font-black text-slate-900 tracking-tight group-hover:text-brand transition-colors" style={{ '--tw-group-hover-color': "#dc2626" } as any}>{viewReminder.vehicle}</p>
                <div className="absolute bottom-4 right-8 opacity-[0.03]">
                  <History size={100} />
                </div>
              </div>

              <div className="p-8 border border-slate-100 rounded-xl bg-white shadow-inner relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-6 bg-brand rounded-full" style={{ backgroundColor: "#dc2626" }}></div>
                  <p className="text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Detailed Alert Message</p>
                </div>
                <p className="text-slate-600 font-medium text-lg leading-relaxed italic pr-4">
                  "{viewReminder.message}"
                </p>
                <div className="absolute bottom-6 right-8 opacity-5">
                  <MessageSquare size={60} />
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewReminder(null)}
              className="w-full py-5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98]"
            >
              Acknowledge Alert
            </button>
          </div>
        </Modal>
      )}

      {/* Form Modal */}
      {showForm && (
        <ReminderForm
          editData={editReminder}
          onClose={() => {
            setShowForm(false);
            setEditReminder(null);
          }}
          onSave={saveReminder}
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
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white relative z-10 active:scale-90"
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

function ReminderForm({
  editData,
  onClose,
  onSave,
}: {
  editData: Reminder | null;
  onClose: () => void;
  onSave: (data: Reminder) => void;
}) {
  const [formData, setFormData] = useState<Reminder>(
    editData || {
      id: 0,
      vehicle: "",
      reminderDate: "",
      message: "",
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
              {editData ? "Edit Alert" : "Set Alert"}
            </h3>
            <p className="text-slate-400 text-sm mt-2 relative z-10 font-bold uppercase tracking-widest">Notification Engine</p>
          </div>
          <button
            onClick={onClose}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white relative z-10 active:scale-90"
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
          <div className="grid grid-cols-1 gap-10">
            <FormInput
              label="Target Vehicle Identification"
              value={formData.vehicle}
              onChange={(v) => setFormData({ ...formData, vehicle: v })}
              placeholder="e.g. Tesla Model S (VIN: 4582...)"
            />
            <FormInput
              label="Scheduled Alert Date"
              value={formData.reminderDate}
              onChange={(v) => setFormData({ ...formData, reminderDate: v })}
              placeholder="DD-MM-YYYY"
            />
            <div className="space-y-4">
              <div className="flex items-center gap-3 ml-1">
                <div className="w-1.5 h-4 bg-brand rounded-full" style={{ backgroundColor: "#dc2626" }}></div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Contextual Notification</label>
              </div>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="What should this alert inform the operator about?"
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-slate-700 font-medium min-h-[160px] resize-none shadow-inner"
              />
            </div>
          </div>
          <div className="mt-12 flex gap-5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-5 rounded-xl border-2 border-slate-100 text-slate-400 font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-5 rounded-xl text-white font-black uppercase tracking-widest hover:opacity-90 shadow-2xl transition-all active:scale-[0.98]"
              style={{ backgroundColor: "#dc2626", boxShadow: `0 20px 30px -10px #dc262640` }}
            >
              {editData ? "Update Alert" : "Confirm Alert"}
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-4">
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
        className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-slate-900 font-bold shadow-inner"
      />
    </div>
  );
}
