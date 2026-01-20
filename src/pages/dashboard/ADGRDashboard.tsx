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
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">ADGR Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-brand font-medium cursor-pointer">Dashboard</span>
          <span className="text-slate-400 font-bold text-[10px]">{">"}</span>
          <span className="text-slate-400 font-medium">Advance Report Generation System</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-[24px] p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3 leading-tight text-white">Analytical <br/><span className="text-brand">Intelligence.</span></h2>
            <p className="text-slate-400 text-lg leading-snug font-medium">
              Generate complex data visualisations and performance reports across all organizational vectors.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-brand rounded-full blur-[80px] absolute inset-0"></div>
              <FileText size={120} className="text-brand relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Reports Generated</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.totalReports}</h3>
          </div>

          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <TrendingUp size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Generated Today</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.generatedToday}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-slate-50">
          <div className="w-1.5 h-6 bg-brand rounded-full"></div>
          <h3 className="text-xl font-black text-slate-900">Recent Analytical Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Report Name", "Generated Date", "Status", "Action"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DASHBOARD_DATA.recentReports.map((report) => (
                <tr key={report.id} className="group hover:bg-slate-50/50 transition-all cursor-default">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{report.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      report.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline active:scale-95 transition-all">
                      Download PDF
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
