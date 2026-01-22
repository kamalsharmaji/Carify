import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  ChevronRight, 
  Timer, 
  Heart, 
  Eye, 
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Users,
  Play,
  ArrowRight,
  Filter,
  Zap,
  Star
} from 'lucide-react';

const CountdownTimer = ({ initialSeconds }: { initialSeconds: number }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return (
    <div className="flex items-center gap-1.5 font-mono font-bold text-[#F15A24]">
      <span>{h.toString().padStart(2, '0')}</span>:
      <span>{m.toString().padStart(2, '0')}</span>:
      <span>{s.toString().padStart(2, '0')}</span>
    </div>
  );
};

const BiddingHome = () => {
  const [activeCategory, setActiveCategory] = useState('Luxury');

  const auctions = [
    {
      id: 1,
      title: 'BMW X5 xDrive40i M Sport',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
      km: '15K km',
      transmission: 'Auto',
      fuel: 'Petrol',
      currentBid: 450000,
      marketValue: 520000,
      watchers: 42,
      bidders: 8,
      timeLeft: 9258,
      leadingBidder: 'Dealer_88',
      category: 'Luxury'
    },
    {
      id: 2,
      title: 'Mercedes-Benz GLE 450 AMG',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      km: '8K km',
      transmission: 'Auto',
      fuel: 'Diesel',
      currentBid: 580000,
      marketValue: 640000,
      watchers: 85,
      bidders: 14,
      timeLeft: 12450,
      leadingBidder: 'Elite_Motors',
      category: 'Luxury'
    },
    {
        id: 3,
        title: 'Porsche 911 Carrera S',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
        km: '2K km',
        transmission: 'PDK',
        fuel: 'Petrol',
        currentBid: 1250000,
        marketValue: 1400000,
        watchers: 210,
        bidders: 32,
        timeLeft: 3600,
        leadingBidder: 'Super_Cars_India',
        category: 'Sports'
      },
      {
        id: 4,
        title: 'Audi RS e-tron GT',
        image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800',
        km: '1K km',
        transmission: 'Auto',
        fuel: 'Electric',
        currentBid: 1100000,
        marketValue: 1300000,
        watchers: 156,
        bidders: 25,
        timeLeft: 4800,
        leadingBidder: 'Future_Drive',
        category: 'EV'
      }
  ];

  return (
    <div className="bg-[#F8F9FE] overflow-hidden">
      {/* Hero Section with Video/Animated Background */}
      <section className="relative pt-20 pb-40 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
            <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-30"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-highway-at-sunset-34567-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-20">
          <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-slate-100 shadow-xl shadow-purple-100/50">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-[13px] font-black text-slate-700 uppercase tracking-widest">LIVE AUCTION PLATFORM IS OPEN</span>
            </div>
            
            <h1 className="text-5xl  lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Bid Smart Carify Your  
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5D3FD3] to-[#F15A24]">Dream Car</span>
              
            </h1>

            <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
                Join India's premium dealer network. Access exclusive bank-repo and OEM-certified inventory with real-time bidding.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="px-12 py-5 bg-gradient-to-r from-[#5D3FD3] to-[#8E2DE2] text-white font-black rounded-2xl shadow-2xl shadow-purple-200 hover:scale-105 hover:shadow-purple-300 transition-all flex items-center gap-3 text-lg group">
                Start Bidding
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-12 py-5 bg-white text-slate-900 border-2 border-slate-100 font-black rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all text-lg flex items-center gap-3">
                <Play size={20} className="fill-current text-[#F15A24]" />
                How it Works
              </button>
            </div>
          </div>

          {/* Dynamic Feature Card */}
          <div className="relative lg:justify-self-end animate-in fade-in zoom-in duration-1000">
            <div className="w-[450px] bg-white rounded-[60px] p-8 shadow-[0_40px_100px_-20px_rgba(93,63,211,0.15)] border border-slate-50 relative group">
                <div className="relative rounded-[45px] overflow-hidden aspect-video mb-8">
                    <img src={auctions[2].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                        <Zap size={16} className="text-[#F15A24] fill-current" />
                        <span className="text-sm font-black text-slate-900">HOT DEAL</span>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black text-slate-900">{auctions[2].title}</h3>
                        <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={18} className="fill-current" />
                            <span className="text-slate-900 font-bold">4.8</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-3xl">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CURRENT BID</p>
                            <p className="text-xl font-black text-[#5D3FD3]">₹1.25 Cr</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-3xl">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TIME LEFT</p>
                            <CountdownTimer initialSeconds={3600} />
                        </div>
                    </div>

                    <button className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl shadow-xl hover:bg-black transition-all text-lg">
                        View Details
                    </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filter & Categories */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
                <h2 className="text-4xl font-black text-slate-900">Featured Auctions</h2>
                <p className="text-slate-500 font-medium mt-2">Explore the most anticipated vehicle listings this week.</p>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0">
                {['All', 'Luxury', 'Sports', 'EV', 'SUV'].map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-8 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${
                            activeCategory === cat 
                            ? 'bg-[#5D3FD3] text-white shadow-lg shadow-purple-200' 
                            : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {auctions.map((auction) => (
                <div key={auction.id} className="bg-white rounded-[40px] p-6 border border-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                    <div className="relative rounded-[30px] overflow-hidden aspect-[4/3] mb-6">
                        <img src={auction.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                {auction.category}
                            </span>
                        </div>
                        <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-all transform hover:scale-110">
                            <Heart size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-black text-slate-900 leading-tight">{auction.title}</h3>
                        </div>
                        
                        <div className="flex gap-4 text-xs font-bold text-slate-400">
                            <span className="flex items-center gap-1"><Zap size={14} /> {auction.km}</span>
                            <span className="flex items-center gap-1"><Users size={14} /> {auction.bidders} Bids</span>
                        </div>

                        <div className="h-px bg-slate-100 w-full" />

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CURRENT BID</p>
                                <p className="text-lg font-black text-[#5D3FD3]">₹{(auction.currentBid/100000).toFixed(2)} Lakh</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ENDS IN</p>
                                <CountdownTimer initialSeconds={auction.timeLeft} />
                            </div>
                        </div>

                        <button className="w-full py-4 bg-slate-50 group-hover:bg-[#5D3FD3] text-slate-900 group-hover:text-white font-black rounded-2xl transition-all duration-300">
                            Place Your Bid
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Real-time Ticker/Stats Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                    { label: 'Vehicles Auctioned', value: '50K+', icon: <Gavel /> },
                    { label: 'Verified Dealers', value: '15K+', icon: <Users /> },
                    { label: 'Cities Covered', value: '100+', icon: <Zap /> },
                    { label: 'Transaction Value', value: '₹500Cr+', icon: <Star /> }
                ].map((stat, i) => (
                    <div key={i} className="text-center space-y-4 group">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white mx-auto group-hover:bg-[#5D3FD3] transition-all duration-500 group-hover:rotate-12">
                            {stat.icon}
                        </div>
                        <p className="text-5xl font-black text-white">{stat.value}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* How it Works with Images */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl font-black text-slate-900">Three Easy Steps</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Buying your next vehicle is now easier than ever with CarifyBids.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
            {[
                { title: 'Find your car', desc: 'Browse through thousands of verified listings with detailed condition reports.', step: '01' },
                { title: 'Place your bid', desc: 'Join live auctions or set auto-bids for vehicles that match your requirements.', step: '02' },
                { title: 'Fast Delivery', desc: 'Complete payments securely and get your vehicle delivered to your doorstep.', step: '03' }
            ].map((item, i) => (
                <div key={i} className="relative p-10 bg-white rounded-[50px] border border-slate-50 shadow-sm group hover:shadow-2xl transition-all duration-500">
                    <span className="text-8xl font-black text-slate-100 absolute -top-8 -left-4 group-hover:text-purple-50 transition-colors">{item.step}</span>
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default BiddingHome;
