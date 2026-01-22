import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Shield,
  Lock,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  LayoutGrid,
  Table as TableIcon,
  Users,
  Settings,
  Eye,
  Calendar
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

interface Permission {
  id: string;
  name: string;
  description: string;
  category: "General" | "Fleet" | "HR" | "System";
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[]; // Array of permission IDs
  memberCount: number;
  status: "Active" | "Inactive";
  createdAt: string;
}

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "staff_management_roles";
const ITEMS_PER_PAGE = 8;

const AVAILABLE_PERMISSIONS: Permission[] = [
  { id: "view_dashboard", name: "View Dashboard", description: "Access to main dashboard overview", category: "General" },
  { id: "manage_users", name: "Manage Users", description: "Create, edit and delete system users", category: "System" },
  { id: "manage_roles", name: "Manage Roles", description: "Configure system roles and permissions", category: "System" },
  { id: "view_fleet", name: "View Fleet", description: "View vehicle inventory and status", category: "Fleet" },
  { id: "manage_fleet", name: "Manage Fleet", description: "Add and edit vehicles in the fleet", category: "Fleet" },
  { id: "perform_inspections", name: "Perform Inspections", description: "Conduct and log vehicle inspections", category: "Fleet" },
  { id: "manage_hr", name: "Manage HR", description: "Access employee records and HR tools", category: "HR" },
  { id: "view_reports", name: "View Reports", description: "Access analytical reports and logs", category: "General" },
];

/* ================= DEFAULT DATA ================= */

const defaultRoles: Role[] = [
  { 
    id: 1, 
    name: "Administrator", 
    description: "Full system access with all permissions enabled.", 
    permissions: AVAILABLE_PERMISSIONS.map(p => p.id),
    memberCount: 2,
    status: "Active", 
    createdAt: "2024-01-01" 
  },
  { 
    id: 2, 
    name: "HR Manager", 
    description: "Access to personnel management and HR operations.", 
    permissions: ["view_dashboard", "manage_hr", "view_reports"],
    memberCount: 3,
    status: "Active", 
    createdAt: "2024-02-15" 
  },
  { 
    id: 3, 
    name: "Fleet Supervisor", 
    description: "Supervise vehicle maintenance and fleet operations.", 
    permissions: ["view_dashboard", "view_fleet", "manage_fleet", "perform_inspections", "view_reports"],
    memberCount: 5,
    status: "Active", 
    createdAt: "2024-03-10" 
  },
];

/* ================= MAIN COMPONENT ================= */

