import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon Container */}
        <div className="relative inline-block">
          <div className="h-32 w-32 rounded-[40px] bg-white shadow-2xl shadow-rose-200/50 flex items-center justify-center relative z-10 animate-bounce">
            <ShieldAlert size={64} className="text-rose-500" />
          </div>
          <div className="absolute inset-0 bg-rose-400 blur-3xl opacity-20 -z-0"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Access Denied</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Oops! It looks like you don't have the required permissions to view this secure module. Please contact your system administrator if you think this is a mistake.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95 shadow-slate-200"
          >
            <Home size={18} />
            Dashboard
          </button>
        </div>

        {/* System Info */}
        <div className="pt-12">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Error Code: 403_FORBIDDEN_ACCESS</p>
        </div>
      </div>
    </div>
  );
}
