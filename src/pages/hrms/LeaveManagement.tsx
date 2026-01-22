import { useState } from "react";
import {
  Calendar,
  Search,
  Plus,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Palmtree
} from "lucide-react";

/* ================= TYPES ================= */

type LeaveStatus = "Approved" | "Pending" | "Rejected";

interface LeaveRequest {
  id: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  reason: string;
}

/* ================= CONSTANTS ================= */

const defaultRequests: LeaveRequest[] = [
  { id: 1, employeeName: "Amit Sharma", leaveType: "Annual Leave", startDate: "2024-01-20", endDate: "2024-01-25", days: 5, status: "Approved", reason: "Family vacation" },
  { id: 2, employeeName: "Neha Verma", leaveType: "Sick Leave", startDate: "2024-01-18", endDate: "2024-01-19", days: 1, status: "Pending", reason: "Fever" },
  { id: 3, employeeName: "Rahul Singh", leaveType: "Personal Leave", startDate: "2024-01-22", endDate: "2024-01-22", days: 1, status: "Pending", reason: "Bank work" },
  { id: 4, employeeName: "Priya Das", leaveType: "Maternity Leave", startDate: "2024-02-01", endDate: "2024-05-01", days: 90, status: "Approved", reason: "Maternity" },
  { id: 5, employeeName: "Vikram Malhotra", leaveType: "Comp Off", startDate: "2024-01-15", endDate: "2024-01-15", days: 1, status: "Rejected", reason: "Project deadline" },
];

/* ================= MAIN COMPONENT ================= */

export default function LeaveManagement() {
  const [requests] = useState<LeaveRequest[]>(defaultRequests);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = requests.filter(
    (r) =>
      r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Absence Tracking
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <Palmtree size={16} />
              HRMS › Leave & Time-Off Management
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
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>

            <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Apply Leave</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="On Leave Today" value="8" icon={<User size={24} />} trend="Out of 124 staff" color="bg-blue-500" />
          <StatCard title="Pending Approvals" value="12" icon={<Clock size={24} />} trend="Needs attention" color="bg-amber-500" />
          <StatCard title="Leave Rate" value="6.4%" icon={<CheckCircle2 size={24} />} trend="Within targets" color="bg-emerald-500" />
          <StatCard title="Rejected" value="2" icon={<XCircle size={24} />} trend="This month" color="bg-red-400" />
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Employee", "Leave Type", "Duration", "Days", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black border border-slate-200 group-hover:scale-110 transition-transform shadow-sm">
                          {request.employeeName.charAt(0)}
                        </div>
                        <div className="font-bold text-slate-900 text-sm">{request.employeeName}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-xs font-bold text-slate-600">{request.leaveType}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-[10px] font-bold text-slate-500 flex items-center gap-2">
                        <Calendar size={12} />
                        {request.startDate} to {request.endDate}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-900 rounded-md text-[10px] font-black">
                        {request.days} Days
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-red-400 rounded-xl transition-colors">
                          <CheckCircle2 size={18} />
                        </button>
                        <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-red-400 rounded-xl transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
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
    <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-bl-3xl -mr-8 -mt-8 transition-all group-hover:scale-110`}></div>
      <div className="flex items-center gap-6 relative z-10">
        <div className={`h-16 w-16 rounded-xl ${color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
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

function StatusBadge({ status }: { status: LeaveStatus }) {
  const styles: Record<LeaveStatus, string> = {
    Approved: "bg-emerald-100 text-emerald-600",
    Pending: "bg-amber-100 text-amber-600",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}
