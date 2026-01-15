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
          <span className="text-red-600 font-medium cursor-pointer">Dashboard</span>
          <span className="text-gray-400 font-bold text-[10px]">{">"}</span>
          <span className="text-gray-400 font-medium"> multimedia-camplgin marketing system</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-xl p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="flex text-4xl font-black mb-3">multimedia-camplgin marketing system Management</h2>
            <p className="text-gray-400 text-lg leading-snug font-medium">
              Oversee raw materials, procurement requests, and supply chain logistics.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-red-600 rounded-full blur-[80px] absolute inset-0"></div>
              <Layers size={120} className="text-red-600 relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cyan-50 rounded-xl p-6 relative overflow-hidden group border border-cyan-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-cyan-600 shadow-sm">
                <Box size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.activeMaterials}</span>
            </div>
            <p className="mt-4 text-cyan-600 font-black text-lg leading-tight relative z-10">Active<br/>Materials</p>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 relative overflow-hidden group border border-orange-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-orange-600 shadow-sm">
                <RefreshCw size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.pendingProcurement}</span>
            </div>
            <p className="mt-4 text-orange-600 font-black text-lg leading-tight relative z-10">Pending<br/>Procurements</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-gray-50">
          <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
          <h3 className="text-xl font-black text-[#1e293b]">Material Inventory List</h3>
        </div>
        <div className="p-0">
          <table className="w-full">
            <thead className="bg-[#f8fafd]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Material Name</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Stock Level</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DASHBOARD_DATA.materialList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm font-black text-gray-800">{item.stock}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
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
