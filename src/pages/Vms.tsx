import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  ShieldCheck,
  Plus,
  Search,
  Star,
  FileText,
  DollarSign,
  Briefcase,
  Truck,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  MapPin,
  CheckCircle
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type VendorStatus = "Verified" | "Pending" | "Blacklisted" | "Under Review";

interface Vendor {
  id: string;
  name: string;
  category: "Parts" | "Services" | "Logistics" | "IT" | "Other";
  rating: number;
  contactPerson: string;
  email: string;
  status: VendorStatus;
  activeContracts: number;
  totalSpend: number;
}

type NewVendorData = Pick<Vendor, "name" | "category" | "contactPerson" | "email">;

/* ================= CONSTANTS ================= */

const VMS_STORAGE_KEY = "erp_vms_vendors";
const ITEMS_PER_PAGE = 8;

/* ================= DEFAULT DATA ================= */

const defaultVendors: Vendor[] = [
  { id: "VEN-001", name: "AutoParts Global", category: "Parts", rating: 4.8, contactPerson: "John Doe", email: "john@autoparts.com", status: "Verified", activeContracts: 3, totalSpend: 1500000 },
  { id: "VEN-002", name: "Swift Logistics", category: "Logistics", rating: 4.5, contactPerson: "Sarah Smith", email: "sarah@swift.com", status: "Verified", activeContracts: 1, totalSpend: 450000 },
  { id: "VEN-003", name: "TechSolutions Inc", category: "IT", rating: 4.2, contactPerson: "Mike Ross", email: "mike@techsol.com", status: "Under Review", activeContracts: 0, totalSpend: 120000 },
  { id: "VEN-004", name: "Premium Oils Ltd", category: "Parts", rating: 3.9, contactPerson: "Emma Watson", email: "emma@premiumoils.com", status: "Verified", activeContracts: 2, totalSpend: 890000 },
  { id: "VEN-005", name: "Elite Security Services", category: "Services", rating: 4.9, contactPerson: "Robert Brown", email: "robert@elitesec.com", status: "Verified", activeContracts: 1, totalSpend: 250000 },
];

/* ================= MAIN COMPONENT ================= */

