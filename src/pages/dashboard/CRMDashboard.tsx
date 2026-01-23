
import { useState, useEffect } from "react";
import { 
  Users, 
  UserPlus, 
  Activity, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Mail,
  PhoneCall,
  Target,
  ChevronRight,
} from "lucide-react";

export default function CRMDashboard() {
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
        ).join(' ') : "CRM Manager";
        setUserRole(role);
      } else {
        setUserRole("CRM Manager");
      }
    };

    updateGreeting();
    fetchUserRole();
  }, []);

  const activeLeads = [
    { name: "John Doe", company: "TechCorp", avatar: "👨‍💼" },
    { name: "Jane Smith", company: "Global Logistics", avatar: "👩‍💼" },
    { name: "Robert Wilson", company: "Eco Solutions", avatar: "👦" },
    { name: "Alice Johnson", company: "Skyline Inc", avatar: "👩" },
    { name: "Michael Chen", company: "Pixel Perfect", avatar: "👨" },
    { name: "Sarah Miller", company: "Data Dynamics", avatar: "👧" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              CRM <span className="text-indigo-600">Overview</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">{greeting}, {userRole}</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Relationship Intelligence</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Quick search..."
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full lg:w-64"
              />
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95">
              <Plus size={18} />
              <span>Log Activity</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard icon={<Users className="text-indigo-600" />} label="Active Customers" value="12,458" trend="+12.5%" />
        <StatCard icon={<Target className="text-indigo-600" />} label="Lead Conversion" value="64.2%" trend="On Target" />
        <StatCard icon={<UserPlus className="text-indigo-600" />} label="New Leads" value="458" trend="+42 weekly" />
        <StatCard icon={<Activity className="text-indigo-600" />} label="Retention Rate" value="98.2%" trend="+0.4%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Dashboard Content */}
        <div className="lg:col-span-2 space-y-3">
          {/* Active Leads Feed */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Priority Leads</h3>
              <button className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-wider">Analysis</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {activeLeads.map((lead, i) => (
                <div key={i} className="flex flex-col items-center gap-2 min-w-[100px] group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-sm group-hover:border-indigo-300 transition-all">
                    {lead.avatar}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-900">{lead.name}</p>
                    <p className="text-[10px] font-medium text-slate-400">{lead.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sales Pipeline */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Sales Pipeline</h3>
                <p className="text-xs text-slate-500 font-medium">Stage distribution across current quarter</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-100 transition-colors"><Filter size={16} className="text-slate-400" /></button>
                <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-100 transition-colors"><MoreHorizontal size={16} className="text-slate-400" /></button>
              </div>
            </div>
            
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {[
                { label: "Leads", value: 85, color: "bg-slate-100" },
                { label: "Contact", value: 65, color: "bg-indigo-100" },
                { label: "Qualify", value: 45, color: "bg-indigo-300" },
                { label: "Proposal", value: 30, color: "bg-indigo-500" },
                { label: "Negotiate", value: 20, color: "bg-indigo-700" },
                { label: "Closed", value: 15, color: "bg-emerald-500" },
              ].map((stage, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex flex-col justify-end h-full">
                    <div 
                      className={`w-full ${stage.color} rounded-t-md transition-all duration-500 group-hover:opacity-80`}
                      style={{ height: `${stage.value}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{stage.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-3">
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Customer CSAT</h3>
            <div className="flex flex-col items-center py-4">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                  <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 50} strokeDashoffset={2 * Math.PI * 50 * (1 - 0.88)} className="text-indigo-600" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-bold text-slate-900">88%</span>
                  <p className="text-[8px] font-bold text-slate-400 uppercase">Score</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Engagement</h3>
            <div className="space-y-4">
              {[
                { label: "Discovery Calls", count: 12, icon: PhoneCall, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Email Campaigns", count: 84, icon: Mail, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "On-site Demos", count: 4, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${act.bg} ${act.color} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}><act.icon size={16} /></div>
                    <span className="text-[11px] font-bold text-slate-700">{act.label}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{act.count}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: any) {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">{icon}</div>
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
