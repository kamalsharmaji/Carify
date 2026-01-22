import React from "react";
import { Users, TrendingUp, UserPlus, Search } from "lucide-react";

export default function Leads() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 sm:p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-10">
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] p-10 shadow-2xl shadow-slate-200/50">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center shadow-2xl shadow-slate-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                <Users className="text-white w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Lead <span className="text-red-600">Management</span>
                  </h1>
                </div>
                <p className="text-slate-500 mt-2 font-semibold text-lg">
                  CRM › Track and nurture your potential customers
                </p>
              </div>
            </div>
            <button className="flex items-center gap-3 bg-slate-900 hover:bg-red-600 text-white px-8 py-4 rounded-[24px] font-bold transition-all duration-300 shadow-2xl shadow-slate-900/20 active:scale-95">
              <UserPlus size={20} />
              <span>Add New Lead</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Total Leads", value: "1,284", icon: Users, color: "blue" },
            { label: "Conversion Rate", value: "12.5%", icon: TrendingUp, color: "emerald" },
            { label: "New Leads (Today)", value: "24", icon: UserPlus, color: "rose" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-[40px] shadow-2xl shadow-slate-200/50">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-500/10 text-blue-600' : 
                  stat.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' : 
                  'bg-rose-500/10 text-rose-600'
                }`}>
                  <stat.icon size={28} />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
            <Search size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">No Leads Found</h3>
          <p className="text-slate-500 mt-2 font-semibold">Start by adding your first lead to the system</p>
        </div>
      </div>
    </div>
  );
}