export default function VMS() {
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem(VMS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultVendors;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(VMS_STORAGE_KEY, JSON.stringify(vendors));
  }, [vendors]);

  /* ---------- CALCULATIONS ---------- */

  const totalSpend = vendors.reduce((acc, curr) => acc + curr.totalSpend, 0);
  const activeContracts = vendors.reduce((acc, curr) => acc + curr.activeContracts, 0);
  const avgRating = (vendors.reduce((acc, curr) => acc + curr.rating, 0) / (vendors.length || 1)).toFixed(1);

  const filtered = vendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  /* ---------- ACTIONS ---------- */
  
  const handleAddVendor = (vendorData: NewVendorData) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: `VEN-${Math.floor(Math.random() * 900 + 100)}`,
      rating: 5.0,
      activeContracts: 0,
      totalSpend: 0,
      status: "Under Review"
    };
    setVendors(prev => [newVendor, ...prev]);
    toast.success("Vendor registration submitted");
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this vendor from the directory?")) {
      setVendors(prev => prev.filter(v => v.id !== id));
      toast.success("Vendor removed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-brand rounded-full"></span>
              Vendor Ecosystem
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <ShieldCheck size={16} />
              VMS › Vendor Management & Procurement
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-64 shadow-sm font-medium"
              />
            </div>
            
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-brand hover:opacity-90 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Register Vendor</span>
              <span className="sm:hidden">Register</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Annual Procurement" value={`₹${(totalSpend / 1000000).toFixed(1)}M`} icon={<DollarSign size={24} />} trend="Total lifecycle spend" color="bg-emerald-500" />
          <StatCard title="Active Contracts" value={activeContracts.toString()} icon={<Briefcase size={24} />} trend="Across all vendors" color="bg-brand" />
          <StatCard title="Vendor Quality" value={avgRating} icon={<Star size={24} />} trend="Average rating" color="bg-amber-500" />
          <StatCard title="Total Vendors" value={vendors.length.toString()} icon={<Truck size={24} />} trend="Partnership count" color="bg-indigo-500" />
        </div>

        {/* Vendor Table */}
        <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Vendor Details", "Contact Person", "Performance", "Lifecycle Spend", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand/10 group-hover:text-brand transition-all">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-base">{vendor.name}</div>
                          <div className="text-xs text-slate-400 font-black uppercase tracking-widest">{vendor.category} • {vendor.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 text-sm">{vendor.contactPerson}</span>
                        <span className="text-xs text-slate-400">{vendor.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(vendor.rating) ? "currentColor" : "none"} className={i < Math.floor(vendor.rating) ? "" : "text-slate-200"} />
                          ))}
                        </div>
                        <span className="text-sm font-black text-slate-900">{vendor.rating}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-black text-slate-900 text-sm">
                      ₹{vendor.totalSpend.toLocaleString()}
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={vendor.status} />
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-2">
                        <button onClick={() => { setSelectedVendor(vendor); setShowVendorModal(true); }} className="p-2.5 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleDelete(vendor.id)} className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> Vendors
            </p>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-black transition-all ${currentPage === p ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    {p}
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
      </div>

      {/* Vendor Detail Modal */}
      {showVendorModal && selectedVendor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowVendorModal(false)}></div>
          <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/20">
                  <Briefcase size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedVendor.name}</h2>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{selectedVendor.id} • {selectedVendor.category}</p>
                </div>
              </div>
              <button onClick={() => setShowVendorModal(false)} className="p-3 rounded-2xl hover:bg-white transition-colors shadow-sm"><X size={20} /></button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Contact Details</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <Phone size={14} className="text-brand" /> +91 98765 43210
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <Mail size={14} className="text-brand" /> {selectedVendor.email}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                        <MapPin size={14} className="text-brand" /> Mumbai, Maharashtra, India
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Procurement Summary</label>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-slate-500">Active Contracts</span>
                        <span className="text-sm font-black text-slate-900">{selectedVendor.activeContracts}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-slate-500">Total Lifecycle Spend</span>
                        <span className="text-sm font-black text-brand">₹{selectedVendor.totalSpend.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Compliance & Performance</label>
                <div className="grid grid-cols-3 gap-4">
                  <ComplianceCard icon={<CheckCircle size={18} className="text-emerald-500" />} label="Tax Compliant" status="Verified" />
                  <ComplianceCard icon={<FileText size={18} className="text-blue-500" />} label="ISO Certified" status="Active" />
                  <ComplianceCard icon={<ShieldCheck size={18} className="text-indigo-500" />} label="Risk Score" status="Low" />
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">View Contracts</button>
                <button className="flex-1 py-4 rounded-2xl bg-brand text-white font-bold hover:opacity-90 transition-all shadow-lg active:scale-95">Initiate PO</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowAddForm(false)}></div>
          <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-black text-slate-900">New Vendor Registration</h2>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Onboarding & Compliance</p>
              </div>
              <button onClick={() => setShowAddForm(false)} className="p-3 rounded-2xl hover:bg-white transition-colors shadow-sm"><X size={20} /></button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data: NewVendorData = {
                name: formData.get("name") as string,
                category: formData.get("category") as Vendor["category"],
                contactPerson: formData.get("contactPerson") as string,
                email: formData.get("email") as string,
              };
              handleAddVendor(data);
            }} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vendor Name</label>
                <input name="name" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                <select name="category" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all">
                  <option value="Parts">Parts & Hardware</option>
                  <option value="Services">Maintenance Services</option>
                  <option value="Logistics">Logistics & Freight</option>
                  <option value="IT">IT & Software</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Contact</label>
                  <input name="contactPerson" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input name="email" type="email" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all">Discard</button>
                <button type="submit" className="flex-1 py-4 rounded-2xl bg-brand text-white font-bold hover:opacity-90 transition-all shadow-xl active:scale-95">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 p-8 rounded-[24px] shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-110`}></div>
      <div className="flex items-center gap-6 relative z-10">
        <div className={`h-16 w-16 rounded-[20px] ${color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
          <div className="flex flex-col">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
            <span className="text-[10px] font-black text-slate-400 mt-1">{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: VendorStatus }) {
  const configs: Record<VendorStatus, string> = {
    Verified: "bg-emerald-100 text-emerald-600 border-emerald-200",
    Pending: "bg-amber-100 text-amber-600 border-amber-200",
    Blacklisted: "bg-rose-100 text-rose-600 border-rose-200",
    "Under Review": "bg-blue-100 text-blue-600 border-blue-200",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${configs[status]}`}>
      {status}
    </span>
  );
}

interface ComplianceCardProps {
  icon: ReactNode;
  label: string;
  status: string;
}

function ComplianceCard({ icon, label, status }: ComplianceCardProps) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-4 flex flex-col items-center text-center gap-2">
      {icon}
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
      <span className="text-xs font-black text-slate-900">{status}</span>
    </div>
  );
}
