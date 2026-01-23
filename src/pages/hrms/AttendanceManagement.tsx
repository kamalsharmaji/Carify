import { useState } from "react";
import {
  Clock,
  Search,
  CheckCircle2,
  XCircle,
  UserCheck,
  Calendar,
  ChevronRight,
  TrendingUp,
  MapPin,
  Table as TableIcon,
  LayoutGrid,
  MoreHorizontal
} from "lucide-react";

/* ================= TYPES ================= */

type AttendanceStatus = "Present" | "Absent" | "Late" | "Half Day";

interface AttendanceRecord {
  id: number;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  status: AttendanceStatus;
  location: string;
}

/* ================= CONSTANTS ================= */

const defaultRecords: AttendanceRecord[] = [
  { id: 1, employeeName: "Amit Sharma", date: "2024-01-15", checkIn: "09:00 AM", checkOut: "06:00 PM", totalHours: "9h", status: "Present", location: "Main Office" },
  { id: 2, employeeName: "Neha Verma", date: "2024-01-15", checkIn: "09:15 AM", checkOut: "06:30 PM", totalHours: "9h 15m", status: "Late", location: "Main Office" },
  { id: 3, employeeName: "Rahul Singh", date: "2024-01-15", checkIn: "---", checkOut: "---", totalHours: "0h", status: "Absent", location: "---" },
  { id: 4, employeeName: "Priya Das", date: "2024-01-15", checkIn: "08:50 AM", checkOut: "05:45 PM", totalHours: "8h 55m", status: "Present", location: "Remote" },
  { id: 5, employeeName: "Vikram Malhotra", date: "2024-01-15", checkIn: "09:30 AM", checkOut: "01:30 PM", totalHours: "4h", status: "Half Day", location: "Main Office" },
];

/* ================= MAIN COMPONENT ================= */

export default function AttendanceManagement() {
  const [records] = useState<AttendanceRecord[]>(defaultRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"table" | "card">("table");

  const filtered = records.filter(
    (r) =>
      r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Shift <span className="text-indigo-600">Intelligence</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">HRMS</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Attendance Log</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search staff or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full lg:w-64"
              />
            </div>

            <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-lg">
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-md transition-all ${
                  view === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2 rounded-md transition-all ${
                  view === "card" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95">
              <Calendar size={18} />
              <span>Export Log</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
        <StatCard icon={<CheckCircle2 className="text-indigo-600" />} label="Total Present" value="112" />
        <StatCard icon={<Clock className="text-indigo-600" />} label="Late Check-ins" value="14" />
        <StatCard icon={<XCircle className="text-indigo-600" />} label="Total Absent" value="12" />
        <StatCard icon={<TrendingUp className="text-indigo-600" />} label="Avg. Hours" value="8.4h" />
      </div>

      {/* --- Main Content Area --- */}
      <main className="transition-all duration-300">
        {view === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Employee", "Check In", "Check Out", "Total Hours", "Location", "Status", "Operations"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                            {record.employeeName.charAt(0)}
                          </div>
                          <div className="font-semibold text-slate-900">{record.employeeName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{record.checkIn}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{record.checkOut}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          {record.totalHours}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                          <MapPin size={14} className="text-slate-400" />
                          {record.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={record.status} />
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((record) => (
              <div
                key={record.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                    {record.employeeName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {record.employeeName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={12} />
                      {record.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <CardRow label="Check In" value={record.checkIn} />
                  <CardRow label="Check Out" value={record.checkOut} />
                  <CardRow label="Total Time" value={record.totalHours} />
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Status</span>
                    <StatusBadge status={record.status} />
                  </div>
                </div>

                <button className="w-full py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-semibold transition-all border border-slate-200 hover:border-indigo-100">
                  VIEW DETAILS
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
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
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
      </div>
    </div>
  );
}

function CardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-xs font-bold text-slate-700">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const styles: Record<AttendanceStatus, string> = {
    Present: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Absent: "bg-rose-50 text-rose-600 border-rose-100",
    Late: "bg-amber-50 text-amber-600 border-amber-100",
    "Half Day": "bg-indigo-50 text-indigo-600 border-indigo-100",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
}
