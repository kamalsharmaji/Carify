import { FileText, TrendingUp } from "lucide-react";

const DASHBOARD_DATA = {
  stats: {
    totalReports: 124,
    generatedToday: 12
  },
  recentReports: [
    { id: 1, name: "Monthly Sales Report", date: "15-Jan-2026", status: "Completed" },
    { id: 2, name: "Inventory Audit", date: "14-Jan-2026", status: "Completed" },
    { id: 3, name: "Employee Performance", date: "13-Jan-2026", status: "In Progress" },
    { id: 4, name: "Fleet Maintenance Log", date: "12-Jan-2026", status: "Completed" }
  ]
};

export default function ADGRDashboard() {
  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e293b]">ADGR Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-red-600 font-medium cursor-pointer">Dashboard</span>
          <span className="text-gray-400 font-bold text-[10px]">{">"}</span>
          <span className="text-gray-400 font-medium">Advance Report Generation System</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-xl p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3">Report Generation</h2>
            <p className="text-gray-400 text-lg leading-snug font-medium">
              Generate advanced analytical reports across all modules with ease.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-red-600 rounded-full blur-[80px] absolute inset-0"></div>
              <FileText size={120} className="text-red-600 relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 relative overflow-hidden group border border-blue-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
                <FileText size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.totalReports}</span>
            </div>
            <p className="mt-4 text-blue-600 font-black text-lg leading-tight relative z-10">Total Reports<br/>Generated</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 relative overflow-hidden group border border-green-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-600 shadow-sm">
                <TrendingUp size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.generatedToday}</span>
            </div>
            <p className="mt-4 text-green-600 font-black text-lg leading-tight relative z-10">Reports<br/>Today</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-gray-50">
          <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
          <h3 className="text-xl font-black text-[#1e293b]">Recent Reports</h3>
        </div>
        <div className="p-0">
          <table className="w-full">
            <thead className="bg-[#f8fafd]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DASHBOARD_DATA.recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{report.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{report.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${report.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-red-600 cursor-pointer hover:underline font-bold">Download</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
