import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Briefcase, 
  Star, 
  DollarSign, 
  Filter, 
  Plus, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Truck,
  Award,
  Play
} from "lucide-react";

export default function VMSDashboard() {
  const [greeting, setGreeting] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting("Good Morning");
      else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
      else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
      else setGreeting("Good Night");
    };

    const fetchUserRole = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        const role = user.role ? user.role.split('_').map((word: string) => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ') : "Vendor Manager";
        setUserRole(role);
      } else {
        setUserRole("Vendor Manager");
      }
    };

    updateGreeting();
    fetchUserRole();
  }, []);

  const topVendors = [
    { name: "AutoParts Global", cat: "Parts", avatar: "🏢" },
    { name: "Swift Logistics", cat: "Courier", avatar: "🚚" },
    { name: "TechSolutions", cat: "IT", avatar: "💻" },
    { name: "Premium Oils", cat: "Lubricants", avatar: "🛢️" },
    { name: "Elite Security", cat: "Services", avatar: "🛡️" },
    { name: "Global Rubber", cat: "Tires", avatar: "⭕" },
    { name: "Eco Power", cat: "Batteries", avatar: "🔋" },
    { name: "Fast Print", cat: "Media", avatar: "🖨️" },
    { name: "Secure Safe", cat: "Audit", avatar: "🔐" },
    { name: "Clean Pro", cat: "Services", avatar: "🧹" },
    { name: "Metals Ltd", cat: "Body", avatar: "🏗️" },
  ];

  const stats = [
    { label: "Total Procurement", value: "₹4.2M", trend: "+8.4% vs last mo", icon: DollarSign, color: "blue" },
    { label: "Active Contracts", value: "24", trend: "98% fulfillment", icon: Briefcase, color: "slate" },
    { label: "Vendor Quality", value: "4.82", trend: "+0.2 improvement", icon: Star, color: "blue" },
    { label: "Total Partners", value: "148", trend: "+12 new this mo", icon: Truck, color: "slate" },
  ];

  return (
    <div className="space-y-3 pb-10 animate-in fade-in duration-700 bg-[#f8fafc]">
      
      {/* Greeting Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
         <h3 className="text-2xl font-sm text-slate-900 pb-2  inline-block">
          {greeting}, {userRole}! 
        </h3>         
        
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here's what's happening with your vendors today.
        </p>
      </div>

      {/* Key Vendor Partners */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b-2 border-emerald-500 inline-block">Key Vendor Partners</h3>
          <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Manage Directory</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {topVendors.map((vendor, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 group cursor-pointer hover:border-emerald-300 transition-all">
                {vendor.avatar}
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-900 whitespace-nowrap">{vendor.name}</p>
                <p className="text-[9px] font-medium text-slate-400 whitespace-nowrap">{vendor.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">{stat.label}</p>
                <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
              </div>
              <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${stat.color === 'blue' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-white'}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <div className="flex items-center gap-1">
               <span className={`text-[10px] font-bold ${stat.trend.includes('+') ? 'text-emerald-500' : stat.trend.includes('-') ? 'text-rose-500' : 'text-slate-400'}`}>
                 {stat.trend}
               </span>
               {stat.trend.includes('+') ? <ArrowUpRight size={12} className="text-emerald-500" /> : <ArrowDownRight size={12} className="text-rose-500" />}
            </div>
          </div>
        ))}
        {/* Compliance Alert */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-emerald-500 mt-1">
              <ShieldCheck size={20} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Compliance Shield</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">98.4% of active vendors have passed the Q1 compliance audit.</p>
              <button className="text-[10px] font-black text-emerald-600 hover:underline mt-2">Audit Report</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Procurement Analysis Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-900">Procurement Analysis</h3>
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Spend distribution by category</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                <button className="px-3 py-1 text-[10px] font-black text-emerald-600 bg-white rounded shadow-sm border border-slate-200">Category</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-400">Monthly</button>
              </div>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <MoreHorizontal size={18} className="text-slate-400" />
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-3 px-4">
            {[75, 56, 92, 43, 68, 85, 32, 59, 74, 48, 62, 79, 88].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className={`w-full max-w-[14px] rounded-t-lg transition-all duration-700 ease-out group-hover:max-w-[18px] ${val > 80 ? 'bg-emerald-600' : val > 50 ? 'bg-emerald-400' : 'bg-slate-200'}`}
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}%
                    </div>
                  </div>
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Cat {i+1}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-slate-50 pt-6">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Active Spend</p>
              <p className="text-xl font-black text-slate-900">₹84.2L</p>
            </div>
            <div className="text-center border-x border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Savings Target</p>
              <p className="text-xl font-black text-slate-900">12.5%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Spend Efficiency</p>
              <p className="text-xl font-black text-slate-900">92.4%</p>
            </div>
          </div>
        </div>

        {/* Quality Sidebar */}
        <div className="space-y-6">
          {/* Quality Score */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Vendor Trust Score</h3>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 58}
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.96)}
                    className="text-emerald-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">4.8</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mt-4">
               <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-500 uppercase">Partner Health</span>
                  <span className="font-black text-emerald-600">Excellent</span>
               </div>
               <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[96%]"></div>
               </div>
            </div>
          </div>

          {/* Quick Partner Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
              Partner Engine
              <button className="p-1 hover:bg-slate-50 rounded"><Plus size={16} className="text-slate-400" /></button>
            </h3>
            <div className="space-y-4">
              {[
                { label: "Contract Renewal", time: "12 days", status: "Priority", color: "bg-blue-50 text-blue-600" },
                { label: "Security Audit", time: "Pending", status: "Critical", color: "bg-rose-50 text-rose-600" },
                { label: "KYC Update", time: "Expired", status: "Warning", color: "bg-amber-50 text-amber-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Award size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">{item.label}</p>
                      <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">{item.status}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{item.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95">
              Launch Procurement Wizard
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Partner Directory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Partner Directory</h3>
            <div className="flex gap-2">
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <Filter size={14} className="text-slate-400" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Detail</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Spend</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "AutoParts Global", cat: "Parts", spend: "₹1.5M", rating: 4.8, status: "Verified" },
                  { name: "Swift Logistics", cat: "Courier", spend: "₹450k", rating: 4.5, status: "Verified" },
                  { name: "TechSolutions Inc", cat: "IT", spend: "₹120k", rating: 4.2, status: "Review" },
                  { name: "Premium Oils Ltd", cat: "Lubricants", spend: "₹890k", rating: 3.9, status: "Verified" },
                ].map((vendor, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] group-hover:bg-emerald-600 group-hover:text-white transition-colors">🏢</div>
                        <span className="text-[11px] font-bold text-slate-700">{vendor.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-[11px] font-black text-slate-400 uppercase">{vendor.cat}</td>
                    <td className="py-4 text-[11px] font-black text-slate-900">{vendor.spend}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                        <span className="text-[11px] font-black text-slate-900">{vendor.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Matrix */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Compliance Matrix</h3>
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Full Audit</button>
          </div>
          <div className="space-y-4">
            {[
              { label: "Tax Compliance", value: "98%", status: "Optimal", color: "emerald" },
              { label: "ISO Certification", value: "84%", status: "Pending", color: "blue" },
              { label: "Safety Rating", value: "92%", status: "Optimal", color: "emerald" },
              { label: "SLA Adherence", value: "95%", status: "Optimal", color: "emerald" },
            ].map((item, i) => (
              <div key={i} className="p-3 border border-slate-50 rounded-xl hover:border-emerald-200 transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-${item.color}-50 rounded-lg flex items-center justify-center text-xs group-hover:scale-110 transition-transform`}>
                       {item.color === 'emerald' ? '✅' : '⏳'}
                    </div>
                    <span className="text-[11px] font-bold text-slate-900">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-black text-slate-900">{item.value}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                   <div className={`h-full bg-${item.color}-500 transition-all duration-1000`} style={{ width: item.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VMS Strategy Banner */}
      <div className="bg-[#064e3b] rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-3">
           <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">Strategic Sourcing Insights</span>
              </div>
              <h2 className="text-3xl font-black mb-4 tracking-tighter">Partner <span className="text-emerald-400">Governance</span></h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Vendor consolidation opportunity identified in "Body Parts" category. Potential annual savings of ₹12.4L estimated.
              </p>
           </div>
           <div className="flex gap-3">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center min-w-[140px]">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Savings Pot.</p>
                 <p className="text-3xl font-black text-emerald-400">₹12.4L</p>
              </div>
              <button className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 active:scale-90 group">
                 <Play size={20} className="fill-white group-hover:scale-110 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
