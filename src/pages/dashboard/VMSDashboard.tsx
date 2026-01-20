import { Monitor, Cpu, Activity } from "lucide-react";

const DASHBOARD_DATA = {
  stats: {
    activeSystems: 12,
    healthScore: "98%"
  },
  systemLogs: [
    { id: 1, system: "Main Server", event: "System Update", time: "10:30 AM", status: "Success" },
    { id: 2, system: "Database Node A", event: "Backup", time: "09:15 AM", status: "Success" },
    { id: 3, system: "Load Balancer", event: "Traffic Spike", time: "08:00 AM", status: "Alert" }
  ]
};

export default function VMSDashboard() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">VMS Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-brand font-medium cursor-pointer">Dashboard</span>
          <span className="text-slate-400 font-bold text-[10px]">{">"}</span>
          <span className="text-slate-400 font-medium">Vehicle Management System</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-[24px] p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3 leading-tight text-white">System <br/><span className="text-brand">Monitoring.</span></h2>
            <p className="text-slate-400 text-lg leading-snug font-medium">
              Monitor system health, performance metrics, and real-time activities with integrated telemetry.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-brand rounded-full blur-[80px] absolute inset-0"></div>
              <Monitor size={120} className="text-brand relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center mb-4">
              <Cpu size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Nodes</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.activeSystems}</h3>
          </div>

          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
              <Activity size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">System Health</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.healthScore}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-slate-50">
          <div className="w-1.5 h-6 bg-brand rounded-full"></div>
          <h3 className="text-xl font-black text-slate-900">Real-time System Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["System Node", "Event", "Time", "Status"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DASHBOARD_DATA.systemLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{log.system}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{log.event}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{log.time}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      log.status === 'Success' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {log.status}
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
