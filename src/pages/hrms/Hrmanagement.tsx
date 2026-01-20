import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  Briefcase,
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
  CheckCircle2,
  Clock,
  X
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

const STORAGE_KEY = "hrm_employees";
const ITEMS_PER_PAGE = 8;

const DEPARTMENTS = ["Operations", "Human Resources", "Finance", "Fleet", "Engineering", "Marketing"];
const ROLES = ["Manager", "Lead", "Associate", "Analyst", "Specialist", "Coordinator"];

/* ================= DEFAULT DATA ================= */

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

  /* ---------- ACTIONS ---------- */

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to remove this employee from the system?")) {
      setEmployees(prev => prev.filter(e => e.id !== id));
      toast.success("Employee record deleted", {
        icon: '🗑️',
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
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

  /* ---------- FILTER & PAGINATION ---------- */

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
    <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-brand rounded-full"></span>
              Personnel Directory
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <Building2 size={16} />
              HR Management › Global Employee Database
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-64 shadow-sm font-medium"
              />
            </div>

            <div className="flex border border-slate-200 rounded-2xl bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "table"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <TableIcon size={20} />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "card"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedEmployee(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-brand hover:opacity-90 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              <UserPlus size={18} />
              <span className="hidden sm:inline">Add Personnel</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Employees" value={employees.length.toString()} icon={<Users size={24} />} trend="+4 this month" color="bg-blue-500" />
          <StatCard title="Active Contracts" value={employees.filter(e => e.status === "Active").length.toString()} icon={<CheckCircle2 size={24} />} trend="92% Compliance" color="bg-emerald-500" />
          <StatCard title="On Leave" value={employees.filter(e => e.status === "On Leave").length.toString()} icon={<Clock size={24} />} trend="3 returning soon" color="bg-amber-500" />
          <StatCard title="Open Positions" value="12" icon={<Briefcase size={24} />} trend="4 High priority" color="bg-indigo-500" />
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Personnel", "Designation", "Department", "Status", "Joined On", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 text-red-600 flex items-center justify-center font-black text-lg border border-red-200 group-hover:scale-110 transition-transform shadow-sm">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-base">{emp.name}</div>
                            <div className="text-xs text-slate-400 font-medium">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="font-bold text-slate-700">{emp.role}</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={emp.status} />
                      </td>
                      <td className="px-8 py-5 text-slate-500 font-bold text-sm">
                        {emp.joinDate}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(emp)} icon={<Eye size={18} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedEmployee(emp); setShowForm(true); }} icon={<Pencil size={18} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(emp.id)} icon={<Trash2 size={18} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginated.map((emp) => (
              <div key={emp.id} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/5 rounded-bl-[120px] -mr-10 -mt-10 transition-all group-hover:scale-125"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="h-16 w-16 rounded-[24px] bg-gradient-to-br from-red-400 to-red-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-red-400/30 group-hover:rotate-6 transition-transform">
                    {emp.name.charAt(0)}
                  </div>
                  <StatusBadge status={emp.status} />
                </div>

                <div className="mb-8">
                  <h3 className="font-black text-xl text-slate-900 line-clamp-1">{emp.name}</h3>
                  <p className="text-sm text-red-500 font-black mt-1 uppercase tracking-wider">{emp.role}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <Building2 size={16} className="text-slate-400" />
                    {emp.department}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <Mail size={16} className="text-slate-400" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <MapPin size={16} className="text-slate-400" />
                    {emp.location}
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
                  <button onClick={() => setViewDetails(emp)} className="flex-1 py-3.5 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-black uppercase transition-colors">Profile</button>
                  <button onClick={() => { setSelectedEmployee(emp); setShowForm(true); }} className="p-3.5 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Pencil size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> Employees
            </p>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-2 rounded-[24px] shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-10 w-10 rounded-xl text-xs font-black transition-all ${
                      currentPage === i + 1 ? 'bg-red-400 text-white shadow-lg shadow-red-400/30 scale-110' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <EmployeeForm
            employee={selectedEmployee}
            onClose={() => setShowForm(false)}
            onSave={handleSave}
          />
        )}

        {/* Details View */}
        {viewDetails && (
          <EmployeeDetails
            employee={viewDetails}
            onClose={() => setViewDetails(null)}
          />
        )}
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatCard({ title, value, icon, trend, color }: { title: string, value: string, icon: React.ReactNode, trend: string, color: string }) {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center text-center">
      <div className={`h-14 w-14 rounded-full ${color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <div className={`${color.replace('bg-', 'text-')}`}>
          {icon}
        </div>
      </div>
      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h3>
      {trend && (
        <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">
          {trend}
        </span>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: EmployeeStatus }) {
  const configs: any = {
    Active: "bg-green-50 text-green-600 border-green-100",
    "On Leave": "bg-blue-50 text-blue-600 border-blue-100",
    Probation: "bg-amber-50 text-amber-600 border-amber-100",
    Terminated: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${configs[status]}`}>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: 'blue' | 'orange' | 'red', onClick: () => void, icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-500 hover:bg-blue-50 border-blue-100",
    orange: "text-orange-500 hover:bg-orange-50 border-orange-100",
    red: "text-red-500 hover:bg-red-50 border-red-100"
  };
  return (
    <button onClick={onClick} className={`p-2.5 rounded-xl transition-all active:scale-90 border border-transparent ${styles[color]}`}>
      {icon}
    </button>
  );
}

/* ---------- EMPLOYEE FORM MODAL ---------- */

function EmployeeForm({ employee, onClose, onSave }: { employee: Employee | null, onClose: () => void, onSave: (e: Employee) => void }) {
  const [formData, setFormData] = useState<Employee>(employee || {
    id: 0,
    name: "",
    email: "",
    phone: "",
    department: DEPARTMENTS[0],
    role: ROLES[0],
    status: "Active",
    joinDate: new Date().toISOString().split('T')[0],
    location: "",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col border border-white/20">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{employee ? "Update Profile" : "Onboard Personnel"}</h2>
            <p className="text-slate-500 text-sm font-bold mt-1 italic">Fill in the professional details</p>
          </div>
          <button onClick={onClose} className="p-4 bg-white border border-slate-200 rounded-[20px] text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <input
                type="email"
                placeholder="john.d@carify.com"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
              <input
                type="text"
                placeholder="+91 00000 00000"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
              <input
                type="text"
                placeholder="e.g. New Delhi"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
              <select
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold focus:ring-4 focus:ring-red-400/10 transition-all appearance-none cursor-pointer"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
              >
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Role / Title</label>
              <select
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold focus:ring-4 focus:ring-red-400/10 transition-all appearance-none cursor-pointer"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
              >
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
              <select
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold focus:ring-4 focus:ring-red-400/10 transition-all appearance-none cursor-pointer"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as EmployeeStatus })}
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Probation">Probation</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Join Date</label>
              <input
                type="date"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.joinDate}
                onChange={e => setFormData({ ...formData, joinDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="p-10 border-t border-slate-100 flex gap-4 bg-slate-50/50">
          <button onClick={onClose} className="flex-1 px-8 py-5 rounded-[20px] border border-slate-200 text-slate-600 font-black uppercase tracking-widest hover:bg-white transition-all">
            Discard
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={!formData.name || !formData.email}
            className="flex-[2] px-8 py-5 rounded-[20px] bg-red-400 text-white font-black uppercase tracking-widest hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-red-400/20 transition-all"
          >
            {employee ? "Save Changes" : "Complete Onboarding"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- EMPLOYEE DETAILS MODAL ---------- */

function EmployeeDetails({ employee, onClose }: { employee: Employee, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[48px] shadow-2xl w-full max-w-xl overflow-hidden relative border border-white/20">
        <div className="h-40 bg-gradient-to-br from-red-400 to-red-600"></div>
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-all">
          <X size={24} />
        </button>

        <div className="px-10 pb-12 -mt-20">
          <div className="flex flex-col items-center text-center">
            <div className="h-40 w-40 rounded-[48px] bg-white p-3 shadow-2xl mb-6">
              <div className="w-full h-full rounded-[36px] bg-red-50 flex items-center justify-center text-red-500 text-5xl font-black">
                {employee.name.charAt(0)}
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">{employee.name}</h2>
            <div className="mt-3">
              <StatusBadge status={employee.status} />
            </div>
            <p className="mt-6 text-slate-500 font-bold text-lg max-w-sm">
              Dedicated {employee.role} at <span className="text-red-500">Carify {employee.department}</span> unit.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <DetailBox icon={<Mail size={18} />} label="Email Address" value={employee.email} />
              <DetailBox icon={<Phone size={18} />} label="Phone Number" value={employee.phone} />
              <DetailBox icon={<MapPin size={18} />} label="Office Location" value={employee.location} />
              <DetailBox icon={<Calendar size={18} />} label="Joined Date" value={employee.joinDate} />
            </div>

            <div className="flex items-center justify-between px-6 py-8 bg-slate-50 rounded-[32px]">
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">ID-{employee.id % 1000}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Staff ID</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">{employee.department.split(' ')[0]}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Division</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">Lvl 4</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ranking</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-6 rounded-[24px] bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl active:scale-[0.98]"
            >
              Close Profile View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-4 bg-slate-50 rounded-[20px] flex items-start gap-3 border border-slate-100">
      <div className="text-red-400 mt-1">{icon}</div>
      <div className="overflow-hidden">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-black text-slate-700 truncate">{value}</p>
      </div>
    </div>
  );
}
