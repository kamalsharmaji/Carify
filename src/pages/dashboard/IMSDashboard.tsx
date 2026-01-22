import { useState, useEffect } from "react";
import { 
  Database, 
  Package, 
  AlertTriangle, 
  Plus, 
  Filter, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Layers,
  Archive,
  ArrowRight,
  Play
} from "lucide-react";

export default function IMSDashboard() {
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
        ).join(' ') : "IMS Manager";
        setUserRole(role);
      } else {
        setUserRole("IMS Manager");
      }
    };

    updateGreeting();
    fetchUserRole();
  }, []);

  const warehouseStaff = [
    { name: "Cooper Decker", role: "Manager", avatar: "👨‍💼" },
    { name: "Brianna C.", role: "Lead Packer", avatar: "👩‍💼" },
    { name: "Mick Aston", role: "Forklift Op", avatar: "👨‍🔧" },
    { name: "Ralph Mercer", role: "Inventory", avatar: "👴" },
    { name: "Anne George", role: "QA Lead", avatar: "👩‍🏫" },
    { name: "Isabelle C.", role: "Shipping", avatar: "👱‍♀️" },
    { name: "Employee", role: "Loader", avatar: "👳" },
    { name: "John Doe", role: "Receiving", avatar: "👨" },
    { name: "Jane Smith", role: "Safety", avatar: "👩" },
    { name: "Robert W.", role: "Security", avatar: "👮" },
  ];

  const stats = [
    { label: "Stock Valuation", value: "₹42.8L", trend: "+4.2% vs last mo", icon: Database, color: "blue" },
    { label: "Active SKUs", value: "2,408", trend: "98.2% accuracy", icon: Layers, color: "slate" },
    { label: "Low Stock Items", value: "18", trend: "3 critical items", icon: AlertTriangle, color: "blue" },
    { label: "Monthly Turn", value: "4.2x", trend: "+0.8 improve", icon: RefreshCw, color: "slate" },
  ];

  return (
    <div className="space-y-3 pb-10 animate-in fade-in duration-700 bg-[#f8fafc]">
      
      {/* Greeting Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-2xl font-sm text-slate-900 pb-2  inline-block">
          {greeting}, {userRole}! 
        </h3>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here's what's happening in your inventory today.
        </p>
      </div>

      {/* Active Warehouse Staff */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b-2 border-rose-500 inline-block">Active Warehouse Personnel</h3>
          <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">Duty Roster</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {warehouseStaff.map((staff, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 group cursor-pointer hover:border-rose-300 transition-all">
                {staff.avatar}
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-900 whitespace-nowrap">{staff.name}</p>
                <p className="text-[9px] font-medium text-slate-400 whitespace-nowrap">{staff.role}</p>
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
              <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${stat.color === 'blue' ? 'bg-rose-600 text-white' : 'bg-slate-700 text-white'}`}>
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
        {/* Storage Capacity Alert */}
        <div className="bg-white p-5 rounded-xl  shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-amber-500 mt-1">
              <Archive size={20} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Storage Pulse</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Warehouse A is at 84% capacity. Optimization required.</p>
              <button className="text-[10px] font-black text-amber-600 hover:underline mt-2">Space Audit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Inventory Valuation Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-900">Valuation Analysis</h3>
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Asset value distribution over time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                <button className="px-3 py-1 text-[10px] font-black text-rose-600 bg-white rounded shadow-sm border border-slate-200">Value</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-400">Volume</button>
              </div>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <MoreHorizontal size={18} className="text-slate-400" />
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[65, 45, 89, 34, 56, 78, 45, 67, 89, 34, 56, 78, 90, 45, 67].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className={`w-full max-w-[12px] rounded-t-sm transition-all duration-700 ease-out group-hover:max-w-[16px] ${i === 12 ? 'bg-rose-600' : 'bg-slate-200'}`}
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{val}L
                    </div>
                  </div>
                </div>
                <span className="text-[8px] font-bold text-slate-400">M{i+1}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex gap-10">
               <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Engine Parts</p>
                 <p className="text-lg font-black text-slate-900">₹12.4L <span className="text-[9px] text-rose-500">24%</span></p>
               </div>
               <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Body Kits</p>
                 <p className="text-lg font-black text-slate-900">₹8.2L <span className="text-[9px] text-emerald-500">18%</span></p>
               </div>
               <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Electronics</p>
                 <p className="text-lg font-black text-slate-900">₹5.1L <span className="text-[9px] text-rose-500">12%</span></p>
               </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-rose-600 uppercase tracking-widest hover:gap-3 transition-all">
               Asset Breakdown <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Stock Distribution Sidebar */}
        <div className="space-y-6">
          {/* Stock Turn */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Stock Turn Rate</h3>
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
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.68)}
                    className="text-rose-600"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">4.2</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Turns</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mt-4">
               <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-500 uppercase">Inventory Health</span>
                  <span className="font-black text-rose-600">Optimal</span>
               </div>
               <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[68%]"></div>
               </div>
            </div>
          </div>

          {/* Quick Stock Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
              Stock Engine
              <button className="p-1 hover:bg-slate-50 rounded"><Plus size={16} className="text-slate-400" /></button>
            </h3>
            <div className="space-y-4">
              {[
                { label: "New Shipment", time: "Dock 4", status: "Arrived", color: "bg-blue-50 text-blue-600" },
                { label: "Cycle Count", time: "Bin 12", status: "Pending", color: "bg-amber-50 text-amber-600" },
                { label: "Return Auth", time: "Desk 2", status: "Review", color: "bg-purple-50 text-purple-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Package size={16} />
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
              Initiate Stock Take
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Critical Thresholds */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Critical Thresholds</h3>
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
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU Detail</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Level</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Min</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "Engine Oil 5W-30", current: 5, min: 20, unit: "Cans", urgency: "Critical" },
                  { name: "Brake Pads (Set)", current: 3, min: 10, unit: "Sets", urgency: "High" },
                  { name: "Air Filters", current: 8, min: 15, unit: "Pcs", urgency: "Medium" },
                  { name: "Coolant (5L)", current: 12, min: 25, unit: "Bot", urgency: "High" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] group-hover:bg-rose-600 group-hover:text-white transition-colors">📦</div>
                        <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-[11px] font-black text-rose-600">{item.current} <span className="text-[8px] text-slate-400">{item.unit}</span></td>
                    <td className="py-4 text-[11px] font-bold text-slate-500">{item.min}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-slate-100 ${
                        item.urgency === 'Critical' ? 'bg-rose-50 text-rose-600' :
                        item.urgency === 'High' ? 'bg-orange-50 text-orange-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {item.urgency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Movements */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Live Movements</h3>
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Audit Log</button>
          </div>
          <div className="space-y-4">
            {[
              { type: "Inbound", item: "Tire Set X-4", qty: "+40", time: "12:20 PM", color: "emerald" },
              { type: "Outbound", item: "LED Kit H4", qty: "-12", time: "01:45 PM", color: "rose" },
              { type: "Inbound", item: "Oil Filter v2", qty: "+100", time: "02:15 PM", color: "emerald" },
              { type: "Internal", item: "Brake Fluid", qty: "Trans", time: "03:30 PM", color: "blue" },
            ].map((move, i) => (
              <div key={i} className="p-3 border border-slate-50 rounded-xl hover:border-rose-200 transition-all group cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-${move.color}-50 rounded-lg flex items-center justify-center text-xs group-hover:scale-110 transition-transform`}>
                     {move.type === 'Inbound' ? '📥' : move.type === 'Outbound' ? '📤' : '🔄'}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900">{move.item}</p>
                    <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">{move.type} • {move.time}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-black ${move.color === 'emerald' ? 'text-emerald-500' : move.color === 'rose' ? 'text-rose-500' : 'text-blue-500'}`}>
                  {move.qty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warehouse Strategy Banner */}
      <div className="bg-[#450a0a] rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-3">
           <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-300">Predictive Replenishment</span>
              </div>
              <h2 className="text-3xl font-black mb-4 tracking-tighter">Supply <span className="text-rose-400">Synchronizer</span></h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Stockout risk for "Engine Components" is projected to increase by 20% next week. Bulk order recommended to maintain SLA.
              </p>
           </div>
           <div className="flex gap-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center min-w-[140px]">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Replenish Value</p>
                 <p className="text-3xl font-black text-rose-400">₹8.4L</p>
              </div>
              <button className="w-14 h-14 rounded-full bg-rose-600 flex items-center justify-center hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/20 active:scale-90 group">
                 <Play size={20} className="fill-white group-hover:scale-110 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
