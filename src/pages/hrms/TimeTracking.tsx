import { useState } from "react";
import {
  Timer,
  Play,
  Pause,
  BarChart3,
  Briefcase,
  History,
  MoreVertical,
  Clock
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

interface TimeLog {
  id: number;
  project: string;
  task: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: "Active" | "Completed";
}

/* ================= CONSTANTS ================= */

const defaultLogs: TimeLog[] = [
  { id: 1, project: "ERP Modernization", task: "Developing HRMS Sub-modules", startTime: "09:00 AM", endTime: "11:30 AM", duration: "2.5h", status: "Completed" },
  { id: 2, project: "Fleet UI Refactor", task: "Bug fixes in Driver listing", startTime: "12:00 PM", endTime: "02:00 PM", duration: "2h", status: "Completed" },
  { id: 3, project: "ERP Modernization", task: "Testing UI Components", startTime: "03:00 PM", endTime: "---", duration: "Active", status: "Active" },
];

/* ================= MAIN COMPONENT ================= */

export default function TimeTracking() {
  const [logs] = useState<TimeLog[]>(defaultLogs);
  const [isTracking, setIsTracking] = useState(false);
  const [activeTask, setActiveTask] = useState("");

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
    if (!isTracking) {
      toast.success("Timer started", { icon: "⏱️" });
    } else {
      toast.success("Timer stopped and logged");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Performance Clock
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <Timer size={16} />
              HRMS › Productivity & Task Intelligence
            </p>
          </div>

          <div className="flex bg-white border border-slate-200 p-2 rounded-[24px] shadow-sm items-center gap-4">
             <div className="text-right px-4 border-r border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Today</p>
                <p className="text-lg font-black text-slate-900">7.5 Hours</p>
             </div>
             <button 
                aria-label="View Analytics"
                className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all"
             >
                <BarChart3 size={20} />
             </button>
          </div>
        </div>

        {/* Active Timer Card */}
        <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-bl-[200px] -mr-20 -mt-20"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-4 text-center md:text-left">
                 <h2 className="text-xl font-bold text-slate-400 uppercase tracking-[0.2em]">Now Tracking</h2>
                 <input 
                    type="text" 
                    placeholder="What are you working on?"
                    className="bg-transparent text-4xl font-black focus:outline-none placeholder:text-white/20 w-full md:w-[500px]"
                    value={activeTask}
                    onChange={(e) => setActiveTask(e.target.value)}
                 />
                 <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                       <Briefcase size={12} />
                       Project: ERP Modernization
                    </span>
                 </div>
              </div>
              
              <div className="flex items-center gap-8">
                 <div className="text-center">
                    <p className="text-6xl font-black tracking-tighter tabular-nums">00:42:15</p>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-2">HH : MM : SS</p>
                 </div>
                 <button 
                    onClick={handleToggleTracking}
                    aria-label={isTracking ? "Pause Timer" : "Start Timer"}
                    className={`h-24 w-24 rounded-full flex items-center justify-center transition-all shadow-2xl transform active:scale-90 ${isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
                 >
                    {isTracking ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                 </button>
              </div>
           </div>
        </div>

        {/* Recent Logs Table */}
        <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden transition-all">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
               <History className="text-red-400" size={20} />
               Time Log History
            </h3>
            <button className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:underline">Download Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Project / Task", "Start", "End", "Duration", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{log.project}</div>
                        <div className="font-bold text-slate-900 text-sm">{log.task}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{log.startTime}</td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{log.endTime}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                         <Clock size={14} className="text-red-400" />
                         {log.duration}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${log.status === 'Active' ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-red-400 rounded-xl transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
