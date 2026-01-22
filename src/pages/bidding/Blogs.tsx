import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blogs = () => {
  const posts = [
    {
      id: 1,
      title: "Market Trends: The Rise of Luxury SUVs in India",
      excerpt: "Discover why premium SUVs are dominating the auction market and what it means for dealers...",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c15d?auto=format&fit=crop&q=80&w=800",
      date: "Jan 20, 2026",
      author: "Admin",
      category: "Market Insights"
    },
    {
      id: 2,
      title: "How to Maximize Your Profits in Live Auctions",
      excerpt: "Expert tips on bidding strategies, vehicle evaluation, and timing your moves for the best margins...",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800",
      date: "Jan 18, 2026",
      author: "Sales Team",
      category: "Bidding Tips"
    },
    {
      id: 3,
      title: "The Future of EVs in the Secondary Market",
      excerpt: "Analyzing the resale value and demand patterns for electric vehicles in the current economy...",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
      date: "Jan 15, 2026",
      author: "Tech Analyst",
      category: "Future Tech"
    }
  ];

  return (
    <div className="bg-[#F8F9FE] min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h1 className="text-6xl font-black text-slate-900 mb-6">Carify <span className="text-[#5D3FD3]">Insights</span></h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Stay updated with the latest trends, tips, and news from the automobile auction world.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-50 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                    <div className="relative h-64 overflow-hidden">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#5D3FD3]">
                            {post.category}
                        </div>
                    </div>
                    <div className="p-10 space-y-6">
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                            <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-[#5D3FD3] transition-colors">{post.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{post.excerpt}</p>
                        <button className="flex items-center gap-2 text-[#5D3FD3] font-black group/btn">
                            Read More 
                            <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
