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
    <div className="space-y-6 pb-20 relative">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e293b]">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-red-600 font-medium cursor-pointer">Dashboard</span>
          <span className="text-gray-400 font-bold text-[10px]">{">"}</span>
          <span className="text-gray-400 font-medium">Vehicle Inspection Management</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Banner */}
        <div className="lg:col-span-7 bg-[#0e1628] rounded-xl p-8 text-white relative overflow-hidden flex items-center min-h-[220px]">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-black mb-3">Vehicle Inspection Management</h2>
            <p className="text-gray-400 text-lg leading-snug font-medium">
              Efficiently streamline and manage vehicle inspections through a centralized system.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-30">
            <div className="relative">
              <div className="w-40 h-40 bg-red-400 rounded-full blur-[80px] absolute inset-0"></div>
              {/* <FileSearch size={160} className="text-red-600 relative z-10" /> */}
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#fef2f4] rounded-xl p-6 relative overflow-hidden group border border-pink-50 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#ff99af] shadow-sm">
                <MousePointer2 size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.totalInspections}</span>
            </div>
            <p className="mt-4 text-[#ff99af] font-black text-lg leading-tight relative z-10">Total Inspection<br/>Request</p>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-[#ff99af] rounded-full opacity-60 translate-x-4 translate-y-4"></div>
          </div>

          <div className="bg-red-50 rounded-xl p-6 relative overflow-hidden group border border-red-100 shadow-sm">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-600 shadow-sm">
                <PieChart size={20} />
              </div>
              <span className="text-5xl font-black text-[#1e293b]">{DASHBOARD_DATA.stats.totalDefects}</span>
            </div>
            <p className="mt-4 text-red-600 font-black text-lg leading-tight relative z-10">Total Defects<br/>And Repairs</p>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-red-400 rounded-full opacity-60 translate-x-4 translate-y-4"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-gray-50">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-red-400 rounded-full"></div>
                <h3 className="text-xl font-black text-[#1e293b]">Inspection Request</h3>
             </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex bg-red-400 rounded-lg p-1">
                  <button className="p-2 text-white hover:bg-red-400 rounded-md transition-all"><ChevronLeft size={20} /></button>
                  <button className="p-2 text-white hover:bg-red-400 rounded-md transition-all ml-1"><ChevronRight size={20} /></button>
                </div>
                <button className="px-6 py-2.5 bg-red-400 text-white text-sm font-black rounded-lg hover:opacity-90 transition-all">Today</button>
              </div>
              <h4 className="text-3xl font-black text-[#1e293b] tracking-wider uppercase">January 2026</h4>
              <div className="flex bg-red-400 rounded-lg p-1 text-white">
                <button className="px-5 py-2 text-sm font-black bg-red-400 rounded-md">Month</button>
                <button className="px-5 py-2 text-sm font-black hover:bg-red-400 rounded-md transition-all">Week</button>
                <button className="px-5 py-2 text-sm font-black hover:bg-red-400 rounded-md transition-all">Day</button>
              </div>
            </div>

            <div className="grid grid-cols-7 border-t border-l border-gray-100 rounded-lg overflow-hidden">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="bg-white border-r border-b border-gray-100 py-3 text-center text-sm font-black text-[#1e293b]">{day}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 3;
                const event = DASHBOARD_DATA.calendarEvents.find(e => e.day === day);
                const isSelected = day === 15;
                return (
                  <div key={i} className={`min-h-[110px] bg-white border-r border-b border-gray-100 p-2 relative ${isSelected ? 'bg-yellow-50/30' : ''}`}>
                    <span className={`text-sm font-bold block text-right pr-2 ${day > 0 && day <= 31 ? 'text-gray-500' : 'text-gray-200'}`}>
                      {day > 0 && day <= 31 ? day : day <= 0 ? 31 + day : day - 31}
                    </span>
                    {event && (
                      <div className="mt-2 p-1.5 bg-[#fff1f4] text-[#ff99af] text-[10px] font-black rounded border-l-4 border-[#ff99af] truncate">
                        {event.id}
                      </div>
                    )}
                    {day === 8 && <div className="text-[10px] text-gray-400 font-bold mt-1 text-center">+2 more</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Charts & Reminders */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-red-400 rounded-full"></div>
                <h3 className="text-xl font-black text-[#1e293b]">Defects And Repairs Report</h3>
              </div>
              <span className="text-sm font-black text-gray-800">Last 10 Days</span>
            </div>

            <div className="relative h-[250px] w-full mt-8">
              <div className="absolute left-0 h-full flex flex-col justify-between text-[11px] font-bold text-gray-400 pb-8">
                <span>2400.0</span>
                <span>2000.0</span>
                <span>1600.0</span>
                <span>1200.0</span>
                <span>800.0</span>
                <span>400.0</span>
              </div>
              <div className="ml-14 h-full relative">
                <div className="absolute inset-0 flex flex-col justify-between py-1">
                  {[...Array(6)].map((_, i) => <div key={i} className="border-t border-dashed border-gray-100 w-full h-px"></div>)}
                </div>
                <svg className="w-full h-full pr-4 pb-8 relative z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path 
                    d="M 0 80 Q 5 20 10 30 T 20 85 T 30 75 T 40 90 T 50 70 T 60 95 T 70 80 T 80 60 T 90 40 T 100 70" 
                    fill="none" 
                    stroke="#dc2626" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <path 
                    d="M 0 80 Q 5 20 10 30 T 20 85 T 30 75 T 40 90 T 50 70 T 60 95 T 70 80 T 80 60 T 90 40 T 100 70 L 100 100 L 0 100 Z" 
                    fill="url(#redGradient)" 
                    opacity="0.1" 
                  />
                  <defs>
                    <linearGradient id="redGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex justify-between mt-4 ml-14 pr-4 text-[9px] font-black text-gray-500 uppercase">
              {["15-Jan", "14-Jan", "13-Jan", "12-Jan", "11-Jan", "10-Jan", "09-Jan", "08-Jan", "07-Jan", "06-Jan"].reverse().map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="mt-4 text-center text-xs font-black text-[#1e293b] uppercase tracking-widest">Days</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex items-center gap-2 border-b border-gray-50">
                <div className="w-1.5 h-6 bg-red-400 rounded-full"></div>
                <h3 className="text-xl font-black text-[#1e293b]">Today Reminder Inspections</h3>
            </div>
            <div className="p-0">
              <table className="w-full">
                <thead className="bg-[#f8fafd]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Vehicle Name</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-[#1e293b] uppercase tracking-wider">Reminder Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {DASHBOARD_DATA.reminders.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-all">
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.name}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-red-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-200 hover:scale-110 transition-transform z-50">
        <ShoppingBag size={28} />
      </button>
    </div>
  );
}
