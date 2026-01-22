import { useState } from "react";
import {
  Coins,
  Search,
  Plus,
  RefreshCcw,
  MoreVertical,
  Globe,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

/* ================= TYPES ================= */

interface Currency {
  id: number;
  code: string;
  name: string;
  rate: string;
  change: string;
  trend: "up" | "down";
}

/* ================= CONSTANTS ================= */

const defaultCurrencies: Currency[] = [
  { id: 1, code: "USD", name: "United States Dollar", rate: "82.50", change: "+0.15%", trend: "up" },
  { id: 2, code: "EUR", name: "Euro", rate: "90.12", change: "-0.08%", trend: "down" },
  { id: 3, code: "GBP", name: "British Pound", rate: "105.45", change: "+0.22%", trend: "up" },
  { id: 4, code: "AED", name: "UAE Dirham", rate: "22.46", change: "0.00%", trend: "up" },
  { id: 5, code: "SGD", name: "Singapore Dollar", rate: "61.30", change: "-0.12%", trend: "down" },
];

/* ================= MAIN COMPONENT ================= */

export default function Currencies() {
  const [currencies] = useState<Currency[]>(defaultCurrencies);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Exchange Matrix
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <Coins size={16} />
              HRMS › Global Payroll & Currency Management
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
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>
             <button className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm hover:bg-slate-50">
                <RefreshCcw size={18} className="text-slate-500" />
                Update Rates
             </button>
             <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Currency</span>
            </button>
          </div>
        </div>

        {/* Currency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((curr) => (
            <div key={curr.id} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
               <div className="flex justify-between items-start mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-xl shadow-slate-900/20 group-hover:rotate-6 transition-transform">
                     {curr.code.substring(0, 2)}
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black ${curr.trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                     {curr.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                     {curr.change}
                  </div>
               </div>

               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{curr.code}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{curr.name}</p>
               </div>

               <div className="mt-8 pt-8 border-t border-slate-50 flex items-end justify-between">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Base Rate (INR)</p>
                     <p className="text-4xl font-black text-slate-900 tracking-tighter">₹{curr.rate}</p>
                  </div>
                  <button className="p-3 bg-slate-50 text-slate-400 hover:text-red-400 hover:bg-red-50 rounded-xl transition-all">
                     <MoreVertical size={20} />
                  </button>
               </div>
            </div>
          ))}
        </div>

        {/* Global Market Insight */}
        <div className="bg-slate-900 rounded-xl p-10 text-white relative overflow-hidden">
           <div className="absolute right-0 top-0 w-96 h-96 bg-red-400/10 rounded-bl-[120px] -mr-20 -mt-20"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex-1 space-y-4">
                 <h3 className="text-3xl font-black tracking-tight flex items-center gap-3">
                    <Globe className="text-red-400" size={32} />
                    Multi-Regional Payroll Coverage
                 </h3>
                 <p className="text-slate-400 font-medium max-w-xl">
                    Automate your global compensation strategy with real-time exchange rates and localized tax compliance across 45+ countries.
                 </p>
                 <div className="flex gap-4 pt-4">
                    <div className="text-center px-6 py-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-2xl font-black text-white">45+</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Countries</p>
                    </div>
                    <div className="text-center px-6 py-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-2xl font-black text-white">12</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Currencies</p>
                    </div>
                 </div>
              </div>
              <button className="px-10 py-5 bg-red-400 hover:bg-red-500 text-white rounded-2xl font-black tracking-tight transition-all shadow-2xl shadow-red-400/30 active:scale-95">
                 Configure Locales
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
