import { useState } from "react";
import type { ReactNode } from "react";
import {
  
  Briefcase,
  Search,
  Filter,
  MoreVertical,
  Mail,
   
  FileText,
  Clock,
  CheckCircle2,
  Plus,
  Target
} from "lucide-react";

/* ================= TYPES ================= */

type CandidateStatus = "Applied" | "Screening" | "Interview" | "Offered" | "Rejected";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: CandidateStatus;
  appliedDate: string;
  experience: string;
}

/* ================= CONSTANTS ================= */

const defaultCandidates: Candidate[] = [
  { id: 1, name: "Arjun Mehta", email: "arjun.m@example.com", phone: "+91 98123 45678", position: "Senior Fleet Manager", status: "Interview", appliedDate: "2024-01-10", experience: "8 Years" },
  { id: 2, name: "Sita Rao", email: "sita.r@example.com", phone: "+91 98234 56789", position: "HR Specialist", status: "Screening", appliedDate: "2024-01-12", experience: "4 Years" },
  { id: 3, name: "Karan Malhotra", email: "karan.m@example.com", phone: "+91 98345 67890", position: "Logistics Analyst", status: "Applied", appliedDate: "2024-01-14", experience: "2 Years" },
  { id: 4, name: "Ananya Gupta", email: "ananya.g@example.com", phone: "+91 98456 78901", position: "Systems Engineer", status: "Offered", appliedDate: "2024-01-05", experience: "6 Years" },
  { id: 5, name: "Rahul Kapoor", email: "rahul.k@example.com", phone: "+91 98567 89012", position: "Operations Lead", status: "Rejected", appliedDate: "2024-01-02", experience: "10 Years" },
];

/* ================= MAIN COMPONENT ================= */

export default function Recruitment() {
  const [candidates] = useState<Candidate[]>(defaultCandidates);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Talent Acquisition
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <Briefcase size={16} />
              HRMS › Recruitment Pipeline
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
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>

            <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Post New Job</span>
            </button>
          </div>
        </div>

        {/* Recruitment Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Applications" value="482" icon={<FileText size={24} />} trend="+12% vs last month" color="bg-blue-500" />
          <StatCard title="Active Jobs" value="12" icon={<Target size={24} />} trend="5 high priority" color="bg-red-400" />
          <StatCard title="Interviews Today" value="8" icon={<Clock size={24} />} trend="Starting at 10 AM" color="bg-amber-500" />
          <StatCard title="Offers Sent" value="5" icon={<CheckCircle2 size={24} />} trend="3 pending response" color="bg-emerald-500" />
        </div>

        {/* Candidate List */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Recent Applications</h3>
            <button className="text-slate-400 hover:text-red-400 transition-colors">
              <Filter size={20} />
            </button>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  {["Candidate", "Position", "Experience", "Status", "Applied On", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-lg border border-slate-200 group-hover:scale-110 transition-transform shadow-sm">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-base">{candidate.name}</div>
                          <div className="text-xs text-slate-400 font-medium">{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-700">{candidate.position}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-500">{candidate.experience}</div>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={candidate.status} />
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-bold text-sm">
                      {candidate.appliedDate}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-400 rounded-xl transition-colors">
                          <Mail size={18} />
                        </button>
                        <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-400 rounded-xl transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
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

/* ================= HELPER COMPONENTS ================= */

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-bl-3xl -mr-8 -mt-8 transition-all group-hover:scale-110`}></div>
      <div className="flex items-center gap-6 relative z-10">
        <div className={`h-16 w-16 rounded-xl ${color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
          <div className="flex flex-col">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
            <span className="text-[10px] font-black text-slate-400 mt-1">{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: CandidateStatus }) {
  const styles: Record<CandidateStatus, string> = {
    Applied: "bg-blue-100 text-blue-600",
    Screening: "bg-amber-100 text-amber-600",
    Interview: "bg-purple-100 text-purple-600",
    Offered: "bg-emerald-100 text-emerald-600",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
}
