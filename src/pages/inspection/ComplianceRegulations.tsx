import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  ShieldCheck,
  FileText,
  ArrowUpRight,
  ChevronRight,
  AlertCircle
} from "lucide-react";
 

/* ================= TYPES ================= */
interface Regulation {
  id: number;
  name: string;
  effectiveDate: string;
  description: string;
  status: "Active" | "Draft" | "Archived";
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "inspection_regulations";

/* ================= DEFAULT DATA ================= */
const seedData: Regulation[] = [
  {
    id: 1,
    name: "Anti-Money Laundering (AML)",
    effectiveDate: "21-10-2026",
    description: "Policy and procedures to prevent financial crimes and money laundering activities.",
    status: "Active"
  },
  {
    id: 2,
    name: "Workplace Harassment Policy",
    effectiveDate: "18-06-2026",
    description: "Guidelines for maintaining a professional and safe working environment for all employees.",
    status: "Active"
  },
  {
    id: 3,
    name: "Data Protection Regulation",
    effectiveDate: "26-07-2025",
    description: "Standards for handling sensitive data and ensuring privacy compliance.",
    status: "Active"
  },
  {
    id: 4,
    name: "Occupational Health and Safety",
    effectiveDate: "25-07-2025",
    description: "Safety protocols and health standards for operational tasks.",
    status: "Active"
  },
  {
    id: 5,
    name: "Vehicle Emissions Standard",
    effectiveDate: "20-12-2024",
    description: "Environmental regulations regarding vehicle exhaust and emission levels.",
    status: "Active"
  },
];

/* ================= MAIN COMPONENT ================= */
export default function ComplianceRegulations() {
  
  const [regulations, setRegulations] = useState<Regulation[]>(() => {
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
  const [viewReg, setViewReg] = useState<Regulation | null>(null);
  const [editReg, setEditReg] = useState<Regulation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(regulations));
  }, [regulations]);

