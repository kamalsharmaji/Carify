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
  Tag
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
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Fleet Bookings
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <Calendar size={16} />
              Fleet Management › Reservation & Logistics
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
                placeholder="Search bookings..."
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
                setSelectedBooking(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95 shadow-red-400/20"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Booking</span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Bookings" value={bookings.filter(b => b.status === "Confirmed").length.toString()} icon={<Calendar size={24} />} color="bg-blue-500" />
          <StatCard title="Pending Review" value={bookings.filter(b => b.status === "Pending").length.toString()} icon={<Clock size={24} />} color="bg-amber-500" />
          <StatCard title="Total Distance" value="1,240 km" icon={<MapPin size={24} />} color="bg-emerald-500" />
          <StatCard title="Cancelled" value={bookings.filter(b => b.status === "Cancelled").length.toString()} icon={<AlertCircle size={24} />} color="bg-red-500" />
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Vehicle", "Booked By", "Timeline", "Purpose", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-sm border border-red-100 group-hover:scale-110 transition-transform">
                            <Car size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-base">{b.vehicleNo}</div>
                            <div className="text-xs text-slate-400 font-medium">Auto Gear • Diesel</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                            {b.bookedBy.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-700">{b.bookedBy}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                            {b.startDate}
                          </div>
                          <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-400"></div>
                            {b.endDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="max-w-[150px]">
                          <div className="text-sm font-bold text-slate-700 truncate">{b.purpose}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{b.destination}</div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(b)} icon={<Eye size={18} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedBooking(b); setShowForm(true); }} icon={<Pencil size={18} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(b.id)} icon={<Trash2 size={18} />} />
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
            {paginated.map((b) => (
              <div key={b.id} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/5 rounded-bl-[120px] -mr-10 -mt-10 transition-all group-hover:scale-125"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="h-16 w-16 rounded-[24px] bg-gradient-to-br from-red-400 to-red-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-red-400/30">
                    <Car size={28} />
                  </div>
                  <StatusBadge status={b.status} />
                </div>

                <div className="mb-8">
                  <h3 className="font-black text-xl text-slate-900 tracking-tight">{b.vehicleNo}</h3>
                  <p className="text-sm text-red-500 font-black mt-1 uppercase tracking-widest">{b.bookedBy}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-black uppercase tracking-widest">Duration</span>
                    <span className="text-slate-700 font-black">{b.startDate} › {b.endDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-black uppercase tracking-widest">Destination</span>
                    <span className="text-slate-700 font-black">{b.destination}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
                  <button onClick={() => setViewDetails(b)} className="flex-1 py-3.5 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-[10px] font-black uppercase transition-colors">Details</button>
                  <button onClick={() => { setSelectedBooking(b); setShowForm(true); }} className="p-3.5 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"><Pencil size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> Bookings
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
          <BookingForm
            booking={selectedBooking}
            onClose={() => setShowForm(false)}
            onSave={handleSave}
          />
        )}

        {/* Details View */}
        {viewDetails && (
          <BookingDetails
            booking={viewDetails}
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

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles = {
    Confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Completed: "bg-blue-50 text-blue-600 border-blue-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
      <div className={`h-1.5 w-1.5 rounded-full ${status === "Confirmed" ? "bg-emerald-500" : status === "Pending" ? "bg-amber-500" : status === "Completed" ? "bg-blue-500" : "bg-red-500"}`}></div>
      {status}
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

/* ---------- BOOKING FORM MODAL ---------- */

function BookingForm({ booking, onClose, onSave }: { booking: Booking | null, onClose: () => void, onSave: (b: Booking) => void }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col border border-white/20">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{booking ? "Edit Reservation" : "New Reservation"}</h2>
            <p className="text-slate-500 text-sm font-bold mt-1 italic">Fleet booking & logistics detail</p>
          </div>
          <button onClick={onClose} className="p-4 bg-white border border-slate-200 rounded-[20px] text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Vehicle No</label>
              <input
                type="text"
                placeholder="e.g. DL09AB1234"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.vehicleNo}
                onChange={e => setFormData({ ...formData, vehicleNo: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Booked By</label>
              <input
                type="text"
                placeholder="Staff Member Name"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.bookedBy}
                onChange={e => setFormData({ ...formData, bookedBy: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
              <input
                type="date"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
              <input
                type="date"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Destination</label>
              <input
                type="text"
                placeholder="Where is the vehicle going?"
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all"
                value={formData.destination}
                onChange={e => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Purpose of Booking</label>
              <textarea
                placeholder="Provide a brief reason for the booking..."
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold placeholder:text-slate-300 focus:ring-4 focus:ring-red-400/10 transition-all min-h-[100px]"
                value={formData.purpose}
                onChange={e => setFormData({ ...formData, purpose: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
              <select
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-[20px] text-slate-900 font-bold focus:ring-4 focus:ring-red-400/10 transition-all appearance-none cursor-pointer"
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
          <button onClick={onClose} className="flex-1 px-8 py-5 rounded-[20px] border border-slate-200 text-slate-600 font-black uppercase tracking-widest hover:bg-white transition-all">
            Discard
          </button>
          <button
            onClick={() => onSave(formData)}
            disabled={!formData.vehicleNo || !formData.bookedBy}
            className="flex-[2] px-8 py-5 rounded-[20px] bg-red-400 text-white font-black uppercase tracking-widest hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-red-400/20 transition-all"
          >
            {booking ? "Update Booking" : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- BOOKING DETAILS MODAL ---------- */

function BookingDetails({ booking, onClose }: { booking: Booking, onClose: () => void }) {
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
                <Car size={64} />
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">{booking.vehicleNo}</h2>
            <div className="mt-3">
              <StatusBadge status={booking.status} />
            </div>
            <p className="mt-6 text-slate-500 font-bold text-lg max-w-sm">
              Booked by <span className="text-red-500">{booking.bookedBy}</span> for {booking.purpose}.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <DetailBox icon={<Calendar size={18} />} label="Departure Date" value={booking.startDate} />
              <DetailBox icon={<Calendar size={18} />} label="Return Date" value={booking.endDate} />
              <DetailBox icon={<MapPin size={18} />} label="Destination" value={booking.destination} />
              <DetailBox icon={<Tag size={18} />} label="Booking ID" value={`#BK-${booking.id % 10000}`} />
            </div>

            <div className="bg-slate-50 rounded-[32px] p-8">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Booking Summary</div>
              <p className="text-slate-700 font-bold leading-relaxed italic">
                "{booking.purpose} - Voyage to {booking.destination}. Trip is currently marked as {booking.status.toLowerCase()}."
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-6 rounded-[24px] bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl active:scale-[0.98]"
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
    <div className="p-4 bg-slate-50 rounded-[20px] flex items-start gap-3 border border-slate-100">
      <div className="text-red-400 mt-1">{icon}</div>
      <div className="overflow-hidden">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-black text-slate-700 truncate">{value}</p>
      </div>
    </div>
  );
}
