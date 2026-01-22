import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ChevronRight, ShieldCheck, Car } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call and check local storage
    setTimeout(() => {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const user = registeredUsers.find((u: any) => u.email === email && u.password === password && u.isVerified === true);

      // Also allow a default admin for convenience during development
      const isAdmin = email === "admin@carify.com" && password === "admin123";

      if (user || isAdmin) {
        const authUser = user || {
          email: "admin@carify.com",
          name: "Administrator",
          role: "SUPER_ADMIN",
          permissions: [
            "USER_VIEW", "ROLE_MANAGE", "FLEET_VIEW", "VEHICLE_INSPECTION_VIEW",
            "HRM_VIEW", "IMS_VIEW", "CRM_VIEW", "ECOM_VIEW", "MMM_VIEW", "VMS_VIEW"
          ]
        };

        localStorage.setItem("accessToken", "demo-token-" + Date.now());
        localStorage.setItem("user", JSON.stringify(authUser));
        
        toast.success(`Welcome back, ${authUser.name}!`, {
          style: {
            borderRadius: '16px',
            background: '#333',
            color: '#fff',
            fontWeight: 'bold'
          },
        });
        navigate("/dashboard/inspection");
      } else {
        toast.error("Invalid email or password. Please try again.", {
          duration: 4000,
          style: {
            borderRadius: '16px',
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fee2e2',
            fontWeight: 'bold'
          },
        });
      }
      
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 md:p-6 font-['Inter'] selection:bg-red-100 selection:text-red-600">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-400/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] md:rounded-[40px] shadow-2xl shadow-slate-200/60 overflow-hidden relative z-10 border border-white">
        
        {/* Left Side - Illustration/Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[#0f172a] text-white relative overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            >
              <source src="https://cdn.pixabay.com/video/2021/09/10/88075-603173774_large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0f172a]/70 to-red-900/30"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="h-11 w-11 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <Car size={24} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter">CARIFY <span className="text-red-500">ERP</span></span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] mb-6 tracking-tighter">
              Modern Enterprise <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Intelligence.</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-sm font-medium leading-relaxed tracking-tight">
              Streamline your fleet, inventory, and human capital with the industry's most advanced management suite.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 p-3 md:p-4 bg-white/5 rounded-[20px] border border-white/10 backdrop-blur-xl max-w-fit shadow-2xl">
              <div className="h-9 w-9 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">System Security</p>
                <p className="text-[12px] font-bold tracking-tight">256-bit AES Encryption Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
              <div className="h-9 w-9 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/10">
                <Car size={20} className="text-white" />
              </div>
              <span className="text-lg font-black tracking-tighter">CARIFY <span className="text-red-500">ERP</span></span>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tighter">Sign In</h2>
              <p className="text-slate-500 text-[13px] font-medium tracking-tight">Enter your credentials to access the console</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Work Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={16} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/40 transition-all font-semibold text-[13px] text-slate-700 placeholder:text-slate-300 tracking-tight"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
                    <button type="button" className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors">Forgot?</button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={16} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/40 transition-all font-semibold text-[13px] text-slate-700 placeholder:text-slate-300 tracking-tight"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 ml-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-slate-200 text-red-500 focus:ring-red-500/20 cursor-pointer transition-all" 
                />
                <label htmlFor="remember" className="text-[12px] font-semibold text-slate-500 cursor-pointer select-none tracking-tight">Remember this device</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-[14px] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98] mt-2 tracking-tight"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 text-center border-t border-slate-50">
              <p className="text-slate-400 text-[12px] font-medium tracking-tight">
                New to Carify? <button onClick={() => navigate("/register")} className="text-red-500 font-black hover:text-red-600 transition-colors ml-1">Create an account</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
