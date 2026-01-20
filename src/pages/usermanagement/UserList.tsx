import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Eye,
  LayoutGrid,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  Mail,
  Shield,
  Calendar,
  Lock,
  X
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type UserStatus = "Active" | "Inactive" | "Suspended";
type UserRole = "Admin" | "HR" | "Manager" | "Employee";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  password?: string;
}

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "staff_management_users";
const ITEMS_PER_PAGE = 8;

/* ================= DEFAULT DATA ================= */

const defaultUsers: User[] = [
  { id: 1, name: "HR Admin", email: "hr@carify.com", role: "HR", status: "Active", createdAt: "2025-09-19" },
  { id: 2, name: "Brett Conroy", email: "brett.c@carify.com", role: "Manager", status: "Active", createdAt: "2025-08-15" },
  { id: 3, name: "Jessica Miller", email: "jess.m@carify.com", role: "Employee", status: "Active", createdAt: "2024-07-21" },
  { id: 4, name: "David Chen", email: "david.c@carify.com", role: "Employee", status: "Inactive", createdAt: "2024-06-11" },
  { id: 5, name: "Sarah Jones", email: "sarah.j@carify.com", role: "Admin", status: "Active", createdAt: "2023-01-10" },
  { id: 6, name: "Michael Rodriguez", email: "michael.r@carify.com", role: "Employee", status: "Suspended", createdAt: "2023-03-25" },
];

/* ================= MAIN COMPONENT ================= */

