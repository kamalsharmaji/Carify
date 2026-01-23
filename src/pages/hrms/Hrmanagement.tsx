
import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Search,
  LayoutGrid,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Clock,
  X,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  DollarSign
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type EmployeeStatus = "Active" | "On Leave" | "Probation" | "Terminated";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: EmployeeStatus;
  joinDate: string;
  location: string;
  avatar?: string;
}

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "hrm_employees_v2";
const ITEMS_PER_PAGE = 8;

const defaultEmployees: Employee[] = [
  { id: 1, name: "Amit Sharma", email: "amit.s@carify.com", phone: "+91 98765 43210", department: "Operations", role: "Fleet Manager", status: "Active", joinDate: "2023-01-15", location: "New Delhi" },
  { id: 2, name: "Neha Verma", email: "neha.v@carify.com", phone: "+91 98765 43211", department: "Human Resources", role: "HR Lead", status: "Active", joinDate: "2023-03-20", location: "Mumbai" },
  { id: 3, name: "Rahul Singh", email: "rahul.s@carify.com", phone: "+91 98765 43212", department: "Finance", role: "Senior Accountant", status: "On Leave", joinDate: "2022-11-10", location: "Bangalore" },
  { id: 4, name: "Priya Das", email: "priya.d@carify.com", phone: "+91 98765 43213", department: "Engineering", role: "Systems Engineer", status: "Active", joinDate: "2024-05-02", location: "Hyderabad" },
  { id: 5, name: "Vikram Malhotra", email: "vikram.m@carify.com", phone: "+91 98765 43214", department: "Fleet", role: "Logistics Specialist", status: "Probation", joinDate: "2024-08-12", location: "Pune" },
  { id: 6, name: "Sanya Iyer", email: "sanya.i@carify.com", phone: "+91 98765 43215", department: "Marketing", role: "Brand Manager", status: "Active", joinDate: "2023-12-05", location: "Chennai" },
];

/* ================= MAIN COMPONENT ================= */

