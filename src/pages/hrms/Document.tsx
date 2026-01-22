import { useState } from "react";
import {
  FileText,
  Search,
  Upload,
  Folder,
  MoreVertical,
  Download,
  Trash2,
  File,
  FileCode,
  FileImage,
  Grid,
  List
} from "lucide-react";

/* ================= TYPES ================= */

interface DocumentItem {
  id: number;
  name: string;
  type: "PDF" | "DOC" | "IMG" | "XLS";
  size: string;
  uploadedBy: string;
  date: string;
  category: string;
}

/* ================= CONSTANTS ================= */

const defaultDocs: DocumentItem[] = [
  { id: 1, name: "Employee_Handbook_2024.pdf", type: "PDF", size: "2.4 MB", uploadedBy: "System", date: "2024-01-01", category: "Policies" },
  { id: 2, name: "Offer_Letter_Amit_Sharma.pdf", type: "PDF", size: "1.2 MB", uploadedBy: "Neha Verma", date: "2024-01-15", category: "Personnel" },
  { id: 3, name: "Q4_Revenue_Report.xls", type: "XLS", size: "850 KB", uploadedBy: "Rahul Singh", date: "2024-01-10", category: "Finance" },
  { id: 4, name: "Safety_Protocol_V2.doc", type: "DOC", size: "4.1 MB", uploadedBy: "System", date: "2023-12-20", category: "Operations" },
  { id: 5, name: "Office_Layout_New.img", type: "IMG", size: "12 MB", uploadedBy: "Priya Das", date: "2024-01-05", category: "General" },
];

/* ================= MAIN COMPONENT ================= */

export default function Document() {
  const [docs] = useState<DocumentItem[]>(defaultDocs);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const filtered = docs.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Knowledge Vault
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <Folder size={16} />
              HRMS › Document Management System
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
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-red-400/10 focus:border-red-400 transition-all w-full md:w-72 shadow-sm font-medium"
              />
            </div>

            <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Upload size={18} />
              <span className="hidden sm:inline">Upload File</span>
            </button>
          </div>
        </div>

        {/* Categories / Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {["Personnel", "Finance", "Legal", "Operations", "Marketing", "Policies"].map((cat) => (
            <button key={cat} className="bg-white border border-slate-200 p-4 rounded-xl hover:border-red-400 hover:bg-red-50/30 transition-all group flex flex-col items-center gap-2">
              <Folder className="text-slate-400 group-hover:text-red-400 transition-colors" size={24} />
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{cat}</span>
            </button>
          ))}
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-900">All Files</h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{filtered.length}</span>
          </div>
          <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-red-400 text-white" : "text-slate-400 hover:bg-slate-50"}`}>
              <List size={18} />
            </button>
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-red-400 text-white" : "text-slate-400 hover:bg-slate-50"}`}>
              <Grid size={18} />
            </button>
          </div>
        </div>

        {/* Document Content */}
        {viewMode === "list" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["File Name", "Size", "Uploaded By", "Date", "Category", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <FileIcon type={doc.type} />
                          <span className="font-bold text-slate-900 text-sm">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-xs font-bold text-slate-500">{doc.size}</td>
                      <td className="px-8 py-4 text-xs font-bold text-slate-500">{doc.uploadedBy}</td>
                      <td className="px-8 py-4 text-xs font-bold text-slate-500">{doc.date}</td>
                      <td className="px-8 py-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[9px] font-black uppercase tracking-wider">
                          {doc.category}
                        </span>
                      </td>
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
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((doc) => (
              <div key={doc.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all group relative">
                <div className="flex justify-between items-start mb-4">
                  <FileIcon type={doc.type} size={40} />
                  <button className="text-slate-400 hover:text-red-400 transition-colors"><MoreVertical size={18} /></button>
                </div>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">{doc.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{doc.category} • {doc.size}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-500">{doc.date}</span>
                  <button className="text-xs font-black text-red-400 hover:underline">Download</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function FileIcon({ type, size = 24 }: { type: string, size?: number }) {
  const styles: any = {
    PDF: <FileText size={size} className="text-red-500" />,
    DOC: <File size={size} className="text-blue-500" />,
    IMG: <FileImage size={size} className="text-purple-500" />,
    XLS: <FileCode size={size} className="text-emerald-500" />,
  };
  return styles[type] || <File size={size} />;
}
