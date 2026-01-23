import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ChevronDown,
  Truck,
  ClipboardCheck,
  Gavel,
  X,
  ShieldCheck,
  UserCheck,
  FileText,
  ShoppingCart,
  Database,
  PieChart,
  Monitor,
  PanelLeft,
} from "lucide-react";
 
interface SidebarProps {
  onClose?: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const subLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 py-2 px-4 ml-6 text-[13px] font-medium transition-all duration-200 rounded-lg ${
    isActive 
      ? "text-black bg-red-300 font-bold" 
      : "text-slate-500 hover:text-slate-900 hover:bg-red-100"
  }`;

export function Sidebar({ onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    dashboard: false,
    userManagement: false,
    fleet: false,
    inspection: false,
    bidding: false,
    hrms: false,
    crm: false,
    mmm: false,
    adgr: false,
    ecom: false,
    vms: false,
    ims: false,
  });

  const toggleMenu = (menu: string) => {
    if (!isCollapsed) {
      setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    }
  };

  const mainButtonClass = (isOpen: boolean, isActive: boolean = false) =>
    `w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 ${
      (isOpen || isActive) && !isCollapsed 
        ? 'bg-slate-50 text-slate-900 shadow-sm' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    } ${isCollapsed ? 'justify-center' : ''}`;

  return (
    <aside className={`h-full bg-white border-r border-slate-100 flex flex-col shadow-xl shadow-slate-200/20 transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}`}>
      <div className={`p-6 pb-4 ${isCollapsed ? 'px-4' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 w-full">
            <div className={`flex items-center gap-3 transition-all duration-300 ${isCollapsed ? 'w-full justify-center' : ''}`}>
              <img
                src="/images/carifypdi_logo1.jpeg.png"
                alt="Carify Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            {!isCollapsed && (
              <button 
                onClick={onToggleCollapse} 
                className="hidden lg:flex p-2 rounded-xl bg-slate-50 text-slate-900 hover:text-black hover:bg-red-100 transition-all ml-auto"
              >
                <PanelLeft size={18} />
              </button>
            )}
          </div>
          <button onClick={onClose} aria-label="Close sidebar" className="lg:hidden p-2 text-slate-900 hover:bg-red-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {isCollapsed && (
          <div className="flex justify-center mt-2">
            <button 
              onClick={onToggleCollapse} 
              className="hidden lg:flex p-2 rounded-xl bg-slate-50 text-slate-900 hover:text-black hover:bg-red-50 transition-all"
            >
              <PanelLeft size={18} />
            </button>
          </div>
        )}

        
      </div>

      <div 
        className={`flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1 transition-all duration-300`}
      >
        <nav className="space-y-1">
          {/* Dashboard Dropdown */}
          <div className="space-y-0.5">
            <button 
              onClick={() => toggleMenu('dashboard')}
              className={mainButtonClass(openMenus.dashboard)}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard size={18} className={(openMenus.dashboard && !isCollapsed) ? 'text-black' : 'text-slate-900'} />
                {!isCollapsed && <span className="text-[14px] text-black font-semibold">Dashboard</span>}
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.dashboard ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.dashboard && !isCollapsed ? 'max-h-[500px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
               
              <NavLink to="/dashboard/inspection" onClick={onClose} className={subLinkClass}>
                Vehicle Inspection
              </NavLink>
              <NavLink to="/dashboard/hrm" onClick={onClose} className={subLinkClass}>
                HRMS
              </NavLink>
              <NavLink to="/dashboard/adgr" onClick={onClose} className={subLinkClass}>
                ADGR
              </NavLink>
              <NavLink to="/dashboard/crm" onClick={onClose} className={subLinkClass}>
                CRM
              </NavLink>
              <NavLink to="/dashboard/ecom" onClick={onClose} className={subLinkClass}>
                E-Commerce
              </NavLink>
              <NavLink to="/dashboard/ims" onClick={onClose} className={subLinkClass}>
                IMS
              </NavLink>
              <NavLink to="/dashboard/mmm" onClick={onClose} className={subLinkClass}>
                MMM
              </NavLink>
              <NavLink to="/dashboard/vms" onClick={onClose} className={subLinkClass}>
                VMS
              </NavLink>
              <NavLink to="/dashboard/fleet" onClick={onClose} className={subLinkClass}>
                Fleet
              </NavLink>
            </div>
          </div>

          {/* User Management Dropdown */}
          <div className="space-y-0.5">
            <button 
              onClick={() => toggleMenu('userManagement')}
              className={mainButtonClass(openMenus.userManagement)}
            >
              <div className="flex items-center gap-3">
                <Users size={18} className={openMenus.userManagement && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                {!isCollapsed && <span className="text-[14px] font-semibold text-black">User Management</span>}
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.userManagement ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.userManagement && !isCollapsed ? 'max-h-40 opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
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

          
             
          <div className="space-y-0.5">
            <button 
              onClick={() => toggleMenu('fleet')}
              className={mainButtonClass(openMenus.fleet)}
            >
              <div className="flex items-center gap-3">
                <Truck size={18} className={openMenus.fleet && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                {!isCollapsed && <span className="text-[14px] font-semibold text-black">Fleet</span>}
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.fleet ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.fleet && !isCollapsed ? 'max-h-[600px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
              <NavLink to="/fleet/driver" onClick={onClose} className={subLinkClass}>
                Driver
              </NavLink>
              <NavLink to="/fleet/customer" onClick={onClose} className={subLinkClass}>
                Customer
              </NavLink>
              <NavLink to="/fleet/vehicle" onClick={onClose} className={subLinkClass}>
                Vehicle
              </NavLink>
              <NavLink to="/fleet/logbook" onClick={onClose} className={subLinkClass}>
                Log Book
              </NavLink>
              <NavLink to="/fleet/booking" onClick={onClose} className={subLinkClass}>
                Booking
              </NavLink>
              <NavLink to="/fleet/availability" onClick={onClose} className={subLinkClass}>
                Availability
              </NavLink>
              <NavLink to="/fleet/insurance" onClick={onClose} className={subLinkClass}>
                Insurance
              </NavLink>
              <NavLink to="/fleet/maintenance" onClick={onClose} className={subLinkClass}>
                Maintenance
              </NavLink>
              <NavLink to="/fleet/fuelhistory" onClick={onClose} className={subLinkClass}>
                Fuel History
              </NavLink>
              <NavLink to="/fleet/reports" onClick={onClose} className={subLinkClass}>
                Report
              </NavLink>
              <NavLink to="/fleet/setup" onClick={onClose} className={subLinkClass}>
                System Setup
              </NavLink>
            </div>
          </div>

          <div className="space-y-0.5">
            <button 
              onClick={() => toggleMenu('inspection')}
              className={mainButtonClass(openMenus.inspection)}
            >
              <div className="flex items-center gap-3">
                <ClipboardCheck size={18} className={openMenus.inspection && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                {!isCollapsed && <span className="text-[14px] font-semibold text-black">Vehicle Inspection</span>}
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.inspection ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.inspection && !isCollapsed ? 'max-h-[800px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
              <NavLink to="inspection/vehicleinspection" onClick={onClose} className={subLinkClass}>
                Vehicle
              </NavLink>
               <NavLink to="/inspection/list" onClick={onClose} className={subLinkClass}>
                Inspection List
              </NavLink>
               <NavLink to="/inspection/request" onClick={onClose} className={subLinkClass}>
                 Inspection Request
              </NavLink>
               <NavLink to="/inspection/reminder" onClick={onClose} className={subLinkClass}>
                Inspection Reminder
              </NavLink>
               <NavLink to="/inspection/schedule" onClick={onClose} className={subLinkClass}>
                 Inspection Schedule
              </NavLink>
               <NavLink to="/inspection/history" onClick={onClose} className={subLinkClass}>
                Inspection History
              </NavLink>
               <NavLink to="/inspection/compliance" onClick={onClose} className={subLinkClass}>
                 Compliance Regulations
              </NavLink>                  
            </div>
          </div>

          {/* Car Bidding Dropdown */}
          <div className="space-y-0.5">
            <button 
              onClick={() => toggleMenu('bidding')}
              className={mainButtonClass(openMenus.bidding)}
            >
              <div className="flex items-center gap-3">
                <Gavel size={18} className={openMenus.bidding && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                {!isCollapsed && <span className="text-[14px] font-semibold text-black">Car Bidding</span>}
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.bidding ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.bidding && !isCollapsed ? 'max-h-[400px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
              <NavLink to="/bidding" onClick={onClose} className={subLinkClass}>
                Auction Home
              </NavLink>
              <NavLink to="/bidding/dashboard" onClick={onClose} className={subLinkClass}>
                Bidding Dashboard
              </NavLink>
              <NavLink to="/bidding/auctions" onClick={onClose} className={subLinkClass}>
                Live Auctions
              </NavLink>
            </div>
          </div>

          <div className="space-y-0.5">
            <button 
              onClick={() => toggleMenu('hrms')}
              className={mainButtonClass(openMenus.hrms)}
            >
              <div className="flex items-center gap-3">
                <ClipboardCheck size={18} className={openMenus.hrms && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                {!isCollapsed && <span className="text-[14px] font-semibold text-black">HRMS</span>}
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.hrms ? 'rotate-180' : ''}`} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.hrms && !isCollapsed ? 'max-h-[800px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
              <NavLink to="/hrms/hrmanagement" onClick={onClose} className={subLinkClass}>
                HR Management
              </NavLink>  
               <NavLink to="/hrms/recruitment" onClick={onClose} className={subLinkClass}>
                 Recruitment
              </NavLink>  
               <NavLink to="/hrms/contract" onClick={onClose} className={subLinkClass}>
                   Contract
              </NavLink> 
               <NavLink to="/hrms/document" onClick={onClose} className={subLinkClass}>
                  Document
              </NavLink> 
               <NavLink to="/hrms/meetings" onClick={onClose} className={subLinkClass}>
                  Meetings
              </NavLink> 
               <NavLink to="/hrms/medialibrary" onClick={onClose} className={subLinkClass}>
                     Media Library
                </NavLink> 
                 <NavLink to="/hrms/assetmanagement" onClick={onClose} className={subLinkClass}>
                    Asset Management
                </NavLink> 
                 <NavLink to="/hrms/leavemanagement" onClick={onClose} className={subLinkClass}>
                   Leave Management
                </NavLink> 
                 <NavLink to="/hrms/attendancemanagement" onClick={onClose} className={subLinkClass}>
                    Attendance Management
                </NavLink>
                <NavLink to="/hrms/timetracking" onClick={onClose} className={subLinkClass}>
                     Time Tracking
                </NavLink>
                <NavLink to="/hrms/payrollmanagement" onClick={onClose} className={subLinkClass}>
                     Payroll Management
                </NavLink>
                <NavLink to="/hrms/currencies" onClick={onClose} className={subLinkClass}>
                     Currencies
                </NavLink>
                <NavLink to="/hrms/Landingpage" onClick={onClose} className={subLinkClass}>
                     Landing Page
                </NavLink>  
              </div>
            </div>

            {/* CRM Dropdown */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleMenu('crm')}
                className={mainButtonClass(openMenus.crm)}
              >
                <div className="flex items-center gap-3">
                  <Users size={18} className={openMenus.crm && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                  {!isCollapsed && <span className="text-[14px] font-semibold text-black">CRM</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.crm ? 'rotate-180' : ''}`} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.crm && !isCollapsed ? 'max-h-[400px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
                <NavLink to="/crm/leads" onClick={onClose} className={subLinkClass}>
                  Lead Management
                </NavLink>
                <NavLink to="/crm/customers" onClick={onClose} className={subLinkClass}>
                  Customer Management
                </NavLink>
                <NavLink to="/crm/deals" onClick={onClose} className={subLinkClass}>
                  Deals / Opportunities
                </NavLink>
                <NavLink to="/crm/followups" onClick={onClose} className={subLinkClass}>
                  Follow-ups
                </NavLink>
                <NavLink to="/crm/activities" onClick={onClose} className={subLinkClass}>
                  Activities & Notes
                </NavLink>
              </div>
            </div>

            {/* MMM Dropdown */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleMenu('mmm')}
                className={mainButtonClass(openMenus.mmm)}
              >
                <div className="flex items-center gap-3">
                  <PieChart size={18} className={openMenus.mmm && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                  {!isCollapsed && <span className="text-[14px] font-semibold text-black">MMM</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.mmm ? 'rotate-180' : ''}`} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.mmm && !isCollapsed ? 'max-h-[400px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
                <NavLink to="/mmm/campaigns" onClick={onClose} className={subLinkClass}>
                  Campaign Management
                </NavLink>
                <NavLink to="/mmm/assets" onClick={onClose} className={subLinkClass}>
                  Multimedia Assets
                </NavLink>
                <NavLink to="/mmm/analytics" onClick={onClose} className={subLinkClass}>
                  Performance Analytics
                </NavLink>
                <NavLink to="/mmm/reports" onClick={onClose} className={subLinkClass}>
                  Marketing Reports
                </NavLink>
              </div>
            </div>

            {/* ADGR Dropdown */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleMenu('adgr')}
                className={mainButtonClass(openMenus.adgr)}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} className={openMenus.adgr && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                  {!isCollapsed && <span className="text-[14px] font-semibold text-black">ADGR</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.adgr ? 'rotate-180' : ''}`} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.adgr && !isCollapsed ? 'max-h-[400px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
                <NavLink to="/adgr/dashboard" onClick={onClose} className={subLinkClass}>
                  ADGR Dashboard
                </NavLink>
                <NavLink to="/adgr/generate" onClick={onClose} className={subLinkClass}>
                  Generate Reports
                </NavLink>
                <NavLink to="/adgr/archives" onClick={onClose} className={subLinkClass}>
                  Data Archives
                </NavLink>
                <NavLink to="/adgr/analytics" onClick={onClose} className={subLinkClass}>
                  Analytics & Insights
                </NavLink>
              </div>
            </div>

            {/* ECOM Dropdown */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleMenu('ecom')}
                className={mainButtonClass(openMenus.ecom)}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={18} className={openMenus.ecom && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                  {!isCollapsed && <span className="text-[14px] font-semibold text-black">E-Commerce</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.ecom ? 'rotate-180' : ''}`} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.ecom && !isCollapsed ? 'max-h-[500px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
                <NavLink to="/ecom/products" onClick={onClose} className={subLinkClass}>
                  Product Management
                </NavLink>
                <NavLink to="/ecom/categories" onClick={onClose} className={subLinkClass}>
                  Category Management
                </NavLink>
                <NavLink to="/ecom/orders" onClick={onClose} className={subLinkClass}>
                  Order Management
                </NavLink>
                <NavLink to="/ecom/payments" onClick={onClose} className={subLinkClass}>
                  Payment Management
                </NavLink>
                <NavLink to="/ecom/invoices" onClick={onClose} className={subLinkClass}>
                  Invoice Management
                </NavLink>
                <NavLink to="/ecom/returns" onClick={onClose} className={subLinkClass}>
                  Returns & Refunds
                </NavLink>
              </div>
            </div>

            {/* VMS Dropdown */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleMenu('vms')}
                className={mainButtonClass(openMenus.vms)}
              >
                <div className="flex items-center gap-3">
                  <Monitor size={18} className={openMenus.vms && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                  {!isCollapsed && <span className="text-[14px] font-semibold text-black">VMS</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.vms ? 'rotate-180' : ''}`} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.vms && !isCollapsed ? 'max-h-[400px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
                <NavLink to="/vms/directory" onClick={onClose} className={subLinkClass}>
                  Vendor Directory
                </NavLink>
                <NavLink to="/vms/contracts" onClick={onClose} className={subLinkClass}>
                  Vendor Contracts
                </NavLink>
                <NavLink to="/vms/performance" onClick={onClose} className={subLinkClass}>
                  Vendor Performance
                </NavLink>
                <NavLink to="/vms/payments" onClick={onClose} className={subLinkClass}>
                  Vendor Payments
                </NavLink>
                <NavLink to="/vms/reports" onClick={onClose} className={subLinkClass}>
                  Vendor Reports
                </NavLink>
              </div>
            </div>

            {/* IMS Dropdown */}
            <div className="space-y-0.5">
              <button 
                onClick={() => toggleMenu('ims')}
                className={mainButtonClass(openMenus.ims)}
              >
                <div className="flex items-center gap-3">
                  <Database size={18} className={openMenus.ims && !isCollapsed ? 'text-black' : 'text-slate-900'} />
                  {!isCollapsed && <span className="text-[14px] font-semibold text-black">IMS</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={`text-slate-900 transition-transform duration-300 ${openMenus.ims ? 'rotate-180' : ''}`} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.ims && !isCollapsed ? 'max-h-[400px] opacity-100 mt-1 pb-2' : 'max-h-0 opacity-0'}`}>
                <NavLink to="/ims/dashboard" onClick={onClose} className={subLinkClass}>
                  Inventory Dashboard
                </NavLink>
                <NavLink to="/ims/stock" onClick={onClose} className={subLinkClass}>
                  Stock List
                </NavLink>
                <NavLink to="/ims/movements" onClick={onClose} className={subLinkClass}>
                  Stock In / Out
                </NavLink>
                <NavLink to="/ims/vendors" onClick={onClose} className={subLinkClass}>
                  Vendor Mapping
                </NavLink>
                <NavLink to="/ims/orders" onClick={onClose} className={subLinkClass}>
                  Purchase Orders
                </NavLink>
              </div>
            </div>
        </nav>
      </div>

      <div className={`p-4 border-t border-slate-50 bg-slate-50/30 ${isCollapsed ? 'p-2' : ''}`}>
        {!isCollapsed && (
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-black uppercase tracking-widest">Enterprise Pro</p>
              <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1">
              <div className="bg-red-500 h-full w-4/5 rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-900 font-medium text-center mt-2">80% of resources used</p>
          </div>
        )}
      </div>
    </aside>
  );
}
