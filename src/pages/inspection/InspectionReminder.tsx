import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  X,
  ChevronRight,
  Bell,
  Calendar,
  MessageSquare,
  Clock,
  AlertCircle
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Inspection <span className="text-indigo-600">Reminders</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">Vehicle Inspection</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Smart Alerts</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search alerts..."
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
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                setEditReminder(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>Set Alert</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <StatCard icon={<Bell className="text-indigo-600" />} label="Active Reminders" value={reminders.length} />
        <StatCard icon={<Clock className="text-amber-600" />} label="Upcoming Tasks" value={reminders.length} />
        <StatCard icon={<AlertCircle className="text-rose-600" />} label="Critical Alerts" value={0} />
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
                      "Vehicle Entity",
                      "Alert Date",
                      "Contextual Message",
                      "Operations",
                    ].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReminders.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base">
                            {r.vehicle.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{r.vehicle}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Asset ID: #{r.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <Calendar size={14} className="text-slate-400" />
                          {r.reminderDate}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium max-w-md italic truncate">
                          <MessageSquare size={14} className="text-slate-300 shrink-0" />
                          {r.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewReminder(r)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setEditReminder(r); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => remove(r.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredReminders.length === 0 && <EmptyState />}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredReminders.map((r) => (
              <div key={r.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                    {r.vehicle.charAt(0)}
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Alert Date</p>
                    <p className="text-xs font-bold text-indigo-600">{r.reminderDate}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2">{r.vehicle}</h3>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-[10px] text-slate-500 italic line-clamp-2 leading-relaxed">"{r.message}"</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setViewReminder(r)} className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all border border-slate-200">
                    PREVIEW
                  </button>
                  <button onClick={() => { setEditReminder(r); setShowForm(true); }} className="flex-1 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold transition-all border border-indigo-100">
                    MODIFY
                  </button>
                  <button onClick={() => remove(r.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- Modals --- */}
      {viewReminder && (
        <Modal onClose={() => setViewReminder(null)} title="Reminder Insight">
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
              <div className="h-24 w-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-500/40 border-4 border-white/10">
                {viewReminder.vehicle.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">{viewReminder.reminderDate}</h2>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm font-medium">{viewReminder.vehicle}</span>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-2">Active Alert Node</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <DetailBox label="Vehicle Designation" value={viewReminder.vehicle} />
              <DetailBox label="Scheduled Date" value={viewReminder.reminderDate} />
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Contextual Message</p>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed italic">"{viewReminder.message}"</p>
              </div>
            </div>
            
            <button
              onClick={() => setViewReminder(null)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Analysis
            </button>
          </div>
        </Modal>
      )}

      {showForm && (
        <ReminderForm
          editData={editReminder}
          onClose={() => { setShowForm(false); setEditReminder(null); }}
          onSave={saveReminder}
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
      className={`p-2 rounded-lg transition-all border border-transparent hover:border-current active:scale-90 ${styles[color]}`}
    >
      {icon}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50">
      <div className="h-20 w-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4 border border-slate-100">
        <Bell className="text-slate-300" size={40} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No alerts found</h3>
      <p className="text-sm text-slate-500">Try adjusting your search or add a new reminder.</p>
    </div>
  );
}

function Modal({ children, onClose, title }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600 shadow-sm border border-transparent hover:border-slate-100">
            <X size={20} />
          </button>
        </div>
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

function DetailBox({ label, value }: any) {
  return (
    <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-indigo-200 transition-colors">
      <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">{label}</p>
      <p className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{value}</p>
    </div>
  );
}

function ReminderForm({ editData, onClose, onSave }: any) {
  const [formData, setFormData] = useState<any>(
    editData || {
      vehicle: "",
      reminderDate: "",
      message: "",
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal onClose={onClose} title={editData ? "Refine Alert" : "Set New Alert"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Vehicle Identification</label>
            <input
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
              value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              placeholder="e.g. BMW X5 (2147483647)"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Reminder Date</label>
            <input
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
              value={formData.reminderDate}
              onChange={(e) => setFormData({ ...formData, reminderDate: e.target.value })}
              placeholder="DD-MM-YYYY"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Alert Message</label>
            <textarea
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold min-h-[120px] resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Enter reminder details..."
            />
          </div>
        </div>
        <button className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] mt-4">
          {editData ? "Sync Alert" : "Deploy Alert"}
        </button>
      </form>
    </Modal>
  );
}
