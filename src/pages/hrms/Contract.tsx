import { useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  Building2,
  Briefcase,
  ChevronRight,
  Table as TableIcon,
  LayoutGrid,
  MoreHorizontal
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
  const [view, setView] = useState<"table" | "card">("table");

  const filtered = contracts.filter(
    (c) =>
      c.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Contract <span className="text-indigo-600">Lifecycle</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">HRMS</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Legal Agreements</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search contracts..."
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
              <Plus size={18} />
              <span>New Agreement</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
        <StatCard icon={<CheckCircle2 className="text-indigo-600" />} label="Total Active" value="118" />
        <StatCard icon={<Clock className="text-indigo-600" />} label="Expiring Soon" value="14" />
        <StatCard icon={<Calendar className="text-indigo-600" />} label="Renewals" value="6" />
        <StatCard icon={<AlertCircle className="text-indigo-600" />} label="Legal Issues" value="2" />
      </div>

      {/* --- Main Content Area --- */}
      <main className="transition-all duration-300">
        {view === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Employee", "Type", "Department", "Start Date", "End Date", "Status", "Operations"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((contract) => (
                    <tr key={contract.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                            {contract.employeeName.charAt(0)}
                          </div>
                          <div className="font-semibold text-slate-900">{contract.employeeName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                          <Briefcase size={14} className="text-slate-400" />
                          {contract.type}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                          <Building2 size={14} className="text-slate-400" />
                          {contract.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">{contract.startDate}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">{contract.endDate}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={contract.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors">
                            <Download size={16} />
                          </button>
                          <button className="p-2 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((contract) => (
              <div
                key={contract.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
                    {contract.employeeName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {contract.employeeName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Building2 size={12} />
                      {contract.department}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <CardRow label="Contract Type" value={contract.type} />
                  <CardRow label="Start Date" value={contract.startDate} />
                  <CardRow label="End Date" value={contract.endDate} />
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Status</span>
                    <StatusBadge status={contract.status} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-semibold transition-all border border-slate-200 hover:border-indigo-100">
                    VIEW
                  </button>
                  <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-200 hover:border-indigo-100">
                    <Download size={16} />
                  </button>
                </div>
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

function StatusBadge({ status }: { status: ContractStatus }) {
  const styles: Record<ContractStatus, string> = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Expiring Soon": "bg-amber-50 text-amber-600 border-amber-100",
    Expired: "bg-rose-50 text-rose-600 border-rose-100",
    "Pending Signature": "bg-indigo-50 text-indigo-600 border-indigo-100",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
}
