import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  X,
  MapPin,
  Tag,
  Navigation,
  CheckCircle2,
  Clock4,
  XCircle,
  MoreHorizontal
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type BookingStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

interface Booking {
  id: number;
  vehicleNo: string;
  bookedBy: string;
  startDate: string;
  endDate: string;
  purpose: string;
  status: BookingStatus;
  destination: string;
}

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "fleet_bookings_v2";
const ITEMS_PER_PAGE = 8;

/* ================= DEFAULT DATA ================= */

const seedData: Booking[] = [
  {
    id: 1,
    vehicleNo: "DL09AB1234",
    bookedBy: "Priya Singh",
    startDate: "2025-01-16",
    endDate: "2025-01-18",
    purpose: "Client Site Visit",
    status: "Confirmed",
    destination: "Gurgaon"
  },
  {
    id: 2,
    vehicleNo: "MH12XY5678",
    bookedBy: "Rahul Kapoor",
    startDate: "2025-01-20",
    endDate: "2025-01-21",
    purpose: "Team Offsite",
    status: "Pending",
    destination: "Lonavala"
  },
  {
    id: 3,
    vehicleNo: "KA01ZZ9900",
    bookedBy: "Anjali Rao",
    startDate: "2025-01-10",
    endDate: "2025-01-12",
    purpose: "Equipment Transport",
    status: "Completed",
    destination: "Mysore"
  }
];

/* ================= MAIN COMPONENT ================= */

