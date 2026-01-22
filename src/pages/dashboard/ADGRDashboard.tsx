import { useState, useEffect } from "react";
import { 
  FileText, 
  TrendingUp, 
  Search, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Globe,
  Settings,
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight
} from "lucide-react";

export default function ADGRDashboard() {
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
        ).join(' ') : "Governance Admin";
        setUserRole(role);
      } else {
        setUserRole("Governance Admin");
      }
    };

    updateGreeting();
    fetchUserRole();
  }, []);

  const reportAnalysts = [
    { name: "Mick Aston", role: "Lead Analyst", avatar: "👨‍🔬" },
    { name: "Protiong", role: "Data Scientist", avatar: "👩‍💻" },
    { name: "Cooper Decker", role: "AI Engineer", avatar: "🤖" },
    { name: "Brianna Copeland", role: "Ethics Lead", avatar: "👩‍⚖️" },
    { name: "kjh donald", role: "Database Admin", avatar: "👨‍🔧" },
    { name: "Emma Hopper", role: "BI Consultant", avatar: "👧" },
    { name: "Tara Hicks", role: "Cloud Architect", avatar: "👩‍☁️" },
    { name: "Ralph Mercer", role: "Security Ops", avatar: "👴" },
  ];

  const stats = [
    { label: "Total Reports", value: "1,248", trend: "+14% from last mo", icon: FileText, color: "blue" },
    { label: "Generated Today", value: "32", trend: "8 pending review", icon: TrendingUp, color: "slate" },
    { label: "Processing Power", value: "94%", trend: "Optimal load", icon: Cpu, color: "blue" },
    { label: "Global Reach", value: "12", trend: "+2 regions added", icon: Globe, color: "slate" },
  ];

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-700 bg-[#f8fafc]">
      
      {/* Greeting Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          {greeting}, {userRole}! 👋
        </h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here's what's happening with governance and analytics today.
        </p>
      </div>

      {/* Active Analysts Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b-2 border-indigo-500 inline-block">Governance & BI Experts</h3>
          <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Node Management</button>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {reportAnalysts.map((member, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 group cursor-pointer hover:border-indigo-300 transition-all">
                {member.avatar}
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-900 whitespace-nowrap">{member.name}</p>
                <p className="text-[9px] font-medium text-slate-400 whitespace-nowrap">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">{stat.label}</p>
                <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
              </div>
              <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${stat.color === 'blue' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-white'}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <div className="flex items-center gap-1">
               <span className={`text-[10px] font-bold ${stat.trend.includes('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                 {stat.trend}
               </span>
               {stat.trend.includes('+') ? <ArrowUpRight size={12} className="text-emerald-500" /> : <ArrowDownRight size={12} className="text-rose-500" />}
            </div>
          </div>
        ))}
        {/* System Health Alert */}
        <div className="bg-white p-5 rounded-xl border-l-4 border-emerald-500 border-t border-r border-b border-slate-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-emerald-500 mt-1">
              <Zap size={20} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Engine Status</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">System operating at 99.9% uptime. No latency detected in AI nodes.</p>
              <button className="text-[10px] font-black text-emerald-600 hover:underline mt-2">View Metrics</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Processing Load Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-900">Data Processing Velocity</h3>
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">GB per second throughput</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                <button className="px-3 py-1 text-[10px] font-black text-indigo-600 bg-white rounded shadow-sm border border-slate-200">Real-time</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-400">History</button>
              </div>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <MoreHorizontal size={18} className="text-slate-400" />
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[65, 45, 78, 56, 89, 67, 45, 92, 74, 55, 68, 82, 49, 77].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className={`w-full max-w-[12px] rounded-t-sm transition-all duration-700 ease-out group-hover:max-w-[16px] ${i % 2 === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`}
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}GB/s
                    </div>
                  </div>
                </div>
                <span className="text-[8px] font-bold text-slate-400">T-{14-i}m</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex gap-6">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Input Stream</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Output Buffer</span>
               </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:gap-3 transition-all">
               System Logs <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Governance Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Governance Score</h3>
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
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.88)}
                    className="text-indigo-600"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">88%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliant</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-3 bg-slate-50 rounded-lg text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Audits</p>
                <p className="text-lg font-black text-slate-900">14</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Risks</p>
                <p className="text-lg font-black text-slate-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
              Live Neural Feed
              <button className="p-1 hover:bg-slate-50 rounded"><Activity size={16} className="text-slate-400" /></button>
            </h3>
            <div className="space-y-4">
              {[
                { label: "Predictive Model X1", time: "Live", status: "Optimizing", color: "bg-emerald-50 text-emerald-600", icon: Cpu },
                { label: "Security Encryption", time: "Active", status: "Secured", color: "bg-blue-50 text-blue-600", icon: ShieldCheck },
                { label: "Data Sink Node 4", time: "Syncing", status: "94% complete", color: "bg-amber-50 text-amber-600", icon: Globe },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <item.icon size={16} />
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
            <button className="w-full mt-6 py-2.5 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md active:scale-95">
              Launch Neural Studio
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Analytical History</h3>
            <div className="flex gap-2">
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <Search size={14} className="text-slate-400" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Name</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "Monthly Sales Analysis", status: "Completed", size: "2.4 MB", color: "emerald" },
                  { name: "Inventory Audit Q4", status: "Completed", size: "1.8 MB", color: "emerald" },
                  { name: "Fleet Performance", status: "In Progress", size: "0.5 MB", color: "amber" },
                  { name: "Regional Growth Map", status: "Completed", size: "5.2 MB", color: "emerald" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                         <FileText size={14} className="text-slate-400 group-hover:text-indigo-600" />
                         <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-slate-100 ${
                        item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-[11px] font-black text-slate-900">{item.size}</td>
                    <td className="py-4">
                       <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-indigo-600">
                          <Download size={14} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Config Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">System Configuration</h3>
            <Settings size={16} className="text-slate-400" />
          </div>
          <div className="space-y-4">
            {[
              { label: "Auto-Backup", value: "Enabled", status: "Active", icon: ShieldCheck },
              { label: "Encryption", value: "AES-256", status: "High", icon: ShieldCheck },
              { label: "Neural Nodes", value: "12 Active", status: "Balanced", icon: Cpu },
              { label: "Storage Load", value: "42% used", status: "Healthy", icon:Globe },
            ].map((cfg, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <cfg.icon size={16} />
                   </div>
                   <div>
                      <p className="text-[11px] font-bold text-slate-900">{cfg.label}</p>
                      <p className="text-[9px] font-medium text-slate-400">{cfg.value}</p>
                   </div>
                </div>
                <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">{cfg.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
