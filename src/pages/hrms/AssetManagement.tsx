import { useState } from "react";
import {
  Monitor,
  Search,
  Plus,
  MoreVertical,
  Laptop,
  Smartphone,
  HardDrive,
  User,
  CheckCircle2,
  History,
  Tag
} from "lucide-react";

/* ================= TYPES ================= */

type AssetStatus = "Allocated" | "Available" | "Maintenance" | "Retired";

interface Asset {
  id: number;
  tag: string;
  name: string;
  category: "Laptop" | "Mobile" | "Peripheral" | "Vehicle";
  assignedTo: string;
  status: AssetStatus;
  purchaseDate: string;
}

/* ================= CONSTANTS ================= */

const defaultAssets: Asset[] = [
  { id: 1, tag: "ASSET-001", name: "MacBook Pro M2", category: "Laptop", assignedTo: "Priya Das", status: "Allocated", purchaseDate: "2023-05-15" },
  { id: 2, tag: "ASSET-002", name: "iPhone 15 Pro", category: "Mobile", assignedTo: "Amit Sharma", status: "Allocated", purchaseDate: "2024-01-10" },
  { id: 3, tag: "ASSET-003", name: "Dell UltraSharp 27", category: "Peripheral", assignedTo: "None", status: "Available", purchaseDate: "2023-08-20" },
  { id: 4, tag: "ASSET-004", name: "Logitech MX Master 3", category: "Peripheral", assignedTo: "Neha Verma", status: "Allocated", purchaseDate: "2023-11-05" },
  { id: 5, tag: "ASSET-005", name: "ThinkPad X1 Carbon", category: "Laptop", assignedTo: "None", status: "Maintenance", purchaseDate: "2022-12-12" },
];

/* ================= MAIN COMPONENT ================= */

export default function AssetManagement() {
  const [assets] = useState<Asset[]>(defaultAssets);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Inventory Tracking
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <Monitor size={16} />
              HRMS › Enterprise Asset & Resource Hub
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
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>

            <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Asset</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Assets" value="245" icon={<HardDrive size={24} />} trend="₹1.2Cr Valuation" color="bg-blue-500" />
          <StatCard title="Allocated" value="184" icon={<User size={24} />} trend="75% utilization" color="bg-emerald-500" />
          <StatCard title="In Service" value="12" icon={<History size={24} />} trend="3 pending repair" color="bg-amber-500" />
          <StatCard title="Available" value="49" icon={<CheckCircle2 size={24} />} trend="Ready for issuance" color="bg-indigo-500" />
        </div>

        {/* Asset Table */}
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Asset Detail", "Tag", "Category", "Assigned To", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200 group-hover:text-red-400 transition-colors">
                          <AssetCategoryIcon category={asset.category} />
                        </div>
                        <div className="font-bold text-slate-900 text-sm">{asset.name}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-500 font-black text-[10px] tracking-widest bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        <Tag size={12} />
                        {asset.tag}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{asset.category}</td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-bold text-slate-700">{asset.assignedTo}</div>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={asset.status} />
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

function StatusBadge({ status }: { status: AssetStatus }) {
  const styles: Record<AssetStatus, string> = {
    Allocated: "bg-blue-100 text-blue-600",
    Available: "bg-emerald-100 text-emerald-600",
    Maintenance: "bg-amber-100 text-amber-600",
    Retired: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}

function AssetCategoryIcon({ category }: { category: string }) {
  switch (category) {
    case "Laptop": return <Laptop size={20} />;
    case "Mobile": return <Smartphone size={20} />;
    case "Peripheral": return <Monitor size={20} />;
    default: return <Tag size={20} />;
  }
}
