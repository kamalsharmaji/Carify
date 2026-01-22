import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, User, FileText, MapPin, Phone } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8F9FE] min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white p-16 rounded-[60px] shadow-2xl shadow-purple-100 border border-slate-50 space-y-12 animate-in fade-in zoom-in duration-1000">
      
            <img src="/images/carifypdi_logo1.jpeg.png" className="h-12 mx-auto object-contain" alt="Logo" />
            <h2 className="text-4xl font-black text-slate-900">Become a Dealer</h2>
            <p className="text-slate-500 font-medium">Create your account to start bidding on premium vehicles</p>
       

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/bidding/dashboard'); }}>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">First Name *</label>
                    <div className="relative">
                        <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-[#5D3FD3] transition-all font-bold" placeholder="John" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Last Name *</label>
                    <div className="relative">
                        <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-[#5D3FD3] transition-all font-bold" placeholder="Doe" required />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Pan Card Number *</label>
                <div className="relative">
                    <FileText size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-[#5D3FD3] transition-all font-bold uppercase" placeholder="ABCDE1234F" required />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">State *</label>
                    <div className="relative">
                        <MapPin size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-[#5D3FD3] appearance-none font-bold">
                            <option>Haryana</option>
                            <option>Delhi</option>
                            <option>Punjab</option>
                            <option>Maharashtra</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Mobile Number *</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-[#5D3FD3] transition-all font-bold" placeholder="9876543210" required />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 px-4">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-[#5D3FD3] focus:ring-[#5D3FD3]" required />
                <label className="text-sm font-bold text-slate-500">I accept the <Link to="#" className="text-[#5D3FD3] underline">Terms and Conditions</Link></label>
            </div>

            <button type="submit" className="w-full py-5 bg-[#5D3FD3] text-white font-black rounded-[2.5rem] shadow-xl shadow-purple-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                Send OTP
                <ArrowRight size={20} />
            </button>
        </form>

        <p className="text-center text-sm font-bold text-slate-400">
            Already have an account? <Link to="/bidding/login" className="text-[#5D3FD3] font-black hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
