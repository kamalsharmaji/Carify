import { useState, useEffect } from "react";
import { 
  Package, 
  DollarSign, 
  CreditCard, 
  ShoppingBag, 
  Truck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  Download,
  Target,
  ArrowRight
} from "lucide-react";

export default function EcomDashboard() {
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
        ).join(' ') : "Ecom Manager";
        setUserRole(role);
      } else {
        setUserRole("Ecom Manager");
      }
    };

    updateGreeting();
    fetchUserRole();
  }, []);

  const activeShoppers = [
    { name: "Rahul V.", location: "Mumbai", avatar: "👨‍💻" },
    { name: "Sonia M.", location: "Delhi", avatar: "👩‍💼" },
    { name: "Amit K.", location: "Bangalore", avatar: "👨" },
    { name: "Priya S.", location: "Chennai", avatar: "👩" },
    { name: "Vikram R.", location: "Pune", avatar: "👨‍🔧" },
    { name: "Anjali D.", location: "Hyderabad", avatar: "👧" },
    { name: "Rajesh K.", location: "Kolkata", avatar: "👴" },
    { name: "Sneha W.", location: "Ahmedabad", avatar: "👩‍🏫" },
    { name: "Deepak P.", location: "Surat", avatar: "👱" },
    { name: "Kavita G.", location: "Jaipur", avatar: "👱‍♀️" },
    { name: "Arjun S.", location: "Lucknow", avatar: "👳" },
  ];

  const stats = [
    { label: "Daily Revenue", value: "₹1.24L", trend: "+12.5% vs yesterday", icon: DollarSign, color: "blue" },
    { label: "Orders Today", value: "24", trend: "92% of daily target", icon: ShoppingBag, color: "slate" },
    { label: "Avg Order Value", value: "₹5,180", trend: "+₹240 increase", icon: CreditCard, color: "blue" },
    { label: "Conversion Rate", value: "3.8%", trend: "+0.5% improvement", icon: Target, color: "slate" },
  ];

  return (
    <div className="space-y-3 pb-10 animate-in fade-in duration-700 bg-[#f8fafc]">
      
      {/* Greeting Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
         <h3 className="text-2xl font-sm text-slate-900 pb-2  inline-block">
          {greeting}, {userRole}! 
        </h3>
        
        <p className="text-sm text-slate-500 font-medium mt-1">
          Here's what's happening in your store today.
        </p>
      </div>

      {/* Today's Active Shoppers */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b-2 border-emerald-500 inline-block">Live Store Traffic</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">142 Users Online</span>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {activeShoppers.map((shopper, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-2xl shadow-sm border border-slate-100 group cursor-pointer hover:border-emerald-300 transition-all">
                {shopper.avatar}
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-900 whitespace-nowrap">{shopper.name}</p>
                <p className="text-[9px] font-medium text-slate-400 whitespace-nowrap">{shopper.location}</p>
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
        {/* Inventory Alert */}
        <div className="bg-white p-5 rounded-xl  shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-rose-500 mt-1">
              <Package size={20} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Stock Alert</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">4 high-demand products are below safety stock level.</p>
              <button className="text-[10px] font-black text-rose-600 hover:underline mt-2">Restock Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Revenue Performance Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-lg font-bold text-slate-900">Revenue Stream</h3>
               <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Gross sales performance analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
                <button className="px-3 py-1 text-[10px] font-black text-emerald-600 bg-white rounded shadow-sm border border-slate-200">24H</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-400">7D</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-400">30D</button>
              </div>
              <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <Download size={18} className="text-slate-400" />
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-3 px-4">
            {[45, 67, 34, 89, 45, 67, 23, 56, 78, 45, 67, 89, 45, 67, 34, 56, 78, 90, 45, 67, 89, 34, 56, 78].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div 
                    className={`w-full max-w-[8px] rounded-t-full transition-all duration-700 ease-out group-hover:max-w-[12px] ${val > 70 ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ₹{val}k
                    </div>
                  </div>
                </div>
                <span className="text-[7px] font-bold text-slate-400">{i}:00</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex gap-3">
               <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Sales Volume</p>
                 <p className="text-lg font-black text-slate-900">1,245 <span className="text-[10px] text-emerald-500">+12%</span></p>
               </div>
               <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Net Revenue</p>
                 <p className="text-lg font-black text-slate-900">₹4.2M <span className="text-[10px] text-emerald-500">+18%</span></p>
               </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:gap-3 transition-all">
               Full Sales Report <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Store Health Sidebar */}
        <div className="space-y-6">
          {/* Cart Abandonment */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Cart Recovery</h3>
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
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.42)}
                    className="text-emerald-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">42%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rate</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg flex items-center justify-between">
               <span className="text-[10px] font-bold text-slate-500 uppercase">Recovered Today</span>
               <span className="text-sm font-black text-emerald-600">₹12,450</span>
            </div>
          </div>

          {/* Logistics Status */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
              Logistics Pulse
              <Truck size={16} className="text-slate-400" />
            </h3>
            <div className="space-y-4">
              {[
                { label: "Out for Delivery", count: 12, status: "Normal", color: "bg-blue-50 text-blue-600" },
                { label: "Processing", count: 8, status: "High", color: "bg-amber-50 text-amber-600" },
                { label: "Delayed", count: 2, status: "Critical", color: "bg-rose-50 text-rose-600" },
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
                  <span className="text-xs font-black text-slate-900">{item.count}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md">
              Shipment Manifest
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Fulfillment Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Fulfillment Queue</h3>
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
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: "#ORD-9921", customer: "Rahul V.", status: "Shipped", total: "₹4,200", color: "blue" },
                  { id: "#ORD-9920", customer: "Sonia M.", status: "Processing", total: "₹1,850", color: "amber" },
                  { id: "#ORD-9919", customer: "Amit K.", status: "Delivered", total: "₹12,400", color: "emerald" },
                  { id: "#ORD-9918", customer: "Priya S.", status: "Shipped", total: "₹2,100", color: "blue" },
                ].map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="py-4">
                      <span className="text-[11px] font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{order.id}</span>
                    </td>
                    <td className="py-4 text-[11px] font-bold text-slate-700">{order.customer}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-slate-100 ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                        order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-[11px] font-black text-slate-900">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Top Products</h3>
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Inventory</button>
          </div>
          <div className="space-y-4">
            {[
              { name: "Premium Brake Pads", sales: 45, stock: "High", price: "₹2,400", color: "emerald" },
              { name: "LED Headlight Kit", sales: 32, stock: "Medium", price: "₹5,800", color: "blue" },
              { name: "Synthetic Oil 5L", sales: 28, stock: "Low", price: "₹3,500", color: "rose" },
              { name: "Tire Pressure Sensor", sales: 15, stock: "Out", price: "₹1,200", color: "slate" },
            ].map((product, i) => (
              <div key={i} className="p-3 border border-slate-50 rounded-xl hover:border-emerald-200 transition-all group cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] group-hover:bg-emerald-600 group-hover:text-white transition-all">📦</div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900">{product.name}</p>
                    <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">{product.sales} Sales • {product.stock} Stock</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-black text-slate-900">{product.price}</p>
                  <div className={`text-[8px] font-black uppercase ${product.stock === 'Low' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {product.stock === 'Low' ? 'Alert' : 'Stable'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* E-commerce Strategy Banner */}
      <div className="bg-[#064e3b] rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-3">
           <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">Market Intelligence</span>
              </div>
              <h2 className="text-3xl font-black mb-4 tracking-tighter">Growth <span className="text-emerald-400">Accelerator</span></h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Cart abandonment is down 12% following the UI update. AI recommends a "Flash Sale" on brake systems to clear excess Q1 inventory.
              </p>
           </div>
           <div className="flex gap-3">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center min-w-[140px]">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Cart Recovery</p>
                 <p className="text-3xl font-black text-emerald-400">₹45k</p>
              </div>
              <button className="px-8 py-3 bg-white text-emerald-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl active:scale-95">
                Launch Promotion
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
