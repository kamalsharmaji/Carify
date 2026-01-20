import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ChevronDown,
  Truck,
  ClipboardCheck,
  X,
  ShieldCheck,
  UserCheck,
  FileText,
 
  ShoppingCart,
  Database,
  PieChart,
  Monitor,
  ChevronLeft,
} from "lucide-react";
 
interface SidebarProps {
  onClose?: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const linkClass = ({ isActive }: { isActive: boolean }, isCollapsed: boolean) =>
  `flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
    isActive 
      ? "bg-brand text-white shadow-lg scale-[1.02]" 
      : "text-[#54595f] hover:bg-gray-50 hover:text-brand"
  } ${isCollapsed ? "justify-center" : ""}`;

const subLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 py-2.5 pl-12 pr-4 text-sm font-medium transition-all duration-200 rounded-lg ${
    isActive 
      ? "text-brand bg-slate-50 translate-x-1" 
      : "text-[#64748b] hover:text-brand hover:translate-x-1"
  }`;

export function Sidebar({ onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    dashboard: false,
    userManagement: false,
    vehicleInspection: false,
    fleet: false,
    inspection: false,
    hrms: false,
  });

  const toggleMenu = (menu: string) => {
    if (!isCollapsed) {
      setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    }
  };

  return (
    <aside className={`h-full bg-white border-r border-gray-100 flex flex-col shadow-2xl shadow-gray-200/50 transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}`}>
      <div className={`p-6 pb-2 ${isCollapsed ? 'px-4' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
              <img
  src="/images/carifypdi_logo1.jpeg.png"
  alt="Carify Logo"
  className="h-16 w-auto object-contain"
/>  <button 
  onClick={onToggleCollapse} 
  className="hidden lg:flex w-full items-center justify-center gap-2 p-2 rounded-xl bg-gray-100 hover:bg-slate-200 transition-colors"
>
  <ChevronLeft 
    size={20} 
    className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
  />
</button>

          </div>
          <button onClick={onClose} aria-label="Close sidebar" className="lg:hidden p-2 text-black-500 rounded-xlhover:bg-gray-50 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        {!isCollapsed && (
          <>
            <div className="px-1 mb-4">
              <span className="text-[10px] font-bold text-brand uppercase tracking-widest">advance modern i 2026</span>
            </div>

             
          </>
        )}
      </div>

      <div 
        className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-300 ${isCollapsed ? 'px-2' : ''}`}
      >
        <nav className="space-y-1 font-semibold">
          {/* Dashboard Dropdown */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleMenu('dashboard')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${openMenus.dashboard && !isCollapsed ? 'bg-gray-50/50 text-[#1e293b]' : 'text-[#54595f] hover:bg-gray-50'} ${isCollapsed ? 'justify-center' : ''}`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard size={20} className={(openMenus.dashboard && !isCollapsed) ? 'text-brand' : 'text-gray-400'} />
                {!isCollapsed && <span className="text-[15px]">Dashboard</span>}
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`transition-transform duration-300 ${openMenus.dashboard ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.dashboard && !isCollapsed ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
               
              <NavLink to="/dashboard/inspection" onClick={onClose} className={subLinkClass}>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                Vehicle Inspection
              </NavLink>
              <NavLink to="/dashboard/hrm" onClick={onClose} className={subLinkClass}>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                HRMS
              </NavLink>
              <NavLink to="/dashboard/adgr" onClick={onClose} className={subLinkClass}>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                ADGR
              </NavLink>
              <NavLink to="/dashboard/crm" onClick={onClose} className={subLinkClass}>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                CRM
              </NavLink>
              <NavLink to="/dashboard/ecom" onClick={onClose} className={subLinkClass}>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                E-Commerce
              </NavLink>
              <NavLink to="/dashboard/ims" onClick={onClose} className={subLinkClass}>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                IMS
              </NavLink>
              <NavLink to="/dashboard/mmm" onClick={onClose} className={subLinkClass}>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                MMM
              </NavLink>
              <NavLink to="/dashboard/vms" onClick={onClose} className={subLinkClass}>
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                VMS
              </NavLink>
               
            </div>
          </div>

          {/* User Management Dropdown */}
          <div className="space-y-0">
            <button 
              onClick={() => toggleMenu('userManagement')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${openMenus.userManagement && !isCollapsed ? 'bg-gray-50/50 text-[#1e293b]' : 'text-[#54595f] hover:bg-gray-50'} ${isCollapsed ? 'justify-center' : ''}`}
            >
              <div className="flex items-center gap-3">
                <Users size={20} className={openMenus.userManagement && !isCollapsed ? 'text-red-600' : 'text-gray-400'} />
                {!isCollapsed && <span className="text-[15px]">User Management</span>}
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`transition-transform duration-300 ${openMenus.userManagement ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.userManagement && !isCollapsed ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <NavLink to="/users" onClick={onClose} className={subLinkClass}>
                <UserCheck size={14} className="opacity-60" />
                User
              </NavLink>
              <NavLink to="/roles" onClick={onClose} className={subLinkClass}>
                <ShieldCheck size={14} className="opacity-60" />
                Role
              </NavLink>
            </div>
          </div>

          <div className={`pt-4 space-y-1 ${isCollapsed ? 'text-center' : ''}`}>
             
            <div className="space-y-1">
              <button 
                onClick={() => toggleMenu('fleet')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${openMenus.fleet && !isCollapsed ? 'bg-gray-50/50 text-[#1e293b]' : 'text-[#54595f] hover:bg-gray-50'} ${isCollapsed ? 'justify-center' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Truck size={20} className={openMenus.fleet && !isCollapsed ? 'text-red-600' : 'text-gray-400'} />
                  {!isCollapsed && <span className="text-[15px]">Fleet</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={`transition-transform duration-300 ${openMenus.fleet ? 'rotate-180' : ''}`} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.fleet && !isCollapsed ? 'max-h-[600px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                <NavLink to="/fleet/driver" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Driver
                </NavLink>
                <NavLink to="/fleet/customer" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Customer
                </NavLink>
                <NavLink to="/fleet/vehicle" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Vehicle
                </NavLink>
                <NavLink to="/fleet/logbook" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Log Book
                </NavLink>
                <NavLink to="/fleet/booking" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Booking
                </NavLink>
                <NavLink to="/fleet/availability" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Availability
                </NavLink>
                <NavLink to="/fleet/insurance" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Insurance
                </NavLink>
                <NavLink to="/fleet/maintenance" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Maintenance
                </NavLink>
                <NavLink to="/fleet/fuelhistory" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Fuel History
                </NavLink>
                <NavLink to="/fleet/reports" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Report
                </NavLink>
                <NavLink to="/fleet/setup" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  System Setup
                </NavLink>
              </div>
            </div>
            <div className="space-y-1">
              <button 
                onClick={() => toggleMenu('inspection')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${openMenus.inspection && !isCollapsed ? 'bg-gray-50/50 text-[#1e293b]' : 'text-[#54595f] hover:bg-gray-50'} ${isCollapsed ? 'justify-center' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <ClipboardCheck  size={20} className={openMenus.inspection && !isCollapsed ? 'text-red-600' : 'text-gray-400'} />
                  {!isCollapsed && <span className="text-[15px]">Vehicle Inspection</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={`transition-transform duration-300 ${openMenus.inspection ? 'rotate-180' : ''}`} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.inspection && !isCollapsed ? 'max-h-[800px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                <NavLink to="/inspection" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Vehicle
                </NavLink>
                 <NavLink to="/inspection/list" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Inspection List
                </NavLink>
                 <NavLink to="/inspection/request" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                   Inspection Request
                </NavLink>
                 <NavLink to="/inspection/reminder" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Inspection Reminder
                </NavLink>
                 <NavLink to="/inspection/schedule" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                   Inspection Schedule
                </NavLink>
                 <NavLink to="/inspection/history" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  Inspection History
                </NavLink>
                 <NavLink to="/inspection/compliance" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                   Compliance Regulations
                </NavLink>                  
              </div>
            </div>

             <div className="space-y-1">
              <button 
                onClick={() => toggleMenu('hrms')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${openMenus.hrms && !isCollapsed ? 'bg-gray-50/50 text-[#1e293b]' : 'text-[#54595f] hover:bg-gray-50'} ${isCollapsed ? 'justify-center' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <ClipboardCheck  size={20} className={openMenus.hrms && !isCollapsed ? 'text-red-600' : 'text-gray-400'} />
                  {!isCollapsed && <span className="text-[15px]">HRMS</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={`transition-transform duration-300 ${openMenus.hrms ? 'rotate-180' : ''}`} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.hrms && !isCollapsed ? 'max-h-[800px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                <NavLink to="/hrms/hrmanagement" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                  HR Management
                </NavLink>  
                 <NavLink to="/hrms/recruitment" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                   Recruitment
                </NavLink>  
                 <NavLink to="/hrms/contract" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                     Contract
                </NavLink> 
                 <NavLink to="/hrms/document" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                    Document
                </NavLink> 
                 <NavLink to="/hrms/meetings" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                    Meetings
                </NavLink> 
                 <NavLink to="/hrms/medialibrary" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                     Media Library
                </NavLink> 
                 <NavLink to="/hrms/assetmanagement" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                    Asset Management
                </NavLink> 
                 <NavLink to="/hrms/leavemanagement" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                   Leave Management
                </NavLink> 
                 <NavLink to="/hrms/attendancemanagement" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                    Attendance Management
                </NavLink>
                <NavLink to="/hrms/timetracking" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                     Time Tracking
                </NavLink>
                <NavLink to="/hrms/payrollmanagement" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                     Payroll Management
                </NavLink>
                <NavLink to="/hrms/currencies" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                     Currencies
                </NavLink>
                <NavLink to="/hrms/Landingpage" onClick={onClose} className={subLinkClass}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                     Landing Page
                </NavLink>  
                         
              </div>
            </div>
            

          </div>
          
          <NavLink to="/adgr" onClick={onClose} className={({isActive}) => linkClass({isActive}, isCollapsed)}>
              <div className="flex items-center gap-3">
                <FileText size={20} className="group-hover:rotate-6 transition-transform" />
                {!isCollapsed && <span>ADGR</span>}
              </div>
          </NavLink>

          <NavLink to="/crm" onClick={onClose} className={({isActive}) => linkClass({isActive}, isCollapsed)}>
              <div className="flex items-center gap-3">
                <Users size={20} className="group-hover:rotate-6 transition-transform" />
                {!isCollapsed && <span>CRM</span>}
              </div>
          </NavLink>

          <NavLink to="/ecom" onClick={onClose} className={({isActive}) => linkClass({isActive}, isCollapsed)}>
              <div className="flex items-center gap-3">
                <ShoppingCart size={20} className="group-hover:rotate-6 transition-transform" />
                {!isCollapsed && <span>E-Commerce</span>}
              </div>
          </NavLink>            

            <NavLink to="/ims" onClick={onClose} className={({isActive}) => linkClass({isActive}, isCollapsed)}>
              <div className="flex items-center gap-3">
                <Database size={20} className="group-hover:rotate-6 transition-transform" />
                {!isCollapsed && <span>IMS</span>}
              </div>
            </NavLink>

            <NavLink to="/mmm" onClick={onClose} className={({isActive}) => linkClass({isActive}, isCollapsed)}>
              <div className="flex items-center gap-3">
                <PieChart size={20} className="group-hover:rotate-6 transition-transform" />
                {!isCollapsed && <span>MMM</span>}
              </div>
            </NavLink>

            <NavLink to="/vms" onClick={onClose} className={({isActive}) => linkClass({isActive}, isCollapsed)}>
              <div className="flex items-center gap-3">
                <Monitor size={20} className="group-hover:rotate-6 transition-transform" />
                {!isCollapsed && <span>VMS</span>}
              </div>
            </NavLink>
            
        </nav>
      </div>

      <div className={`p-6 border-t border-gray-50 bg-gray-50/30 ${isCollapsed ? 'p-2' : ''}`}>
        {!isCollapsed && (
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-4">
            <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-1">Current Plan</p>
            <p className="text-sm font-black text-gray-800 mb-3">Enterprise Pro</p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-brand h-full w-4/5"></div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
