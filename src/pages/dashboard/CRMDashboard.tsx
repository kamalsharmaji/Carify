import { useState, useEffect } from "react";
import { 
  Users, 
  UserPlus, 
  Activity, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Star,
  PhoneCall,
  Target,
  ChevronLeft,
  ChevronRight,
  Clock
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
    { name: "David Brown", company: "Cloud Nine", avatar: "👩‍💻" },
    { name: "Emily Davis", company: "BioTech Ltd", avatar: "👴" },
    { name: "James Wilson", company: "Stellar Systems", avatar: "👩‍🏫" },
    { name: "Linda Taylor", company: "Quantum Co", avatar: "👱‍♀️" },
    { name: "Kevin Anderson", company: "Nova Corp", avatar: "👳" },
  ];

  const stats = [
    { label: "Active Customers", value: "12,458", trend: "+12.5% this month", icon: Users, color: "blue" },
    { label: "Lead Conversion", value: "64.2%", trend: "95% target reach", icon: Target, color: "slate" },
    { label: "New Leads", value: "458", trend: "+42 this week", icon: UserPlus, color: "blue" },
    { label: "Retention Rate", value: "98.2%", trend: "+0.4% improvement", icon: Activity, color: "slate" },
  ];

  return (
    <div className="space-y-3 pb-10 animate-in fade-in duration-700 bg-[#f8fafc]">
      
      {/* Greeting Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-2xl font-sm text-slate-900 pb-2  inline-block">
          {greeting}, {userRole}! 
        </h3>
         
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here's what's happening with your customer relationships today.
        </p>
      </div>

      {/* Today's Active Leads */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b-2 border-purple-500 inline-block">Today's Active Leads</h3>
          <button className="text-[10px] font-black text-purple-600 uppercase tracking-widest hover:underline">View All Leads</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {activeLeads.map((lead, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 group cursor-pointer hover:border-purple-300 transition-all">
                {lead.avatar}
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-900 whitespace-nowrap">{lead.name}</p>
                <p className="text-[9px] font-medium text-slate-400 whitespace-nowrap">{lead.company}</p>
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
              <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${stat.color === 'blue' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-white'}`}>
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
        {/* Sales Target Alert */}
        <div className="bg-white p-5 rounded-xl   shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-emerald-500 mt-1">
              <Star size={20} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Target Achievement</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Monthly target reached 84%. Keep up the momentum!</p>
              <button className="text-[10px] font-black text-emerald-600 hover:underline mt-2">View Pipeline</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Sales Pipeline Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-900">Sales Pipeline</h3>
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Opportunity distribution by stage</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold py-1.5 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all">
                <option>This Quarter</option>
                <option>Last Quarter</option>
                <option>Year to Date</option>
              </select>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <MoreHorizontal size={18} className="text-slate-400" />
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-3 px-4">
            {[
              { label: "Leads", value: 85, color: "bg-slate-200" },
              { label: "Contacted", value: 65, color: "bg-purple-200" },
              { label: "Qualified", value: 45, color: "bg-purple-400" },
              { label: "Proposal", value: 30, color: "bg-purple-600" },
              { label: "Negotiation", value: 20, color: "bg-purple-800" },
              { label: "Closed", value: 15, color: "bg-emerald-500" },
            ].map((stage, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full flex flex-col items-center justify-end h-full">
                  <div 
                    className={`w-full ${stage.color} rounded-t-lg transition-all duration-700 ease-out group-hover:opacity-80 relative`}
                    style={{ height: `${stage.value}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {stage.value}k
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">
                  {stage.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-slate-50 pt-6">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Pipeline</p>
              <p className="text-xl font-black text-slate-900">$4.2M</p>
            </div>
            <div className="text-center border-x border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Avg Deal Size</p>
              <p className="text-xl font-black text-slate-900">$24.5k</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Win Rate</p>
              <p className="text-xl font-black text-slate-900">32.8%</p>
            </div>
          </div>
        </div>

        {/* Customer Intelligence Sidebar */}
        <div className="space-y-6">
          {/* Customer Satisfaction */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Customer CSAT</h3>
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
                    className="text-purple-600"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">88%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mt-4">
               <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-500">Service Quality</span>
                  <span className="font-black text-slate-900">92%</span>
               </div>
               <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[92%]"></div>
               </div>
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
              Activities
              <button className="p-1 hover:bg-slate-50 rounded"><Plus size={16} className="text-slate-400" /></button>
            </h3>
            <div className="space-y-4">
              {[
                { type: "Call", label: "Discovery Call", count: 12, icon: PhoneCall, color: "bg-blue-50 text-blue-600" },
                { type: "Email", label: "Email Campaign", count: 84, icon: Mail, color: "bg-emerald-50 text-emerald-600" },
                { type: "Meeting", label: "On-site Demo", count: 4, icon: Users, color: "bg-purple-50 text-purple-600" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${activity.color} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <activity.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">{activity.label}</p>
                      <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">{activity.type}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-900">{activity.count}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-sm">
              Log Activity
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Engagement Logs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Engagement Logs</h3>
            <div className="flex gap-2">
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <Filter size={14} className="text-slate-400" />
              </button>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <Search size={14} className="text-slate-400" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Channel</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Outcome</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "John Doe", type: "Call", outcome: "Interested", time: "2h ago", color: "text-blue-600" },
                  { name: "Jane Smith", type: "Email", outcome: "Replied", time: "4h ago", color: "text-emerald-600" },
                  { name: "Robert Wilson", type: "Meeting", outcome: "Proposal Sent", time: "6h ago", color: "text-purple-600" },
                  { name: "Alice Johnson", type: "Call", outcome: "Busy", time: "1d ago", color: "text-slate-400" },
                ].map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px]">👤</div>
                        <span className="text-[11px] font-bold text-slate-700">{log.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${log.color}`}>{log.type}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-[11px] font-medium text-slate-500 italic">"{log.outcome}"</span>
                    </td>
                    <td className="py-4 text-[10px] font-bold text-slate-400 uppercase">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Interactions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Upcoming Interactions</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-slate-50 rounded"><ChevronLeft size={16} className="text-slate-400" /></button>
              <button className="p-1 hover:bg-slate-50 rounded"><ChevronRight size={16} className="text-slate-400" /></button>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { customer: "TechCorp Inc.", time: "10:30 AM", type: "Video Call", priority: "High" },
              { customer: "Global Logistics", time: "02:00 PM", type: "On-site", priority: "Medium" },
              { customer: "Eco Solutions", time: "04:45 PM", type: "Follow-up", priority: "Low" },
              { customer: "Pixel Perfect", time: "Tomorrow", type: "Review", priority: "High" },
            ].map((item, i) => (
              <div key={i} className="p-3 border border-slate-50 rounded-xl hover:border-purple-200 transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-all">
                       <Clock size={16} className="text-slate-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900">{item.customer}</p>
                      <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">{item.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] ${
                    item.priority === 'High' ? 'bg-rose-50 text-rose-600' :
                    item.priority === 'Medium' ? 'bg-amber-50 text-amber-600' :
                    'bg-slate-50 text-slate-600'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-slate-900">{item.time}</span>
                   <button className="text-[9px] font-black text-purple-600 uppercase tracking-widest hover:underline">Prepare Demo</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Performance Summary */}
      <div className="bg-[#0f172a] rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-3">
           <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-300">Live Campaign Insights</span>
              </div>
              <h2 className="text-3xl font-black mb-4 tracking-tighter">Enterprise Outreach <span className="text-purple-400">v2.4</span></h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Your current outreach campaign is performing 24% better than the last quarter.
                Click below to see detailed engagement metrics and customer sentiment analysis.
              </p>
           </div>
           <div className="flex gap-3">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center min-w-[120px]">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Open Rate</p>
                 <p className="text-3xl font-black">68.4%</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center min-w-[120px]">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">CTR</p>
                 <p className="text-3xl font-black text-purple-400">12.2%</p>
              </div>
           </div>
        </div>
        <div className="mt-10 flex items-center gap-3 relative z-10">
           <button className="px-8 py-3 bg-white text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl active:scale-95">
             Full Campaign Analytics
           </button>
           <button className="px-8 py-3 bg-white/10 text-white border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-sm">
             Share Report
           </button>
        </div>
      </div>
    </div>
  );
}
