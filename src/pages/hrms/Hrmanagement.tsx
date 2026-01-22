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
  CheckCircle2,
  Clock,
  X,
  TrendingUp,
  ShieldCheck,
  UserCheck
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
    <div className="space-y-6 pb-10 animate-in fade-in duration-700 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Cinematic Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                <Users className="text-white w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-black text-slate-900">
                    Personnel <span className="text-red-600">Intelligence</span>
                  </h1>
                  <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                    HRMS v4.0
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Human Capital Management › Staff Directory
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "table"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <TableIcon size={18} />
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "card"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
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
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm active:scale-95"
              >
                <UserPlus size={16} />
                <span>Onboard Personnel</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Global Workforce", value: employees.length, icon: Users, color: "blue", trend: "+4 this month" },
              { label: "Active Protocols", value: employees.filter(e => e.status === "Active").length, icon: ShieldCheck, color: "emerald", trend: "98% compliance" },
              { label: "On Leave", value: employees.filter(e => e.status === "On Leave").length, icon: Clock, color: "orange", trend: "3 returning" },
              { label: "Growth Index", value: "12%", icon: TrendingUp, color: "rose", trend: "Quarterly increase" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-600 text-white' : 
                  stat.color === 'emerald' ? 'bg-emerald-600 text-white' : 
                  stat.color === 'orange' ? 'bg-orange-500 text-white' : 'bg-rose-600 text-white'
                } flex items-center justify-center transition-transform`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                    <span className="text-[9px] font-bold text-slate-400">{stat.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search personnel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-red-500 transition-all shadow-sm font-medium"
            />
          </div>
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["No", "Personnel Profile", "Designation", "Department", "Status", "Joined On", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((emp, index) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-slate-300">
                        {String((currentPage - 1) * ITEMS_PER_PAGE + index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{emp.name}</div>
                            <div className="text-[10px] text-slate-400 font-bold">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-700 text-xs">{emp.role}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[9px] font-black uppercase tracking-wider border border-slate-200">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={emp.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-bold text-[11px]">
                        {emp.joinDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(emp)}>
                            <Eye size={16} />
                          </ActionBtn>
                          <ActionBtn color="orange" onClick={() => { setSelectedEmployee(emp); setShowForm(true); }}>
                            <Pencil size={16} />
                          </ActionBtn>
                          <ActionBtn color="red" onClick={() => handleDelete(emp.id)}>
                            <Trash2 size={16} />
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-xl bg-slate-50 text-slate-300 mb-6 border border-slate-100">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No personnel found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {paginated.map((emp) => (
              <div key={emp.id} className="group bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:rotate-3 transition-transform">
                    {emp.name.charAt(0)}
                  </div>
                  <StatusBadge status={emp.status} />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">{emp.name}</h3>
                  <p className="text-[10px] text-red-500 font-black mt-1 uppercase tracking-wider">{emp.role}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <CardRow label="Department" value={emp.department} isBadge />
                  <CardRow label="Contact ID" value={emp.email} />
                  <CardRow label="Work Location" value={emp.location} />
                </div>

                <div className="flex gap-2 mt-8">
                  <button onClick={() => setViewDetails(emp)} className="flex-1 py-3 rounded-lg bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600 text-[10px] font-black uppercase tracking-widest transition-all">
                    Profile
                  </button>
                  <button onClick={() => { setSelectedEmployee(emp); setShowForm(true); }} className="p-3 rounded-lg bg-slate-900 text-white hover:bg-red-600 transition-all shadow-sm">
                    <Pencil size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> Personnel
            </p>
            <div className="flex items-center gap-2 bg-white border border-slate-100 p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 rounded-md text-[10px] font-black transition-all ${
                      currentPage === i + 1 ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {viewDetails && (
        <Modal onClose={() => setViewDetails(null)} title="Personnel Profile">
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-6 bg-slate-900 rounded-[32px] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl"></div>
              <div className="h-20 w-20 rounded-[24px] bg-red-600 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-red-600/20 relative z-10">
                {viewDetails.name.charAt(0)}
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-black tracking-tight">{viewDetails.name}</h2>
                <p className="text-red-400 font-bold flex items-center gap-2 mt-1">
                  <UserCheck size={16} />
                  {viewDetails.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Department", value: viewDetails.department, icon: Building2 },
                { label: "Current Status", value: viewDetails.status, icon: ShieldCheck },
                { label: "Joining Date", value: viewDetails.joinDate, icon: Calendar },
                { label: "Work Location", value: viewDetails.location, icon: MapPin },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-[24px]">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.1em] mb-1">{item.label}</p>
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <item.icon size={14} className="text-red-500" />
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 p-6 bg-slate-50 border border-slate-100 rounded-[32px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                    <p className="font-bold text-slate-900">{viewDetails.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                    <p className="font-bold text-slate-900">{viewDetails.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewDetails(null)}
              className="w-full py-5 rounded-[24px] bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all shadow-xl shadow-slate-900/10"
            >
              Close Profile
            </button>
          </div>
        </Modal>
      )}

      {/* Form Modal */}
      {showForm && (
        <EmployeeForm
          editData={selectedEmployee}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatCard({ title, value, icon, trend, color }: any) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all group">
      <div className="flex items-center gap-5">
        <div className={`w-14 h-14 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-slate-900">{value}</p>
            <span className="text-[10px] font-bold text-slate-400">{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: EmployeeStatus }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    "On Leave": "bg-orange-50 text-orange-600 border-orange-100",
    Probation: "bg-blue-50 text-blue-600 border-blue-100",
    Terminated: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
}

