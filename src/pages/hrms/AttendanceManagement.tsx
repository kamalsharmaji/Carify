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
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Shift Intelligence
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <UserCheck size={16} />
              HRMS › Real-time Attendance & Presence
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
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>

            <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Calendar size={18} />
              <span className="hidden sm:inline">Export Log</span>
            </button>
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Present" value="112" icon={<CheckCircle2 size={24} />} trend="90% workforce" color="bg-emerald-500" />
          <StatCard title="Late Check-ins" value="14" icon={<Clock size={24} />} trend="Action required" color="bg-amber-500" />
          <StatCard title="Total Absent" value="12" icon={<XCircle size={24} />} trend="4 on planned leave" color="bg-red-400" />
          <StatCard title="Avg. Hours" value="8.4h" icon={<TrendingUp size={24} />} trend="Per employee today" color="bg-blue-500" />
        </div>

        {/* Daily Log Table */}
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden transition-all">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Today's Attendance Log</h3>
            <div className="flex gap-2">
               <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"><ChevronLeft size={20} /></button>
               <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Employee", "Check In", "Check Out", "Total Hours", "Location", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black border border-slate-200 group-hover:scale-110 transition-transform shadow-sm">
                          {record.employeeName.charAt(0)}
                        </div>
                        <div className="font-bold text-slate-900 text-sm">{record.employeeName}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{record.checkIn}</td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{record.checkOut}</td>
                    <td className="px-8 py-5">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-900 rounded-md text-[10px] font-black uppercase">
                        {record.totalHours}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <MapPin size={14} />
                        {record.location}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="px-8 py-5">
                      <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-red-400 rounded-xl transition-colors">
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
    <div className="bg-white border border-slate-200 p-8 rounded-[32px] shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-110`}></div>
      <div className="flex items-center gap-6 relative z-10">
        <div className={`h-16 w-16 rounded-[24px] ${color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
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

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const styles: Record<AttendanceStatus, string> = {
    Present: "bg-emerald-100 text-emerald-600",
    Absent: "bg-red-100 text-red-600",
    Late: "bg-amber-100 text-amber-600",
    "Half Day": "bg-blue-100 text-blue-600",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}
