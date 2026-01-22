import { useState } from "react";
import {
  Image as ImageIcon,
  Video,
  Search,
  Plus,
  Grid,
  List,
  Download,
  Trash2,
  Music,
  File
} from "lucide-react";

/* ================= TYPES ================= */

interface MediaItem {
  id: number;
  name: string;
  type: "Image" | "Video" | "Audio" | "Doc";
  url: string;
  size: string;
  date: string;
  dimensions?: string;
}

/* ================= CONSTANTS ================= */

const defaultMedia: MediaItem[] = [
  { id: 1, name: "Company_Event_01.jpg", type: "Image", url: "#", size: "2.4 MB", date: "2024-01-10", dimensions: "1920x1080" },
  { id: 2, name: "Training_Video_Fleet.mp4", type: "Video", url: "#", size: "45 MB", date: "2024-01-12" },
  { id: 3, name: "Employee_Welcome_Kit.zip", type: "Doc", url: "#", size: "12 MB", date: "2024-01-14" },
  { id: 4, name: "Brand_Asset_Logo_Red.png", type: "Image", url: "#", size: "1.2 MB", date: "2024-01-05", dimensions: "512x512" },
  { id: 5, name: "CEO_Podcast_Jan.mp3", type: "Audio", url: "#", size: "15 MB", date: "2024-01-15" },
];

/* ================= MAIN COMPONENT ================= */

export default function MediaLibrary() {
  const [media] = useState<MediaItem[]>(defaultMedia);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = media.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Media Assets
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <ImageIcon size={16} />
              HRMS › Brand & Multimedia Repository
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
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>

            <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Media</span>
            </button>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
            {["All", "Images", "Videos", "Audio", "Documents"].map((tab) => (
              <button key={tab} className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap ${tab === 'All' ? 'bg-red-400 text-white shadow-lg shadow-red-200' : 'text-slate-400 hover:bg-slate-50'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-red-400 text-white" : "text-slate-400 hover:bg-slate-50"}`}>
              <Grid size={18} />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-red-400 text-white" : "text-slate-400 hover:bg-slate-50"}`}>
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Media Content */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group relative">
                <div className="aspect-square bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  <MediaPlaceholder type={item.type} />
                  <div className="absolute inset-0 bg-red-400/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                    <button className="p-3 bg-white text-red-400 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"><Download size={20} /></button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-900 text-xs truncate mb-1">{item.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.size} • {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Asset", "Type", "Size", "Date", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <MediaSmallIcon type={item.type} />
                          <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-xs font-bold text-slate-500">{item.type}</td>
                      <td className="px-8 py-4 text-xs font-bold text-slate-500">{item.size}</td>
                      <td className="px-8 py-4 text-xs font-bold text-slate-500">{item.date}</td>
                      <td className="px-8 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-400 rounded-lg transition-colors"><Download size={16} /></button>
                          <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-400 rounded-lg transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function MediaPlaceholder({ type }: { type: string }) {
  const styles: any = {
    Image: <ImageIcon size={48} className="text-slate-300 group-hover:scale-110 transition-transform" />,
    Video: <Video size={48} className="text-slate-300 group-hover:scale-110 transition-transform" />,
    Audio: <Music size={48} className="text-slate-300 group-hover:scale-110 transition-transform" />,
    Doc: <File size={48} className="text-slate-300 group-hover:scale-110 transition-transform" />,
  };
  return styles[type] || <File size={48} />;
}

function MediaSmallIcon({ type }: { type: string }) {
  const styles: any = {
    Image: <ImageIcon size={16} className="text-red-400" />,
    Video: <Video size={16} className="text-blue-400" />,
    Audio: <Music size={16} className="text-amber-400" />,
    Doc: <File size={16} className="text-slate-400" />,
  };
  return styles[type] || <File size={16} />;
}
