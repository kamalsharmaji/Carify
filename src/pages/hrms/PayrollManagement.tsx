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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 animate-in fade-in duration-500">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Standardized Header Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20 transition-transform">
                <CreditCard className="text-white w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Financial Operations
                </h1>
                <p className="text-slate-500 mt-1 font-medium text-sm flex items-center gap-2">
                  HRMS › Compensation & Payroll Intelligence
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
               <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Payday</p>
                  <p className="text-sm font-bold text-slate-900">31 Jan 2024 (12 Days)</p>
               </div>
               <button
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95"
              >
                <Plus size={18} />
                <span>Run Payroll</span>
              </button>
            </div>
          </div>
        </div>

        {/* Payroll Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Disbursed" value="₹45.2L" icon={<DollarSign size={24} />} trend="Budget utilization: 92%" color="bg-blue-600" />
          <StatCard title="Bonus & Incentives" value="₹2.4L" icon={<TrendingUp size={24} />} trend="+4% vs last month" color="bg-emerald-600" />
          <StatCard title="Tax Liability" value="₹8.1L" icon={<PieChart size={24} />} trend="Projected for Q1" color="bg-amber-600" />
          <StatCard title="Processing" value="14" icon={<Clock size={24} />} trend="Batches remaining" color="bg-indigo-600" />
        </div>

        {/* Payroll Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Employee Compensation Log</h3>
            <div className="flex gap-3">
               <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={14} />
                  <input type="text" placeholder="Search name..." className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
               </div>
               <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-900"><Download size={18} /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Employee", "Gross Salary", "Bonus", "Deductions", "Net Pay", "Status", "Actions"].map((h) => (
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
                    <td className="px-6 py-4 text-sm font-semibold text-slate-600">{record.salary}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">{record.bonus}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-rose-600">{record.deductions}</td>
                    <td className="px-6 py-4">
                      <div className="text-base font-bold text-slate-900 tracking-tight">{record.netPay}</div>
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

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
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

function StatusBadge({ status }: { status: PayrollStatus }) {
  const styles: Record<PayrollStatus, string> = {
    Paid: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Processing: "bg-blue-50 text-blue-600 border-blue-100",
    "On Hold": "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
}
