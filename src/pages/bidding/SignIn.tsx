import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Lock, Phone } from 'lucide-react';

const SignIn = () => {
  const [mode, setMode] = useState('OTP');
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8F9FE] min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center p-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#5D3FD3]/5 -rotate-12 transform scale-150 translate-x-[-20%] translate-y-[-20%] rounded-[100px]" />
        
        <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <img src="/images/carifypdi_logo1.jpeg.png" className="h-16 object-contain" alt="Logo" />
            <h1 className="text-6xl font-black text-slate-900 leading-tight">India's Most Trusted <br /> <span className="text-[#5D3FD3]">Vehicle Auction</span> Platform</h1>
            <p className="text-xl text-slate-500 max-w-lg font-medium">Join thousands of dealers nationwide in discovering the best deals on verified vehicles.</p>
            
            <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 max-w-md">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Platform Statistics</p>
                <div className="space-y-4">
                    <div className="flex justify-between items-center"><span className="font-bold text-slate-600">Vehicles Auctioned</span> <span className="font-black text-slate-900">50,000+</span></div>
                    <div className="flex justify-between items-center"><span className="font-bold text-slate-600">Happy Dealers</span> <span className="font-black text-slate-900">15,000+</span></div>
                    <div className="flex justify-between items-center"><span className="font-bold text-slate-600">Cities Covered</span> <span className="font-black text-slate-900">10+</span></div>
                </div>
            </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white p-12 rounded-[50px] shadow-2xl shadow-purple-100 border border-slate-50 space-y-10 animate-in fade-in zoom-in duration-1000">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Welcome Back!</h2>
                <p className="text-slate-500 font-medium">Sign in to access your dealer account</p>
            </div>

            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                <button 
                    onClick={() => setMode('OTP')}
                    className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${mode === 'OTP' ? 'bg-white text-[#5D3FD3] shadow-sm' : 'text-slate-400'}`}
                >OTP</button>
                <button 
                    onClick={() => setMode('Password')}
                    className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${mode === 'Password' ? 'bg-white text-[#5D3FD3] shadow-sm' : 'text-slate-400'}`}
                >Password</button>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/bidding/dashboard'); }}>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Mobile Number</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-[#5D3FD3] focus:ring-0 transition-all font-bold" placeholder="9876543210" />
                    </div>
                </div>

                {mode === 'Password' && (
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="password" name="password" className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-[#5D3FD3] focus:ring-0 transition-all font-bold" placeholder="••••••••" />
                        </div>
                    </div>
                )}

                <button type="submit" className="w-full py-5 bg-[#5D3FD3] text-white font-black rounded-3xl shadow-xl shadow-purple-200 hover:scale-105 transition-all flex items-center justify-center gap-3">
                    {mode === 'OTP' ? 'Send OTP' : 'Sign In'}
                    <ArrowRight size={20} />
                </button>
            </form>

            <div className="text-center">
                <p className="text-sm font-bold text-slate-400">
                    Don't have an account? <Link to="/bidding/register" className="text-[#5D3FD3] font-black hover:underline">Register now</Link>
                </p>
            </div>

            <div className="pt-6 border-t border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Trusted by leading banks and financial institutions</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
