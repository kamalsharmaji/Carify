import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
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
import Hrmanagement from "./pages/hrms/Hrmanagement";
import Recruitment from "./pages/hrms/Recruitment";
import Contract from "./pages/hrms/Contract";
import Document from "./pages/hrms/Document";
import Meetings from "./pages/hrms/Meetings";
import MediaLibrary from "./pages/hrms/MediaLibrary";
import AssetManagement from "./pages/hrms/AssetManagement";
import LeaveManagement from "./pages/hrms/LeaveManagement";
import AttendanceManagement from "./pages/hrms/AttendanceManagement";
import TimeTracking from "./pages/hrms/TimeTracking";
import PayrollManagement from "./pages/hrms/PayrollManagement";
import Currencies from "./pages/hrms/Currencies";
import LandingPage from "./pages/hrms/LandingPage";
import IMS from "./pages/Ims";
import MMM from "./pages/Mmm";
import VMS from "./pages/Vms";

import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Driver from "./pages/fleet/Driver";
import Customer from "./pages/fleet/Customer";
import Vehicle from "./pages/fleet/Vehicle";
import Availability from "./pages/fleet/Availability";
import LogBook from "./pages/fleet/LogBook";
import Booking from "./pages/fleet/Booking";
import Insurance from "./pages/fleet/Insurance";
import Maintenance from "./pages/fleet/Maintenance";
import FuelHistory from "./pages/fleet/FuelHistory";
import SystemSetup from "./pages/fleet/SystemSetup";
import Reports from "./pages/fleet/Reports";
import Vehicleinspection from "./pages/inspection/Vehicleinspection";
 

export default function App() {
  return (
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>

        {/* ✅ ROOT FIX */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
         
          <Route path="fleet/driver" element={<Driver />} />
          <Route path="fleet/customer" element={<Customer />} />
          <Route path="fleet/vehicle" element={<Vehicle />} />
          <Route path="fleet/logbook" element={<LogBook />} />
          <Route path="fleet/booking" element={<Booking />} />
          <Route path="fleet/availability" element={<Availability />} />
          <Route path="fleet/insurance" element={<Insurance />} />
          <Route path="fleet/maintenance" element={<Maintenance />} />
          <Route path="fleet/fuelhistory" element={<FuelHistory />} />
          <Route path="fleet/reports" element={<Reports />} />
          <Route path="fleet/setup" element={<SystemSetup />} />
          
          <Route path="inspection" element={<Vehicleinspection />} />
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
          <Route path="hrms/hrmanagement" element={<Hrmanagement />} />
          <Route path="hrms/recruitment" element={<Recruitment />} />
          <Route path="hrms/contract" element={<Contract />} />
          <Route path="hrms/document" element={<Document />} />
          <Route path="hrms/meetings" element={<Meetings />} />
          <Route path="hrms/medialibrary" element={<MediaLibrary />} />
          <Route path="hrms/assetmanagement" element={<AssetManagement />} />
          <Route path="hrms/leavemanagement" element={<LeaveManagement />} />
          <Route path="hrms/attendancemanagement" element={<AttendanceManagement />} />
          <Route path="hrms/timetracking" element={<TimeTracking />} />
          <Route path="hrms/payrollmanagement" element={<PayrollManagement />} />
          <Route path="hrms/currencies" element={<Currencies />} />
          <Route path="hrms/Landingpage" element={<LandingPage />} />
          
          <Route path="ims" element={<IMS />} />
          <Route path="mmm" element={<MMM />} />
          <Route path="vms" element={<VMS />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard/inspection" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
