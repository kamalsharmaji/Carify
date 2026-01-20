import { useState } from "react";
import type { ReactNode } from "react";
import {
  CreditCard,
  Search,
  Plus,
  MoreVertical,
  DollarSign,
  TrendingUp,
  Download,
  Clock,
  PieChart
} from "lucide-react";

/* ================= TYPES ================= */

type PayrollStatus = "Paid" | "Pending" | "Processing" | "On Hold";

interface PayrollRecord {
  id: number;
  employeeName: string;
  salary: string;
  bonus: string;
  deductions: string;
  netPay: string;
  status: PayrollStatus;
  period: string;
}

/* ================= CONSTANTS ================= */

const defaultRecords: PayrollRecord[] = [
  { id: 1, employeeName: "Amit Sharma", salary: "₹1,20,000", bonus: "₹5,000", deductions: "₹8,000", netPay: "₹1,17,000", status: "Paid", period: "Jan 2024" },
  { id: 2, employeeName: "Neha Verma", salary: "₹1,10,000", bonus: "₹0", deductions: "₹7,000", netPay: "₹1,03,000", status: "Processing", period: "Jan 2024" },
  { id: 3, employeeName: "Rahul Singh", salary: "₹95,000", bonus: "₹2,000", deductions: "₹6,000", netPay: "₹91,000", status: "Pending", period: "Jan 2024" },
  { id: 4, employeeName: "Priya Das", salary: "₹1,30,000", bonus: "₹10,000", deductions: "₹9,000", netPay: "₹1,31,000", status: "Paid", period: "Jan 2024" },
  { id: 5, employeeName: "Vikram Malhotra", salary: "₹85,000", bonus: "₹0", deductions: "₹5,000", netPay: "₹80,000", status: "On Hold", period: "Jan 2024" },
];

/* ================= MAIN COMPONENT ================= */

export default function PayrollManagement() {
  const [records] = useState<PayrollRecord[]>(defaultRecords);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = records.filter(
    (r) =>
      r.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Financial Operations
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <CreditCard size={16} />
              HRMS › Compensation & Payroll Intelligence
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
             <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Payday</p>
                <p className="text-sm font-black text-slate-900">31 Jan 2024 (12 Days)</p>
             </div>
             <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Run Payroll</span>
            </button>
          </div>
        </div>

        {/* Payroll Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Disbursed" value="₹45.2L" icon={<DollarSign size={24} />} trend="Budget utilization: 92%" color="bg-blue-500" />
          <StatCard title="Bonus & Incentives" value="₹2.4L" icon={<TrendingUp size={24} />} trend="+4% vs last month" color="bg-emerald-500" />
          <StatCard title="Tax Liability" value="₹8.1L" icon={<PieChart size={24} />} trend="Projected for Q1" color="bg-amber-500" />
          <StatCard title="Processing" value="14" icon={<Clock size={24} />} trend="Batches remaining" color="bg-indigo-500" />
        </div>

        {/* Payroll Table */}
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden transition-all">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Employee Compensation Log</h3>
            <div className="flex gap-3">
               <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-400 transition-colors" size={14} />
                  <input type="text" placeholder="Search name..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
               </div>
               <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"><Download size={18} className="text-slate-500" /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Employee", "Gross Salary", "Bonus", "Deductions", "Net Pay", "Status", "Actions"].map((h) => (
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
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">{record.salary}</td>
                    <td className="px-8 py-5 text-sm font-bold text-emerald-600">{record.bonus}</td>
                    <td className="px-8 py-5 text-sm font-bold text-red-400">{record.deductions}</td>
                    <td className="px-8 py-5">
                      <div className="text-lg font-black text-slate-900 tracking-tight">{record.netPay}</div>
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

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
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

function StatusBadge({ status }: { status: PayrollStatus }) {
  const styles: Record<PayrollStatus, string> = {
    Paid: "bg-emerald-100 text-emerald-600",
    Pending: "bg-amber-100 text-amber-600",
    Processing: "bg-blue-100 text-blue-600",
    "On Hold": "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}
