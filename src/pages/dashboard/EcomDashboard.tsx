import { ShoppingCart, Package, DollarSign } from "lucide-react";

const DASHBOARD_DATA = {
  stats: {
    totalSales: "$12,450",
    ordersToday: 24
  },
  topProducts: [
    { id: 1, name: "Premium Brake Pads", sales: 45, price: "$85.00" },
    { id: 2, name: "LED Headlight Kit", sales: 32, price: "$120.00" },
    { id: 3, name: "Synthetic Oil 5L", sales: 28, price: "$45.00" },
    { id: 4, name: "Tire Pressure Sensor", sales: 15, price: "$25.00" }
  ]
};

export default function EcomDashboard() {
  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e293b]">E-Commerce Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-red-600 font-medium cursor-pointer">Dashboard</span>
          <span className="text-gray-400 font-bold text-[10px]">{">"}</span>
          <span className="text-gray-400 font-medium">Online Store Management</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-xl p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3">Store Overview</h2>
            <p className="text-gray-400 text-lg leading-snug font-medium">
              Track sales, manage products, and monitor orders from your digital storefront.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-red-600 rounded-full blur-[80px] absolute inset-0"></div>
              <ShoppingCart size={120} className="text-red-600 relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 rounded-xl p-6 relative overflow-hidden group border border-emerald-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm">
                <DollarSign size={20} />
              </div>
              <span className="text-4xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.totalSales}</span>
            </div>
            <p className="mt-4 text-emerald-600 font-black text-lg leading-tight relative z-10">Total Revenue<br/>This Week</p>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 relative overflow-hidden group border border-amber-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-amber-600 shadow-sm">
                <Package size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.ordersToday}</span>
            </div>
            <p className="mt-4 text-amber-600 font-black text-lg leading-tight relative z-10">Orders<br/>Received Today</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-gray-50">
          <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
          <h3 className="text-xl font-black text-[#1e293b]">Top Selling Products</h3>
        </div>
        <div className="p-0">
          <table className="w-full">
            <thead className="bg-[#f8fafd]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Sales</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DASHBOARD_DATA.topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{product.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{product.price}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{product.sales} units</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden max-w-[100px]">
                      <div className="bg-red-500 h-full" style={{ width: `${(product.sales / 50) * 100}%` }}></div>
                    </div>
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
