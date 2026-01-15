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
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e293b]">CRM Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-red-600 font-medium cursor-pointer">Dashboard</span>
          <span className="text-gray-400 font-bold text-[10px]">{">"}</span>
          <span className="text-gray-400 font-medium">Customer Relationship Management</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1628] rounded-xl p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3">Customer Relations</h2>
            <p className="text-gray-400 text-lg leading-snug font-medium">
              Manage your customer interactions and leads efficiently in one place.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-red-600 rounded-full blur-[80px] absolute inset-0"></div>
              <Users size={120} className="text-red-600 relative z-10" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 rounded-xl p-6 relative overflow-hidden group border border-purple-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-600 shadow-sm">
                <Users size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.totalCustomers}</span>
            </div>
            <p className="mt-4 text-purple-600 font-black text-lg leading-tight relative z-10">Total<br/>Customers</p>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 relative overflow-hidden group border border-orange-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-orange-600 shadow-sm">
                <UserPlus size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.newLeads}</span>
            </div>
            <p className="mt-4 text-orange-600 font-black text-lg leading-tight relative z-10">New Leads<br/>This Month</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex items-center gap-2 border-b border-gray-50">
          <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
          <h3 className="text-xl font-black text-[#1e293b]">Recent Customer Interactions</h3>
        </div>
        <div className="p-0">
          <table className="w-full">
            <thead className="bg-[#f8fafd]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {DASHBOARD_DATA.recentInteractions.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                      {item.type === 'Call' && <PhoneCall size={14} className="text-blue-500" />}
                      {item.type === 'Email' && <MessageSquare size={14} className="text-green-500" />}
                      {item.type === 'Meeting' && <Users size={14} className="text-purple-500" />}
                      {item.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600 italic">"{item.note}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
