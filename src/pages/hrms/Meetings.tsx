import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Users,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin
} from "lucide-react";

/* ================= TYPES ================= */

interface Meeting {
  id: number;
  title: string;
  organizer: string;
  participants: number;
  date: string;
  time: string;
  duration: string;
  type: "Online" | "In-Person";
  status: "Upcoming" | "Completed" | "Cancelled";
}

/* ================= CONSTANTS ================= */

const defaultMeetings: Meeting[] = [
  { id: 1, title: "Monthly Operations Review", organizer: "Amit Sharma", participants: 12, date: "2024-01-20", time: "10:00 AM", duration: "1h", type: "Online", status: "Upcoming" },
  { id: 2, title: "Quarterly Strategy Session", organizer: "Neha Verma", participants: 8, date: "2024-01-22", time: "02:00 PM", duration: "2h", type: "In-Person", status: "Upcoming" },
  { id: 3, title: "Developer Sync", organizer: "Priya Das", participants: 5, date: "2024-01-15", time: "04:00 PM", duration: "45m", type: "Online", status: "Completed" },
  { id: 4, title: "Budget Planning Q2", organizer: "Rahul Singh", participants: 4, date: "2024-01-25", time: "11:30 AM", duration: "1.5h", type: "Online", status: "Upcoming" },
  { id: 5, title: "Team Building Workshop", organizer: "System", participants: 50, date: "2024-02-05", time: "09:00 AM", duration: "4h", type: "In-Person", status: "Upcoming" },
];

/* ================= MAIN COMPONENT ================= */

export default function Meetings() {
  const [meetings] = useState<Meeting[]>(defaultMeetings);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = meetings.filter(
    (m) =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Event Scheduler
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <Calendar size={16} />
              HRMS › Collaborative Meetings & Sessions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group flex-1 md:flex-none">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>

            <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Schedule Meeting</span>
            </button>
          </div>
        </div>

        {/* Calendar View Strip (Mock) */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900">January 2024</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-all border border-slate-100"><ChevronLeft size={20} /></button>
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-all border border-slate-100"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</span>
                <div className={`h-12 w-full rounded-2xl flex items-center justify-center font-black text-sm transition-all ${i === 4 ? "bg-red-400 text-white shadow-lg shadow-red-200" : "bg-slate-50 text-slate-400 hover:bg-slate-100 cursor-pointer"}`}>
                  {15 + i}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((meeting) => (
            <div key={meeting.id} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 ${meeting.status === 'Completed' ? 'bg-emerald-400' : 'bg-red-400'} opacity-[0.03] rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-110`}></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm ${meeting.type === 'Online' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'}`}>
                  {meeting.type === 'Online' ? <Video size={24} /> : <MapPin size={24} />}
                </div>
                <StatusBadge status={meeting.status} />
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2 line-clamp-1">{meeting.title}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Users size={14} />
                {meeting.organizer} • {meeting.participants} Participants
              </p>

              <div className="space-y-4 pt-6 border-t border-slate-50 relative z-10">
                <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    {meeting.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    {meeting.time}
                  </div>
                </div>
                <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black uppercase transition-all shadow-lg active:scale-95">
                  {meeting.status === 'Completed' ? 'View Summary' : 'Join Meeting'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatusBadge({ status }: { status: "Upcoming" | "Completed" | "Cancelled" }) {
  const styles: Record<"Upcoming" | "Completed" | "Cancelled", string> = {
    Upcoming: "bg-blue-100 text-blue-600",
    Completed: "bg-emerald-100 text-emerald-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}
