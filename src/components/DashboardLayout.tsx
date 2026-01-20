import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="flex bg-[#e2e8f0] h-screen relative overflow-hidden gap-[2px]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-all"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Wrapper */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isSidebarCollapsed ? "w-[80px]" : "w-[280px]"}
      `}>
        <Sidebar 
          onClose={() => setIsSidebarOpen(false)} 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={toggleCollapse} 
        />
      </div>

      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 gap-[2px]"
      >
        <Navbar onMenuClick={toggleSidebar} />
        <main 
          className="flex-1 overflow-y-auto bg-[#f8f9fa] transition-all duration-300"
          style={{ padding: 'var(--main-padding)' }}
        >
          <div className="w-full transition-all duration-300">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
