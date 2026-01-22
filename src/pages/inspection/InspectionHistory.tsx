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
      className="min-h-screen bg-slate-50 animate-in fade-in duration-500"
       
    >
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Inspection <span  >History</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <History size={16} />
              Vehicle Inspection › Past Audit Logs
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-full md:w-64 shadow-sm font-medium"
              />
            </div>

            <div className="flex border border-slate-200 rounded-xl bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setView("table")}
                className={`p-2.5 rounded-xl transition-all ${
                  view === "table"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
                
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
                
              >
                <LayoutGrid size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setEditItem(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 text-white px-8 py-3.5 rounded-xl text-sm font-black transition-all shadow-xl active:scale-95 whitespace-nowrap"
             >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">New Record</span>
            </button>
          </div>
        </div>

        {/* List View */}
        {view === "table" ? (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
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
                        className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"
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
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-10 py-6 font-black text-slate-300">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div 
                            className="h-12 w-12 rounded-xl flex items-center justify-center font-black text-lg border border-brand/10 group-hover:scale-110 transition-transform shadow-sm"
                           >
                            <ClipboardList size={22} />
                          </div>
                          <div>
                            <div className="font-black text-slate-900 text-base">{h.vehicle}</div>
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Inspector: {h.inspector || "N/A"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">
                          {h.inspectionName}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-slate-500 font-black text-[11px] uppercase tracking-widest">
                        {h.inspectionDate}
                      </td>
                      <td className="px-10 py-6">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          h.result === "Passed" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}>
                          {h.result === "Passed" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          {h.result}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex gap-2">
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
                className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-[80px] -mr-8 -mt-8 opacity-5 transition-all group-hover:scale-110"
                 ></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    h.result === "Passed" 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                      : "bg-rose-50 text-rose-600 border-rose-100"
                  }`}>
                    {h.result}
                  </span>
                  <History size={20} className="text-slate-200 group-hover:text-brand transition-colors"   />
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                  <h3 className="font-black text-slate-900 group-hover:text-brand transition-colors line-clamp-1 text-lg"  >
                    {h.vehicle}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                      {h.inspector?.charAt(0) || "U"}
                    </div>
                    <p className="text-xs font-bold text-slate-500">{h.inspectionName}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{h.inspectionDate}</p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl mb-8 group-hover:bg-white group-hover:shadow-inner transition-all border border-transparent group-hover:border-slate-100">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                     <MessageSquare size={12} />
                     Inspector Remarks
                   </p>
                   <p className="text-[12px] text-slate-600 line-clamp-2 italic leading-relaxed font-medium">"{h.details}"</p>
                </div>

                <div className="flex gap-2 relative z-10">
                  <button
                    onClick={() => setViewItem(h)}
                    className="flex-1 py-3.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-slate-200"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setEditItem(h);
                      setShowForm(true);
                    }}
                    className="p-3.5 rounded-xl bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all border border-brand/10"
                 
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => remove(h.id)}
                    className="p-3.5 rounded-xl bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewItem && (
        <Modal onClose={() => setViewItem(null)} title="Inspection Record Details">
          <div className="space-y-8">
            <div className={`p-8 rounded-xl border flex items-center justify-between relative overflow-hidden group ${
              viewItem.result === "Passed" ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"
            }`}>
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-8 -mt-8 opacity-10"
                style={{ backgroundColor: viewItem.result === "Passed" ? "#10b981" : "#f43f5e" }}
              ></div>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className={`h-16 w-16 rounded-xl flex items-center justify-center shadow-2xl text-white ${
                  viewItem.result === "Passed" ? "bg-emerald-500 shadow-emerald-500/30" : "bg-rose-500 shadow-rose-500/30"
                }`}>
                  {viewItem.result === "Passed" ? <CheckCircle size={32} /> : <XCircle size={32} />}
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
                    viewItem.result === "Passed" ? "text-emerald-400" : "text-rose-400"
                  }`}>Inspection Status</p>
                  <p className={`text-3xl font-black ${
                    viewItem.result === "Passed" ? "text-emerald-600" : "text-rose-600"
                  }`}>{viewItem.result}</p>
                </div>
              </div>
              <div className="text-right relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Audit Date</p>
                <p className="text-base font-black text-slate-700">{viewItem.inspectionDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 bg-white border border-slate-100 rounded-xl shadow-sm">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-6 bg-brand rounded-full"  ></div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Technical Profile</h4>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Assigned Vehicle</p>
                      <p className="text-lg font-black text-slate-900">{viewItem.vehicle}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Inspector ID</p>
                      <p className="text-lg font-black text-slate-900">{viewItem.inspector || "David Wilson"}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Inspection Protocol</p>
                      <p className="text-lg font-black text-slate-900">{viewItem.inspectionName}</p>
                    </div>
                 </div>
              </div>

              <div className="p-8 border border-slate-100 rounded-xl bg-slate-50/50">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4 flex items-center gap-2">
                  <MessageSquare size={14} />
                  Detailed Assessment
                </p>
                <p className="text-base font-medium text-slate-600 leading-relaxed italic border-l-4 border-brand/20 pl-6 py-2"  >
                  "{viewItem.details}"
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setViewItem(null)}
              className="w-full py-5 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              Close Record
            </button>
          </div>
        </Modal>
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
    blue: "text-blue-500 hover:bg-blue-50 border-transparent hover:border-blue-100",
    orange: "text-orange-500 hover:bg-orange-50 border-transparent hover:border-orange-100",
    red: "text-red-500 hover:bg-red-50 border-transparent hover:border-red-100",
  };
  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-xl transition-all border group ${styles[color]}`}
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
