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
      className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500 p-4 md:p-8"
    >
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Smart <span style={{ color: "#dc2626" }}>Reminders</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2 text-sm">
              <Bell size={16} className="text-slate-400" />
              Vehicle Inspection › Alert Notifications
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
                placeholder="Search alerts..."
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
                setEditReminder(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 text-white px-8 py-3.5 rounded-[20px] text-sm font-black transition-all shadow-xl active:scale-95 whitespace-nowrap"
              style={{ backgroundColor: "#dc2626", boxShadow: `0 10px 25px -5px #dc262640` }}
            >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Set Alert</span>
            </button>
          </div>
        </div>

        {/* List View */}
        {view === "table" ? (
          <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    {[
                      "NO",
                      "VEHICLE DESIGNATION",
                      "ALERT DATE",
                      "NOTIFICATION",
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
                  {filteredReminders.map((r, idx) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-10 py-6 font-black text-slate-300">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div 
                            className="h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg border group-hover:scale-110 transition-transform shadow-sm"
                            style={{ backgroundColor: `#dc262610`, color: "#dc2626", borderColor: `#dc262620` }}
                          >
                            <Bell size={22} />
                          </div>
                          <span className="font-black text-slate-900 text-base tracking-tight">{r.vehicle}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 text-slate-500 font-black text-[11px] uppercase tracking-widest bg-slate-100/50 px-4 py-2 rounded-xl border border-slate-200/50 w-fit">
                          <Calendar size={14} className="text-slate-400" />
                          {r.reminderDate}
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3 text-sm text-slate-500 font-medium max-w-md truncate italic leading-relaxed">
                          <MessageSquare size={16} className="text-slate-300 shrink-0" />
                          {r.message}
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex gap-2">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewReminder(r)}
                            icon={<Eye size={18} />}
                          />
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditReminder(r);
                              setShowForm(true);
                            }}
                            icon={<Pencil size={18} />}
                          />
                          <ActionBtn 
                            color="red" 
                            onClick={() => remove(r.id)} 
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
            {filteredReminders.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-[80px] -mr-8 -mt-8 opacity-5 transition-all group-hover:scale-110"
                  style={{ backgroundColor: "#dc2626" }}
                ></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div 
                    className="h-14 w-14 rounded-[20px] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border"
                    style={{ backgroundColor: `#dc262610`, color: "#dc2626", borderColor: `#dc262620` }}
                  >
                    <Bell size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                    <p className="text-sm font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{r.reminderDate}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Target Asset</p>
                    <h3 className="font-black text-slate-900 group-hover:text-brand transition-colors line-clamp-1 text-lg tracking-tight" style={{ '--tw-group-hover-text': "#dc2626" } as any}>
                      {r.vehicle}
                    </h3>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-[24px] border border-transparent group-hover:border-slate-100 transition-all">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <MessageSquare size={12} />
                      Alert Context
                    </p>
                    <p className="text-xs text-slate-600 font-medium line-clamp-3 italic leading-relaxed">"{r.message}"</p>
                  </div>
                </div>

                <div className="flex gap-2 relative z-10">
                  <button
                    onClick={() => setViewReminder(r)}
                    className="flex-1 py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-slate-200"
                  >
                    View Alert
                  </button>
                  <button
                    onClick={() => {
                      setEditReminder(r);
                      setShowForm(true);
                    }}
                    className="p-4 rounded-2xl bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all border border-brand/10"
                    style={{ '--tw-hover-bg': "#dc2626" } as any}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => remove(r.id)}
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
      {viewReminder && (
        <Modal onClose={() => setViewReminder(null)} title="Reminder Insight">
          <div className="space-y-8">
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-between relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 w-40 h-40 rounded-bl-[100px] -mr-8 -mt-8 opacity-10 transition-all group-hover:scale-110"
                style={{ backgroundColor: "#dc2626" }}
              ></div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div 
                  className="h-20 w-20 rounded-[28px] flex items-center justify-center border shadow-2xl"
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
              <div className="p-8 border border-slate-100 rounded-[32px] bg-white shadow-sm relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-6 bg-brand rounded-full" style={{ backgroundColor: "#dc2626" }}></div>
                  <p className="text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Vehicle Entity</p>
                </div>
                <p className="text-xl font-black text-slate-900 tracking-tight group-hover:text-brand transition-colors" style={{ '--tw-group-hover-color': "#dc2626" } as any}>{viewReminder.vehicle}</p>
                <div className="absolute bottom-4 right-8 opacity-[0.03]">
                  <History size={100} />
                </div>
              </div>

              <div className="p-8 border border-slate-100 rounded-[32px] bg-white shadow-inner relative">
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
              className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98]"
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
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-slate-700 font-medium min-h-[160px] resize-none shadow-inner"
              />
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
        className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-slate-900 font-bold shadow-inner"
      />
    </div>
  );
}
