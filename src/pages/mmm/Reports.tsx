 
import { FileText, Download, Filter, Search } from "lucide-react";

export default function MarketingReports() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 sm:p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-10">
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] p-10 shadow-2xl shadow-slate-200/50">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center shadow-2xl shadow-slate-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                <FileText className="text-white w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Marketing <span className="text-red-600">Reports</span>
                  </h1>
                </div>
                <p className="text-slate-500 mt-2 font-semibold text-lg">
                  MMM › Comprehensive performance reports and summaries
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-900 px-6 py-4 rounded-[24px] font-bold transition-all duration-300 border border-slate-200 shadow-sm active:scale-95">
                <Filter size={20} />
                <span>Filters</span>
              </button>
              <button className="flex items-center gap-3 bg-slate-900 hover:bg-red-600 text-white px-8 py-4 rounded-[24px] font-bold transition-all duration-300 shadow-2xl shadow-slate-900/20 active:scale-95">
                <Download size={20} />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
            <Search size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">No Reports Available</h3>
          <p className="text-slate-500 mt-2 font-semibold">Generate your first report to see results</p>
        </div>
      </div>
    </div>
  );
}