export default function Booking() {
  const [bookings, setBookings] = useState<Booking[]>(() => {
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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [viewDetails, setViewDetails] = useState<Booking | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  /* ---------- ACTIONS ---------- */

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(prev => prev.filter(b => b.id !== id));
      toast.success("Booking cancelled successfully", {
        icon: '🗑️',
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
    }
  };

  const handleSave = (bookingData: Booking) => {
    if (selectedBooking) {
      setBookings(prev => prev.map(b => b.id === bookingData.id ? bookingData : b));
      toast.success("Booking updated successfully");
    } else {
      setBookings(prev => [...prev, { ...bookingData, id: Date.now() }]);
      toast.success("New booking confirmed!");
    }
    setShowForm(false);
    setSelectedBooking(null);
  };

  /* ---------- FILTER & PAGINATION ---------- */

  const filtered = bookings.filter(
    (b) =>
      b.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      {/* --- Standard Header --- */}
      <header className="mb-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">Fleet Bookings</h1>
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">Fleet Management</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Reservation & Logistics</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search reservations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full lg:w-64"
              />
            </div>

            <div className="flex p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <TableIcon size={18} data-testid="table-icon" />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "card" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <LayoutGrid size={18} data-testid="layout-grid-icon" />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedBooking(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>New Booking</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={<CheckCircle2 size={20} className="text-emerald-600" />} 
          label="Active Reservations" 
          value={bookings.filter(b => b.status === "Confirmed").length} 
          color="emerald" 
        />
        <StatCard 
          icon={<Clock4 size={20} className="text-amber-600" />} 
          label="Pending Review" 
          value={bookings.filter(b => b.status === "Pending").length} 
          color="amber" 
        />
        <StatCard 
          icon={<Navigation size={20} className="text-blue-600" />} 
          label="Total Mobility" 
          value="1,240 km" 
          color="blue" 
        />
        <StatCard 
          icon={<XCircle size={20} className="text-red-600" />} 
          label="Cancelled" 
          value={bookings.filter(b => b.status === "Cancelled").length} 
          color="red" 
        />
      </div>

      {/* --- Content Area --- */}
      <main>
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    {[
                      "Asset Ident",
                      "Personnel",
                      "Timeline",
                      "Destination",
                      "Status",
                      "Operations",
                    ].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((b) => (
                    <tr key={b.id} className="group hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Car size={18} />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{b.vehicleNo}</div>
                            <div className="text-xs text-slate-500">Logistics Asset</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">
                            {b.bookedBy.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-700">{b.bookedBy}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-sm">
                          <span className="text-slate-700 font-medium">{b.startDate}</span>
                          <span className="text-slate-400 text-xs">{b.endDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-800">{b.purpose}</div>
                        <div className="flex items-center gap-1 text-[10px] text-indigo-500 uppercase font-bold mt-0.5">
                          <Navigation size={10} />
                          {b.destination}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(b)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setSelectedBooking(b); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(b.id)} icon={<Trash2 size={16} />} />
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
            {paginated.map((b) => (
              <div key={b.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Car size={24} />
                  </div>
                  <StatusBadge status={b.status} />
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-lg text-slate-900">{b.vehicleNo}</h3>
                  <p className="text-sm text-slate-500 font-medium">{b.bookedBy}</p>
                </div>

                <div className="space-y-3 py-4 border-t border-slate-50 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 uppercase tracking-wider">Timeline</span>
                    <span className="text-slate-700 font-medium">{b.startDate} › {b.endDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 uppercase tracking-wider">Destination</span>
                    <span className="text-slate-700 font-medium uppercase">{b.destination}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setViewDetails(b)} className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all">Preview</button>
                  <button onClick={() => { setSelectedBooking(b); setShowForm(true); }} className="p-3 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-indigo-100 active:scale-95">
                    <Pencil size={18} />
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
              Mobility Index <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> OF <span className="text-slate-900 font-black">{filtered.length}</span> Records
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
        <BookingForm
          booking={selectedBooking}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {viewDetails && (
        <BookingDetails
          booking={viewDetails}
          onClose={() => setViewDetails(null)}
        />
      )}
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatCard({ icon, label, value, trend, color }: any) {
  const colors: any = {
    emerald: "from-emerald-500/10 to-teal-500/10 border-emerald-100",
    amber: "from-amber-500/10 to-orange-500/10 border-amber-100",
    blue: "from-blue-500/10 to-indigo-500/10 border-blue-100",
    red: "from-red-500/10 to-pink-500/10 border-red-100",
  };
  return (
    <div className={`p-8 bg-gradient-to-br ${colors[color]} border rounded-[2.5rem] transition-all hover:scale-105 duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-4 bg-white rounded-2xl shadow-sm">{icon}</div>
        <span className="text-[10px] font-black px-2 py-1 bg-white rounded-lg shadow-sm text-slate-600">{trend}</span>
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-4xl font-black text-slate-900">{value}</h3>
    </div>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles = {
    Confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Completed: "bg-blue-50 text-blue-600 border-blue-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  const dots = {
    Confirmed: "bg-emerald-500",
    Pending: "bg-amber-500",
    Completed: "bg-blue-500",
    Cancelled: "bg-red-500",
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${styles[status]}`}>
      <div className={`h-1.5 w-1.5 rounded-full ${dots[status]} ring-4 ring-current/10 animate-pulse`}></div>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: any) {
  const styles: any = {
    blue: "text-blue-500 hover:bg-blue-50",
    indigo: "text-indigo-500 hover:bg-indigo-50",
    red: "text-red-500 hover:bg-red-50"
  };
  return (
    <button onClick={onClick} className={`p-3 rounded-xl transition-all active:scale-90 ${styles[color]}`}>
      {icon}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="py-24 text-center">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-slate-50 text-slate-200 mb-6 shadow-inner">
        <Calendar size={48} strokeWidth={1} />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-2">No Active Reservations</h3>
      <p className="text-slate-400 font-medium max-w-xs mx-auto">Initialize a new mobility record to begin tracking fleet logistics.</p>
    </div>
  );
}

/* ---------- BOOKING FORM MODAL ---------- */

function BookingForm({ booking, onClose, onSave }: any) {
  const [formData, setFormData] = useState<Booking>(booking || {
    id: 0,
    vehicleNo: "",
    bookedBy: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    purpose: "",
    status: "Confirmed",
    destination: ""
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col border border-white/20 animate-in zoom-in-95 duration-300">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase tracking-widest text-xs opacity-50 mb-2">Reservation Module</h2>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{booking ? "Refine Reservation" : "Asset Acquisition"}</h2>
          </div>
          <button onClick={onClose} className="h-14 w-14 flex items-center justify-center bg-white border border-slate-200 rounded-[2rem] text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-xl active:scale-90">
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormGroup label="Vehicle Asset ID" placeholder="e.g. DL09AB1234" value={formData.vehicleNo} onChange={v => setFormData({ ...formData, vehicleNo: v })} />
            <FormGroup label="Personnel ID" placeholder="Full Member Name" value={formData.bookedBy} onChange={v => setFormData({ ...formData, bookedBy: v })} />
            <FormGroup label="Deployment Date" type="date" value={formData.startDate} onChange={v => setFormData({ ...formData, startDate: v })} />
            <FormGroup label="Return Schedule" type="date" value={formData.endDate} onChange={v => setFormData({ ...formData, endDate: v })} />
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Geographical Vector</label>
              <input
                type="text"
                placeholder="Target Destination..."
                className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-900 font-black focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                value={formData.destination}
                onChange={e => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Deployment Objective</label>
              <textarea
                placeholder="Detail the operational purpose..."
                className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-900 font-black focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none min-h-[120px]"
                value={formData.purpose}
                onChange={e => setFormData({ ...formData, purpose: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Mission Status</label>
              <select
                className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-900 font-black focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none appearance-none cursor-pointer"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as BookingStatus })}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-10 border-t border-slate-100 flex gap-4 bg-slate-50/50">
          <button onClick={onClose} className="flex-1 px-8 py-6 rounded-[2rem] border border-slate-200 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all active:scale-[0.98]">
            Discard
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={!formData.vehicleNo || !formData.bookedBy}
            className="flex-[2] px-8 py-6 rounded-[2rem] bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-indigo-200 transition-all active:scale-[0.98]"
          >
            {booking ? "Update Vector" : "Commit Record"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-900 font-black focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

/* ---------- BOOKING DETAILS MODAL ---------- */

function BookingDetails({ booking, onClose }: { booking: Booking, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[4rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] w-full max-w-xl overflow-hidden relative border border-white/20 animate-in zoom-in-95 duration-500">
        <div className="h-48 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-900 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="absolute -bottom-24 inset-x-0 flex justify-center">
            <div className="h-48 w-48 rounded-[3.5rem] bg-white p-4 shadow-2xl">
              <div className="w-full h-full rounded-[2.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 text-6xl font-black border border-indigo-100">
                <Car size={80} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
        
        <button onClick={onClose} className="absolute top-8 right-8 h-12 w-12 bg-white/10 backdrop-blur-xl rounded-2xl text-white hover:bg-white/30 transition-all flex items-center justify-center border border-white/20 active:scale-90 z-20">
          <X size={24} strokeWidth={3} />
        </button>

        <div className="px-12 pb-14 mt-32">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{booking.vehicleNo}</h2>
            <StatusBadge status={booking.status} />
            <div className="mt-8 p-8 bg-slate-50 rounded-[3rem] border border-slate-100 w-full relative group">
              <div className="absolute -top-4 -left-4 h-12 w-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
                <Navigation size={24} />
              </div>
              <p className="text-slate-500 font-bold text-lg leading-tight">
                Personnel <span className="text-indigo-600 font-black uppercase tracking-tight">{booking.bookedBy}</span> 
                <br />
                <span className="text-sm opacity-60">Objective: {booking.purpose}</span>
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <DetailBox icon={<Calendar size={18} />} label="Departure" value={booking.startDate} />
              <DetailBox icon={<Calendar size={18} />} label="Return" value={booking.endDate} />
              <DetailBox icon={<MapPin size={18} />} label="Vector" value={booking.destination} />
              <DetailBox icon={<Tag size={18} />} label="Registry" value={`#BK-${booking.id % 10000}`} />
            </div>

            <button
              onClick={onClose}
              className="w-full py-6 rounded-[2.5rem] bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-indigo-600 transition-all shadow-2xl active:scale-[0.98] mt-4"
            >
              Secure Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-5 bg-slate-50 rounded-[2rem] flex items-start gap-4 border border-slate-100 group hover:border-indigo-200 transition-colors">
      <div className="text-indigo-500 mt-1 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="overflow-hidden text-left">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-sm font-black text-slate-800 truncate tracking-tight uppercase">{value}</p>
      </div>
    </div>
  );
}
