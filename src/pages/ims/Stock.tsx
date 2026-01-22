import { Database, Plus, Search } from "lucide-react";

export default function StockList() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10">
              <Database className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Stock Inventory
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Complete list of items in all warehouses
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg font-semibold transition-all active:scale-95">
            <Plus size={18} />
            <span>Add New Item</span>
          </button>
        </div>

        {/* Empty State / Content Area */}
        <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Stock Records Empty</h3>
          <p className="text-slate-500 mt-2 font-medium max-w-sm">
            Start adding items to your inventory system to track stock levels and movements.
          </p>
        </div>
      </div>
    </div>
  );
}
