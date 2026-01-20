import { Users, UserPlus, MessageSquare, PhoneCall } from "lucide-react";

const DASHBOARD_DATA = {
  stats: {
    totalCustomers: 1250,
    newLeads: 45
  },
  recentInteractions: [
    { id: 1, name: "John Doe", type: "Call", date: "15-Jan-2026", note: "Interested in Enterprise plan" },
    { id: 2, name: "Jane Smith", type: "Email", date: "14-Jan-2026", note: "Requested demo for Fleet module" },
    { id: 3, name: "Robert Wilson", type: "Meeting", date: "13-Jan-2026", note: "Follow-up scheduled for next week" }
  ]
};

export default function CRMDashboard() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">CRM Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-brand font-medium cursor-pointer">Dashboard</span>
          <span className="text-slate-400 font-bold text-[10px]">{">"}</span>
          <span className="text-slate-400 font-medium">Customer Relationship Management</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-[24px] p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3 leading-tight text-white">Customer <br/><span className="text-brand">Experience.</span></h2>
            <p className="text-slate-400 text-lg leading-snug font-medium">
              Deepen relationships and drive loyalty through personalized engagement and data-driven insights.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-brand rounded-full blur-[80px] absolute inset-0"></div>
              <Users size={120} className="text-brand relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Active Customers</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.totalCustomers}</h3>
          </div>

          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4">
              <UserPlus size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">New Acquisition</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.newLeads}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-slate-50">
          <div className="w-1.5 h-6 bg-brand rounded-full"></div>
          <h3 className="text-xl font-black text-slate-900">Recent Engagement Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Customer", "Interaction Type", "Date", "Notes"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DASHBOARD_DATA.recentInteractions.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-all cursor-default">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded-lg ${
                        item.type === 'Call' ? 'bg-blue-50 text-blue-600' :
                        item.type === 'Email' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-purple-50 text-purple-600'
                      }`}>
                        {item.type === 'Call' && <PhoneCall size={14} />}
                        {item.type === 'Email' && <MessageSquare size={14} />}
                        {item.type === 'Meeting' && <Users size={14} />}
                      </span>
                      <span className="text-sm font-bold text-slate-600">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-400 italic leading-relaxed">"{item.note}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
