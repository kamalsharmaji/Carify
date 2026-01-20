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
  Eye
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
  { 
    id: 4, 
    name: "Standard Inspector", 
    description: "Primary role for performing vehicle safety checks.", 
    permissions: ["view_dashboard", "view_fleet", "perform_inspections"],
    memberCount: 12,
    status: "Active", 
    createdAt: "2024-05-20" 
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
      toast.success("Role deleted successfully", {
        icon: '🗑️',
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
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
    <div className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500 p-4 md:p-8">
      <div className="w-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-8 bg-brand rounded-full"></span>
              Roles & Permissions
            </h1>
            <p className="text-slate-500 mt-1 font-medium text-sm">
              Access Control › Define system roles and capability sets
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group flex-1 md:flex-none">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-full md:w-64"
              />
            </div>

            <div className="flex border border-slate-200 rounded-xl bg-white p-1 shadow-sm">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "table"
                    ? "bg-brand text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "card"
                    ? "bg-brand text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedRole(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-brand hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand/20 active:scale-95"
            >
              <Plus size={18} strokeWidth={3} />
              <span className="hidden sm:inline">Create Role</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["Role Name", "Description", "Permissions", "Users", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((role) => (
                    <tr key={role.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold text-sm border border-brand/20 group-hover:scale-110 transition-transform">
                            <Shield size={18} />
                          </div>
                          <div className="font-bold text-slate-900">{role.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-slate-500 line-clamp-1">{role.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-brand/10 text-brand rounded-full text-[10px] font-bold uppercase">
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
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(role)} icon={<Eye size={16} />} />
                          <ActionBtn color="brand" onClick={() => { setSelectedRole(role); setShowForm(true); }} icon={<Pencil size={16} />} />
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
              <div key={role.id} className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-110"></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-brand text-white flex items-center justify-center font-black shadow-lg shadow-brand/20">
                    <ShieldCheck size={24} />
                  </div>
                  <StatusBadge status={role.status} />
                </div>

                <div className="mb-6">
                  <h3 className="font-black text-xl text-slate-900 mb-2">{role.name}</h3>
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
                        <div className="h-7 w-7 rounded-full bg-brand/10 border-2 border-white flex items-center justify-center text-[10px] font-black text-brand">
                          +{role.memberCount - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Active Members</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {role.permissions.slice(0, 3).map(pId => {
                      const p = AVAILABLE_PERMISSIONS.find(ap => ap.id === pId);
                      return (
                        <span key={pId} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md text-[9px] font-bold uppercase">
                          {p?.name}
                        </span>
                      );
                    })}
                    {role.permissions.length > 3 && (
                      <span className="px-2 py-0.5 bg-brand/10 text-brand rounded-md text-[9px] font-bold">
                        +{role.permissions.length - 3} More
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-6 pt-4 border-t border-slate-50">
                  <button onClick={() => setViewDetails(role)} className="flex-1 py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors">Permissions</button>
                  <button onClick={() => { setSelectedRole(role); setShowForm(true); }} className="p-2.5 rounded-xl bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all"><Settings size={16} /></button>
                  <button onClick={() => handleDelete(role.id)} className="p-2.5 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-bold">{filtered.length}</span> roles
            </p>
            <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center px-1 gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-9 w-9 rounded-xl text-xs font-black transition-all ${
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

        {/* Role Form Modal */}
        {showForm && (
          <RoleForm
            role={selectedRole}
            onClose={() => setShowForm(false)}
            onSave={handleSave}
          />
        )}

        {/* Role Details Modal */}
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
    Active: "bg-green-50 text-green-600 border-green-100",
    Inactive: "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      <div className={`h-1.5 w-1.5 rounded-full ${status === "Active" ? "bg-green-500" : "bg-slate-400"}`}></div>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: 'blue' | 'brand' | 'red', onClick: () => void, icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-500 hover:bg-blue-50",
    brand: "text-brand hover:bg-brand/10",
    red: "text-red-500 hover:bg-red-50"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-xl transition-all active:scale-90 ${styles[color]}`}>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900">{role ? "Edit Role" : "Create New Role"}</h2>
            <p className="text-slate-500 text-sm font-medium">Configure access level and permissions</p>
          </div>
          <button onClick={onClose} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-brand hover:border-brand/20 transition-all shadow-sm">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Role Name</label>
                <input
                  type="text"
                  placeholder="e.g. Operations Manager"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                <textarea
                  placeholder="Describe the responsibilities of this role..."
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all min-h-[100px]"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Permissions</label>
                  <span className="text-[10px] font-black text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                    {formData.permissions.length} Selected
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AVAILABLE_PERMISSIONS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => togglePermission(p.id)}
                      className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                        formData.permissions.includes(p.id)
                          ? "border-brand bg-brand/5"
                          : "border-slate-100 hover:border-slate-200 bg-white"
                      }`}
                    >
                      <div className={`mt-0.5 h-4 w-4 rounded border-2 flex items-center justify-center transition-all ${
                        formData.permissions.includes(p.id) ? "bg-brand border-brand" : "border-slate-300"
                      }`}>
                        {formData.permissions.includes(p.id) && <CheckCircle2 size={10} className="text-white" />}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${formData.permissions.includes(p.id) ? "text-brand" : "text-slate-700"}`}>
                          {p.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                          {p.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 flex gap-3 bg-slate-50/50">
          <button onClick={onClose} className="flex-1 px-6 py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-white transition-all">
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={!formData.name}
            className="flex-[2] px-6 py-3.5 rounded-2xl bg-brand text-white font-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand/20 transition-all"
          >
            {role ? "Update Role" : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- ROLE DETAILS MODAL ---------- */

function RoleDetails({ role, onClose }: { role: Role, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden relative">
        <div className="h-24 bg-gradient-to-r from-red-400 to-red-500"></div>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30 transition-all">
          <X size={20} />
        </button>

        <div className="px-8 pb-8 -mt-12">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-[32px] bg-white p-2 shadow-xl mb-4">
              <div className="w-full h-full rounded-[24px] bg-red-50 flex items-center justify-center text-red-500">
                <Shield size={40} />
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{role.name}</h2>
            <div className="mt-1">
              <StatusBadge status={role.status} />
            </div>
            <p className="mt-4 text-slate-500 font-medium text-sm leading-relaxed">
              {role.description}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="bg-slate-50 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Permissions Overview</span>
                <span className="text-xs font-black text-slate-900">{role.permissions.length} Enabled</span>
              </div>
              
              <div className="space-y-2">
                {AVAILABLE_PERMISSIONS.map(p => (
                  <div key={p.id} className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${role.permissions.includes(p.id) ? "text-slate-700" : "text-slate-300 line-through decoration-red-200"}`}>
                      {p.name}
                    </span>
                    {role.permissions.includes(p.id) ? (
                      <CheckCircle2 size={14} className="text-green-500" />
                    ) : (
                      <Lock size={12} className="text-slate-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="text-center">
                <div className="text-lg font-black text-slate-900">{role.memberCount}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Users</div>
              </div>
              <div className="w-px h-8 bg-slate-100"></div>
              <div className="text-center">
                <div className="text-lg font-black text-slate-900">{role.createdAt}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Created</div>
              </div>
              <div className="w-px h-8 bg-slate-100"></div>
              <div className="text-center">
                <div className="text-lg font-black text-slate-900">{role.id % 100}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Log ID</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Dismiss View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
