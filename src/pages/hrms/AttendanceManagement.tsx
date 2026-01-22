import { useState } from "react";
import {
  Clock,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  UserCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MapPin
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

  const filtered = records.filter(
    (r) =>
      r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 animate-in fade-in duration-500">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Standardized Header Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20 transition-transform">
                <UserCheck className="text-white w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Shift Intelligence
                </h1>
                <p className="text-slate-500 mt-1 font-medium text-sm flex items-center gap-2">
                  HRMS › Real-time Attendance & Presence
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group flex-1 md:flex-none">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all w-full md:w-72 font-medium"
                />
              </div>

              <button
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95"
              >
                <Calendar size={18} />
                <span className="hidden sm:inline">Export Log</span>
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Present" value="112" icon={<CheckCircle2 size={24} />} trend="90% workforce" color="bg-emerald-600" />
          <StatCard title="Late Check-ins" value="14" icon={<Clock size={24} />} trend="Action required" color="bg-amber-600" />
          <StatCard title="Total Absent" value="12" icon={<XCircle size={24} />} trend="4 on planned leave" color="bg-rose-600" />
          <StatCard title="Avg. Hours" value="8.4h" icon={<TrendingUp size={24} />} trend="Per employee today" color="bg-blue-600" />
        </div>

        {/* Daily Log Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Today's Attendance Log</h3>
            <div className="flex gap-2">
               <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all text-slate-500"><ChevronLeft size={18} /></button>
               <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all text-slate-500"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Employee", "Check In", "Check Out", "Total Hours", "Location", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold border border-slate-200 group-hover:scale-105 transition-transform">
                          {record.employeeName.charAt(0)}
                        </div>
                        <div className="font-semibold text-slate-900 text-sm">{record.employeeName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-500">{record.checkIn}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-500">{record.checkOut}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-slate-50 text-slate-700 rounded-md text-[10px] font-bold border border-slate-200 uppercase">
                        {record.totalHours}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <MapPin size={14} />
                        {record.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatCard({ title, value, icon, trend, color }: any) {
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-20 h-20 ${color} opacity-[0.03] rounded-bl-full -mr-6 -mt-6 transition-all group-hover:scale-110`}></div>
      <div className="flex items-center gap-4 relative z-10">
        <div className={`h-12 w-12 rounded-lg ${color} text-white flex items-center justify-center shadow-md shadow-current/10`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{title}</p>
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
            <span className="text-[10px] font-medium text-slate-500 mt-1">{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const styles: Record<AttendanceStatus, string> = {
    Present: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Absent: "bg-rose-50 text-rose-600 border-rose-100",
    Late: "bg-amber-50 text-amber-600 border-amber-100",
    "Half Day": "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
}
