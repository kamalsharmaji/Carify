import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";

import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

import VehicleInspectionDashboard from "./pages/dashboard/VehicleInspectionDashboard";
import HRMDashboard from "./pages/dashboard/HRMDashboard";
import ADGRDashboard from "./pages/dashboard/ADGRDashboard";
import CRMDashboard from "./pages/dashboard/CRMDashboard";
import EcomDashboard from "./pages/dashboard/EcomDashboard";
import IMSDashboard from "./pages/dashboard/IMSDashboard";
import MMMDashboard from "./pages/dashboard/MMMDashboard";
import VMSDashboard from "./pages/dashboard/VMSDashboard";
 

import UserList from "./pages/usermanagement/UserList";
import RoleList from "./pages/usermanagement/RoleList";

import Fleet from "./pages/fleet";
import Vehicle from "./pages/inspection/Vehicle";
import VehicleInspection from "./pages/Vehicleinspection";
import InspectionRequest from "./pages/inspection/InspectionRequest";
import InspectionList from "./pages/inspection/InspectionList";
import InspectionReminder from "./pages/inspection/InspectionReminder";
import InspectionSchedule from "./pages/inspection/InspectionSchedule";
import InspectionHistory from "./pages/inspection/InspectionHistory";
import ComplianceRegulations from "./pages/inspection/ComplianceRegulations";
import ADGR from "./pages/Adgr";
import CRM from "./pages/Crm";
import ECOM from "./pages/Ecom";
import HRMS from "./pages/Hrms";
import IMS from "./pages/Ims";
import MMM from "./pages/Mmm";
import VMS from "./pages/Vms";

import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>

        {/* ✅ ROOT FIX */}
        <Route path="/" element={<Navigate to="/dashboard/inspection" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected ERP */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboards */}
          
          <Route path="dashboard/inspection" element={<VehicleInspectionDashboard />} />
          <Route path="dashboard/hrm" element={<HRMDashboard />} />
          <Route path="dashboard/adgr" element={<ADGRDashboard />} />
          <Route path="dashboard/crm" element={<CRMDashboard />} />
          <Route path="dashboard/ecom" element={<EcomDashboard />} />
          <Route path="dashboard/ims" element={<IMSDashboard />} />
          <Route path="dashboard/mmm" element={<MMMDashboard />} />
          <Route path="dashboard/vms" element={<VMSDashboard />} />
          

          {/* User Management */}
          <Route path="users" element={<UserList />} />
          <Route path="roles" element={<RoleList />} />

          {/* Modules */}
          <Route path="fleet" element={<Fleet />} />
          {/* <Route path="fleet/driver" element={<Vehicle />} />
          <Route path="fleet/customer" element={<Vehicle />} /> */}
          <Route path="inspection" element={<VehicleInspection />} />
          <Route path="inspection/vehicle" element={<Vehicle />} />
          <Route path="inspection/request" element={<InspectionRequest />} />
          <Route path="inspection/list" element={<InspectionList />} />
          <Route path="inspection/reminder" element={<InspectionReminder />} />
          <Route path="inspection/schedule" element={<InspectionSchedule />} />
          <Route path="inspection/history" element={<InspectionHistory />} />
          <Route path="inspection/compliance" element={<ComplianceRegulations />} />
          <Route path="adgr" element={<ADGR />} />
          <Route path="crm" element={<CRM />} />
          <Route path="ecom" element={<ECOM />} />
          <Route path="hrms" element={<HRMS />} />
          <Route path="ims" element={<IMS />} />
          <Route path="mmm" element={<MMM />} />
          <Route path="vms" element={<VMS />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard/inspection" replace />} />

      </Routes>
    </BrowserRouter>
  </SettingsProvider>
  );
}
