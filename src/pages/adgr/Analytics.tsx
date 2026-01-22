import { BarChart3, PieChart, Zap } from "lucide-react";

export default function ADGRAnalytics() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 sm:p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-10">
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] p-10 shadow-2xl shadow-slate-200/50">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center shadow-2xl shadow-slate-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                <Zap className="text-white w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    ADGR <span className="text-red-600">Insights</span>
                  </h1>
                </div>
                <p className="text-slate-500 mt-2 font-semibold text-lg">
                  ADGR › Advanced analytics and automated insights
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 h-[400px] flex flex-col items-center justify-center text-center">
             <BarChart3 size={64} className="text-slate-200 mb-6" />
             <h3 className="text-xl font-black text-slate-900">Performance Metrics</h3>
             <p className="text-slate-500 mt-2">Processing visualization will appear here</p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 h-[400px] flex flex-col items-center justify-center text-center">
             <PieChart size={64} className="text-slate-200 mb-6" />
             <h3 className="text-xl font-black text-slate-900">Distribution Analysis</h3>
             <p className="text-slate-500 mt-2">Data distribution charts will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
