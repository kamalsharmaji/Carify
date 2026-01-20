// import { useState } from "react";
// import { 
//   Bell, 
//   ChevronDown, 
//   User, 
//   LogOut, 
//   Check, 
//   Pencil,
//   Eye,
//   Trash2,
//   Menu,
//   Search
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface NavbarProps {
//   onMenuClick: () => void;
// }

// export default function Navbar({ onMenuClick }: NavbarProps) {
//   const navigate = useNavigate();
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
//   const toggleDropdown = (name: string) => {
//     setActiveDropdown(activeDropdown === name ? null : name);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//     navigate("/login");
//   };

//   return (
//     <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 transition-all duration-300">
       
// <div className="relative"></div>
//       <div className="flex items-center gap-2 md:gap-5">
//         <div className="flex items-center gap-3">
//           <button 
//           onClick={onMenuClick}
//           className="lg:hidden p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
//         >
//           <Menu size={22} />
//         </button>
  
//   <img
//     src="/images/carifypdi_logo1.jpeg.png"
//     className="h-8 sm:h-9 md:h-10 w-auto object-contain flex-shrink-0 lg:hidden"

//   />

  
 

         
//         </div>
//         <div className="hidden md:flex relative group">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search dashboard..." 
//             className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-red-600/20 w-48 lg:w-64 transition-all"
//           />
//         </div>

//         <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50/50 rounded-2xl transition-all relative group">
//           <Bell size={22} className="group-hover:shake" />
//           <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
//         </button>

         

//         {/* User Dropdown */}
//         <div className="relative pl-2 md:pl-5 border-l border-gray-100">
//           <div 
//             onClick={() => toggleDropdown('user')}
//             className="flex items-center gap-3 cursor-pointer group"
//           >
             
//             <div className="hidden lg:block">
//               <p className="text-sm font-black text-gray-800 leading-tight">Administrator</p>
//               <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Online</p>
//             </div>
//             <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
//           </div>

//           {activeDropdown === 'user' && (
//             <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
//               <div className="p-3 bg-red-50/50 rounded-2xl flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm">
//                     <Check size={18} />
//                   </div>
//                   <div>
//                     <p className="text-sm font-black text-gray-800">Carify</p>
//                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Workspace</p>
//                   </div>
//                 </div>
//                 <button className="p-2 hover:bg-white rounded-xl text-gray-400 transition-all">
//                   <Pencil size={14} />
//                 </button>
//               </div>
              
//               <div className="space-y-1">
//                 {['The Achievers', 'The Chiefs'].map((item) => (
//                   <div key={item} className="p-3 rounded-2xl hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-all">
//                     <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">{item}</span>
//                     <span className="text-[10px] font-black text-gray-300 group-hover:text-red-600">SWITCH</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="h-px bg-gray-50 my-3"></div>
              
//               <div className="grid grid-cols-2 gap-2">
//                 <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
//                   <Eye size={14} /> View
//                 </button>
//                 <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all">
//                   <Trash2 size={14} /> Remove
//                 </button>
//               </div>
//             </div>
//           )} 
//         </div>

        
//         <div className="flex items-center gap-4">
         

//         {/* Workspace Selector (Mobile Hidden labels) */}
         
//           <div 
//             onClick={() => toggleDropdown('workspace')}
//             className="flex items-center gap-2.5 px-3 py-2 bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-200 rounded-2xl cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md"
//           >
//             <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center text-[11px] text-white font-black shadow-lg shadow-red-200/50">
//               CA
//             </div>
//             <div className="hidden sm:block">
//               <span className="text-sm font-bold text-gray-800">Carify</span>
//               <ChevronDown size={14} className={`inline-ml-1.5 text-gray-400 transition-transform duration-300 ${activeDropdown === 'workspace' ? 'rotate-180' : ''}`} />
//             </div>
//           </div>

//           {activeDropdown === 'workspace' && (
//             <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
//               <div className="p-4 border-b border-gray-50 mb-1">
//                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
//                 <p className="text-sm font-black text-gray-800 truncate">admin@carify.com</p>
//               </div>
//               <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all">
//                 <User size={18} className="text-gray-400" /> My Profile
//               </button>
//               <button 
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all mt-1"
//               >
//                 <LogOut size={18} /> Logout
//               </button>
//             </div>
//           )}
           
         
//       </div>
//       </div>
//     </header>
//   );
// }

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  User,
  LogOut,
  Menu,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 transition-all duration-300">
      <div 
        className="flex items-center justify-between transition-all duration-300"
        style={{ padding: 'var(--navbar-padding)' }}
      >

        {/* LEFT SIDE */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-xl bg-gray-100 text-gray-600"
          >
            <Menu size={22} />
          </button>

          {/* MOBILE LOGO */}
          <img
            src="/images/carifypdi_logo1.jpeg.png"
            alt="Carify"
            className="h-8 sm:h-9 w-auto object-contain lg:hidden"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 relative">
          {/* SEARCH DESKTOP ONLY */}
          <div className="hidden md:flex relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search..."
              className="pl-9 pr-3 py-1.5 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100">
            <Bell size={20} />
          </button>

          {/* USER */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("user")}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100"
            >
              <div className="h-8 w-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold shadow-lg">
                CA
              </div>
              <ChevronDown size={14} />
            </button>

            {activeDropdown === "user" && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-xl overflow-hidden">
                <button className="w-full px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                  <User size={16} /> Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm hover:bg-slate-50 text-brand flex items-center gap-2 font-bold"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

