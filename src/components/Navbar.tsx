import { useState, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  User,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  CreditCard
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser({
        name: parsed.name || "Administrator",
        role: parsed.role ? parsed.role.split('_').map((word: string) => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ') : "Super Admin"
      });
    }
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div 
        className="flex items-center justify-between transition-all duration-300 h-16 px-4 md:px-8"
      >

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* MOBILE/TABLET LOGO */}
          <img
            src="/images/carifypdi_logo1.jpeg.png"
            alt="Carify"
            className="h-10 w-auto object-contain lg:hidden"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          
          {/* SEARCH DESKTOP */}
          <div className="hidden md:flex relative group mr-2">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" />
            <input
              placeholder="Search anything..."
              className="pl-10 pr-4 py-2 w-48 lg:w-64 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-brand/20 focus:ring-4 focus:ring-brand/5 text-sm outline-none transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-1 pr-2 border-r border-slate-100 mr-2">
            <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-brand transition-all relative group">
              <Bell size={20} className="group-hover:animate-bounce" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border-2 border-white"></span>
            </button>
            <button className="hidden sm:flex p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-brand transition-all">
              <Settings size={20} />
            </button>
          </div>

          {/* USER PROFILE */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("user")}
              className={`flex items-center gap-3 p-1 rounded-xl hover:bg-slate-50 transition-all ${activeDropdown === 'user' ? 'bg-slate-50' : ''}`}
            >
              <div className="flex items-center gap-3 pl-1">
                <div className="hidden sm:block text-right">
                  <p className="text-[13px] font-black text-slate-900 leading-none mb-1">{user?.name || "Administrator"}</p>
                  <p className="text-[10px] font-bold text-slate-400 leading-none uppercase tracking-[0.1em]">{user?.role || "Super Admin"}</p>
                </div>
                <div className="h-9 w-9 rounded-xl bg-brand text-white flex items-center justify-center text-sm font-black shadow-lg shadow-brand/20">
                  {user?.name ? user.name.substring(0, 2).toUpperCase() : "AD"}
                </div>
              </div>
              <ChevronDown size={14} className={`text-slate-400 mr-1 transition-transform duration-300 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === "user" && (
              <>
                <div 
                  className="fixed inset-0 z-[-1]" 
                  onClick={() => setActiveDropdown(null)}
                ></div>
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-slate-50 bg-slate-50/30">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-slate-900 truncate">admin@carify.com</p>
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full px-3 py-2 text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition-colors">
                      <User size={16} className="text-slate-400" /> My Profile
                    </button>
                    <button className="w-full px-3 py-2 text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition-colors">
                      <Shield size={16} className="text-slate-400" /> Account Security
                    </button>
                    <button className="w-full px-3 py-2 text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl flex items-center gap-3 transition-colors">
                      <CreditCard size={16} className="text-slate-400" /> Billing Details
                    </button>
                  </div>
                  
                  <div className="p-2 border-t border-slate-50 bg-slate-50/20">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 text-[13px] text-brand hover:bg-red-50 rounded-xl flex items-center gap-3 transition-colors font-bold"
                    >
                      <LogOut size={16} /> Logout Account
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
