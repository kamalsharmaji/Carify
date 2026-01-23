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
  User ,
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
      toast.success("User deleted successfully");
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
    <div className="min-h-screen bg-slate-50  animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-2xl font-bold text-slate-900  pl-2 md:pl-3 lg:pl-0">
                User Management
              </h1>
              <p className="text-slate-500 mt-1 font-medium  pl-2 md:pl-3 lg:pl-0">
                Manage system access and workforce permissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-sm w-full md:w-64"
              />
            </div>

            <div className="flex bg-slate-200/50 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setViewMode("table")} 
                className={`p-2 rounded-md transition-all ${viewMode === "table" ? "bg-white text-red-500 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <TableIcon size={18} />
              </button>
              <button 
                onClick={() => setViewMode("card")} 
                className={`p-2 rounded-md transition-all ${viewMode === "card" ? "bg-white text-red-500 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => { setSelectedUser(null); setShowForm(true); }}
              className="flex items-center gap-2 bg-red-500 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span>Add Personnel</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["User Specification", "Access Role", "Security Status", "Created On", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs border border-slate-200 group-hover:bg-red-500 group-hover:text-white transition-colors">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {user.createdAt}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <ActionBtn color="blue" onClick={() => setViewDetails(user)} icon={<Eye size={16} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedUser(user); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(user.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {paginated.map((user) => (
              <div key={user.id} className="group bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-900 flex items-center justify-center font-bold text-lg border border-slate-200 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    {user.name.charAt(0)}
                  </div>
                  <StatusBadge status={user.status} />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{user.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 mt-1 font-medium text-sm">
                    <Mail size={14} className="text-slate-400" />
                    {user.email}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 py-4 border-y border-slate-50">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Access Role</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-bold text-[10px] uppercase tracking-wider">{user.role}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewDetails(user)} className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-900 font-bold text-sm transition-all hover:bg-slate-200 active:scale-95">
                    Details
                  </button>
                  <button onClick={() => { setSelectedUser(user); setShowForm(true); }} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
                    <Pencil size={18} />
                  </button>
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
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center px-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-8 w-8 rounded-md text-xs font-bold transition-all ${
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
                className="p-1.5 rounded-md hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
              >
                <ChevronRight size={18} />
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
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
        status === 'Active' ? 'bg-emerald-500' : 
        status === 'Suspended' ? 'bg-amber-500' : 'bg-slate-400'
      }`}></span>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: 'blue' | 'orange' | 'red', onClick: () => void, icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-100",
    orange: "text-orange-600 hover:bg-orange-50 border-transparent hover:border-orange-100",
    red: "text-red-600 hover:bg-red-50 border-transparent hover:border-red-100"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-lg transition-all active:scale-95 border ${styles[color]}`}>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Plus className="text-white w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{user ? "Edit Personnel" : "Add Personnel"}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900"
              placeholder="john@carify.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Access Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900 appearance-none"
              >
                <option value="Admin">Admin</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900 appearance-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {!user && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Temporary Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  required
                  type="password"
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
            >
              {user ? "Update User" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- USER DETAILS MODAL ---------- */

function UserDetails({ user, onClose }: { user: User, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        <div className="relative h-32 bg-slate-900">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
            <X size={20} />
          </button>
        </div>
        
        <div className="px-6 pb-6">
          <div className="relative -mt-12 mb-6">
            <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-xl mx-auto border border-slate-50">
              <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-4xl font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900">{user.name}</h3>
            <p className="text-slate-500 font-medium">{user.email}</p>
            <div className="mt-4 flex justify-center">
              <StatusBadge status={user.status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Access Role</p>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Shield size={16} className="text-slate-400" />
                {user.role}
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Member Since</p>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Calendar size={16} className="text-slate-400" />
                {user.createdAt}
              </div>
            </div>
            <div className="col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Last Authentication</p>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Lock size={16} className="text-slate-400" />
                Jan 21, 2026 • 14:25 PM
              </div>
            </div>
          </div>

          <button onClick={onClose} className="w-full mt-8 py-2.5 bg-red-500 text-white rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
