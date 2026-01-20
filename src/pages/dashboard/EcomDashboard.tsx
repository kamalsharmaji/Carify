import { ShoppingCart, Package, DollarSign, TrendingUp, CreditCard, ShoppingBag, Truck, Users, Star, ArrowDownRight, Clock, ChevronRight, Filter, Download } from "lucide-react";
 
interface QuickStatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

interface TrendRowProps {
  label: string;
  value: string;
  trend: string;
}

const DASHBOARD_DATA = {
  stats: {
    totalSales: "₹1,24,500",
    ordersToday: 24,
    revenueGrowth: "+12.5%",
    avgOrderValue: "₹5,180",
    activeCart: 42,
    conversionRate: "3.8%"
  },
  topProducts: [
    { id: 1, name: "Premium Brake Pads", sales: 45, price: "₹2,400", stock: "High", growth: "+15%" },
    { id: 2, name: "LED Headlight Kit", sales: 32, price: "₹5,800", stock: "Medium", growth: "+8%" },
    { id: 3, name: "Synthetic Oil 5L", sales: 28, price: "₹3,500", stock: "Low", growth: "-2%" },
    { id: 4, name: "Tire Pressure Sensor", sales: 15, price: "₹1,200", stock: "Out", growth: "+4%" }
  ],
  recentOrders: [
    { id: "#ORD-9921", customer: "Rahul V.", items: 3, total: "₹4,200", status: "Shipped", time: "12 mins ago" },
    { id: "#ORD-9920", customer: "Sonia M.", items: 1, total: "₹1,850", status: "Processing", time: "45 mins ago" },
    { id: "#ORD-9919", customer: "Amit K.", items: 5, total: "₹12,400", status: "Delivered", time: "2 hours ago" },
    { id: "#ORD-9918", customer: "Priya S.", items: 2, total: "₹2,100", status: "Shipped", time: "Yesterday" }
  ],
  reviews: [
    { user: "Rajesh K.", rating: 5, comment: "Excellent quality parts, fast delivery!", time: "1h ago" },
    { user: "Sneha W.", rating: 4, comment: "Good service, but packaging could be better.", time: "4h ago" }
  ]
};

