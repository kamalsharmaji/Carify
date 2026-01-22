import React, { useState, useEffect } from "react";
import { 
  Truck, 
  TrendingUp, 
  Search, 
  Plus, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Fuel,
  Settings,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  Wrench
} from "lucide-react";

export default function FleetDashboard() {
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
        ).join(' ') : "Fleet Manager";
        setUserRole(role);
      } else {
        setUserRole("Fleet Manager");
      }
    };

    updateGreeting();
    fetchUserRole();
  }, []);

  const activeDrivers = [
    { name: "John Smith", status: "Driving", avatar: "👨‍✈️", route: "Mumbai - Pune" },
    { name: "Sarah Williams", status: "On Break", avatar: "👩‍✈️", route: "Local Delivery" },
    { name: "Robert Brown", status: "Driving", avatar: "👨‍🔧", route: "Surat - Ahmedabad" },
    { name: "Alice Davis", status: "Idle", avatar: "👩", route: "Standby" },
    { name: "Michael Wilson", status: "Driving", avatar: "🧔", route: "Delhi - Jaipur" },
    { name: "Emily Taylor", status: "Off Duty", avatar: "👧", route: "N/A" },
    { name: "James Miller", status: "Driving", avatar: "👴", route: "Bangalore - Chennai" },
    { name: "Linda Moore", status: "Driving", avatar: "👵", route: "Kolkata - Durgapur" },
  ];

  const stats = [
    { label: "Total Fleet", value: "84", trend: "+2 this month", icon: Truck, color: "blue" },
    { label: "Active Vehicles", value: "76", trend: "90% utilization", icon: MapPin, color: "slate" },
    { label: "Fuel Efficiency", value: "14.2 km/l", trend: "+5% improvement", icon: Fuel, color: "blue" },
    { label: "Total Distance", value: "124.5k km", trend: "+12k this week", icon: TrendingUp, color: "slate" },
  ];

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-700 bg-[#f8fafc]">
      
      {/* Greeting Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          {greeting}, {userRole}! 👋
        </h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here's what's happening with your fleet today.
        </p>
      </div>

      {/* Active Drivers Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b-2 border-red-500 inline-block">Active Fleet Drivers</h3>
          <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">Manage Roster</button>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {activeDrivers.map((driver, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[90px]">
              <div className="relative group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 transition-all group-hover:border-red-300">
                  {driver.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  driver.status === 'Driving' ? 'bg-emerald-500' : 
                  driver.status === 'On Break' ? 'bg-amber-500' : 'bg-slate-300'
                }`}></div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-900 whitespace-nowrap">{driver.name}</p>
                <p className="text-[8px] font-medium text-slate-400 whitespace-nowrap">{driver.route}</p>
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
               <span className={`text-[10px] font-bold ${stat.trend.includes('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                 {stat.trend}
               </span>
               {stat.trend.includes('+') ? <ArrowUpRight size={12} className="text-emerald-500" /> : <ArrowDownRight size={12} className="text-rose-500" />}
            </div>
          </div>
        ))}
        {/* Maintenance Alert */}
        <div className="bg-white p-5 rounded-xl border-l-4 border-amber-500 border-t border-r border-b border-slate-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-amber-500 mt-1">
              <Wrench size={20} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Maintenance Due</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">4 vehicles require immediate service scheduled for today.</p>
              <button className="text-[10px] font-black text-amber-600 hover:underline mt-2">Open Schedule</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fuel Consumption Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-900">Fuel Consumption Trend</h3>
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Litres consumed per day</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                <button className="px-3 py-1 text-[10px] font-black text-red-600 bg-white rounded shadow-sm border border-slate-200">Weekly</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-400">Monthly</button>
              </div>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <MoreHorizontal size={18} className="text-slate-400" />
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[45, 52, 38, 65, 48, 72, 55, 60, 42, 58, 68, 50, 62, 75].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className={`w-full max-w-[12px] rounded-t-sm transition-all duration-700 ease-out group-hover:max-w-[16px] ${i % 2 === 0 ? 'bg-red-600' : 'bg-slate-300'}`}
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}L
                    </div>
                  </div>
                </div>
                <span className="text-[8px] font-bold text-slate-400">D{i+1}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex gap-6">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-600"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Heavy Duty</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Light Commercial</span>
               </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-widest hover:gap-3 transition-all">
               Fuel Reports <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Sidebar: Recent Incidents & Safety */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Fleet Safety Score</h3>
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
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.92)}
                    className="text-emerald-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">92%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safe</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-3 bg-slate-50 rounded-lg text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Alerts</p>
                <p className="text-lg font-black text-slate-900">2</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Incidents</p>
                <p className="text-lg font-black text-slate-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
              Live Movements
              <button className="p-1 hover:bg-slate-50 rounded"><Plus size={16} className="text-slate-400" /></button>
            </h3>
            <div className="space-y-4">
              {[
                { label: "TRK-2940 (Volvo FH)", time: "2m ago", status: "On Route", color: "bg-emerald-50 text-emerald-600", icon: Truck },
                { label: "VAN-1022 (Transit)", time: "15m ago", status: "Delivered", color: "bg-blue-50 text-blue-600", icon: ShieldCheck },
                { label: "TRK-8821 (Scania)", time: "1h ago", status: "Loading", color: "bg-amber-50 text-amber-600", icon: Clock },
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
              Live GPS Tracking
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Fleet Inventory Status</h3>
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
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle ID</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Health</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Service</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: "MH-12-AB-1234", status: "Active", health: "98%", service: "15 Jan 2026", color: "emerald" },
                  { id: "DL-01-XY-5678", status: "Maintenance", health: "82%", service: "Today", color: "amber" },
                  { id: "KA-05-MM-9012", status: "Active", health: "95%", service: "22 Jan 2026", color: "emerald" },
                  { id: "GJ-02-PQ-3456", status: "Idle", health: "100%", service: "10 Feb 2026", color: "slate" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="py-4">
                      <span className="text-[11px] font-bold text-slate-700">{item.id}</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-slate-100 ${
                        item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'Maintenance' ? 'bg-amber-50 text-amber-600' :
                        'bg-slate-50 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4">
                       <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                             <div 
                               className={`h-full rounded-full ${parseInt(item.health) > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                               style={{ width: item.health }}
                             />
                          </div>
                          <span className="text-[11px] font-black text-slate-900">{item.health}</span>
                       </div>
                    </td>
                    <td className="py-4 text-[11px] font-bold text-slate-500">{item.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Maintenance Log */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Recent Maintenance Log</h3>
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">View All Logs</button>
          </div>
          <div className="space-y-4">
            {[
              { type: "Oil Change", vehicle: "MH-12-AB-1234", cost: "₹4,500", date: "Yesterday" },
              { type: "Tyre Rotation", vehicle: "KA-05-MM-9012", cost: "₹1,200", date: "2 days ago" },
              { type: "Brake Pad Replace", vehicle: "GJ-02-PQ-3456", cost: "₹8,900", date: "1 week ago" },
              { type: "Engine Tuning", vehicle: "DL-01-XY-5678", cost: "₹12,000", date: "1 week ago" },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                      <Settings size={16} />
                   </div>
                   <div>
                      <p className="text-[11px] font-bold text-slate-900">{log.type}</p>
                      <p className="text-[9px] font-medium text-slate-400">{log.vehicle}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[11px] font-black text-slate-900">{log.cost}</p>
                   <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">{log.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
