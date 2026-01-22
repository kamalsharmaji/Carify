import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  CheckCircle,
  XCircle,
  History,
  MessageSquare,
  X,
  ClipboardList
} from "lucide-react";
 
/* ================= TYPES ================= */
interface HistoryItem {
  id: number;
  vehicle: string;
  inspectionName: string;
  inspectionDate: string;
  result: "Passed" | "Failed";
  details: string;
  inspector: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "inspection_history";

/* ================= DEFAULT DATA ================= */
const seedData: HistoryItem[] = [
  {
    id: 1,
    vehicle: "Nissan Altima (2147483647)",
    inspectionName: "Post-accident Inspection",
    inspectionDate: "29-10-2024",
    result: "Passed",
    details: "Vehicle passed all safety requirements after repairs.",
    inspector: "David Wilson"
  },
  {
    id: 2,
    vehicle: "Chevrolet Tahoe (1357924680)",
    inspectionName: "Pre-purchase Inspection",
    inspectionDate: "08-05-2024",
    result: "Failed",
    details: "Significant engine wear detected. Transmission fluid leak found.",
    inspector: "Sarah Brown"
  },
  {
    id: 3,
    vehicle: "Ford Mustang (2147483647)",
    inspectionName: "Emissions Inspection",
    inspectionDate: "27-12-2023",
    result: "Failed",
    details: "Emissions levels exceed regulatory standards.",
    inspector: "Michael Davis"
  },
  {
    id: 4,
    vehicle: "Honda Civic (987654321)",
    inspectionName: "Comprehensive Vehicle Inspection",
    inspectionDate: "17-04-2024",
    result: "Passed",
    details: "Excellent condition. All systems operational.",
    inspector: "John Smith"
  },
];

/* ================= MAIN COMPONENT ================= */
export default function InspectionHistory() {
   const [history, setHistory] = useState<HistoryItem[]>(() => {
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
  const [viewItem, setViewItem] = useState<HistoryItem | null>(null);
  const [editItem, setEditItem] = useState<HistoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const remove = (id: number) => {
    if (window.confirm("Delete this history record?")) {
      setHistory((prev) => prev.filter((h) => h.id !== id));
    }
  };

  const saveItem = (data: HistoryItem) => {
    if (editItem) {
      setHistory((prev) => prev.map((h) => (h.id === data.id ? data : h)));
    } else {
      setHistory((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditItem(null);
  };

  const filteredHistory = history.filter(
    (h) =>
      h.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.inspectionName.toLowerCase().includes(searchTerm.toLowerCase())
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
                <History className="text-white w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Inspection <span className="text-brand">History</span>
                  </h1>
                  <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                    LOGS v4.0
                  </span>
                </div>
                <p className="text-slate-500 mt-2 font-semibold text-lg">
                  Vehicle Inspection › Past Audit Logs
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
                  placeholder="Search audit logs..."
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
                  setEditItem(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-brand/20 active:scale-95 group"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                <span>New Record</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {view === "table" ? (
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    {[
                      "NO",
                      "VEHICLE & INSPECTOR",
                      "INSPECTION TYPE",
                      "DATE",
                      "RESULT",
                      "ACTIONS",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredHistory.map((h, idx) => (
                    <tr
                      key={h.id}
                      className="hover:bg-white/80 transition-all group"
                    >
                      <td className="px-10 py-6 font-black text-slate-300">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xl group-hover:rotate-6 transition-transform">
                            {h.vehicle.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-slate-900 text-sm tracking-tight">{h.vehicle}</div>
                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Inspector: {h.inspector || "N/A"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="px-4 py-1.5 bg-slate-100/50 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200/50">
                          {h.inspectionName}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-slate-500 font-black text-[11px] uppercase tracking-widest">
                        {h.inspectionDate}
                      </td>
                      <td className="px-10 py-6">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                          h.result === "Passed" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}>
                          {h.result === "Passed" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          {h.result}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex gap-3">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewItem(h)}
                            icon={<Eye size={18} />}
                          />
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditItem(h);
                              setShowForm(true);
                            }}
                            icon={<Pencil size={18} />}
                          />
                          <ActionBtn 
                            color="red" 
                            onClick={() => remove(h.id)} 
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
            {filteredHistory.map((h) => (
              <div
                key={h.id}
                className="group bg-white/70 backdrop-blur-xl rounded-[40px] p-8 border border-white/50 shadow-2xl shadow-slate-200/50 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                    h.result === "Passed" 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                      : "bg-rose-50 text-rose-600 border-rose-100"
                  }`}>
                    {h.result}
                  </span>
                  <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xl group-hover:rotate-12 transition-transform">
                    {h.vehicle.charAt(0)}
                  </div>
                </div>

                <div className="mb-8 relative z-10">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-brand transition-colors tracking-tight line-clamp-1">
                    {h.vehicle}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black mt-2 uppercase tracking-[0.2em]">
                    <ClipboardList size={14} className="text-brand" />
                    {h.inspectionName}
                  </div>
                </div>

                <div className="space-y-4 py-6 border-y border-slate-100/50">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspector</span>
                    <span className="text-slate-900 font-black text-xs tracking-tight uppercase">{h.inspector}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit Date</span>
                    <span className="text-slate-900 font-black text-xs tracking-tight uppercase">{h.inspectionDate}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setViewItem(h)}
                    className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 active:scale-95"
                  >
                    View Record
                  </button>
                  <button
                    onClick={() => {
                      setEditItem(h);
                      setShowForm(true);
                    }}
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                  >
                    <Pencil size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-2xl rounded-[40px] w-full max-w-2xl shadow-3xl overflow-hidden border border-white/50 animate-in zoom-in duration-500">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-900 rounded-[24px] flex items-center justify-center shadow-2xl rotate-3">
                  <ClipboardList className="text-white w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Audit Insight</h3>
                  <p className="text-brand text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">Inspection Intelligence Profile</p>
                </div>
              </div>
              <button onClick={() => setViewItem(null)} className="h-12 w-12 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-xl transition-all text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-10 space-y-8">
              <div className={`p-8 rounded-[32px] border flex items-center justify-between relative overflow-hidden group ${
                viewItem.result === "Passed" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20"
              }`}>
                <div className="flex items-center gap-6">
                  <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shadow-2xl text-white ${
                    viewItem.result === "Passed" ? "bg-emerald-500 shadow-emerald-500/30" : "bg-rose-500 shadow-rose-500/30"
                  }`}>
                    {viewItem.result === "Passed" ? <CheckCircle size={32} /> : <XCircle size={32} />}
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
                      viewItem.result === "Passed" ? "text-emerald-500" : "text-rose-500"
                    }`}>Evaluation Result</p>
                    <p className={`text-3xl font-black tracking-tight ${
                      viewItem.result === "Passed" ? "text-emerald-700" : "text-rose-700"
                    }`}>{viewItem.result}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Audit Date</p>
                  <p className="text-xl font-black text-slate-900">{viewItem.inspectionDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-[24px]">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Technical Subject</p>
                  <p className="text-xl font-black text-slate-900 tracking-tight">{viewItem.vehicle}</p>
                </div>
                <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-[24px]">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Protocol Lead</p>
                  <p className="text-xl font-black text-slate-900 tracking-tight">{viewItem.inspector}</p>
                </div>
                <div className="col-span-2 p-6 bg-slate-50/50 border border-slate-100 rounded-[24px]">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Inspection Procedure</p>
                  <p className="text-xl font-black text-slate-900 tracking-tight">{viewItem.inspectionName}</p>
                </div>
              </div>

              <div className="p-8 bg-slate-900 rounded-[32px] shadow-2xl shadow-slate-900/20">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <MessageSquare size={14} className="text-brand" />
                  Detailed Assessment Findings
                </p>
                <p className="text-white text-lg font-medium leading-relaxed italic opacity-90">
                  "{viewItem.details}"
                </p>
              </div>

              <button 
                onClick={() => setViewItem(null)} 
                className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-[12px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98]"
              >
                Close Audit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <HistoryForm
          editData={editItem}
          onClose={() => {
            setShowForm(false);
            setEditItem(null);
          }}
          onSave={saveItem}
        />
      )}
    </div>
  );
}

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
    blue: "text-blue-500 bg-blue-50/50 border-blue-100 hover:bg-blue-100 hover:text-blue-600",
    orange: "text-orange-500 bg-orange-50/50 border-orange-100 hover:bg-orange-100 hover:text-orange-600",
    red: "text-rose-500 bg-rose-50/50 border-rose-100 hover:bg-rose-100 hover:text-rose-600",
  };
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all active:scale-90 border shadow-sm ${styles[color]}`}
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="px-10 py-8 bg-slate-900 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5"  ></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 opacity-10 rounded-full blur-2xl"  ></div>
          
          <h3 className="text-2xl font-black text-white relative z-10 tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white relative z-10 active:scale-90 border border-white/10"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>
        <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

function HistoryForm({
  editData,
  onClose,
  onSave,
}: {
  editData: HistoryItem | null;
  onClose: () => void;
  onSave: (data: HistoryItem) => void;
}) {
   const [formData, setFormData] = useState<HistoryItem>(
    editData || {
      id: 0,
      vehicle: "",
      inspectionName: "",
      inspectionDate: new Date().toISOString().split("T")[0],
      result: "Passed",
      details: "",
      inspector: ""
    }
  );

  return (
    <Modal onClose={onClose} title={editData ? "Edit Record" : "Add Record"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vehicle Information</label>
            <input
              required
              type="text"
              placeholder="e.g. Toyota Camry (ABC-123)"
              value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-bold text-slate-900"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inspector Name</label>
            <input
              required
              type="text"
              placeholder="e.g. John Doe"
              value={formData.inspector}
              onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-bold text-slate-900"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inspection Type</label>
            <select
              required
              value={formData.inspectionName}
              onChange={(e) => setFormData({ ...formData, inspectionName: e.target.value })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-bold text-slate-900 appearance-none"
            >
              <option value="">Select Type</option>
              <option value="Post-accident Inspection">Post-accident</option>
              <option value="Pre-purchase Inspection">Pre-purchase</option>
              <option value="Emissions Inspection">Emissions</option>
              <option value="Comprehensive Vehicle Inspection">Comprehensive</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date of Audit</label>
            <input
              required
              type="date"
              value={formData.inspectionDate}
              onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-bold text-slate-900"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inspection Result</label>
            <div className="flex gap-4">
              {["Passed", "Failed"].map((res) => (
                <button
                  key={res}
                  type="button"
                  onClick={() => setFormData({ ...formData, result: res as any })}
                  className={`flex-1 py-4 rounded-xl font-black text-sm transition-all border-2 ${
                    formData.result === res
                      ? res === "Passed" 
                        ? "bg-emerald-50 border-emerald-500 text-emerald-600" 
                        : "bg-rose-50 border-rose-500 text-rose-600"
                      : "bg-white border-slate-100 text-slate-400"
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Findings</label>
            <textarea
              required
              rows={4}
              placeholder="Enter detailed observations..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-bold text-slate-900 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-4 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
           >
            {editData ? "Update Record" : "Save Record"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
