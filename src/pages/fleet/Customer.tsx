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
  Briefcase,
  Users,
  ShieldCheck,
  Zap,
  MoreHorizontal
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
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-8 p-6 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Client <span className="text-indigo-600">Directory</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">Fleet Management</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Client Relations</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search clients..."
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
                <TableIcon size={18} data-testid="table-icon" />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "card" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid size={18} data-testid="layout-grid-icon" />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedCustomer(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>Register Client</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users className="text-indigo-600" />} label="Total Registered" value={customers.length} />
        <StatCard icon={<Building2 className="text-indigo-600" />} label="Corporate Assets" value={customers.filter(c => c.type === "Corporate").length} />
        <StatCard icon={<ShieldCheck className="text-indigo-600" />} label="VIP Accounts" value={customers.filter(c => c.type === "VIP").length} />
        <StatCard icon={<Zap className="text-indigo-600" />} label="Gross Engagement" value="₹12.4L" />
      </div>

      {/* --- Main Content Area --- */}
      <main className="transition-all duration-300">
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {[
                      "Client Profile",
                      "Classification",
                      "Contact Vector",
                      "Geographical Hub",
                      "Engagement",
                      "Operations",
                    ].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {c.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {c.company || "Individual Account"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge type={c.type} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                            <Mail size={12} className="text-slate-400" />
                            {c.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <Phone size={12} className="text-slate-400" />
                            {c.mobile}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-[200px]">
                          <div className="text-sm font-medium text-slate-700 truncate">{c.address.split(',').pop()}</div>
                          <div className="text-xs text-slate-400 truncate">{c.address}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-indigo-600">{c.totalBookings}</span>
                          <span className="text-[10px] font-medium text-slate-400 uppercase">Successful Tasks</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(c)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setSelectedCustomer(c); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(c.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && <EmptyState />}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginated.map((c) => (
              <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                    {c.name.charAt(0)}
                  </div>
                  <StatusBadge type={c.type} />
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{c.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{c.company || "Individual Client"}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 mb-6">
                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <Mail size={14} className="text-slate-400" />
                    <span className="truncate">{c.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="truncate">{c.address.split(',').pop()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setViewDetails(c)} className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all border border-slate-200">History</button>
                  <button onClick={() => { setSelectedCustomer(c); setShowForm(true); }} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all border border-indigo-100">
                    <Pencil size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Directory Index <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> OF <span className="text-slate-900 font-black">{filtered.length}</span> Clients
            </p>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md border border-slate-200 p-2 rounded-[2rem] shadow-xl shadow-slate-200/50">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-2xl hover:bg-white hover:shadow-lg disabled:opacity-20 transition-all text-slate-600 active:scale-90"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-10 w-10 rounded-2xl text-[10px] font-black transition-all duration-300 ${
                      currentPage === i + 1 ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-300 scale-110' : 'text-slate-400 hover:bg-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-2xl hover:bg-white hover:shadow-lg disabled:opacity-20 transition-all text-slate-600 active:scale-90"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* --- Modals --- */}
      {showForm && (
        <CustomerForm
          customer={selectedCustomer}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {viewDetails && (
        <CustomerDetails
          customer={viewDetails}
          onClose={() => setViewDetails(null)}
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
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">{icon}</div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
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
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[type]}`}>
      {type}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: any) {
  const styles: any = {
    blue: "text-blue-600 hover:bg-blue-50 border-blue-100",
    indigo: "text-indigo-600 hover:bg-indigo-50 border-indigo-100",
    red: "text-red-600 hover:bg-red-50 border-red-100"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-lg border transition-all active:scale-90 ${styles[color]}`}>
      {icon}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="py-20 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50 text-slate-300 mb-4 border border-slate-100">
        <Users size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No Clients Found</h3>
      <p className="text-slate-500 text-sm max-w-xs mx-auto">Try adjusting your search or filters.</p>
    </div>
  );
}

/* ---------- CUSTOMER FORM MODAL ---------- */

function CustomerForm({ customer, onClose, onSave }: any) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">{customer ? "Edit Client Profile" : "Register New Client"}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Legal Identity</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Classification</label>
              <select
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none cursor-pointer"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as CustomerType })}
              >
                <option value="Individual">Individual</option>
                <option value="Corporate">Corporate</option>
                <option value="VIP">VIP Account</option>
                <option value="Partner">Strategic Partner</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Mobile Number</label>
              <input
                type="text"
                placeholder="+91 00000 00000"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                value={formData.mobile}
                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Organization (Optional)</label>
              <input
                type="text"
                placeholder="Enterprise name"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 ml-1">Geographical Base</label>
              <textarea
                placeholder="Operational address..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none min-h-[100px] resize-none"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex gap-3 bg-slate-50">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-white transition-all">
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={!formData.name || !formData.email}
            className="flex-[2] px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden relative border border-slate-200">
        <div className="h-32 bg-indigo-600 relative">
          <div className="absolute -bottom-12 inset-x-0 flex justify-center">
            <div className="h-24 w-24 rounded-xl bg-white p-2 shadow-lg border border-slate-100">
              <div className="w-full h-full rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-3xl font-bold">
                {customer.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all">
          <X size={20} />
        </button>

        <div className="px-8 pb-8 mt-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{customer.name}</h2>
            <StatusBadge type={customer.type} />
          </div>

          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <DetailBox icon={<Mail size={16} />} label="Email Address" value={customer.email} />
              <DetailBox icon={<Phone size={16} />} label="Mobile Number" value={customer.mobile} />
              <DetailBox icon={<Building2 size={16} />} label="Organization" value={customer.company || "Personal Account"} />
              <DetailBox icon={<MapPin size={16} />} label="Location" value={customer.address.split(',').pop() || "Not Set"} />
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Engagement Metrics</span>
                <span className="text-[10px] font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Active Client</span>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-900">{customer.totalBookings}</div>
                <div className="text-xs font-medium text-slate-400 pb-1 uppercase tracking-wider">Total Bookings</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
            >
              Close Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-4 bg-slate-50 rounded-lg flex items-start gap-3 border border-slate-100 transition-colors">
      <div className="text-indigo-600 mt-0.5">{icon}</div>
      <div className="overflow-hidden">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  );
}
