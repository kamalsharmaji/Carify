import { useState, useEffect } from "react";
import { 
  Megaphone, 
  TrendingUp, 
  Users, 
  Filter, 
  Plus, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Share2,
  MousePointer2,
  Zap,
  BarChart3,
  Play,
  ArrowRight
} from "lucide-react";

export default function MMMDashboard() {
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
        ).join(' ') : "Marketing Lead";
        setUserRole(role);
      } else {
        setUserRole("Marketing Lead");
      }
    };

    updateGreeting();
    fetchUserRole();
  }, []);

  const marketingTeam = [
    { name: "Sarah Miller", role: "Creative Lead", avatar: "👩‍🎨" },
    { name: "David Brown", role: "Ads Manager", avatar: "👨‍💻" },
    { name: "Emily Davis", role: "Social Media", avatar: "👩‍🤳" },
    { name: "James Wilson", role: "Content Strategist", avatar: "✍️" },
    { name: "Linda Taylor", role: "SEO Specialist", avatar: "🔍" },
    { name: "Kevin Anderson", role: "Email Specialist", avatar: "📧" },
    { name: "Mick Aston", role: "Media Buyer", avatar: "💰" },
    { name: "Protiong", role: "Video Editor", avatar: "🎬" },
    { name: "Cooper Decker", role: "Analytics", avatar: "📊" },
    { name: "Brianna", role: "PR Manager", avatar: "📢" },
  ];

  const stats = [
    { label: "Total Ad Spend", value: "₹42.5L", trend: "+12.4% vs last mo", icon: Zap, color: "blue" },
    { label: "Total Reach", value: "1.24M", trend: "98.2% target reach", icon: Users, color: "slate" },
    { label: "Avg CTR", value: "4.82%", trend: "+0.6% improvement", icon: MousePointer2, color: "blue" },
    { label: "ROI (Avg)", value: "4.2x", trend: "+0.2x this week", icon: TrendingUp, color: "slate" },
  ];

  return (
    <div className="space-y-3 pb-10 animate-in fade-in duration-700 bg-[#f8fafc]">
      
      {/* Greeting Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
         <h3 className="text-2xl font-sm text-slate-900 pb-2  inline-block">
          {greeting}, {userRole}! 
        </h3> 
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here's what's happening in your marketing department today.
        </p>
      </div>

      {/* Active Marketing Experts */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b-2 border-blue-500 inline-block">Active Campaign Experts</h3>
          <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Team</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {marketingTeam.map((member, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 group cursor-pointer hover:border-blue-300 transition-all">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">{stat.label}</p>
                <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
              </div>
              <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${stat.color === 'blue' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}`}>
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
        {/* Campaign Health Alert */}
        <div className="bg-white p-5 rounded-xl  shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-orange-500 mt-1">
              <Megaphone size={20} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Campaign Alert</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">2 campaigns are nearing budget limit. Review allocation.</p>
              <button className="text-[10px] font-black text-orange-600 hover:underline mt-2">Optimize Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* ROI Performance Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-900">Campaign ROI Analysis</h3>
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Return on investment per channel</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                <button className="px-3 py-1 text-[10px] font-black text-blue-600 bg-white rounded shadow-sm border border-slate-200">Weekly</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-400">Monthly</button>
              </div>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <MoreHorizontal size={18} className="text-slate-400" />
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[34, 45, 23, 67, 45, 89, 45, 67, 34, 56, 78, 45, 67, 89].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className={`w-full max-w-[12px] rounded-t-sm transition-all duration-700 ease-out group-hover:max-w-[16px] ${i % 2 === 0 ? 'bg-blue-600' : 'bg-slate-300'}`}
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}%
                    </div>
                  </div>
                </div>
                <span className="text-[8px] font-bold text-slate-400">D{i+1}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex gap-3">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Search Ads</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Social Media</span>
               </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:gap-3 transition-all">
               Deep Analytics <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Media Attribution Sidebar */}
        <div className="space-y-6">
          {/* Reach Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Reach Attribution</h3>
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
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.74)}
                    className="text-blue-600"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">74%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Organic</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-slate-50 rounded-lg text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Paid</p>
                <p className="text-lg font-black text-slate-900">26%</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Referral</p>
                <p className="text-lg font-black text-slate-900">12%</p>
              </div>
            </div>
          </div>

          {/* Quick Content Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
              Content Engine
              <button className="p-1 hover:bg-slate-50 rounded"><Plus size={16} className="text-slate-400" /></button>
            </h3>
            <div className="space-y-4">
              {[
                { label: "New Blog Post", time: "Draft", status: "In Progress", color: "bg-blue-50 text-blue-600" },
                { label: "Summer Video", time: "Review", status: "Pending", color: "bg-emerald-50 text-emerald-600" },
                { label: "Press Release", time: "Final", status: "Approved", color: "bg-purple-50 text-purple-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Share2 size={16} />
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
            <button className="w-full mt-6 py-2.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md active:scale-95">
              Launch Campaign Wizard
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Campaign Roadmap */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Campaign Roadmap</h3>
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
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ROI</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "Summer Service", status: "Active", roi: "5.2x", trend: "+12%", color: "emerald" },
                  { name: "Brand Awareness", status: "Scheduled", roi: "-", trend: "New", color: "blue" },
                  { name: "Loyalty Promo", status: "Paused", roi: "3.1x", trend: "-5%", color: "orange" },
                  { name: "Winter Safety", status: "Completed", roi: "4.8x", trend: "+8%", color: "slate" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] group-hover:bg-blue-600 group-hover:text-white transition-colors">🚀</div>
                        <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-slate-100 ${
                        item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' :
                        item.status === 'Paused' ? 'bg-orange-50 text-orange-600' :
                        'bg-slate-50 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-[11px] font-black text-slate-900">{item.roi}</td>
                    <td className="py-4">
                      <div className={`flex items-center gap-1 text-[10px] font-bold ${item.trend.includes('+') ? 'text-emerald-500' : item.trend === 'New' ? 'text-blue-500' : 'text-rose-500'}`}>
                         {item.trend}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Media Library Peek */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Media Assets</h3>
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Go to Library</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Banner_v1.jpg", size: "2.4 MB", type: "Image", color: "bg-blue-50" },
              { label: "Launch_Vid.mp4", size: "128 MB", type: "Video", color: "bg-purple-50" },
              { label: "Logo_Pack.zip", size: "15 MB", type: "Asset", color: "bg-amber-50" },
              { label: "Campaign_Doc.pdf", size: "450 KB", type: "Doc", color: "bg-rose-50" },
            ].map((asset, i) => (
              <div key={i} className="p-3 border border-slate-50 rounded-xl hover:border-blue-200 transition-all group cursor-pointer flex items-center gap-3">
                <div className={`w-10 h-10 ${asset.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                   <BarChart3 size={20} className="text-slate-400" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-bold text-slate-900 truncate">{asset.label}</p>
                  <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">{asset.type} • {asset.size}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 border-dashed flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-slate-100 transition-all">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-blue-600 transition-colors">
                <Plus size={16} />
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload New Asset</span>
          </div>
        </div>
      </div>

      {/* Marketing Intelligence Banner */}
      <div className="bg-[#1e1b4b] rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-3">
           <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">Predictive Performance</span>
              </div>
              <h2 className="text-3xl font-black mb-4 tracking-tighter">Campaign <span className="text-blue-400">Synthesizer</span></h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                AI-driven insights suggest a 15% budget shift towards search ads for the upcoming weekend to maximize conversion efficiency.
              </p>
           </div>
           <div className="flex gap-3">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center min-w-[140px]">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Estimated Growth</p>
                 <p className="text-3xl font-black text-emerald-400">+18.5%</p>
              </div>
              <button className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-90 group">
                 <Play size={20} className="fill-white group-hover:scale-110 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
