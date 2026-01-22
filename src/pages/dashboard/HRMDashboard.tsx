import { useState, useEffect } from "react";
import { 
  Users, 
  UserPlus, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  Briefcase,
  UserCheck,
  GraduationCap,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Bell,
  MoreVertical,Award,
  ArrowRight,
  Target
} from "lucide-react";

export default function HRMDashboard() {
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
        // Format role to be more readable (e.g., SUPER_ADMIN -> Super Admin)
        const role = user.role ? user.role.split('_').map((word: string) => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ') : "HR";
        setUserRole(role);
      } else {
        setUserRole("HR");
      }
    };

    updateGreeting();
    fetchUserRole();
  }, []);

  const notClockedIn = [
    { name: "Mick Aston", avatar: "👨‍💼" },
    { name: "Protiong", avatar: "👩‍💼" },
    { name: "Cooper Decker", avatar: "👦" },
    { name: "Brianna Copeland", avatar: "👩" },
    { name: "kjh donald", avatar: "👨" },
    { name: "Emma Hopper", avatar: "👧" },
    { name: "Tara Hicks", avatar: "👩‍💻" },
    { name: "Ralph Mercer", avatar: "👴" },
    { name: "Anne George", avatar: "👩‍🏫" },
    { name: "Isabelle Clemons", avatar: "👱‍♀️" },
    { name: "Employee", avatar: "👳" },
  ];

  const stats = [
    { label: "Total Employees", value: "142", trend: "+12% from last month", icon: Users, color: "blue" },
    { label: "Active Now", value: "135", trend: "95% attendance today", icon: Activity, color: "slate" },
    { label: "New Hires", value: "12", trend: "+4 this week", icon: UserPlus, color: "blue" },
    { label: "Attrition Rate", value: "2.4%", trend: "-0.5% improvement", icon: TrendingUp, color: "slate" },
  ];

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-700 bg-[#f8fafc]">
      
      {/* Greeting Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          {greeting}, {userRole}! 👋
        </h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here's what's happening in your organization today.
        </p>
      </div>

      {/* Today's Not Clock In */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-6 pb-2 border-b-2 border-orange-200 inline-block">Today's Not Clock In</h3>
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {notClockedIn.map((emp, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100">
                {emp.avatar}
              </div>
              <span className="text-[10px] font-medium text-slate-600 text-center whitespace-nowrap">{emp.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">{stat.label}</p>
                <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
              </div>
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <p className={`text-[10px] font-bold ${stat.trend.includes('+') ? 'text-emerald-500' : stat.trend.includes('-') ? 'text-rose-500' : 'text-slate-400'}`}>
              {stat.trend}
            </p>
          </div>
        ))}
        {/* Compliance Alert */}
        <div className="bg-white p-5 rounded-xl border-l-4 border-orange-500 border-t border-r border-b border-slate-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-orange-500 mt-1">
              <AlertCircle size={20} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Compliance Alert</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">3 employees have expiring visas in the next 30 days.</p>
              <button className="text-[10px] font-black text-rose-500 hover:underline mt-2">Review Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Calendar Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Event</h3>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button className="p-1 hover:bg-slate-50 rounded"><ChevronLeft size={18} /></button>
                <button className="p-1 hover:bg-slate-50 rounded"><ChevronRight size={18} /></button>
              </div>
              <button className="px-4 py-1.5 bg-slate-600 text-white rounded text-sm font-bold">Today</button>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest">January 2026</h4>
          </div>

          <div className="grid grid-cols-7 gap-y-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-[11px] font-bold text-slate-400 pb-4">{d}</div>
            ))}
            {/* Simple static calendar grid matching screenshot */}
            {Array.from({ length: 31 }, (_, i) => {
               const day = i + 1;
               const isSelected = day === 21;
               return (
                 <div key={i} className="flex justify-center">
                   <div className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                     {day}
                   </div>
                 </div>
               );
            })}
          </div>

          <div className="flex gap-1 mt-8">
            <button className="flex-1 py-2 bg-slate-50 text-slate-500 text-xs font-bold rounded-l-lg border border-slate-100">Day</button>
            <button className="flex-1 py-2 bg-slate-50 text-slate-500 text-xs font-bold border border-slate-100">Week</button>
            <button className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-r-lg">Month</button>
          </div>
        </div>

        {/* Small Stats Sidebar Section */}
        <div className="space-y-6">
          {/* Staff */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Staff</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 bg-white border border-slate-100 rounded-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Users size={20} /></div>
                <div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">Total Staff</p>
                   <p className="text-xl font-bold text-slate-900">16</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-slate-100 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><UserCheck size={20} /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Total Employee</p>
                    <p className="text-xl font-bold text-slate-900">8</p>
                  </div>
                </div>
                <div className="p-3 bg-white border border-slate-100 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Users size={20} /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Total Client</p>
                    <p className="text-xl font-bold text-slate-900">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Job</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 bg-white border border-slate-100 rounded-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Briefcase size={20} /></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Total Jobs</p>
                  <p className="text-xl font-bold text-slate-900">4</p>
                </div>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Briefcase size={20} /></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Active Jobs</p>
                  <p className="text-xl font-bold text-slate-900">4</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-100 rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Briefcase size={20} /></div>
              <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase">Inactive Jobs</p>
                 <p className="text-xl font-bold text-slate-900">0</p>
              </div>
            </div>
          </div>

          {/* Training */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Training</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 bg-white border border-slate-100 rounded-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><GraduationCap size={20} /></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Trainer</p>
                  <p className="text-xl font-bold text-slate-900">4</p>
                </div>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><GraduationCap size={20} /></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Active Training</p>
                  <p className="text-xl font-bold text-slate-900">1</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-100 rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><GraduationCap size={20} /></div>
              <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase">Done Training</p>
                 <p className="text-xl font-bold text-slate-900">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meeting schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <h3 className="text-sm font-bold text-slate-900 mb-6">Meeting schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { title: "Event Related", date: "Jan 18, 2024", time: "12:20 PM" },
                  { title: "New Technology", date: "Feb 24, 2024", time: "12:26 PM" },
                  { title: "Meeting: Weekly Team Meeting", date: "Mar 22, 2024", time: "7:29 PM" },
                  { title: "Marketing Campaign Review", date: "Apr 21, 2024", time: "6:10 PM" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 text-[11px] font-bold text-slate-700">{item.title}</td>
                    <td className="py-4 text-[11px] font-bold text-slate-500">{item.date}</td>
                    <td className="py-4 text-[11px] font-bold text-slate-500">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcement List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <h3 className="text-sm font-bold text-slate-900 mb-6">Announcement List</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">End Date</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { title: "Sports Scream", start: "Jul 21, 2024", end: "Jul 21, 2024", desc: "Retirement announcement" },
                  { title: "My New Business", start: "Jul 21, 2024", end: "Jul 21, 2024", desc: "Organizational changes announcement" },
                  { title: "WE WANT TO EARN YOUR DEEPEST TRUST.", start: "Jul 21, 2024", end: "Jul 21, 2024", desc: "New hire announcement" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 text-[11px] font-bold text-slate-700">{item.title}</td>
                    <td className="py-4 text-[11px] font-bold text-slate-500">{item.start}</td>
                    <td className="py-4 text-[11px] font-bold text-slate-500">{item.end}</td>
                    <td className="py-4 text-[11px] font-bold text-slate-500 truncate max-w-[150px]">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Detailed Analytics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Purple Banner Card */}
            <div className="bg-[#7c3aed] rounded-xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1">Current Date & Time</p>
                 <h2 className="text-4xl font-black mb-1 tracking-tighter">12:06 PM</h2>
                 <p className="text-sm font-medium opacity-90">Wednesday, January 21, 2026</p>
               </div>
               <div className="flex items-center gap-6 relative z-10">
                  <div className="text-center bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm">
                    <p className="text-[10px] font-black opacity-80 uppercase mb-1">Punch In</p>
                    <p className="text-lg font-bold">09:00 AM</p>
                  </div>
                  <div className="text-center bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm">
                    <p className="text-[10px] font-black opacity-80 uppercase mb-1">Avg Hrs</p>
                    <p className="text-lg font-bold">8h 45m</p>
                  </div>
                  <button className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-50 transition-all active:scale-95">
                    <Clock size={16} /> Punch Out
                  </button>
               </div>
               {/* Decorative Circles */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            </div>

            {/* Recruitment Pipeline */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-slate-900">Recruitment Pipeline</h4>
                <button className="text-[10px] font-black text-blue-600 flex items-center gap-1">View All <ArrowRight size={10} /></button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-10">
                 <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-[10px] text-blue-600 font-bold uppercase mb-2">Screening</p>
                    <p className="text-2xl font-black text-slate-900">14</p>
                 </div>
                 <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                    <p className="text-[10px] text-purple-600 font-bold uppercase mb-2">Interview</p>
                    <p className="text-2xl font-black text-slate-900">8</p>
                 </div>
                 <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                    <p className="text-[10px] text-emerald-600 font-bold uppercase mb-2">Offer</p>
                    <p className="text-2xl font-black text-slate-900">3</p>
                 </div>
              </div>
              {/* Chart Placeholder (Curve) */}
              <div className="relative h-48 w-full">
                 <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path 
                      d="M0 80 Q 150 70, 300 60 T 600 50 T 900 30 L 1000 40 V 100 H 0 Z" 
                      fill="url(#gradient)" 
                      opacity="0.1"
                    />
                    <path 
                      d="M0 80 Q 150 70, 300 60 T 600 50 T 900 30 L 1000 40" 
                      fill="none" 
                      stroke="#7c3aed" 
                      strokeWidth="2.5"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                 </svg>
                 <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Leave Balance */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 flex flex-col items-center">
              <h4 className="text-sm font-bold text-slate-900 mb-8 self-start">Leave Balance</h4>
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#b91c1c" strokeWidth="12" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-900">18</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Days Left</span>
                </div>
              </div>
              <div className="flex gap-4 w-full mt-10">
                 <button className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all">Apply Leave</button>
                 <button className="flex-1 py-3 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">History</button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h4 className="text-sm font-bold text-slate-900 mb-6">Notifications</h4>
              <div className="space-y-5">
                 {[
                   { icon: <Calendar size={14}/>, color: "orange", text: "Sarah Connor requested leave", time: "2 mins ago" },
                   { icon: <Briefcase size={14}/>, color: "blue", text: "John Doe completed training", time: "1 hour ago" },
                   { icon: <Bell size={14}/>, color: "purple", text: "HR System published policy", time: "3 hours ago" },
                 ].map((note, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className={`w-8 h-8 rounded-lg bg-${note.color}-50 text-${note.color}-500 flex items-center justify-center shrink-0`}>
                        {note.icon}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-700 leading-tight mb-0.5">{note.text}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{note.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors">View All Notifications</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Employees */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-900">Recent Employees</h3>
            <button className="text-[10px] font-black text-blue-600 flex items-center gap-1">Manage Team <ArrowRight size={10} /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">JD</div>
                        <span className="text-[11px] font-bold text-slate-800">John Doe</span>
                      </div>
                    </td>
                    <td className="py-4 text-[11px] font-medium text-slate-600">Senior Developer</td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded">Active</span>
                    </td>
                    <td className="py-4">
                       <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500 w-[60%] rounded-full"></div>
                       </div>
                    </td>
                    <td className="py-4">
                       <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-50"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Next Payout */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center font-bold">₹</div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Payout</h4>
           </div>
           <div className="space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-slate-500">Estimated Salary</span>
                <span className="text-[11px] font-bold text-slate-900">- ₹ 1,200.00</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-slate-500">Deductions</span>
                <span className="text-[11px] font-bold text-rose-500">- ₹ 1,200.00</span>
             </div>
             <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                <span className="text-3xl font-black text-emerald-500 tracking-tighter">₹ 7,250.00</span>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
          <h3 className="text-sm font-bold text-slate-900 mb-8">Department Distribution</h3>
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            {/* Donut Chart Visual */}
            <svg className="w-full h-full -rotate-90">
               <circle cx="96" cy="96" r="80" fill="none" stroke="#3b82f6" strokeWidth="15" strokeDasharray="502" strokeDashoffset="100" />
               <circle cx="96" cy="96" r="80" fill="none" stroke="#10b981" strokeWidth="15" strokeDasharray="502" strokeDashoffset="300" />
               <circle cx="96" cy="96" r="80" fill="none" stroke="#f43f5e" strokeWidth="15" strokeDasharray="502" strokeDashoffset="400" />
               <circle cx="96" cy="96" r="80" fill="none" stroke="#f59e0b" strokeWidth="15" strokeDasharray="502" strokeDashoffset="450" />
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-x-2 gap-y-3 mt-10">
            {[
              { label: "Engineering", color: "blue-600" },
              { label: "Finance", color: "blue-400" },
              { label: "HR", color: "emerald-500" },
              { label: "Marketing", color: "rose-500" },
              { label: "Sales", color: "orange-500" },
            ].map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                 <div className={`w-2.5 h-2.5 rounded-full bg-${d.color}`}></div>
                 <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Goals */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-sm font-bold text-slate-900">Performance Goals</h3>
             <Target size={20} className="text-slate-300" />
          </div>
          <div className="space-y-10">
             {[
               { label: "Team Velocity", val: 85, color: "bg-blue-600" },
               { label: "Project Completion", val: 92, color: "bg-emerald-500" },
               { label: "Training Adoption", val: 64, color: "bg-orange-500" },
             ].map((goal, i) => (
               <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[11px] font-black">
                    <span className="text-slate-700 uppercase tracking-wider">{goal.label}</span>
                    <span className="text-blue-600">{goal.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${goal.color} rounded-full`} style={{ width: `${goal.val}%` }}></div>
                  </div>
               </div>
             ))}
          </div>
          <div className="mt-12 flex justify-between items-center border-t border-slate-50 pt-6">
             <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(u => <div key={u} className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white text-[9px] font-bold flex items-center justify-center">U{u}</div>)}
             </div>
             <button className="text-[10px] font-black text-blue-600">View OKRs</button>
          </div>
        </div>

        {/* Learning Hub */}
        <div className="bg-[#1e1e2d] rounded-xl shadow-xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-yellow-500"><Award size={24} /></div>
                 <div>
                    <h4 className="text-lg font-black tracking-tight">Top Performer</h4>
                    <p className="text-[11px] opacity-70 font-bold uppercase tracking-widest">Design Team</p>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                       <span className="text-[11px] font-bold">Advanced React Patterns</span>
                    </div>
                    <span className="text-[10px] font-black">80%</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                       <span className="text-[11px] font-bold">UX Research 101</span>
                    </div>
                    <span className="text-[10px] font-black">45%</span>
                 </div>
              </div>
           </div>
           <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest mt-8 transition-all shadow-xl shadow-blue-600/20 active:scale-95 relative z-10">
             Explore Courses
           </button>
           {/* Pattern Background */}
           <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-tl-full"></div>
        </div>
      </div>

    </div>
  );
}
