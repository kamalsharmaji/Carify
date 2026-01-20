import type { ReactNode } from "react";
import {
  Users,
  UserPlus,
  Briefcase,
  FileText,
  TrendingUp,
  Calendar,
  Clock,
  Gift,
  Building2,
  PieChart,
  Target,
  CreditCard,
  UserCheck
} from "lucide-react";

/* ================= MAIN COMPONENT ================= */

export default function HRMS() {
  // Mock data for the dashboard
  const stats = [
    { label: "Total Workforce", value: "124", icon: <Users size={24} />, color: "bg-blue-500", trend: "+4 this month" },
    { label: "Present Today", value: "118", icon: <UserCheck size={24} />, color: "bg-emerald-500", trend: "95% Attendance" },
    { label: "Open Positions", value: "12", icon: <Briefcase size={24} />, color: "bg-amber-500", trend: "5 urgent" },
    { label: "Monthly Payroll", value: "₹45.2L", icon: <CreditCard size={24} />, color: "bg-brand", trend: "Due in 4 days" },
  ];

  const recentActivities = [
    { id: 1, user: "Amit Sharma", action: "joined as Fleet Manager", time: "2 hours ago", type: "hire" },
    { id: 2, user: "Neha Verma", action: "approved leave for Vikram", time: "4 hours ago", type: "approval" },
    { id: 3, user: "System", action: "generated monthly payroll report", time: "Yesterday", type: "report" },
    { id: 4, user: "Rahul Singh", action: "updated safety compliance docs", time: "Yesterday", type: "update" },
  ];

  const upcomingEvents = [
    { id: 1, name: "Sanya Iyer", event: "Work Anniversary", date: "Jan 18", icon: <Target className="text-blue-500" /> },
    { id: 2, name: "Vikram Malhotra", event: "Birthday", date: "Jan 20", icon: <Gift className="text-pink-500" /> },
    { id: 3, name: "Priya Das", event: "Project Milestone", date: "Jan 22", icon: <TrendingUp className="text-emerald-500" /> },
  ];

  return (
    <div 
      className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500 p-4 md:p-8"
    >
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-brand rounded-full"></span>
              Human Capital Hub
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <Users size={16} />
              HRMS › Organization Overview & Intelligence
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Period</p>
              <p className="text-sm font-bold text-slate-900">January 2024 (Q1)</p>
            </div>
            <button className="bg-white border border-slate-200 p-3 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <Calendar size={20} className="text-slate-600" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 p-8 rounded-[24px] shadow-sm relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-[0.03] rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-110`}></div>
              <div className="flex items-center gap-6 relative z-10">
                <div className={`h-16 w-16 rounded-[20px] ${stat.color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <div className="flex flex-col">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                    <span className="text-[10px] font-black text-slate-400 mt-1">{stat.trend}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Links / Modules */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <PieChart size={20} className="text-brand" />
                  HR Core Modules
                </h3>
                <button className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline">Customize Workspace</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ModuleCard title="Employee Directory" icon={<Users size={20} />} link="/hrms/hrmanagement" />
                <ModuleCard title="Recruitment" icon={<UserPlus size={20} />} link="/hrms/recruitment" />
                <ModuleCard title="Documents" icon={<FileText size={20} />} link="/hrms/document" />
                <ModuleCard title="Attendance" icon={<Clock size={20} />} link="/hrms/meetings" />
              </div>
            </div>

            {/* Department Distribution (Simulated Chart) */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Building2 size={20} className="text-brand" />
                  Workforce Distribution
                </h3>
              </div>
              <div className="space-y-6">
                <ProgressRow label="Operations" value={45} total={124} color="bg-blue-500" />
                <ProgressRow label="Engineering" value={32} total={124} color="bg-brand" />
                <ProgressRow label="Marketing" value={24} total={124} color="bg-pink-500" />
                <ProgressRow label="Finance" value={15} total={124} color="bg-amber-500" />
                <ProgressRow label="HR" value={8} total={124} color="bg-emerald-500" />
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-brand/20 transition-colors">
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {event.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-slate-900">{event.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.event}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-brand">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">Activity Feed</h3>
              <div className="space-y-6">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex gap-4 relative">
                    <div className="relative z-10">
                      <div className={`h-3 w-3 rounded-full mt-1.5 ${
                        activity.type === 'hire' ? 'bg-emerald-500' : 
                        activity.type === 'approval' ? 'bg-brand' : 'bg-slate-300'
                      }`}></div>
                      <div className="absolute top-4 bottom-[-24px] left-1.5 w-0.5 bg-slate-100"></div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">
                        <span className="font-black text-slate-900">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function ModuleCard({ title, icon, link }: { title: string, icon: ReactNode, link: string }) {
  return (
    <a href={link} className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-[24px] border border-slate-100 hover:border-brand hover:bg-white transition-all group shadow-sm">
      <div className="h-12 w-12 rounded-2xl bg-white text-slate-400 group-hover:text-brand flex items-center justify-center shadow-sm mb-3 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight text-center">{title}</span>
    </a>
  );
}

interface ProgressRowProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

function ProgressRow({ label, value, total, color }: ProgressRowProps) {
  const percentage = (value / total) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-900">{value} Employees</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${color === 'bg-brand' ? 'bg-brand' : color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
