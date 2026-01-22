import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  User,
  ShieldCheck,
  ClipboardList
} from "lucide-react";
 

/* ================= TYPES ================= */
interface InspectionRequest {
  id: number;
  requestId: string;
  inspectorName: string;
  vehicle: string;
  createdAt: string;
  assignStaff: string;
  status: "Pending" | "In Progress" | "Completed";
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "inspection_requests";

/* ================= DEFAULT DATA ================= */
const seedData: InspectionRequest[] = [
  {
    id: 1,
    requestId: "#IREQ00007",
    inspectorName: "Kevin Lee",
    vehicle: "Volkswagen Jetta (2147483647)",
    createdAt: "09-09-2024",
    assignStaff: "Deepak Sharma",
    status: "Pending",
  },
  {
    id: 2,
    requestId: "#IREQ00006",
    inspectorName: "Jennifer White",
    vehicle: "BMW X5 (2147483647)",
    createdAt: "01-09-2024",
    assignStaff: "Kevin Brown",
    status: "In Progress",
  },
  {
    id: 3,
    requestId: "#IREQ00003",
    inspectorName: "Michael Davis",
    vehicle: "Ford Mustang (2147483647)",
    createdAt: "13-08-2024",
    assignStaff: "Chloe Humphrey",
    status: "Completed",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function InspectionRequest() {
  const [requests, setRequests] = useState<InspectionRequest[]>(() => {
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
  const [viewRequest, setViewRequest] = useState<InspectionRequest | null>(null);
  const [editRequest, setEditRequest] = useState<InspectionRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  const remove = (id: number) => {
    if (window.confirm("Delete this request?")) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const saveRequest = (data: InspectionRequest) => {
    if (editRequest) {
      setRequests((prev) => prev.map((r) => (r.id === data.id ? data : r)));
    } else {
      setRequests((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditRequest(null);
  };

  const filteredRequests = requests.filter(
    (r) =>
      r.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.inspectorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "In Progress":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-rose-50 text-rose-600 border-rose-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] animate-in fade-in duration-500 p-6 md:p-12">
      <div className="max-w-[1600px] mx-auto space-y-12">
        
        {/* Cinematic Header */}
        <div className="bg-white/60 backdrop-blur-2xl p-10 md:p-14 rounded-[40px] border border-white/50 shadow-2xl shadow-slate-200/50 flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 relative z-10">
            <div className="bg-slate-900 p-8 rounded-[32px] shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 group">
              <ShieldCheck className="text-white w-12 h-12 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full">
                  Inspection Engine
                </span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  v2.0 Core
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
                Inspection <span className="text-brand" style={{ color: "#dc2626" }}>Requests</span>
              </h1>
              <p className="text-slate-500 mt-6 font-bold flex items-center gap-3 text-sm uppercase tracking-widest opacity-70">
                <div className="w-8 h-[2px] bg-slate-200"></div>
                Request Processing Pipeline
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 relative z-10">
            <div className="relative group">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search queue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-16 pr-8 py-6 bg-slate-50/50 border-none rounded-[24px] text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 transition-all w-full md:w-80 font-bold shadow-inner"
              />
            </div>

            <div className="flex bg-slate-100/50 p-2 rounded-[24px] backdrop-blur-md">
              <button
                onClick={() => setView("table")}
                className={`p-4 rounded-[18px] transition-all ${
                  view === "table"
                    ? "bg-white text-slate-900 shadow-xl"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <TableIcon size={22} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-4 rounded-[18px] transition-all ${
                  view === "card"
                    ? "bg-white text-slate-900 shadow-xl"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <LayoutGrid size={22} />
              </button>
            </div>

            <button
              onClick={() => {
                setEditRequest(null);
                setShowForm(true);
              }}
              className="group flex items-center gap-4 text-white px-10 py-6 rounded-[28px] text-sm font-black transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-brand/30 relative overflow-hidden"
              style={{ backgroundColor: "#dc2626" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Plus size={20} strokeWidth={3} />
              <span className="uppercase tracking-widest">Initialize Request</span>
            </button>
          </div>
        </div>

        {/* List View */}
        {view === "table" ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] border border-white shadow-2xl shadow-slate-200/50 overflow-hidden transition-all">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-50">
                    {[
                      "Request ID",
                      "Inspector Entity",
                      "Vehicle",
                      "Assigned To",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRequests.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/30 transition-all group"
                    >
                      <td className="px-12 py-10">
                        <span 
                          className="font-black px-5 py-2 rounded-2xl text-[10px] tracking-[0.1em] border uppercase"
                          style={{ color: "#dc2626", backgroundColor: `#dc262610`, borderColor: `#dc262620` }}
                        >
                          {r.requestId}
                        </span>
                      </td>
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-6">
                          <div 
                            className="h-16 w-16 rounded-[22px] bg-slate-900 flex items-center justify-center font-black text-white text-lg shadow-xl group-hover:rotate-6 transition-all duration-500"
                          >
                            {r.inspectorName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-black text-slate-900 text-xl tracking-tight block mb-1">{r.inspectorName}</span>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{r.createdAt}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-50 rounded-xl">
                            <ClipboardList size={20} className="text-slate-400" />
                          </div>
                          <span className="text-sm text-slate-600 font-bold max-w-[200px] truncate">{r.vehicle}</span>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-3 bg-slate-50 w-fit px-5 py-2.5 rounded-2xl border border-slate-100">
                          <User size={14} className="text-slate-400" />
                          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{r.assignStaff || "UNASSIGNED"}</span>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <span className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-[18px] text-[10px] font-black uppercase tracking-[0.15em] border ${getStatusBadge(r.status)}`}>
                          <div className={`w-2 h-2 rounded-full ${r.status === "Completed" ? "bg-emerald-500" : r.status === "In Progress" ? "bg-amber-500" : "bg-rose-500"}`}></div>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-12 py-10 text-right">
                        <div className="flex gap-4">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewRequest(r)}
                            icon={<Eye size={20} />}
                          />
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditRequest(r);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredRequests.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-[40px] p-12 shadow-2xl shadow-slate-200/50 hover:shadow-brand/20 hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden border border-white"
              >
                <div 
                  className="absolute -right-20 -top-20 w-64 h-64 bg-slate-50 rounded-full transition-all group-hover:scale-110"
                ></div>
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <span 
                    className="font-black px-5 py-2 rounded-2xl text-[10px] tracking-widest border uppercase"
                    style={{ color: "#dc2626", backgroundColor: `#dc262610`, borderColor: `#dc262620` }}
                  >
                    {r.requestId}
                  </span>
                  <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border ${getStatusBadge(r.status)}`}>
                    {r.status}
                  </span>
                </div>

                <div className="space-y-8 mb-12 relative z-10">
                  <div>
                    <h3 className="font-black text-slate-900 group-hover:text-brand transition-colors text-2xl tracking-tight leading-tight mb-3">
                      {r.vehicle}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-[2px] bg-brand/30"></div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{r.createdAt}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 pt-8 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Inspector</p>
                      <p className="text-sm font-black text-slate-900">{r.inspectorName}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Assignee</p>
                      <p className="text-sm font-black text-brand tracking-tight italic" style={{ color: "#dc2626" }}>{r.assignStaff || "UNASSIGNED"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <button
                    onClick={() => setViewRequest(r)}
                    className="flex-[2] py-5 rounded-[24px] bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      setEditRequest(r);
                      setShowForm(true);
                    }}
                    className="flex-1 flex items-center justify-center rounded-[24px] bg-slate-50 text-slate-400 hover:text-brand hover:bg-brand/5 transition-all border border-slate-100 hover:border-brand/20"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => remove(r.id)}
                    className="flex-1 flex items-center justify-center rounded-[24px] bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-slate-100 hover:border-rose-200"
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
      {viewRequest && (
        <Modal onClose={() => setViewRequest(null)} title="Request Specification">
          <div className="space-y-10">
            <div className="p-10 bg-slate-900 rounded-[32px] flex items-center justify-between relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:scale-110"
              ></div>
              
              <div className="flex items-center gap-8 relative z-10">
                <div 
                  className="h-20 w-20 rounded-[24px] bg-white flex items-center justify-center text-brand shadow-2xl rotate-3"
                  style={{ color: "#dc2626" }}
                >
                  <ShieldCheck size={40} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Workflow Status</p>
                  <span className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border relative z-10 bg-white/10 text-white border-white/20 backdrop-blur-md`}>
                    {viewRequest.status}
                  </span>
                </div>
              </div>
              <div className="text-right relative z-10">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Creation Node</p>
                <p className="text-xl font-black text-white">{viewRequest.createdAt}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DetailBox label="Registry ID" value={viewRequest.requestId} brandColor={"#dc2626"} />
              <DetailBox label="Source Inspector" value={viewRequest.inspectorName} />
              <DetailBox label="Asset Entity" value={viewRequest.vehicle} colSpan={2} />
              <DetailBox label="Assigned Operator" value={viewRequest.assignStaff || "Awaiting Assignment"} brandColor={"#dc2626"} />
            </div>

            <button
              onClick={() => setViewRequest(null)}
              className="w-full py-5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Record
            </button>
          </div>
        </Modal>
      )}

      {/* Form Modal */}
      {showForm && (
        <RequestForm
          editData={editRequest}
          onClose={() => {
            setShowForm(false);
            setEditRequest(null);
          }}
          onSave={saveRequest}
        />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function DetailBox({ label, value, colSpan = 1, brandColor }: { label: string; value: string; colSpan?: number; brandColor?: string }) {
  return (
    <div className={`p-6 border border-slate-100 rounded-xl bg-white shadow-sm transition-all hover:shadow-md ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-sm font-black text-slate-900 tracking-tight" style={{ color: brandColor }}>{value}</p>
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
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
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

function RequestForm({
  editData,
  onClose,
  onSave,
}: {
  editData: InspectionRequest | null;
  onClose: () => void;
  onSave: (data: InspectionRequest) => void;
}) {
  const [formData, setFormData] = useState<InspectionRequest>(
    editData || {
      id: 0,
      requestId: "",
      inspectorName: "",
      vehicle: "",
      createdAt: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
      assignStaff: "",
      status: "Pending",
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="px-12 py-10 bg-slate-900 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-brand" style={{ backgroundColor: "#dc2626" }}></div>
          <div 
            className="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "#dc2626" }}
          ></div>
          
          <div>
            <h3 className="text-3xl font-black text-white relative z-10 tracking-tight uppercase">
              {editData ? "Refine Request" : "Spawn Request"}
            </h3>
            <p className="text-slate-400 text-sm mt-2 relative z-10 font-bold uppercase tracking-widest">Inspection Logic Core</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput
              label="System Request ID"
              value={formData.requestId}
              onChange={(v) => setFormData({ ...formData, requestId: v })}
              placeholder="#IREQ-XXXX"
            />
            <FormInput
              label="Source Inspector"
              value={formData.inspectorName}
              onChange={(v) => setFormData({ ...formData, inspectorName: v })}
              placeholder="e.g. John Doe"
            />
            <FormInput
              label="Asset Designation"
              value={formData.vehicle}
              onChange={(v) => setFormData({ ...formData, vehicle: v })}
              placeholder="Vehicle Identifier"
              colSpan={2}
            />
            <FormInput
              label="Assigned Operator"
              value={formData.assignStaff}
              onChange={(v) => setFormData({ ...formData, assignStaff: v })}
              placeholder="Staff Name"
            />
            <div className="space-y-4">
              <div className="flex items-center gap-3 ml-1">
                <div className="w-1.5 h-4 bg-brand rounded-full" style={{ backgroundColor: "#dc2626" }}></div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Flow Status</label>
              </div>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-slate-900 font-bold shadow-inner appearance-none"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="mt-12 flex gap-5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-5 rounded-xl border-2 border-slate-100 text-slate-400 font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98]"
            >
              Abort
            </button>
            <button
              type="submit"
              className="flex-1 py-5 rounded-xl text-white font-black uppercase tracking-widest hover:opacity-90 shadow-2xl transition-all active:scale-[0.98]"
              style={{ backgroundColor: "#dc2626", boxShadow: `0 20px 30px -10px #dc262640` }}
            >
              {editData ? "Sync Changes" : "Commit Request"}
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
        className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-slate-900 font-bold shadow-inner"
      />
    </div>
  );
}
