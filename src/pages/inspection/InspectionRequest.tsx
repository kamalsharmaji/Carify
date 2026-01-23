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
  User,
  ClipboardList,
  ChevronRight,
  Clock,
  ClipboardCheck
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Inspection <span className="text-red-500">Requests</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-red-500 transition-colors cursor-pointer">Vehicle Inspection</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Processing Pipeline</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full lg:w-64"
              />
            </div>

            <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-lg">
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-md transition-all ${
                  view === "table" ? "bg-white text-red-500 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2 rounded-md transition-all ${
                  view === "card" ? "bg-white text-red-500 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                setEditRequest(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>Initialize Request</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <StatCard icon={<ClipboardList className="text-red-500" />} label="Total Requests" value={requests.length} />
        <StatCard icon={<Clock className="text-amber-600" />} label="Pending Review" value={requests.filter(r => r.status === 'Pending').length} />
        <StatCard icon={<ClipboardCheck className="text-emerald-600" />} label="Completed Tasks" value={requests.filter(r => r.status === 'Completed').length} />
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
                      "Request ID",
                      "Inspector Entity",
                      "Vehicle",
                      "Assigned To",
                      "Status",
                      "Operations",
                    ].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold text-red-500 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                          {r.requestId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-red-500 flex items-center justify-center font-bold text-base">
                            {r.inspectorName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{r.inspectorName}</div>
                            <div className="text-xs text-slate-500">{r.createdAt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <ClipboardList size={14} className="text-slate-400" />
                          {r.vehicle}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <User size={14} className="text-slate-400" />
                           <span className="text-xs font-semibold text-slate-600">{r.assignStaff || "UNASSIGNED"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${getStatusBadge(r.status)}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewRequest(r)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setEditRequest(r); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => remove(r.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredRequests.length === 0 && <EmptyState />}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredRequests.map((r) => (
              <div key={r.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs font-bold text-red-500 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                    {r.requestId}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadge(r.status)}`}>
                    {r.status}
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 group-hover:text-red-500 transition-colors line-clamp-1 mb-1">{r.vehicle}</h3>
                  <p className="text-xs text-slate-400 font-medium">Created: {r.createdAt}</p>
                </div>
                <div className="space-y-3 mb-6 pt-4 border-t border-slate-50">
                  <CardRow label="Inspector" value={r.inspectorName} />
                  <CardRow label="Assignee" value={r.assignStaff || "UNASSIGNED"} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setViewRequest(r)} className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all border border-slate-200">
                    DETAILS
                  </button>
                  <button onClick={() => { setEditRequest(r); setShowForm(true); }} className="flex-1 py-2 rounded-lg bg-indigo-50 text-red-500 hover:bg-indigo-100 text-xs font-semibold transition-all border border-indigo-100">
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
      {viewRequest && (
        <Modal onClose={() => setViewRequest(null)} title="Request Specification">
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
              <div className="h-24 w-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-500/40 border-4 border-white/10">
                {viewRequest.inspectorName.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">{viewRequest.requestId}</h2>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm font-medium">{viewRequest.vehicle}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${viewRequest.status === 'Completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {viewRequest.status} Status
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailBox label="Registry ID" value={viewRequest.requestId} />
              <DetailBox label="Inspector" value={viewRequest.inspectorName} />
              <DetailBox label="Vehicle" value={viewRequest.vehicle} />
              <DetailBox label="Created At" value={viewRequest.createdAt} />
              <DetailBox label="Assigned Staff" value={viewRequest.assignStaff || "Not Assigned"} />
            </div>
            
            <button
              onClick={() => setViewRequest(null)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-red-500 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Specification
            </button>
          </div>
        </Modal>
      )}

      {showForm && (
        <RequestForm
          editData={editRequest}
          onClose={() => { setShowForm(false); setEditRequest(null); }}
          onSave={saveRequest}
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
        <div className="p-3 bg-indigo-50 rounded-lg text-red-500">{icon}</div>
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
    indigo: "text-red-500 hover:bg-indigo-50 border-indigo-100",
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
        <ClipboardList className="text-slate-300" size={40} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No requests found</h3>
      <p className="text-sm text-slate-500">Try adjusting your search or add a new request.</p>
    </div>
  );
}

function Modal({ children, onClose, title }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
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

function CardRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-xs font-semibold text-slate-700">{value}</span>
    </div>
  );
}

function DetailBox({ label, value }: any) {
  return (
    <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-indigo-200 transition-colors">
      <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">{label}</p>
      <p className="text-sm font-black text-slate-800 group-hover:text-red-500 transition-colors">{value}</p>
    </div>
  );
}

function RequestForm({ editData, onClose, onSave }: any) {
  const [formData, setFormData] = useState<any>(
    editData || {
      requestId: "",
      inspectorName: "",
      vehicle: "",
      createdAt: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
      assignStaff: "",
      status: "Pending",
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal onClose={onClose} title={editData ? "Update Request" : "New Inspection Request"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Request ID</label>
            <input
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
              value={formData.requestId}
              onChange={(e) => setFormData({ ...formData, requestId: e.target.value })}
              placeholder="#IREQ000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Inspector Name</label>
            <input
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
              value={formData.inspectorName}
              onChange={(e) => setFormData({ ...formData, inspectorName: e.target.value })}
              placeholder="Full Name"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Vehicle Details</label>
            <input
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
              value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              placeholder="Make, Model, VIN"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Assign To</label>
            <input
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
              value={formData.assignStaff}
              onChange={(e) => setFormData({ ...formData, assignStaff: e.target.value })}
              placeholder="Staff Name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Status</label>
            <select
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold appearance-none"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <button className="w-full py-5 bg-red-500 text-white rounded-[2rem] font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] mt-4">
          {editData ? "Confirm Changes" : "Initialize Request"}
        </button>
      </form>
    </Modal>
  );
}
