import { Users, Briefcase, Clock, FileText, TrendingUp } from "lucide-react";

export default function HRMDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="bg-red-900 rounded-2xl p-8 text-white relative overflow-hidden group">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">HRM Workspace</h1>
          <p className="text-red-100/70 text-lg leading-relaxed">
            Manage your workforce, track attendance, and oversee recruitment from a single dashboard.
          </p>
        </div>
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Users size={180} className="text-white relative z-10" />
        </div>
      </div>

      {/* HRM Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Employees", value: "124", icon: Users, color: "bg-red-500", shadow: "shadow-red-100" },
          { label: "Active Jobs", value: "12", icon: Briefcase, color: "bg-red-600", shadow: "shadow-red-100" },
          { label: "Pending Leave", value: "8", icon: Clock, color: "bg-orange-500", shadow: "shadow-orange-100" },
          { label: "New Resumes", value: "45", icon: FileText, color: "bg-purple-500", shadow: "shadow-purple-100" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-center mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-2xl font-black text-gray-800">{stat.value}</span>
            </div>
            <p className="text-gray-500 font-semibold text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Weekly Employee Overview */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#1e293b] flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
              Employee Growth
            </h2>
            <div className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
              <TrendingUp size={16} />
              <span>+12.5%</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full relative">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hrmGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,180 L50,140 L100,160 L150,100 L200,120 L250,60 L300,80 L350,40 L400,60 L400,200 L0,200 Z" fill="url(#hrmGradient)" />
              <path d="M0,180 L50,140 L100,160 L150,100 L200,120 L250,60 L300,80 L350,40 L400,60" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400 font-bold pointer-events-none">
               {[150, 100, 50, 0].map(v => <div key={v} className="border-t border-gray-50 w-full pt-1">{v}</div>)}
            </div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map(m => <span key={m}>{m}</span>)}
          </div>
        </div>

        {/* Recent Leave Requests */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1e293b] flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
              Leave Requests
            </h2>
            <button className="text-red-600 hover:underline text-sm font-bold">View All</button>
          </div>

          <div className="space-y-4">
            {[
              { name: "John Doe", type: "Sick Leave", date: "Today", status: "Pending", color: "text-orange-500 bg-orange-50" },
              { name: "Sarah Smith", type: "Annual Leave", date: "Tomorrow", status: "Approved", color: "text-green-500 bg-green-50" },
              { name: "Mike Ross", type: "Casual Leave", date: "18 Jan", status: "Rejected", color: "text-red-500 bg-red-50" },
              { name: "Rachel Zane", type: "Medical Leave", date: "20 Jan", status: "Pending", color: "text-orange-500 bg-orange-50" }
            ].map((leave, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-sm">
                    {leave.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{leave.name}</p>
                    <p className="text-[11px] text-gray-500 font-medium">{leave.type} • {leave.date}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${leave.color}`}>
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
