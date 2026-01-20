import { Users, UserPlus, Briefcase, Clock, CheckCircle2, Building2 } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

interface InsightRowProps {
  label: string;
  value: string;
}

const HRM_DATA = {
  stats: {
    totalEmployees: 124,
    activeRoles: 18,
    attendanceRate: "96%",
    onboarding: 5
  },
  departments: [
    { name: "Operations", count: 45, head: "Amit Sharma" },
    { name: "Engineering", count: 32, head: "Priya Das" },
    { name: "Marketing", count: 24, head: "Sanya Iyer" },
    { name: "Human Resources", count: 8, head: "Neha Verma" }
  ]
};

export default function HRMDashboard() {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">HRM Dashboard</h1>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-brand font-medium cursor-pointer">Dashboard</span>
          <span className="text-slate-400 font-bold text-[10px]">{">"}</span>
          <span className="text-slate-400 font-medium">Workforce Management & Planning</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Workforce" value={HRM_DATA.stats.totalEmployees.toString()} icon={<Users size={24} />} trend="+4 this month" color="bg-blue-500" />
        <StatCard label="Attendance" value={HRM_DATA.stats.attendanceRate} icon={<CheckCircle2 size={24} />} trend="Live status" color="bg-emerald-500" />
        <StatCard label="Openings" value={HRM_DATA.stats.activeRoles.toString()} icon={<Briefcase size={24} />} trend="Active hiring" color="bg-amber-500" />
        <StatCard label="Onboarding" value={HRM_DATA.stats.onboarding.toString()} icon={<UserPlus size={24} />} trend="Next 7 days" color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-brand rounded-full"></div>
              Department Distribution
            </h3>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HRM_DATA.departments.map((dept, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-[24px] border border-slate-50 group hover:bg-white hover:border-brand/20 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-brand transition-colors">
                      <Building2 size={24} />
                    </div>
                    <span className="text-3xl font-black text-slate-900 tracking-tight">{dept.count}</span>
                  </div>
                  <h4 className="font-black text-slate-900 text-lg tracking-tight">{dept.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lead: {dept.head}</p>
                  <div className="mt-6 h-2 bg-white rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-brand rounded-full" style={{ width: `${(dept.count / 50) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0e1628] rounded-[24px] p-8 text-white relative overflow-hidden border border-slate-800 shadow-xl">
            <div className="absolute right-0 top-0 w-32 h-32 bg-brand opacity-10 rounded-bl-full -mr-12 -mt-12"></div>
            <h3 className="text-2xl font-black mb-6 tracking-tight">Staffing Insights</h3>
            <div className="space-y-4 relative z-10">
              <InsightRow label="Retention Rate" value="94.2%" />
              <InsightRow label="Avg. Tenure" value="2.4 Yrs" />
              <InsightRow label="Holiday Balance" value="Avg 12d" />
            </div>
            <button className="w-full mt-8 py-4 bg-brand hover:opacity-90 rounded-2xl font-black text-sm transition-all shadow-lg shadow-brand/20">
              View Detailed Reports
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Clock className="text-brand" size={20} />
              Shift Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-50 hover:bg-white hover:border-brand/10 transition-all group">
                <span className="text-sm font-bold text-slate-600">Morning Shift</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">On Time</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-50 hover:bg-white hover:border-brand/10 transition-all group">
                <span className="text-sm font-bold text-slate-600">Evening Shift</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100">Starts 4PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-100 p-8 rounded-[24px] shadow-sm relative overflow-hidden group flex flex-col items-center justify-center text-center transition-all hover:shadow-lg">
      <div className={`w-12 h-12 ${color.replace('bg-', 'bg-opacity-10 ').replace('500', '50')} ${color.replace('bg-', 'text-')} rounded-full flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{trend}</span>
    </div>
  );
}

function InsightRow({ label, value }: InsightRowProps) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
      <span className="text-sm font-medium text-slate-400">{label}</span>
      <span className="text-lg font-black text-white">{value}</span>
    </div>
  );
}
