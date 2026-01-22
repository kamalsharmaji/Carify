import React from "react";
import { Layers, Plus } from "lucide-react";

export default function Categories() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                <Layers className="text-white w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Category <span className="text-red-600">Management</span>
                  </h1>
                </div>
                <p className="text-slate-500 mt-1 font-semibold text-sm">
                  E-Commerce › Organize products into logical groups
                </p>
              </div>
            </div>
            <button className="flex items-center gap-3 bg-slate-900 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-sm active:scale-95 text-sm">
              <Plus size={18} />
              <span>New Category</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
            <Layers size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-900">No Categories Found</h3>
          <p className="text-slate-500 mt-2 font-semibold text-sm">Define categories to organize your store</p>
        </div>
      </div>
    </div>
  );
}