export default function RoleList() {
  const [roles, setRoles] = useState<Role[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultRoles;
      }
    } catch {
      return defaultRoles;
    }
    return defaultRoles;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [viewDetails, setViewDetails] = useState<Role | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
  }, [roles]);

  /* ---------- ACTIONS ---------- */

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this role? This cannot be undone.")) {
      const updated = roles.filter((r) => r.id !== id);
      setRoles(updated);
      toast.success("Role deleted successfully");
    }
  };

  const handleSave = (roleData: Role) => {
    if (selectedRole) {
      setRoles(prev => prev.map(r => r.id === roleData.id ? roleData : r));
      toast.success("Role permissions updated");
    } else {
      setRoles(prev => [...prev, { ...roleData, id: Date.now(), createdAt: new Date().toISOString().split('T')[0], memberCount: 0 }]);
      toast.success("New role created successfully");
    }
    setShowForm(false);
    setSelectedRole(null);
  };

  /* ---------- FILTER & PAGINATION ---------- */

  const filtered = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Roles & Permissions
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Define system roles and capability sets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-sm w-full md:w-64"
              />
            </div>

            <div className="flex bg-slate-200/50 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setViewMode("table")} 
                className={`p-2 rounded-md transition-all ${viewMode === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <TableIcon size={18} />
              </button>
              <button 
                onClick={() => setViewMode("card")} 
                className={`p-2 rounded-md transition-all ${viewMode === "card" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => { setSelectedRole(null); setShowForm(true); }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span>Create Role</span>
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
                    {["Role Name", "Description", "Permissions", "Users", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((role) => (
                    <tr key={role.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                            <Shield size={18} />
                          </div>
                          <div className="font-semibold text-slate-900">{role.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-slate-500 line-clamp-1 font-medium">{role.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                          {role.permissions.length} Assigned
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600 font-bold">
                          <Users size={14} className="text-slate-400" />
                          {role.memberCount}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={role.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <ActionBtn color="blue" onClick={() => setViewDetails(role)} icon={<Eye size={16} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedRole(role); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(role.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((role) => (
              <div key={role.id} className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 text-slate-900 flex items-center justify-center font-bold border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <ShieldCheck size={24} />
                  </div>
                  <StatusBadge status={role.status} />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{role.name}</h3>
                  <p className="text-sm text-slate-500 font-medium line-clamp-2 h-10">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-7 w-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {i}
                        </div>
                      ))}
                      {role.memberCount > 3 && (
                        <div className="h-7 w-7 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                          +{role.memberCount - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Members</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {role.permissions.slice(0, 3).map(pId => {
                      const p = AVAILABLE_PERMISSIONS.find(ap => ap.id === pId);
                      return (
                        <span key={pId} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md text-[9px] font-bold uppercase border border-slate-100">
                          {p?.name}
                        </span>
                      );
                    })}
                    {role.permissions.length > 3 && (
                      <span className="px-2 py-0.5 bg-slate-900 text-white rounded-md text-[9px] font-bold">
                        +{role.permissions.length - 3} More
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewDetails(role)} className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-900 font-bold text-sm transition-all hover:bg-slate-200 active:scale-95">
                    Permissions
                  </button>
                  <button onClick={() => { setSelectedRole(role); setShowForm(true); }} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
                    <Settings size={18} />
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
              Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-bold">{filtered.length}</span> roles
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
          <RoleForm
            role={selectedRole}
            onClose={() => setShowForm(false)}
            onSave={handleSave}
          />
        )}

        {viewDetails && (
          <RoleDetails
            role={viewDetails}
            onClose={() => setViewDetails(null)}
          />
        )}
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatusBadge({ status }: { status: "Active" | "Inactive" }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Inactive: "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
        status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
      }`}></span>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: 'blue' | 'orange' | 'red' | 'brand', onClick: () => void, icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-100",
    orange: "text-orange-600 hover:bg-orange-50 border-transparent hover:border-orange-100",
    red: "text-red-600 hover:bg-red-50 border-transparent hover:border-red-100",
    brand: "text-slate-900 hover:bg-slate-50 border-transparent hover:border-slate-200"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-lg transition-all active:scale-95 border ${styles[color]}`}>
      {icon}
    </button>
  );
}

/* ---------- ROLE FORM MODAL ---------- */

function RoleForm({ role, onClose, onSave }: { role: Role | null, onClose: () => void, onSave: (r: Role) => void }) {
  const [formData, setFormData] = useState<Role>(role || {
    id: 0,
    name: "",
    description: "",
    permissions: [],
    memberCount: 0,
    status: "Active",
    createdAt: new Date().toISOString().split('T')[0],
  });

  const togglePermission = (id: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(id)
        ? prev.permissions.filter(p => p !== id)
        : [...prev.permissions, id]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{role ? "Edit Role" : "Create New Role"}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900"
                  placeholder="e.g. Fleet Manager"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900 resize-none"
                  placeholder="What can this role do?"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900 appearance-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Permissions Scope</label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-[300px] overflow-y-auto space-y-2 custom-scrollbar">
                {AVAILABLE_PERMISSIONS.map(p => (
                  <label key={p.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(p.id)}
                      onChange={() => togglePermission(p.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{p.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{p.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
            >
              {role ? "Save Changes" : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- ROLE DETAILS MODAL ---------- */

function RoleDetails({ role, onClose }: { role: Role, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{role.name}</h3>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Role Permissions Audit</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Description</p>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">{role.description}</p>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Granted Permissions ({role.permissions.length})</p>
            <div className="grid grid-cols-1 gap-2 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
              {role.permissions.map(pId => {
                const p = AVAILABLE_PERMISSIONS.find(ap => ap.id === pId);
                return (
                  <div key={pId} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{p?.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{p?.category}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <div className="flex-1 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Users Assigned</p>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Users size={16} className="text-slate-400" />
                {role.memberCount} Personnel
              </div>
            </div>
            <div className="flex-1 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Created Date</p>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Calendar size={16} className="text-slate-400" />
                {role.createdAt}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
}
