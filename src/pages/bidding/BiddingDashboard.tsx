 import { 
  Gavel, 
  TrendingUp, 
  ArrowUpRight,
  Zap,
  BarChart3,
  Wallet,
  Bell
} from 'lucide-react';

const BiddingDashboard = () => {
  const stats = [
    { label: 'Active Bids', value: '12', sub: '+2 today', icon: <Gavel />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Winning Lots', value: '04', sub: '₹2.4M value', icon: <TrendingUp />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Wallet Balance', value: '₹15.2L', sub: 'Active', icon: <Wallet />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg. Profit/Unit', value: '₹42K', sub: '+12% increase', icon: <BarChart3 />, color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
                    <img src="/images/carifypdi_logo1.jpeg.png" className="h-10 object-contain" alt="Logo" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">Dealer Portal</h1>
                    <p className="text-slate-500 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Welcome back, Elite Motors
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-[#5D3FD3] transition-all relative">
                    <Bell size={22} />
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#F15A24] border-2 border-white" />
                </button>
                <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all">
                    <Zap size={20} className="text-[#F15A24] fill-current" />
                    Join Live Auction
                </button>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-50 group hover:shadow-2xl transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:rotate-12 transition-transform duration-500`}>
                            {stat.icon}
                        </div>
                        <ArrowUpRight className="text-slate-200" size={24} />
                    </div>
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                        <p className={`text-xs font-bold ${stat.color}`}>{stat.sub}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* Main Center Area */}
            <div className="xl:col-span-2 space-y-10">
                <div className="bg-white rounded-[50px] p-10 shadow-sm border border-slate-50 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <h2 className="text-2xl font-black text-slate-900">Recommended for You</h2>
                        <button className="text-sm font-black text-[#5D3FD3] hover:underline">View All Matches</button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        {[1, 2].map((i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative rounded-[40px] overflow-hidden aspect-video mb-6">
                                    <img 
                                        src={i === 1 ? "https://images.unsplash.com/photo-1617814076367-b759c7d8e73a?auto=format&fit=crop&q=80&w=600" : "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=600"} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        alt="Car"
                                    />
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        Lot #44{i}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 group-hover:text-[#5D3FD3] transition-colors">2022 {i === 1 ? 'BMW M4 Competition' : 'Audi RS7 Sportback'}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">HIGHEST BID</p>
                                        <p className="text-lg font-black text-slate-900">₹{(72.5 + i*5).toFixed(1)} Lakh</p>
                                    </div>
                                    <button className="px-6 py-3 bg-slate-100 group-hover:bg-[#5D3FD3] group-hover:text-white rounded-2xl transition-all">
                                        <TrendingUp size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar Activity */}
            <div className="space-y-10">
                <div className="bg-slate-900 rounded-[50px] p-10 text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black">Live Activity</h3>
                            <div className="px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-full animate-pulse">LIVE</div>
                        </div>
                        <div className="space-y-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex gap-4 items-start border-l-2 border-slate-800 pl-6 pb-2 relative">
                                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#5D3FD3]" />
                                    <div>
                                        <p className="text-sm font-bold text-white leading-tight">New bid on BMW M4</p>
                                        <p className="text-xs text-slate-400 mt-1 font-medium">Dealer_99 bid ₹73.5 Lakh</p>
                                        <p className="text-[10px] text-slate-500 mt-2">Just now</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all border border-white/10">View Full History</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingDashboard;
