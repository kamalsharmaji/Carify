import { Layers, Box, RefreshCw } from "lucide-react";

const DASHBOARD_DATA = {
  stats: {
    activeMaterials: 850,
    pendingProcurement: 15
  },
  materialList: [
    { id: 1, name: "Steel Sheets", category: "Raw Material", stock: "500 kg", status: "Available" },
    { id: 2, name: "Aluminum Bars", category: "Raw Material", stock: "200 kg", status: "Low Stock" },
    { id: 3, name: "Plastic Resin", category: "Chemical", stock: "1200 L", status: "Available" }
  ]
};

export default function MMMDashboard() {
  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e293b]">MMM Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-brand font-medium cursor-pointer">Dashboard</span>
          <span className="text-gray-400 font-bold text-[10px]">{">"}</span>
          <span className="text-gray-400 font-medium"> multimedia-camplgin marketing system</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-[24px] p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="flex text-3xl font-black mb-3">multimedia-campaign marketing system</h2>
            <p className="text-gray-400 text-base leading-snug font-medium">
              Oversee raw materials, procurement requests, and supply chain logistics.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-brand rounded-full blur-[80px] absolute inset-0"></div>
              <Layers size={120} className="text-brand relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center mb-4">
              <Box size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Materials</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.activeMaterials}</h3>
          </div>

          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4">
              <RefreshCw size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Procurements</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.pendingProcurement}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-slate-50">
          <div className="w-1.5 h-6 bg-brand rounded-full"></div>
          <h3 className="text-xl font-black text-slate-900">Material Inventory List</h3>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Material Name", "Category", "Stock Level", "Status"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DASHBOARD_DATA.materialList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-tight">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800">{item.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      item.status === 'Available' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {item.status}
                    </span>
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
