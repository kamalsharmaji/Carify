import React from "react";
import { FilePlus, Settings, Play } from "lucide-react";

export default function GenerateReports() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 sm:p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-10">
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] p-10 shadow-2xl shadow-slate-200/50">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center shadow-2xl shadow-slate-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                <FilePlus className="text-white w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Generate <span className="text-red-600">Reports</span>
                  </h1>
                </div>
                <p className="text-slate-500 mt-2 font-semibold text-lg">
                  ADGR › Create automated reports from custom data sources
                </p>
              </div>
            </div>
            <button className="flex items-center gap-3 bg-slate-900 hover:bg-red-600 text-white px-8 py-4 rounded-[24px] font-bold transition-all duration-300 shadow-2xl shadow-slate-900/20 active:scale-95">
              <Play size={20} />
              <span>Start Generation</span>
            </button>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900">Configuration</h3>
            <Settings className="text-slate-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
              <p className="font-bold text-slate-900 mb-2">Select Data Source</p>
              <select className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-red-500/10">
                <option>ERP Central Database</option>
                <option>CRM Sales Stream</option>
                <option>Fleet Telemetry Data</option>
              </select>
            </div>
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
              <p className="font-bold text-slate-900 mb-2">Report Template</p>
              <select className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-red-500/10">
                <option>Monthly Performance Summary</option>
                <option>Inventory Reconciliation</option>
                <option>HR Compliance Audit</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
