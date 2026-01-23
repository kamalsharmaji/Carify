
import { Briefcase, TrendingUp, DollarSign, Search, ChevronRight, LayoutGrid, Table as TableIcon } from "lucide-react";
import { useState } from "react";

export default function Opportunities() {
  const [view, setView] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Sales <span className="text-indigo-600">Opportunities</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">CRM</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Pipeline Management</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search opportunities..."
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
              <DollarSign size={18} />
              <span>New Opportunity</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <StatCard icon={<DollarSign className="text-indigo-600" />} label="Pipeline Value" value="$1.2M" />
        <StatCard icon={<Briefcase className="text-indigo-600" />} label="Open Deals" value="48" />
        <StatCard icon={<TrendingUp className="text-indigo-600" />} label="Win Probability" value="65%" />
      </div>

      {/* --- Main Content Area --- */}
      <main className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
          <Briefcase size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No Opportunities Found</h3>
        <p className="text-slate-500 mt-2 text-sm">Start building your sales pipeline by adding your first business opportunity.</p>
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
