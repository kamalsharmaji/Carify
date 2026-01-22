import React from "react";
import { FileText, Download, Search } from "lucide-react";

export default function VendorReports() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                <FileText className="text-white w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Vendor <span className="text-red-600">Reports</span>
                  </h1>
                </div>
                <p className="text-slate-500 mt-1 font-semibold text-sm">
                  VMS › Detailed insights into your vendor ecosystem
                </p>
              </div>
            </div>
            <button className="flex items-center gap-3 bg-slate-900 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-sm active:scale-95 text-sm">
              <Download size={18} />
              <span>Export Reports</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900">No Reports Available</h3>
          <p className="text-slate-500 mt-2 font-semibold text-sm">Vendor analytics reports will be generated here</p>
        </div>
      </div>
    </div>
  );
}
