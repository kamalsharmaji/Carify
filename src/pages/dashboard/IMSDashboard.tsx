import { Database, Package, AlertTriangle, ArrowDownToLine } from "lucide-react";

const DASHBOARD_DATA = {
  stats: {
    totalItems: 4500,
    lowStock: 12
  },
  stockAlerts: [
    { id: 1, item: "Engine Oil 5W-30", current: 5, min: 20, unit: "Cans" },
    { id: 2, item: "Brake Pads (Set)", current: 3, min: 10, unit: "Sets" },
    { id: 3, item: "Air Filters", current: 8, min: 15, unit: "Pieces" }
  ]
};

export default function IMSDashboard() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">IMS Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-brand font-medium cursor-pointer">Dashboard</span>
          <span className="text-slate-400 font-bold text-[10px]">{">"}</span>
          <span className="text-slate-400 font-medium">Inventory Management System</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-[24px] p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3 leading-tight text-white">Inventory <br/><span className="text-brand">Status.</span></h2>
            <p className="text-slate-400 text-lg leading-snug font-medium">
              Monitor stock levels, manage warehouses, and handle stock movements with precision.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-brand rounded-full blur-[80px] absolute inset-0"></div>
              <Database size={120} className="text-brand relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <Package size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Items In Stock</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.totalItems}</h3>
          </div>

          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Low Stock Alerts</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.lowStock}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-slate-50">
          <div className="w-1.5 h-6 bg-brand rounded-full"></div>
          <h3 className="text-xl font-black text-slate-900">Critical Low Stock Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Item Name", "Current Stock", "Min Threshold", "Status"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DASHBOARD_DATA.stockAlerts.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.item}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-rose-600">{item.current} {item.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{item.min} {item.unit}</td>
                  <td className="px-6 py-4">
                     <button className="flex items-center gap-2 px-4 py-2 bg-brand hover:opacity-90 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-brand/20 active:scale-95">
                        <ArrowDownToLine size={14} />
                        Restock
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
