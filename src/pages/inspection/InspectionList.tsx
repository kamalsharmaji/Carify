import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  ClipboardList,
  X,
  
} from "lucide-react";
 

/* ================= TYPES ================= */
interface InspectionType {
  id: number;
  name: string;
  timePeriod: string;
  notes: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "inspection_list_types";

/* ================= DEFAULT DATA ================= */
const seedData: InspectionType[] = [
  {
    id: 1,
    name: "Post-accident Inspection",
    timePeriod: "24 Hours",
    notes: "This inspection evaluates the extent of damage to a vehicle after an accident, focusing on safety and structural integrity.",
  },
  {
    id: 2,
    name: "Pre-purchase Inspection",
    timePeriod: "12 Hours",
    notes: "This inspection is recommended for potential buyers to assess the vehicle condition, mechanical health, and maintenance history.",
  },
  {
    id: 3,
    name: "Emissions Inspection",
    timePeriod: "9 Hours",
    notes: "This inspection ensures compliance with environmental emissions standards and exhaust system functionality.",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function InspectionList() {
   const [types, setTypes] = useState<InspectionType[]>(() => {
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
  const [viewType, setViewType] = useState<InspectionType | null>(null);
  const [editType, setEditType] = useState<InspectionType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(types));
  }, [types]);

  const remove = (id: number) => {
    if (window.confirm("Delete this inspection type?")) {
      setTypes((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const saveType = (data: InspectionType) => {
    if (editType) {
      setTypes((prev) => prev.map((t) => (t.id === data.id ? data : t)));
    } else {
      setTypes((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditType(null);
  };

  const filteredTypes = types.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen bg-slate-50 animate-in fade-in duration-500"
     >
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Master <span  >Inspection List</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2 text-sm">
              <ClipboardList size={16} className="text-slate-400" />
              Vehicle Inspection › Configuration Hub
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
                placeholder="Search master list..."
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
                setEditType(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 text-white px-8 py-3.5 rounded-xl text-sm font-black transition-all shadow-xl active:scale-95 whitespace-nowrap"
             >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Add Category</span>
            </button>
          </div>
        </div>

        {/* Dynamic List View */}
        {view === "table" ? (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    {[
                      "NO",
                      "CATEGORY NAME",
                      "DURATION",
                      "DESCRIPTION",
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
                  {filteredTypes.map((t, idx) => (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-10 py-6 font-black text-slate-300">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div 
                            className="h-12 w-12 rounded-xl flex items-center justify-center font-black text-lg border group-hover:scale-110 transition-transform shadow-sm"
                           >
                            <ClipboardList size={22} />
                          </div>
                          <span className="font-black text-slate-900 text-base tracking-tight">{t.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                          {t.timePeriod}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <p className="text-sm text-slate-500 font-medium max-w-sm truncate italic">
                          {t.notes}
                        </p>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex gap-2">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewType(t)}
                            icon={<Eye size={18} />}
                          />
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditType(t);
                              setShowForm(true);
                            }}
                            icon={<Pencil size={18} />}
                          />
                          <ActionBtn 
                            color="red" 
                            onClick={() => remove(t.id)} 
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
            {filteredTypes.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-[80px] -mr-8 -mt-8 opacity-5 transition-all group-hover:scale-110"
                 ></div>
                
                <div 
                  className="h-16 w-16 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10 shadow-sm border"
                 >
                  <ClipboardList size={30} />
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                  <h3 className="font-black text-slate-900 group-hover:text-brand transition-colors line-clamp-1 text-xl tracking-tight"  >
                    {t.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">
                      Standard Period: {t.timePeriod}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium line-clamp-3 italic leading-relaxed">
                    {t.notes}
                  </p>
                </div>

                <div className="flex gap-2 mt-auto relative z-10">
                  <button
                    onClick={() => setViewType(t)}
                    className="flex-1 py-4 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-slate-200"
                  >
                    Category Details
                  </button>
                  <button
                    onClick={() => {
                      setEditType(t);
                      setShowForm(true);
                    }}
                    className="p-4 rounded-xl bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all border border-brand/10"
                    
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => remove(t.id)}
                    className="p-4 rounded-xl bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
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
      {viewType && (
        <Modal onClose={() => setViewType(null)} title="Inspection Category Details">
          <div className="space-y-8">
            <div className="relative p-8 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden group">
              <div 
                className="absolute top-0 right-0 w-40 h-40 rounded-bl-[100px] -mr-8 -mt-8 opacity-10 transition-transform group-hover:scale-110"
               ></div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div 
                  className="h-20 w-20 rounded-xl flex items-center justify-center border shadow-2xl"
                 >
                  <ClipboardList size={40} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{viewType.name}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span 
                      className="px-4 py-1.5 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand/20"
                     >
                      {viewType.timePeriod}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Expected Interval</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border border-slate-100 rounded-xl bg-white shadow-inner relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-brand rounded-full"  ></div>
                <p className="text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Compliance Description</p>
              </div>
              <p className="text-slate-600 font-medium text-lg leading-relaxed italic pr-4">
                "{viewType.notes}"
              </p>
              <div className="absolute bottom-6 right-8 opacity-5">
                <ClipboardList size={80} />
              </div>
            </div>

            <button
              onClick={() => setViewType(null)}
              className="w-full py-5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Master Record
            </button>
          </div>
        </Modal>
      )}

      {/* Form Modal */}
      {showForm && (
        <TypeForm
          editData={editType}
          onClose={() => {
            setShowForm(false);
            setEditType(null);
          }}
          onSave={saveType}
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
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brand"  ></div>
          <div 
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-20"
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

function TypeForm({
  editData,
  onClose,
  onSave,
}: {
  editData: InspectionType | null;
  onClose: () => void;
  onSave: (data: InspectionType) => void;
}) {
   const [formData, setFormData] = useState<InspectionType>(
    editData || {
      id: 0,
      name: "",
      timePeriod: "",
      notes: "",
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="px-12 py-10 bg-slate-900 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brand" ></div>
          <div 
            className="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-20"
           ></div>
          
          <div>
            <h3 className="text-3xl font-black text-white relative z-10 tracking-tight uppercase">
              {editData ? "Edit Category" : "New Category"}
            </h3>
            <p className="text-slate-400 text-sm mt-2 relative z-10 font-bold uppercase tracking-widest">Master List Configuration</p>
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
              label="Category Designation"
              value={formData.name}
              onChange={(v) => setFormData({ ...formData, name: v })}
              placeholder="e.g. Strategic Annual Safety Audit"
            />
            <FormInput
              label="Operational Time Window"
              value={formData.timePeriod}
              onChange={(v) => setFormData({ ...formData, timePeriod: v })}
              placeholder="e.g. 72 Hours"
            />
            <div className="space-y-4">
              <div className="flex items-center gap-3 ml-1">
                <div className="w-1.5 h-4 bg-brand rounded-full"  ></div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol Guidelines</label>
              </div>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Detail the procedural scope and compliance requirements..."
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
             >
              {editData ? "Update Category" : "Finalize Category"}
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
        <div className="w-1.5 h-4 bg-brand rounded-full"  ></div>
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
