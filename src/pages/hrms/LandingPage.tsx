import {
  Monitor,
  Layout,
  MousePointer2,
  Eye,
  Settings,
  Plus,
  ArrowRight,
  Globe,
  Palette,
  LayoutGrid,
  FileText,
  Smartphone
} from "lucide-react";

/* ================= MAIN COMPONENT ================= */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-red-400 rounded-full"></span>
              Experience Designer
            </h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <Layout size={16} />
              HRMS › Employee Portal & CMS
            </p>
          </div>

          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm hover:bg-slate-50">
                <Eye size={18} className="text-slate-500" />
                Live Preview
             </button>
             <button
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Create Section</span>
            </button>
          </div>
        </div>

        {/* CMS Canvas / Mock UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Sidebar Controls */}
           <div className="lg:col-span-3 space-y-6">
              <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Page structure</h3>
                 <div className="space-y-3">
                    <StructureItem label="Hero Section" active />
                    <StructureItem label="Employee Features" />
                    <StructureItem label="Testimonials" />
                    <StructureItem label="Company Gallery" />
                    <StructureItem label="Footer" />
                 </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm">
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Theme Settings</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 group hover:border-red-400 transition-all">
                       <Palette size={20} className="text-slate-400 group-hover:text-red-400" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Colors</span>
                    </button>
                    <button className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 group hover:border-red-400 transition-all">
                       <FileText size={20} className="text-slate-400 group-hover:text-red-400" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Fonts</span>
                    </button>
                 </div>
              </div>
           </div>

           {/* Live Preview Area */}
           <div className="lg:col-span-9 bg-white border border-slate-200 rounded-[40px] shadow-2xl overflow-hidden relative min-h-[600px] group">
              {/* Browser bar */}
              <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
                 <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/20"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400/20"></div>
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/20"></div>
                 </div>
                 <div className="flex-1 max-w-md mx-4 bg-white border border-slate-200 py-1.5 px-4 rounded-lg flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold">portal.carify-erp.com/careers</span>
                    <Globe size={12} className="text-slate-300" />
                 </div>
                 <div className="flex gap-2">
                    <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400"><Smartphone size={14} /></button>
                    <button className="p-1.5 bg-slate-900 border border-slate-900 rounded-lg text-white"><Monitor size={14} /></button>
                 </div>
              </div>

              {/* Preview Content */}
              <div className="p-12 text-center space-y-10">
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                    Join the future of fleet
                 </div>
                 <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                    Drive Your Career <br /> 
                    <span className="text-slate-400">At Carify Enterprise.</span>
                 </h2>
                 <p className="text-slate-500 font-medium max-w-lg mx-auto text-lg">
                    Build world-class enterprise mobility solutions. Join a team of 124+ innovators across the globe.
                 </p>
                 <div className="flex items-center justify-center gap-4">
                    <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-3 group/btn">
                       Explore Roles
                       <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 border-2 border-slate-100 text-slate-900 rounded-2xl font-black hover:bg-slate-50 transition-all">
                       Our Culture
                    </button>
                 </div>
                 
                 {/* Visual Decor */}
                 <div className="pt-20 grid grid-cols-3 gap-6">
                    <div className="h-32 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center">
                       <LayoutGrid size={32} className="text-slate-200" />
                    </div>
                    <div className="h-32 bg-red-50 rounded-3xl border border-red-100 flex items-center justify-center">
                       <LayoutGrid size={32} className="text-red-200" />
                    </div>
                    <div className="h-32 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center">
                       <LayoutGrid size={32} className="text-slate-200" />
                    </div>
                 </div>
              </div>

              {/* Edit Overlay (on hover) */}
              <div className="absolute inset-0 bg-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center border-4 border-red-400/20 m-4 rounded-[32px]">
                 <div className="bg-red-400 text-white px-6 py-2 rounded-full font-black text-xs shadow-2xl flex items-center gap-2">
                    <MousePointer2 size={14} />
                    Click to Edit Section
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StructureItem({ label, active = false }: { label: string, active?: boolean }) {
   return (
      <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${active ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-200'}`}>
         <div className="flex items-center gap-3">
            <div className={`h-2 w-2 rounded-full ${active ? 'bg-red-400' : 'bg-slate-300'}`}></div>
            <span className={`text-xs font-black uppercase tracking-wider ${active ? 'text-red-500' : 'text-slate-500'}`}>{label}</span>
         </div>
         <Settings size={14} className={active ? 'text-red-400' : 'text-slate-400'} />
      </div>
   );
}
