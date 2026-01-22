import React from "react";
import { DollarSign, Clock } from "lucide-react";

export default function VendorPayments() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                <DollarSign className="text-white w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Vendor <span className="text-red-600">Payments</span>
                  </h1>
                </div>
                <p className="text-slate-500 mt-1 font-semibold text-sm">
                  VMS › Track accounts payable and vendor compensation
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
            <Clock size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900">No Pending Payments</h3>
          <p className="text-slate-500 mt-2 font-semibold text-sm">Vendor financial transactions will be listed here</p>
        </div>
      </div>
    </div>
  );
}
