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
    <div className="flex bg-[#f8fafc] h-screen relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-all"
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

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Navbar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-1 md:p-3 custom-scrollbar scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
