 
import { CreditCard, DollarSign, ShieldCheck, Search } from "lucide-react";

export default function Payments() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                <CreditCard className="text-white w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Payment <span className="text-red-600">Gateway</span>
                  </h1>
                </div>
                <p className="text-slate-500 mt-1 font-semibold text-sm">
                  E-Commerce › Monitor and manage financial transactions
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Revenue", value: "$124,500", icon: DollarSign, color: "blue" },
            { label: "Successful Trans.", value: "1,240", icon: ShieldCheck, color: "emerald" },
            { label: "Pending Payouts", value: "$12,300", icon: CreditCard, color: "rose" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-500/10 text-blue-600' : 
                  stat.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' : 
                  'bg-rose-500/10 text-rose-600'
                }`}>
                  <stat.icon size={28} />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900">No Transactions Found</h3>
          <p className="text-slate-500 mt-2 font-semibold text-sm">Financial records will appear as sales occur</p>
        </div>
      </div>
    </div>
  );
}