export default function EcomDashboard() {
  

  return (
    <div 
      className="space-y-8 pb-20 animate-in fade-in duration-700"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Store <span className="text-brand">Analytics</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Real-time performance and sales overview for 2026.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
            <Download size={18} />
            Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hero Banner */}
        <div className="lg:col-span-8 bg-[#0f172a] rounded-[32px] p-12 text-white relative overflow-hidden min-h-[320px] flex flex-col justify-center shadow-2xl shadow-slate-200 group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-brand/20 opacity-90 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/20 text-brand rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-brand/20">
              <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></span>
              Live Store Traffic
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-[1.1]">Optimization <br/><span className="text-brand text-opacity-90">Opportunities.</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10">
              Your digital storefront is seeing a <span className="text-emerald-400 font-black">15% increase</span> in mobile traffic. We recommend enabling one-tap checkout for guest users.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-brand hover:opacity-90 text-white px-8 py-4 rounded-2xl text-sm font-black transition-all shadow-xl shadow-brand/20 active:scale-95">
                Execute Audit
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-sm font-black rounded-2xl transition-all border border-white/10 backdrop-blur-md">
                View Trends
              </button>
            </div>
          </div>
          <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-all duration-700 pointer-events-none scale-110 group-hover:scale-125 rotate-12 group-hover:rotate-0">
            <ShoppingCart size={320} className="text-white" />
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <QuickStatCard 
            label="Weekly Revenue" 
            value={DASHBOARD_DATA.stats.totalSales} 
            icon={<DollarSign size={24} />} 
            trend="+12.5%" 
            color="bg-emerald-500" 
          />
          <QuickStatCard 
            label="Daily Orders" 
            value={DASHBOARD_DATA.stats.ordersToday.toString()} 
            icon={<ShoppingBag size={24} />} 
            trend="Target: 40" 
            color="bg-amber-500" 
          />
          <QuickStatCard 
            label="Avg Order Value" 
            value={DASHBOARD_DATA.stats.avgOrderValue} 
            icon={<CreditCard size={24} />} 
            trend="+₹240" 
            color="bg-indigo-500" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Products & Orders Table Area */}
        <div className="xl:col-span-8 space-y-8">
          {/* Best Selling Products */}
          <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="p-8 flex items-center justify-between border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center border border-brand/20">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Top Performance</h3>
                  <p className="text-sm text-slate-500 font-medium">Best selling items and inventory status</p>
                </div>
              </div>
              <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-brand transition-colors">Manage Inventory</button>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    {["Product", "Price", "Units", "Stock", "Growth"].map((h) => (
                      <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {DASHBOARD_DATA.topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black group-hover:bg-brand group-hover:text-white transition-all">
                            {product.name[0]}
                          </div>
                          <span className="text-sm font-black text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-black text-slate-600 text-sm">{product.price}</td>
                      <td className="px-8 py-6 font-bold text-slate-500 text-sm">{product.sales} <span className="text-[10px] uppercase font-medium">pcs</span></td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          product.stock === 'High' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          product.stock === 'Medium' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                          'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                           <TrendingUp size={14} className={product.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'} />
                           <span className={`text-xs font-black ${product.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{product.growth}</span>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Fulfillment Queue</h3>
                  <p className="text-sm text-slate-500 font-medium">Monitor real-time order processing</p>
                </div>
              </div>
              <button className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline">Track All Orders</button>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    {["Order ID", "Customer", "Items", "Total", "Status", "Time"].map(h => (
                      <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {DASHBOARD_DATA.recentOrders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-all group cursor-pointer">
                      <td className="px-8 py-6 text-sm font-black text-slate-900 group-hover:text-brand transition-colors">{order.id}</td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-600">{order.customer}</td>
                      <td className="px-8 py-6 text-xs font-bold text-slate-400 uppercase">{order.items} Items</td>
                      <td className="px-8 py-6 text-sm font-black text-slate-900">{order.total}</td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          order.status === 'Shipped' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-xs font-bold text-slate-400 italic">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Analytics & Reviews Sidebar */}
        <div className="xl:col-span-4 space-y-8">
          {/* Market Trends Panel */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-10 shadow-sm transition-all hover:shadow-lg">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-12 w-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center border border-brand/20">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Market Pulse</h3>
            </div>
            
            <div className="space-y-6">
              <TrendRow label="Return Customer Rate" value="24%" trend="+4%" />
              <TrendRow label="Conversion Rate" value="3.2%" trend="+0.5%" />
              <TrendRow label="Cart Abandonment" value="42%" trend="-2%" />
              <TrendRow label="Mobile Traffic" value="68%" trend="+12%" />
              <TrendRow label="Order Cancellation" value="1.8%" trend="-0.4%" />
            </div>
            
            <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl active:scale-95">
              Deep Dive Analytics
            </button>
          </div>

          {/* Customer Feedback */}
          <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-300">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand opacity-10 rounded-bl-full -mr-12 -mt-12"></div>
             <div className="absolute left-0 bottom-0 w-full h-1 bg-brand"></div>
             
             <h3 className="text-2xl font-black mb-8 tracking-tight flex items-center gap-3">
               <Star className="text-brand" size={24} fill="currentColor" />
               Recent Reviews
             </h3>
             <div className="space-y-6 relative z-10">
               {DASHBOARD_DATA.reviews.map((rev, i) => (
                 <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="text-sm font-black text-white group-hover:text-brand transition-colors">{rev.user}</h4>
                     <div className="flex text-amber-400">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={10} fill={idx < rev.rating ? "currentColor" : "none"} />
                        ))}
                     </div>
                   </div>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed italic mb-3">"{rev.comment}"</p>
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <Clock size={12} />
                     {rev.time}
                   </div>
                 </div>
               ))}
             </div>
             <button className="w-full mt-10 py-4 bg-brand hover:opacity-90 rounded-2xl font-black text-sm transition-all shadow-xl shadow-brand/20 active:scale-95">
               Manage All Feedback
             </button>
          </div>

          {/* Promotion Banner */}
          <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm flex items-center justify-between group cursor-pointer hover:border-brand/20 transition-all relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-brand opacity-5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
             <div className="flex items-center gap-5 relative z-10">
               <div className="h-14 w-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:bg-brand group-hover:text-white transition-all">
                 <Users size={28} />
               </div>
               <div>
                 <h4 className="font-black text-slate-900 tracking-tight text-lg">Loyalty Program</h4>
                 <p className="text-sm text-slate-500 font-medium">1.2k members active</p>
               </div>
             </div>
             <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brand transition-all relative z-10">
               <ChevronRight size={24} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickStatCard({ label, value, icon, trend, color }: QuickStatCardProps) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white border border-slate-100 p-10 rounded-[32px] shadow-sm relative overflow-hidden group flex flex-col items-center justify-center text-center transition-all hover:shadow-xl hover:-translate-y-1">
      <div className={`w-16 h-16 ${color.replace('bg-', 'bg-opacity-10 ').replace('500', '50')} ${color.replace('bg-', 'text-')} rounded-2xl flex items-center justify-center mb-6 border border-current border-opacity-10 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">{label}</p>
      <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
      <div className={`mt-5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} text-[10px] font-black uppercase tracking-widest border border-current border-opacity-10`}>
        {isPositive ? <TrendingUp size={12} /> : <ArrowDownRight size={12} />}
        {trend}
      </div>
    </div>
  );
}

function TrendRow({ label, value, trend }: TrendRowProps) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-5 last:border-0 last:pb-0 group">
      <div>
        <p className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
      </div>
      <div className={`px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wider border transition-all ${
        isPositive ? 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-500 group-hover:text-white'
      }`}>
        {trend}
      </div>
    </div>
  );
}