function ActionBtn({ children, color, onClick }: { children: React.ReactNode; color: 'blue' | 'orange' | 'red'; onClick: () => void }) {
  const styles = {
    blue: "text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white",
    orange: "text-orange-500 bg-orange-50 hover:bg-orange-500 hover:text-white",
    red: "text-red-500 bg-red-50 hover:bg-red-500 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all duration-300 active:scale-90 shadow-sm ${styles[color]}`}
    >
      {children}
    </button>
  );
}

function CardRow({ label, value, isBadge }: { label: string; value: string; isBadge?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{label}</span>
      {isBadge ? (
        <span className="text-[11px] font-black text-red-600 uppercase">
          {value}
        </span>
      ) : (
        <span className="text-sm text-slate-900 font-black truncate">{value}</span>
      )}
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function EmployeeForm({ editData, onClose, onSave }: { editData: Employee | null; onClose: () => void; onSave: (e: Employee) => void }) {
  const [form, setForm] = useState<Employee>(
    editData || {
      id: 0,
      name: "",
      email: "",
      phone: "",
      department: "Operations",
      role: "Associate",
      status: "Active",
      joinDate: new Date().toISOString().split('T')[0],
      location: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    if (!form.phone.trim()) newErrors.phone = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Modal onClose={onClose} title={editData ? "Modify Personnel" : "New Onboarding"}>
      <div className="space-y-6">
        <FormInput
          label="Full Name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          error={errors.name}
          placeholder="Enter staff name"
        />
        
        <div className="grid grid-cols-2 gap-6">
          <FormInput
            label="Email Address"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            error={errors.email}
            placeholder="name@carify.com"
          />
          <FormInput
            label="Phone Number"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
            error={errors.phone}
            placeholder="+91..."
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all appearance-none"
            >
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as EmployeeStatus })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all appearance-none"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Probation">Probation</option>
              <option value="Terminated">Terminated</option>
            </select>
          </div>
        </div>

        <FormInput
          label="Work Location"
          value={form.location}
          onChange={(v) => setForm({ ...form, location: v })}
          placeholder="City, Country"
        />

        <div className="pt-8 flex gap-4">
          <button onClick={onClose} className="flex-1 px-8 py-4 rounded-[24px] border border-slate-200 text-slate-500 font-black uppercase tracking-widest hover:bg-slate-50 transition-colors text-xs">
            Cancel
          </button>
          <button
            onClick={() => validate() && onSave(form)}
            className="flex-1 px-8 py-4 rounded-[24px] bg-slate-900 hover:bg-red-600 text-white font-black uppercase tracking-widest transition-all shadow-2xl shadow-slate-900/20 active:scale-95 text-xs"
          >
            {editData ? "Update Record" : "Confirm Onboarding"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function FormInput({ label, value, onChange, error, placeholder }: { label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label} {error && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-slate-50 border rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all ${
          error ? "border-red-300 ring-4 ring-red-500/5" : "border-slate-200"
        }`}
      />
    </div>
  );
}
