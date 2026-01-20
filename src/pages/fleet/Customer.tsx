import React, { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  User,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building2,
  X,
  CreditCard,
  Briefcase
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type CustomerType = "Individual" | "Corporate" | "VIP" | "Partner";

interface Customer {
  id: number;
  type: CustomerType;
  name: string;
  email: string;
  mobile: string;
  address: string;
  company?: string;
  totalBookings: number;
}

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "fleet_customers_v2";
const ITEMS_PER_PAGE = 8;

/* ================= DEFAULT DATA ================= */

const seedData: Customer[] = [
  {
    id: 1,
    type: "Individual",
    name: "Juliet May",
    email: "juliet.m@gmail.com",
    mobile: "+91 98754 21360",
    address: "52/2, Nehru Road, Vile Parle, Surat",
    totalBookings: 12
  },
  {
    id: 2,
    type: "Corporate",
    name: "Robert Fox",
    email: "robert@foxcorp.com",
    mobile: "+91 98754 21361",
    address: "Tech Park, HSR Layout, Bangalore",
    company: "Fox Corp",
    totalBookings: 45
  },
  {
    id: 3,
    type: "VIP",
    name: "Eleanor Pena",
    email: "eleanor.p@hotmail.com",
    mobile: "+91 98754 21362",
    address: "Green Valley Estates, Pune",
    totalBookings: 8
  },
  {
    id: 4,
    type: "Partner",
    name: "Arjun Mehta",
    email: "arjun@travelgo.com",
    mobile: "+91 98754 21363",
    address: "Marine Drive, Mumbai",
    company: "TravelGo",
    totalBookings: 128
  }
];

/* ================= MAIN COMPONENT ================= */

export default function Customer() {
  const [customers, setCustomers] = useState<Customer[]>(() => {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewDetails, setViewDetails] = useState<Customer | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  }, [customers]);

  /* ---------- ACTIONS ---------- */

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this customer? This will remove all history.")) {
      setCustomers(prev => prev.filter(c => c.id !== id));
      toast.success("Customer removed from directory", {
        icon: '🗑️',
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
    }
  };

  const handleSave = (customerData: Customer) => {
    if (selectedCustomer) {
      setCustomers(prev => prev.map(c => c.id === customerData.id ? customerData : c));
      toast.success("Customer profile updated");
    } else {
      setCustomers(prev => [...prev, { ...customerData, id: Date.now(), totalBookings: 0 }]);
      toast.success("New customer added successfully");
    }
    setShowForm(false);
    setSelectedCustomer(null);
  };

  /* ---------- FILTER & PAGINATION ---------- */

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Customer Directory
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <User size={16} />
              Fleet Management › Client Relations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group flex-1 md:flex-none">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>

            <div className="flex border border-slate-200 rounded-2xl bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "table"
                    ? "bg-red-400 text-white shadow-lg shadow-red-400/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <TableIcon size={20} />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "card"
                    ? "bg-red-400 text-white shadow-lg shadow-red-400/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedCustomer(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Client</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Clients" value={customers.length.toString()} icon={<User size={24} />} color="bg-blue-500" />
          <StatCard title="Corporate" value={customers.filter(c => c.type === "Corporate").length.toString()} icon={<Building2 size={24} />} color="bg-indigo-500" />
          <StatCard title="VIP Accounts" value={customers.filter(c => c.type === "VIP").length.toString()} icon={<CreditCard size={24} />} color="bg-emerald-500" />
          <StatCard title="Total Revenue" value="₹12.4L" icon={<Briefcase size={24} />} color="bg-rose-500" />
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Client Info", "Category", "Contact", "Address", "Engagement", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 text-red-600 flex items-center justify-center font-black text-lg border border-red-200 group-hover:scale-110 transition-transform shadow-sm">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-base">{c.name}</div>
                            <div className="text-xs text-slate-400 font-medium">{c.company || "Individual"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge type={c.type} />
                      </td>
                      <td className="px-8 py-5">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                            <Mail size={12} className="text-slate-300" />
                            {c.email}
                          </div>
                          <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
                            <Phone size={12} className="text-slate-300" />
                            {c.mobile}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="max-w-[200px]">
                          <div className="text-sm font-bold text-slate-600 truncate">{c.address}</div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-slate-500 font-black text-xs">
                        {c.totalBookings} BOOKINGS
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(c)} icon={<Eye size={18} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedCustomer(c); setShowForm(true); }} icon={<Pencil size={18} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(c.id)} icon={<Trash2 size={18} />} />
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
            {paginated.map((c) => (
              <div key={c.id} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/5 rounded-bl-[120px] -mr-10 -mt-10 transition-all group-hover:scale-125"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="h-16 w-16 rounded-[24px] bg-gradient-to-br from-red-400 to-red-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-red-400/30">
                    {c.name.charAt(0)}
                  </div>
                  <StatusBadge type={c.type} />
                </div>

                <div className="mb-8">
                  <h3 className="font-black text-xl text-slate-900 line-clamp-1">{c.name}</h3>
                  <p className="text-sm text-red-500 font-black mt-1 uppercase tracking-wider">{c.company || "Individual Client"}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <Mail size={16} className="text-slate-400" />
                    <span className="truncate">{c.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="truncate">{c.address}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
                  <button onClick={() => setViewDetails(c)} className="flex-1 py-3.5 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-black uppercase transition-colors">History</button>
                  <button onClick={() => { setSelectedCustomer(c); setShowForm(true); }} className="p-3.5 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Pencil size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> Clients
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
          <CustomerForm
            customer={selectedCustomer}
            onClose={() => setShowForm(false)}
            onSave={handleSave}
          />
        )}

        {/* Details View */}
        {viewDetails && (
          <CustomerDetails
            customer={viewDetails}
            onClose={() => setViewDetails(null)}
          />
        )}
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-bl-[80px] -mr-8 -mt-8`}></div>
      <div className="flex items-center gap-5">
        <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-white flex items-center justify-center`}>
          <div className={`${color.replace('bg-', 'text-')}`}>
            {icon}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ type }: { type: CustomerType }) {
  const styles = {
    Individual: "bg-blue-50 text-blue-600 border-blue-100",
    Corporate: "bg-indigo-50 text-indigo-600 border-indigo-100",
    VIP: "bg-amber-50 text-amber-600 border-amber-100",
    Partner: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${styles[type]}`}>
      {type}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: 'blue' | 'orange' | 'red', onClick: () => void, icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-500 hover:bg-blue-50",
    orange: "text-orange-500 hover:bg-orange-50",
    red: "text-red-500 hover:bg-red-50"
  };
  return (
    <button onClick={onClick} className={`p-3 rounded-xl transition-all active:scale-90 ${styles[color]}`}>
      {icon}
    </button>
  );
}

/* ---------- CUSTOMER FORM MODAL ---------- */

function CustomerForm({ customer, onClose, onSave }: { customer: Customer | null, onClose: () => void, onSave: (c: Customer) => void }) {
  const [formData, setFormData] = useState<Customer>(customer || {
    id: 0,
    type: "Individual",
    name: "",
    email: "",
    mobile: "",
    address: "",
    company: "",
    totalBookings: 0
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col border border-white/20">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{customer ? "Edit Profile" : "Register Client"}</h2>
            <p className="text-slate-500 text-sm font-bold mt-1 italic">Customer relationship management</p>
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
                placeholder="Client name"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Type</label>
              <select
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold focus:ring-4 focus:ring-red-400/10 transition-all appearance-none cursor-pointer"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as CustomerType })}
              >
                <option value="Individual">Individual</option>
                <option value="Corporate">Corporate</option>
                <option value="VIP">VIP Account</option>
                <option value="Partner">Strategic Partner</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                placeholder="client@example.com"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
              <input
                type="text"
                placeholder="+91 00000 00000"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.mobile}
                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Company (Optional)</label>
              <input
                type="text"
                placeholder="Organization name if corporate"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mailing Address</label>
              <textarea
                placeholder="Complete address for billing"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all min-h-[100px]"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
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
            {customer ? "Update Profile" : "Register Client"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- CUSTOMER DETAILS MODAL ---------- */

function CustomerDetails({ customer, onClose }: { customer: Customer, onClose: () => void }) {
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
              <div className="w-full h-full rounded-[36px] bg-red-50 flex items-center justify-center text-red-500 text-5xl font-black shadow-inner">
                {customer.name.charAt(0)}
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">{customer.name}</h2>
            <div className="mt-3">
              <StatusBadge type={customer.type} />
            </div>
          </div>

          <div className="mt-12 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <DetailBox icon={<Mail size={18} />} label="Email Address" value={customer.email} />
              <DetailBox icon={<Phone size={18} />} label="Contact Number" value={customer.mobile} />
              <DetailBox icon={<Building2 size={18} />} label="Organization" value={customer.company || "Personal Account"} />
              <DetailBox icon={<MapPin size={18} />} label="City/Region" value={customer.address.split(',').pop() || "Not Set"} />
            </div>

            <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lifetime Value</span>
                <span className="text-red-500 font-black text-xs">Tier 1 Client</span>
              </div>
              <div className="flex items-end gap-3">
                <div className="text-4xl font-black text-slate-900">{customer.totalBookings}</div>
                <div className="text-sm font-bold text-slate-400 pb-1.5 uppercase tracking-tighter">Total Successful Bookings</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-6 rounded-[24px] bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl active:scale-[0.98]"
            >
              Back to Directory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-4 bg-slate-50 rounded-[20px] flex items-start gap-3 border border-slate-100 overflow-hidden">
      <div className="text-red-400 mt-1 flex-shrink-0">{icon}</div>
      <div className="overflow-hidden">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-black text-slate-700 truncate">{value}</p>
      </div>
    </div>
  );
}
