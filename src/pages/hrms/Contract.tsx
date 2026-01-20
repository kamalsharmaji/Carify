import { useState } from "react";
import {
  FileText,
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  Building2,
  Briefcase
} from "lucide-react";

/* ================= TYPES ================= */

type ContractStatus = "Active" | "Expiring Soon" | "Expired" | "Pending Signature";

interface Contract {
  id: number;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  department: string;
}

/* ================= CONSTANTS ================= */

const defaultContracts: Contract[] = [
  { id: 1, employeeName: "Amit Sharma", type: "Full-Time", startDate: "2023-01-15", endDate: "2026-01-15", status: "Active", department: "Operations" },
  { id: 2, employeeName: "Neha Verma", type: "Full-Time", startDate: "2023-03-20", endDate: "2026-03-20", status: "Active", department: "Human Resources" },
  { id: 3, employeeName: "Rahul Singh", type: "Contractor", startDate: "2023-11-10", endDate: "2024-05-10", status: "Expiring Soon", department: "Finance" },
  { id: 4, employeeName: "Priya Das", type: "Full-Time", startDate: "2024-05-02", endDate: "2027-05-02", status: "Active", department: "Engineering" },
  { id: 5, employeeName: "Vikram Malhotra", type: "Probation", startDate: "2024-08-12", endDate: "2024-11-12", status: "Pending Signature", department: "Fleet" },
];

/* ================= MAIN COMPONENT ================= */

export default function Contract() {
  const [contracts] = useState<Contract[]>(defaultContracts);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = contracts.filter(
    (c) =>
      c.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Contract Lifecycle
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <FileText size={16} />
              HRMS › Legal & Employment Agreements
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
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>

            <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Agreement</span>
            </button>
          </div>
        </div>

        {/* Contract Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Active" value="118" icon={<CheckCircle2 size={24} />} trend="98% compliance" color="bg-emerald-500" />
          <StatCard title="Expiring Soon" value="14" icon={<Clock size={24} />} trend="Action required" color="bg-amber-500" />
          <StatCard title="Renewals" value="6" icon={<Calendar size={24} />} trend="This month" color="bg-blue-500" />
          <StatCard title="Legal Issues" value="2" icon={<AlertCircle size={24} />} trend="Under review" color="bg-red-400" />
        </div>

        {/* Contract Table */}
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden transition-all">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Employee", "Type", "Department", "Start Date", "End Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((contract) => (
                  <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black border border-slate-200 group-hover:scale-110 transition-transform shadow-sm">
                          {contract.employeeName.charAt(0)}
                        </div>
                        <div className="font-bold text-slate-900 text-sm">{contract.employeeName}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs">
                        <Briefcase size={14} className="text-slate-400" />
                        {contract.type}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs">
                        <Building2 size={14} className="text-slate-400" />
                        {contract.department}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-bold text-xs">
                      {contract.startDate}
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-bold text-xs">
                      {contract.endDate}
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={contract.status} />
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                          <Download size={16} />
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

function StatusBadge({ status }: { status: ContractStatus }) {
  const styles: Record<ContractStatus, string> = {
    Active: "bg-emerald-100 text-emerald-600",
    "Expiring Soon": "bg-amber-100 text-amber-600",
    Expired: "bg-red-100 text-red-600",
    "Pending Signature": "bg-blue-100 text-blue-600",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}
