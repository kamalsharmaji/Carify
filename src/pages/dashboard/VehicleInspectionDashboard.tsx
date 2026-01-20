import { ChevronLeft, ChevronRight, MousePointer2, PieChart, ShoppingBag } from "lucide-react";

// Dummy data for easy API integration later
const DASHBOARD_DATA = {
  stats: {
    totalInspections: 7,
    totalDefects: 1
  },
  reminders: [
    { id: 1, name: "BMW X5", date: "27-10-2028" },
    { id: 2, name: "Chevrolet Tahoe", date: "16-10-2027" },
    { id: 3, name: "Ford Mustang", date: "19-09-2026" },
    { id: 4, name: "Honda Civic", date: "17-04-2026" },
    { id: 5, name: "Toyota Camry", date: "22-06-2025" }
  ],
  calendarEvents: [
    { day: 1, id: "#IREQ00006" },
    { day: 13, id: "#IREQ00003" },
    { day: 15, id: "#IREQ00005" },
    { day: 16, id: "#IREQ00002" },
    { day: 29, id: "#IREQ00004" }
  ],
  chartData: [
    { date: "06-Jan", value: 800 },
    { date: "07-Jan", value: 1200 },
    { date: "08-Jan", value: 1000 },
    { date: "09-Jan", value: 1600 },
    { date: "10-Jan", value: 1400 },
    { date: "11-Jan", value: 1800 },
    { date: "12-Jan", value: 1200 },
    { date: "13-Jan", value: 2000 },
    { date: "14-Jan", value: 1400 },
    { date: "15-Jan", value: 2100 }
  ]
};

export default function VehicleInspectionDashboard() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Vehicle Inspection Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-brand font-medium cursor-pointer">Dashboard</span>
          <span className="text-slate-400 font-bold text-[10px]">{">"}</span>
          <span className="text-slate-400 font-medium">Vehicle Inspection Management</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Banner */}
        <div className="lg:col-span-7 bg-[#0e1628] rounded-[24px] p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3 leading-tight text-white">Vehicle Inspection <br/><span className="text-brand">Management.</span></h2>
            <p className="text-slate-400 text-lg leading-snug font-medium">
              Efficiently streamline and manage vehicle inspections through a centralized system.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-brand rounded-full blur-[80px] absolute inset-0"></div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-4">
              <MousePointer2 size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Inspections</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.totalInspections}</h3>
          </div>

          <div className="bg-white rounded-[24px] p-6 relative overflow-hidden group border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
              <PieChart size={24} />
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Defects</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{DASHBOARD_DATA.stats.totalDefects}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-7 bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-slate-50">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-brand rounded-full"></div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Inspection Request</h3>
             </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex bg-slate-50 border border-slate-100 rounded-2xl p-1">
                  <button className="p-2 text-slate-400 hover:text-brand hover:bg-white rounded-xl transition-all"><ChevronLeft size={20} /></button>
                  <button className="p-2 text-slate-400 hover:text-brand hover:bg-white rounded-xl transition-all"><ChevronRight size={20} /></button>
                </div>
                <button className="px-6 py-2.5 bg-brand text-white text-sm font-black rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-brand/20 active:scale-95">Today</button>
              </div>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">January 2026</h4>
              <div className="flex bg-slate-50 border border-slate-100 rounded-2xl p-1">
                <button className="px-5 py-2 text-xs font-black bg-white text-brand rounded-xl shadow-sm">Month</button>
                <button className="px-5 py-2 text-xs font-black text-slate-400 hover:text-brand rounded-xl transition-all">Week</button>
                <button className="px-5 py-2 text-xs font-black text-slate-400 hover:text-brand rounded-xl transition-all">Day</button>
              </div>
            </div>

            <div className="grid grid-cols-7 border border-slate-50 rounded-[24px] overflow-hidden">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="bg-slate-50/50 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">{day}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 3;
                const event = DASHBOARD_DATA.calendarEvents.find(e => e.day === day);
                const isSelected = day === 15;
                return (
                  <div key={i} className={`min-h-[100px] bg-white border-t border-r border-slate-50 p-2 transition-all hover:bg-slate-50/30 ${isSelected ? 'bg-brand/5 ring-1 ring-inset ring-brand/10' : ''}`}>
                    <span className={`text-[11px] font-black block text-right pr-2 ${day > 0 && day <= 31 ? 'text-slate-400' : 'text-slate-200'}`}>
                      {day > 0 && day <= 31 ? day : day <= 0 ? 31 + day : day - 31}
                    </span>
                    {event && (
                      <div className="mt-2 p-1.5 bg-brand/5 text-brand text-[10px] font-bold rounded-lg border border-brand/10 truncate">
                        {event.id}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Charts & Reminders */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-brand rounded-full"></div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Defects Report</h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 10 Days</span>
            </div>

            <div className="relative h-[220px] w-full">
              <div className="absolute inset-0 flex flex-col justify-between py-1">
                {[...Array(6)].map((_, i) => <div key={i} className="border-t border-slate-50 w-full h-px"></div>)}
              </div>
              <div className="relative h-full flex items-end justify-between px-2 gap-1.5">
                {DASHBOARD_DATA.chartData.map((d, i) => (
                  <div key={i} className="flex-1 bg-brand rounded-t-lg relative group transition-all hover:bg-brand/20" style={{ height: `${(d.value / 2400) * 100}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      {d.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-4 px-2 text-[9px] font-bold text-slate-400 uppercase tracking-tight">
              {DASHBOARD_DATA.chartData.map(d => <span key={d.date} className="w-8 text-center">{d.date.split('-')[0]}</span>)}
            </div>
          </div>

          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 flex items-center gap-2 border-b border-slate-50">
                <div className="w-1.5 h-6 bg-brand rounded-full"></div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Today Reminders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Vehicle</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {DASHBOARD_DATA.reminders.slice(0, 3).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.name}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand/40 hover:scale-110 active:scale-95 transition-all z-50">
        <ShoppingBag size={28} />
      </button>
    </div>
  );
}
