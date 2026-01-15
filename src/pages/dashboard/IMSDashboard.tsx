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
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e293b]">IMS Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-red-600 font-medium cursor-pointer">Dashboard</span>
          <span className="text-gray-400 font-bold text-[10px]">{">"}</span>
          <span className="text-gray-400 font-medium">Inventory Management System</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-xl p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3">Inventory Status</h2>
            <p className="text-gray-400 text-lg leading-snug font-medium">
              Monitor stock levels, manage warehouses, and handle stock movements.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-red-600 rounded-full blur-[80px] absolute inset-0"></div>
              <Database size={120} className="text-red-600 relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 rounded-xl p-6 relative overflow-hidden group border border-indigo-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                <Package size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.totalItems}</span>
            </div>
            <p className="mt-4 text-indigo-600 font-black text-lg leading-tight relative z-10">Total Items<br/>In Stock</p>
          </div>

          <div className="bg-rose-50 rounded-xl p-6 relative overflow-hidden group border border-rose-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-rose-600 shadow-sm">
                <AlertTriangle size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.lowStock}</span>
            </div>
            <p className="mt-4 text-rose-600 font-black text-lg leading-tight relative z-10">Low Stock<br/>Alerts</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-gray-50">
          <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
          <h3 className="text-xl font-black text-[#1e293b]">Critical Low Stock Items</h3>
        </div>
        <div className="p-0">
          <table className="w-full">
            <thead className="bg-[#f8fafd]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Min Threshold</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DASHBOARD_DATA.stockAlerts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.item}</td>
                  <td className="px-6 py-4 text-sm font-black text-red-600">{item.current} {item.unit}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.min} {item.unit}</td>
                  <td className="px-6 py-4 text-sm">
                     <button className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-red-700 transition-colors">
                        <ArrowDownToLine size={12} />
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
