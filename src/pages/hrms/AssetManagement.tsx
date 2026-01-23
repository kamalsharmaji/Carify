
import { useState } from "react";
import {
  Monitor,
  Search,
  Plus,
  Laptop,
  Smartphone,
  HardDrive,
  User,
  CheckCircle2,
  History,
  Tag,
  ChevronRight,
  LayoutGrid,
  Table as TableIcon
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
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const filtered = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Inventory <span className="text-indigo-600">Tracking</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">HRMS</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Enterprise Asset Hub</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full lg:w-64"
              />
            </div>

            <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-lg">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "card" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95">
              <Plus size={18} />
              <span>Add Asset</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard icon={<HardDrive className="text-indigo-600" />} label="Total Assets" value="245" />
        <StatCard icon={<User className="text-indigo-600" />} label="Allocated" value="184" />
        <StatCard icon={<History className="text-indigo-600" />} label="In Service" value="12" />
        <StatCard icon={<CheckCircle2 className="text-indigo-600" />} label="Available" value="49" />
      </div>

      {/* --- Main Content Area --- */}
      <main className="transition-all duration-300">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Asset Detail", "Tag", "Category", "Assigned To", "Status"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((asset) => (
                    <tr key={asset.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center border border-indigo-100">
                            <AssetCategoryIcon category={asset.category} />
                          </div>
                          <div className="font-semibold text-slate-900 text-sm">{asset.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200 tracking-wider">
                          {asset.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{asset.category}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-slate-700">{asset.assignedTo}</div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={asset.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4 bg-slate-50/50">
              {filtered.map((asset) => (
                <div key={asset.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                      <AssetCategoryIcon category={asset.category} />
                    </div>
                    <StatusBadge status={asset.status} />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{asset.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{asset.tag}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-50">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Holder</span>
                      <span className="font-bold text-slate-700">{asset.assignedTo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">{icon}</div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: AssetStatus }) {
  const styles: Record<AssetStatus, string> = {
    Allocated: "bg-blue-50 text-blue-600 border-blue-100",
    Available: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Maintenance: "bg-amber-50 text-amber-600 border-amber-100",
    Retired: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
}

function AssetCategoryIcon({ category }: { category: string }) {
  switch (category) {
    case "Laptop": return <Laptop size={18} />;
    case "Mobile": return <Smartphone size={18} />;
    case "Peripheral": return <Monitor size={18} />;
    default: return <Tag size={18} />;
  }
}