export default function HRManagement() {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultEmployees;
      }
    } catch {
      return defaultEmployees;
    }
    return defaultEmployees;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [viewDetails, setViewDetails] = useState<Employee | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      setEmployees(prev => prev.filter(e => e.id !== id));
      toast.success("Employee record deleted");
    }
  };

  const handleSave = (empData: Employee) => {
    if (selectedEmployee) {
      setEmployees(prev => prev.map(e => e.id === empData.id ? empData : e));
      toast.success("Employee profile updated");
    } else {
      setEmployees(prev => [...prev, { ...empData, id: Date.now() }]);
      toast.success("New employee onboarded successfully");
    }
    setShowForm(false);
    setSelectedEmployee(null);
  };

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Personnel <span className="text-indigo-600">Intelligence</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">HRMS</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Staff Directory</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search personnel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full lg:w-64"
              />
            </div>

            <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-lg">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "card" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedEmployee(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <UserPlus size={18} />
              <span>Onboard Personnel</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard icon={<Users className="text-indigo-600" />} label="Global Workforce" value={employees.length} />
        <StatCard icon={<ShieldCheck className="text-indigo-600" />} label="Active Protocols" value={employees.filter(e => e.status === "Active").length} />
        <StatCard icon={<Clock className="text-indigo-600" />} label="On Leave" value={employees.filter(e => e.status === "On Leave").length} />
        <StatCard icon={<TrendingUp className="text-indigo-600" />} label="Growth Index" value="12%" />
      </div>

      {/* --- Main Content Area --- */}
      <main className="transition-all duration-300">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Personnel Profile", "Designation", "Department", "Status", "Joined On", "Operations"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{emp.name}</div>
                            <div className="text-xs text-slate-500">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-slate-700">{emp.role}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase border border-slate-200">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={emp.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {emp.joinDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(emp)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setSelectedEmployee(emp); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(emp.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4 bg-slate-50/50">
              {paginated.map((emp) => (
                <div key={emp.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                      {emp.name.charAt(0)}
                    </div>
                    <StatusBadge status={emp.status} />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{emp.name}</h3>
                    <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">{emp.role}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <CardRow label="Dept" value={emp.department} isBadge />
                    <CardRow label="Contact" value={emp.email} />
                    <CardRow label="Location" value={emp.location} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setViewDetails(emp)} className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all border border-slate-200 uppercase tracking-wider">Profile</button>
                    <button onClick={() => { setSelectedEmployee(emp); setShowForm(true); }} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all border border-indigo-100"><Pencil size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Showing <span className="text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of {filtered.length} personnel
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-9 w-9 rounded-lg text-xs font-bold transition-all ${
                    currentPage === i + 1 ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modals and Forms (keeping existing logic) */}
      {showForm && (
        <EmployeeForm
          employee={selectedEmployee}
          onClose={() => { setShowForm(false); setSelectedEmployee(null); }}
          onSave={handleSave}
        />
      )}
      {viewDetails && <DetailsModal employee={viewDetails} onClose={() => setViewDetails(null)} />}
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

function StatusBadge({ status }: { status: EmployeeStatus }) {
  const styles: Record<EmployeeStatus, string> = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    "On Leave": "bg-amber-50 text-amber-600 border-amber-100",
    Probation: "bg-blue-50 text-blue-600 border-blue-100",
    Terminated: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
}

function ActionBtn({ onClick, icon, color }: any) {
  const styles: any = {
    blue: "text-blue-600 hover:bg-blue-50 border-blue-100",
    indigo: "text-indigo-600 hover:bg-indigo-50 border-indigo-100",
    red: "text-red-600 hover:bg-red-50 border-red-100",
    orange: "text-orange-600 hover:bg-orange-50 border-orange-100",
  };
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border border-transparent transition-all active:scale-90 ${styles[color]}`}
    >
      {icon}
    </button>
  );
}

function CardRow({ label, value, isBadge }: any) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-slate-400 font-medium uppercase tracking-wider">{label}</span>
      {isBadge ? (
        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-bold">{value}</span>
      ) : (
        <span className="font-semibold text-slate-700 truncate max-w-[120px]">{value}</span>
      )}
    </div>
  );
}

/* --- Modal Components (keeping the same logic but refined styling) --- */

function EmployeeForm({ employee, onClose, onSave }: any) {
  const [formData, setFormData] = useState<Employee>(employee || {
    id: 0,
    name: "",
    email: "",
    phone: "",
    department: "Operations",
    role: "",
    status: "Active",
    joinDate: new Date().toISOString().split('T')[0],
    location: ""
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{employee ? "Edit Personnel Profile" : "Onboard New Personnel"}</h2>
            <p className="text-sm text-slate-500 font-medium">Capture essential staff credentials and data</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-900 shadow-sm"><X size={20}/></button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-8 grid grid-cols-2 gap-6">
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none" placeholder="e.g. John Doe"/>
          </div>
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none" placeholder="name@carify.com"/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none" placeholder="+91 XXXXX XXXXX"/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Designation</label>
            <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none" placeholder="e.g. Fleet Manager"/>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Department</label>
            <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none appearance-none">
              {["Operations", "Human Resources", "Finance", "Fleet", "Engineering", "Marketing"].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Employment Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as EmployeeStatus})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold outline-none appearance-none">
              {["Active", "On Leave", "Probation", "Terminated"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-span-2 pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95">Discard</button>
            <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">Commit Onboarding</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DetailsModal({ employee, onClose }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20">
        <div className="relative p-10 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all text-white/60 hover:text-white"><X size={20}/></button>
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl font-black mb-6 border border-white/20 shadow-2xl">{employee.name.charAt(0)}</div>
            <h2 className="text-3xl font-black tracking-tight mb-2 text-center">{employee.name}</h2>
            <div className="px-4 py-1.5 bg-indigo-500/30 backdrop-blur-md border border-indigo-400/30 rounded-full text-xs font-bold uppercase tracking-widest">{employee.role}</div>
          </div>
        </div>
        <div className="p-8 grid grid-cols-2 gap-4 bg-slate-50/50">
          {[
            { label: "Department", value: employee.department, full: true },
            { label: "Email ID", value: employee.email },
            { label: "Mobile", value: employee.phone },
            { label: "Location", value: employee.location },
            { label: "Status", value: employee.status },
            { label: "Joined On", value: employee.joinDate },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 bg-white border border-slate-100 rounded-2xl shadow-sm ${item.full ? 'col-span-2' : ''}`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">{item.label}</p>
              <p className="text-sm font-bold text-slate-800">{item.value}</p>
            </div>
          ))}
          <button onClick={onClose} className="col-span-2 mt-4 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">Close Analysis</button>
        </div>
      </div>
    </div>
  );
}