export default function UserList() {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultUsers;
      }
    } catch {
      return defaultUsers;
    }
    return defaultUsers;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "table">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewDetails, setViewDetails] = useState<User | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  /* ---------- ACTIONS ---------- */

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      toast.success("User deleted successfully", {
        icon: '🗑️',
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
    }
  };

  const handleSave = (userData: User) => {
    if (selectedUser) {
      setUsers(prev => prev.map(u => u.id === userData.id ? userData : u));
      toast.success("User updated successfully");
    } else {
      setUsers(prev => [...prev, { ...userData, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] }]);
      toast.success("New user added successfully");
    }
    setShowForm(false);
    setSelectedUser(null);
  };

  /* ---------- FILTER & PAGINATION ---------- */

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-brand rounded-full"></span>
              User Management
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <UserIcon size={16} />
              System Administration › Staff & Permissions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group flex-1 md:flex-none">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-full md:w-64 shadow-sm font-medium"
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
                setSelectedUser(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-brand hover:opacity-90 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-brand/20 active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Add User</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["User Info", "Role", "Status", "Created At", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold text-sm uppercase group-hover:scale-110 transition-transform">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{user.name}</div>
                            <div className="text-xs text-slate-400 font-medium">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-brand/5 text-brand rounded-full text-[10px] font-bold uppercase tracking-wide border border-brand/10">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium italic">
                        {user.createdAt}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(user)} icon={<Eye size={16} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedUser(user); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="brand" onClick={() => handleDelete(user.id)} icon={<Trash2 size={16} />} />
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
            {paginated.map((user) => (
              <div key={user.id} className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-110"></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-brand text-white flex items-center justify-center font-black text-xl shadow-lg shadow-brand/20">
                    {user.name.charAt(0)}
                  </div>
                  <StatusBadge status={user.status} />
                </div>

                <div className="mb-6">
                  <h3 className="font-black text-lg text-slate-900 line-clamp-1">{user.name}</h3>
                  <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5 mt-1">
                    <Mail size={14} className="text-slate-300" />
                    {user.email}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-tighter">Designation</span>
                    <span className="px-3 py-1 bg-brand/5 text-brand rounded-full font-black text-[10px] border border-brand/10">{user.role}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-tighter">Joined On</span>
                    <span className="text-slate-700 font-black">{user.createdAt}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewDetails(user)} className="flex-1 py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors">Details</button>
                  <button onClick={() => { setSelectedUser(user); setShowForm(true); }} className="p-2.5 rounded-xl bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(user.id)} className="p-2.5 rounded-xl text-slate-300 hover:text-brand hover:bg-brand/10 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-bold">{filtered.length}</span> personnel
            </p>
            <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center px-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === i + 1 ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        {showForm && (
          <UserForm
            user={selectedUser}
            onClose={() => setShowForm(false)}
            onSave={handleSave}
          />
        )}

        {viewDetails && (
          <UserDetails
            user={viewDetails}
            onClose={() => setViewDetails(null)}
          />
        )}
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatusBadge({ status }: { status: UserStatus }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Inactive: "bg-slate-100 text-slate-500 border-slate-200",
    Suspended: "bg-amber-50 text-amber-600 border-amber-100"
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
        status === 'Active' ? 'bg-emerald-500 animate-pulse' : 
        status === 'Suspended' ? 'bg-amber-500' : 'bg-slate-400'
      }`}></span>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: 'blue' | 'orange' | 'brand', onClick: () => void, icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-500 hover:bg-blue-50 border-blue-100",
    orange: "text-orange-500 hover:bg-orange-50 border-orange-100",
    brand: "text-brand hover:bg-brand/10 border-brand/10"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-xl transition-all active:scale-90 border border-transparent ${styles[color]}`}>
      {icon}
    </button>
  );
}

/* ---------- USER FORM MODAL ---------- */

function UserForm({ user, onClose, onSave }: { user: User | null, onClose: () => void, onSave: (u: User) => void }) {
  const [formData, setFormData] = useState<User>(user || {
    id: 0,
    name: "",
    email: "",
    role: "Employee",
    status: "Active",
    createdAt: new Date().toISOString().split('T')[0],
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
        <div className="bg-slate-900 p-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 rounded-bl-full -mr-16 -mt-16 blur-2xl"></div>
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <div className="h-14 w-14 rounded-2xl bg-brand flex items-center justify-center mb-4 shadow-lg shadow-brand/20">
            <UserIcon size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">{user ? "Edit Personnel" : "Onboard Staff"}</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Fill in the professional details below.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all font-medium"
                  placeholder="e.g. Alexander Pierce"
                />
              </div>
            </div>

            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all font-medium"
                  placeholder="alexander@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Designation</label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all font-bold text-slate-700 appearance-none"
                >
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as UserStatus })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all font-bold text-slate-700"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            
            {!user && (
              <div className="col-span-2 space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    type="password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95">Cancel</button>
            <button type="submit" className="flex-[2] bg-brand hover:opacity-90 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-lg shadow-brand/20 active:scale-95">
              {user ? "Save Changes" : "Onboard User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- DETAILS MODAL ---------- */

function UserDetails({ user, onClose }: { user: User, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
        <div className="relative h-32 bg-slate-900">
          <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full scale-150"></div>
          <button onClick={onClose} className="absolute top-6 right-6 h-10 w-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white transition-all">
            <X size={20} />
          </button>
        </div>
        
        <div className="px-8 pb-10">
          <div className="relative -mt-16 mb-6">
            <div className="h-32 w-32 rounded-[40px] bg-white p-2 shadow-2xl mx-auto border border-slate-50">
              <div className="h-full w-full rounded-[32px] bg-brand/10 text-brand flex items-center justify-center font-black text-4xl border border-brand/20 uppercase">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>

          <div className="text-center space-y-1 mb-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h2>
            <p className="text-slate-400 font-bold text-sm">{user.email}</p>
            <div className="pt-3">
              <StatusBadge status={user.status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-[24px] border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Shield size={10} className="text-brand" /> Role
              </p>
              <p className="text-sm font-black text-slate-700">{user.role}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-[24px] border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Calendar size={10} className="text-brand" /> Joined
              </p>
              <p className="text-sm font-black text-slate-700">{user.createdAt}</p>
            </div>
            <div className="col-span-2 p-4 bg-slate-50 rounded-[24px] border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Internal Reference ID</p>
              <p className="text-sm font-bold text-slate-700 font-mono tracking-tighter">USR-{user.id}-X92</p>
            </div>
          </div>

          <button onClick={onClose} className="w-full mt-8 py-4 bg-slate-900 text-white rounded-[24px] font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
            Dismiss Profile
          </button>
        </div>
      </div>
    </div>
  );
}