  const remove = (id: number) => {
    if (window.confirm("Delete this regulation?")) {
      setRegulations((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const saveReg = (data: Regulation) => {
    if (editReg) {
      setRegulations((prev) => prev.map((r) => (r.id === data.id ? data : r)));
    } else {
      setRegulations((prev) => [...prev, { ...data, id: Date.now(), status: "Active" }]);
    }
    setShowForm(false);
    setEditReg(null);
  };

  const filteredRegs = regulations.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500"
       
    >
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
              <div 
                className="w-3 h-12 rounded-full" 
              
              ></div>
              Compliance <span  >Regulations</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2 ml-7">
              <ShieldCheck size={16} />
              Vehicle Inspection › Regulatory Standards Hub
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
                placeholder="Search regulations..."
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
                    ? "text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
                
              >
                <TableIcon size={20} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2.5 rounded-xl transition-all ${
                  view === "card"
                    ? "text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
                
              >
                <LayoutGrid size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setEditReg(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 text-white px-8 py-3.5 rounded-[20px] text-sm font-black transition-all shadow-xl active:scale-95 whitespace-nowrap"
               >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Add Regulation</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <StatCard label="Total Regulations" value={regulations.length} color="red" icon={<FileText />} />
           <StatCard label="Active Policies" value={regulations.filter(r => r.status === "Active").length} color="#10b981" icon={<ShieldCheck />} />
           <StatCard label="Pending Updates" value={0} color="#f59e0b" icon={<AlertCircle />} />
        </div>

        {/* List View */}
        {view === "table" ? (
          <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50">
                  <tr>
                    {[
                      "NO",
                      "REGULATION & SCOPE",
                      "EFFECTIVE DATE",
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
                  {filteredRegs.map((r, idx) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-10 py-8 font-black text-slate-300">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div 
                            className="h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl border border-brand/10 group-hover:scale-110 transition-transform shadow-sm"
                           >
                            <ShieldCheck size={24} />
                          </div>
                          <div className="max-w-md">
                            <div className="font-black text-slate-900 text-lg leading-tight group-hover:text-brand transition-colors" >
                              {r.name}
                            </div>
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 line-clamp-1">{r.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-[11px] font-black text-slate-600 uppercase tracking-widest border border-slate-200/50">
                           {r.effectiveDate}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          {r.status || "Active"}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex gap-2">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewReg(r)}
                            icon={<Eye size={18} />}
                          />
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditReg(r);
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
            {filteredRegs.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] -mr-12 -mt-12 opacity-5 transition-all group-hover:scale-110"
                  
                ></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div 
                    className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:scale-110"
                   >
                    <FileText size={24} />
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Active
                  </span>
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                  <h3 className="font-black text-slate-900 group-hover:text-brand transition-colors text-xl leading-tight min-h-[56px] line-clamp-2"  >
                    {r.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Effective: {r.effectiveDate}</p>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-[24px] mb-8 group-hover:bg-white group-hover:shadow-inner transition-all border border-transparent group-hover:border-slate-100">
                   <p className="text-[12px] text-slate-600 line-clamp-3 leading-relaxed font-medium italic">
                     "{r.description}"
                   </p>
                </div>

                <div className="flex gap-3 relative z-10">
                  <button
                    onClick={() => setViewReg(r)}
                    className="flex-1 py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowUpRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setEditReg(r);
                      setShowForm(true);
                    }}
                    className="p-4 rounded-2xl bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all border border-brand/10"
                   
                  >
                    <Pencil size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {viewReg && (
        <Modal onClose={() => setViewReg(null)} title="Regulation Policy Detail">
          <div className="space-y-8">
            <div className="p-10 rounded-[40px] border flex flex-col items-center text-center relative overflow-hidden group bg-slate-50 border-slate-100">
              <div 
                className="absolute top-0 right-0 w-48 h-48 rounded-bl-full -mr-16 -mt-16 opacity-5"
               
              ></div>
              
              <div 
                className="h-24 w-24 rounded-[32px] flex items-center justify-center shadow-2xl text-white mb-6 relative z-10"
               >
                <ShieldCheck size={40} />
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 leading-tight mb-2 relative z-10">{viewReg.name}</h2>
              <div className="px-5 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm relative z-10">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Effective Date: </span>
                <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">{viewReg.effectiveDate}</span>
              </div>
            </div>

            <div className="space-y-6">
               <div className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm relative group overflow-hidden">
                 <div className="absolute top-0 left-0 w-1.5 h-full"  ></div>
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                   <FileText size={14}   />
                   Policy Specification
                 </h4>
                 <p className="text-slate-600 font-medium leading-relaxed text-lg">
                   {viewReg.description}
                 </p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-[28px] bg-emerald-50 border border-emerald-100/50">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Status</p>
                    <p className="font-black text-emerald-700">ACTIVE</p>
                  </div>
                  <div className="p-6 rounded-[28px] bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ID</p>
                    <p className="font-black text-slate-700">REG-{viewReg.id}</p>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => setViewReg(null)}
              className="w-full py-5 bg-slate-900 text-white rounded-[28px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Record
            </button>
          </div>
        </Modal>
      )}

      {/* Form Modal */}
      {showForm && (
        <Modal 
          onClose={() => {
            setShowForm(false);
            setEditReg(null);
          }} 
          title={editReg ? "Edit Regulation" : "Create New Regulation"}
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              saveReg({
                id: editReg ? editReg.id : Date.now(),
                name: formData.get("name") as string,
                effectiveDate: formData.get("effectiveDate") as string,
                description: formData.get("description") as string,
                status: "Active"
              });
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Regulation Name</label>
              <input
                name="name"
                defaultValue={editReg?.name}
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:border-brand transition-all font-bold text-slate-700"
                 placeholder="Enter regulation title..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Effective Date</label>
              <input
                name="effectiveDate"
                type="text"
                placeholder="DD-MM-YYYY"
                defaultValue={editReg?.effectiveDate}
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:border-brand transition-all font-bold text-slate-700"
               />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Description</label>
              <textarea
                name="description"
                defaultValue={editReg?.description}
                required
                rows={4}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:border-brand transition-all font-bold text-slate-700 resize-none"
                 placeholder="Describe the scope and requirements of this regulation..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-2 py-4 px-10 text-white rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl active:scale-95"
               >
                {editReg ? "Update Policy" : "Publish Regulation"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatCard({ label, value, color, icon }: { label: string; value: number | string; color: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm group hover:shadow-xl transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          {icon}
        </div>
        <ChevronRight size={18} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
      </div>
      <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
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
    blue: "text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white border-blue-100",
    orange: "text-orange-500 bg-orange-50 hover:bg-orange-500 hover:text-white border-orange-100",
    red: "text-red-500 bg-rose-50 hover:bg-rose-500 hover:text-white border-rose-100",
  };
  
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all border ${styles[color]} active:scale-90 shadow-sm`}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[48px] w-full max-w-2xl overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] transition-all animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 backdrop-blur-sm">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-3 bg-white hover:bg-rose-50 hover:text-rose-500 rounded-2xl transition-all text-slate-400 shadow-sm border border-slate-100 active:scale-90"
          >
            <Plus className="rotate-45" size={20} />
          </button>
        </div>
        <div className="p-10 max-h-[80vh] overflow-y-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
}
