import React, { useState, useMemo, useEffect } from "react";
import { 
  ClipboardCheck, 
  Search, 
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Zap,
  ArrowRight
} from "lucide-react";

export default function VehicleInspectionDashboard() {
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
        ).join(' ') : "Inspector";
        setUserRole(role);
      } else {
        setUserRole("Inspector");
      }
    };

    updateGreeting();
    fetchUserRole();
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 20)); 

  const inspectors = [
    { name: "Mark Wilson", role: "Senior Inspector", avatar: "👨‍🔧" },
    { name: "Sarah Chen", role: "Safety Expert", avatar: "👩‍🔬" },
    { name: "John Doe", role: "Fleet Auditor", avatar: "🧔" },
    { name: "Alice Johnson", role: "Technical Lead", avatar: "👩‍💻" },
    { name: "Michael Smith", role: "Compliance Officer", avatar: "👨‍💼" },
    { name: "Emily Davis", role: "Field Agent", avatar: "👧" },
    { name: "Robert Brown", role: "Maintenance Coord", avatar: "👴" },
    { name: "Linda Taylor", role: "QA Specialist", avatar: "👩‍🏫" },
  ];

  const stats = [
    { label: "Total Inspections", value: "1,284", trend: "+12.5% from last mo", icon: ClipboardCheck, color: "blue" },
    { label: "Pending Reviews", value: "43", trend: "5 urgent checks", icon: Clock, color: "slate" },
    { label: "Passed Safety", value: "98.2%", trend: "+0.4% improvement", icon: CheckCircle2, color: "blue" },
    { label: "Critical Defects", value: "7", trend: "+2 today", icon: AlertCircle, color: "slate" },
  ];

  const calendarEvents = [
    { date: "2026-01-09", id: "#IREQ00001" },
    { date: "2026-01-10", id: "#IREQ00002" },
    { date: "2026-01-13", id: "#IREQ00003" },
    { date: "2026-01-20", id: "#IREQ00006" },
  ];

  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ day: new Date(year, month, 0).getDate() - i, currentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }
    while (days.length < 42) {
      days.push({ day: days.length - (daysInMonth + firstDayOfMonth) + 1, currentMonth: false });
    }
    return days;
  }, [currentDate]);

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-700 bg-[#f8fafc]">
      
      {/* Greeting Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          {greeting}, {userRole}! 👋
        </h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here's what's happening with vehicle inspections today.
        </p>
      </div>

      {/* Active Inspectors Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b-2 border-red-500 inline-block">Certified Inspection Team</h3>
          <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">Duty Roster</button>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {inspectors.map((member, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 group cursor-pointer hover:border-red-300 transition-all">
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
              <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${stat.color === 'blue' ? 'bg-red-600 text-white' : 'bg-slate-700 text-white'}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <div className="flex items-center gap-1">
               <span className={`text-[10px] font-bold ${stat.trend.includes('+') ? 'text-red-500' : 'text-slate-400'}`}>
                 {stat.trend}
               </span>
               {stat.trend.includes('+') ? <ArrowUpRight size={12} className="text-emerald-500" /> : <ArrowDownRight size={12} className="text-rose-500" />}
            </div>
          </div>
        ))}
        {/* Compliance Alert */}
        <div className="bg-white p-5 rounded-xl border-l-4 border-rose-500 border-t border-r border-b border-slate-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-rose-500 mt-1">
              <ShieldAlert size={20} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Safety Alert</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">3 vehicles failed critical safety checks today. Urgent repair required.</p>
              <button className="text-[10px] font-black text-rose-500 hover:underline mt-2">View Reports</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inspection Calendar Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-900">Inspection Schedule</h3>
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Upcoming vehicle checkups</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                 <button className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
                    <ChevronLeft size={16} className="text-slate-400" />
                 </button>
                 <span className="px-4 py-1 text-[10px] font-black text-slate-600 self-center">
                    {currentDate.toLocaleString('default', { month: 'short', year: 'numeric' }).toUpperCase()}
                 </span>
                 <button className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
                    <ChevronRight size={16} className="text-slate-400" />
                 </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 border-t border-l border-slate-50 rounded-lg overflow-hidden">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center py-2 border-r border-b border-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/30">{d}</div>
            ))}
            {calendarData.map((d, i) => {
              const dateStr = `2026-01-${String(d.day).padStart(2, '0')}`; // Simplified for demo
              const hasEvent = calendarEvents.some(e => e.date === dateStr && d.currentMonth);
              return (
                <div key={i} className={`min-h-[80px] p-2 border-r border-b border-slate-50 transition-all hover:bg-slate-50/50 ${!d.currentMonth ? 'bg-slate-50/10 opacity-30' : ''}`}>
                  <div className="text-right text-[10px] font-bold text-slate-400 mb-1">{d.day}</div>
                  {hasEvent && (
                    <div className="bg-rose-50 border border-rose-100 text-rose-600 text-[8px] font-black py-1 px-1.5 rounded-md truncate">
                      INSP-REQ
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex gap-6">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Passed</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Failed</span>
               </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest hover:gap-3 transition-all">
               Full Schedule <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Safety Metrics Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Fleet Health Score</h3>
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
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.94)}
                    className="text-emerald-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">94%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optimal</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-3 bg-slate-50 rounded-lg text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Passed</p>
                <p className="text-lg font-black text-slate-900">1.2k</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Defects</p>
                <p className="text-lg font-black text-slate-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
              Operational Log
              <button className="p-1 hover:bg-slate-50 rounded"><Zap size={16} className="text-slate-400" /></button>
            </h3>
            <div className="space-y-4">
              {[
                { label: "BMW X5 (NY-9821)", time: "2m ago", status: "Passed", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
                { label: "Tesla Model 3 (CA-4432)", time: "15m ago", status: "Failed", color: "bg-rose-50 text-rose-600", icon: AlertCircle },
                { label: "Fleet B (Daily Check)", time: "1h ago", status: "Updated", color: "bg-blue-50 text-blue-600", icon: Clock },
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
            <button className="w-full mt-6 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95">
              Launch New Inspection
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inspections Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Recent Activities</h3>
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
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspector</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { vehicle: "BMW X5 (NY-9821)", status: "Passed", inspector: "Mark W.", time: "2 mins ago" },
                  { vehicle: "Tesla Model 3 (CA-4432)", status: "Failed", inspector: "Sarah C.", time: "15 mins ago" },
                  { vehicle: "Ford F-150 (TX-1122)", status: "Pending", inspector: "John D.", time: "45 mins ago" },
                  { vehicle: "Honda Civic (CA-7788)", status: "Passed", inspector: "Alice J.", time: "1 hour ago" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="py-4">
                      <span className="text-[11px] font-bold text-slate-700">{item.vehicle}</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-slate-100 ${
                        item.status === 'Passed' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'Failed' ? 'bg-rose-50 text-rose-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-[11px] font-black text-slate-900">{item.inspector}</td>
                    <td className="py-4 text-[10px] font-bold text-slate-400 uppercase">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reminders List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Upcoming Reminders</h3>
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { vehicle: "BMW X5", date: "27-10-2028", priority: "High", color: "rose" },
              { vehicle: "Chevrolet Tahoe", date: "16-10-2027", priority: "Medium", color: "amber" },
              { vehicle: "Ford Mustang", date: "19-09-2026", priority: "Low", color: "blue" },
              { vehicle: "Honda Civic", date: "17-04-2026", priority: "Medium", color: "amber" },
            ].map((rem, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-lg bg-${rem.color}-50 flex items-center justify-center text-${rem.color}-600`}>
                      <Clock size={16} />
                   </div>
                   <div>
                      <p className="text-[11px] font-bold text-slate-900">{rem.vehicle}</p>
                      <p className="text-[9px] font-medium text-slate-400">{rem.date}</p>
                   </div>
                </div>
                <span className={`text-[9px] font-black text-${rem.color}-600 uppercase tracking-widest bg-${rem.color}-50 px-2 py-0.5 rounded`}>{rem.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
