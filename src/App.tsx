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
import FleetDashboard from "./pages/dashboard/FleetDashboard";
 

import UserList from "./pages/usermanagement/UserList";
import RoleList from "./pages/usermanagement/RoleList";
 import InspectionRequest from "./pages/inspection/InspectionRequest";
import InspectionList from "./pages/inspection/InspectionList";
import InspectionReminder from "./pages/inspection/InspectionReminder";
import InspectionSchedule from "./pages/inspection/InspectionSchedule";
import InspectionHistory from "./pages/inspection/InspectionHistory";
import ComplianceRegulations from "./pages/inspection/ComplianceRegulations";
import ADGR from "./pages/Adgr";
import ADGRDashboardPage from "./pages/adgr/Dashboard";
import ADGRGenerate from "./pages/adgr/Generate";
import ADGRArchives from "./pages/adgr/Archives";
import ADGRAnalyticsPage from "./pages/adgr/Analytics";

import CRM from "./pages/Crm";
import CRMLeads from "./pages/crm/Leads";
import CRMCustomers from "./pages/crm/Customers";
import CRMOpportunities from "./pages/crm/Opportunities";
import CRMActivities from "./pages/crm/Activities";

import ECOM from "./pages/Ecom";
import EcomProducts from "./pages/ecom/Products";
import EcomCategories from "./pages/ecom/Categories";
import EcomOrders from "./pages/ecom/Orders";
import EcomPayments from "./pages/ecom/Payments";
import EcomInvoices from "./pages/ecom/Invoices";
import EcomReturns from "./pages/ecom/Returns";

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
import IMSDashboardPage from "./pages/ims/Dashboard";
import IMSSpock from "./pages/ims/Stock";
import IMSMovements from "./pages/ims/Movements";
import IMSVendors from "./pages/ims/Vendors";
import IMSOrders from "./pages/ims/Orders";

import MMM from "./pages/Mmm";
import MMMCampaigns from "./pages/mmm/Campaigns";
import MMMLeads from "./pages/mmm/Leads";
import MMMContent from "./pages/mmm/Content";
import MMMAnalytics from "./pages/mmm/Analytics";
import MMMReports from "./pages/mmm/Reports";

import VMS from "./pages/Vms";
import VMSDirectory from "./pages/vms/Directory";
import VMSContracts from "./pages/vms/Contracts";
import VMSPerformance from "./pages/vms/Performance";
import VMSPayments from "./pages/vms/Payments";
import VMSReports from "./pages/vms/Reports";

import BiddingLayout from "./layouts/BiddingLayout";
import BiddingHome from "./pages/bidding/BiddingHome";
import BiddingDashboard from "./pages/bidding/BiddingDashboard";
import LiveAuctions from "./pages/bidding/LiveAuctions";
import MyBids from "./pages/bidding/MyBids";
import BiddingHistory from "./pages/bidding/BiddingHistory";
import Membership from "./pages/bidding/Membership";
import About from "./pages/bidding/About";
import Contact from "./pages/bidding/Contact";
import Blogs from "./pages/bidding/Blogs";
import Careers from "./pages/bidding/Careers";
import BiddingSignIn from "./pages/bidding/SignIn";
import BiddingRegister from "./pages/bidding/Register";

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
          <Route path="dashboard/fleet" element={<FleetDashboard />} />
          

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
          
          <Route path="inspection/vehicleinspection" element={<Vehicleinspection />} />
          <Route path="inspection/request" element={<InspectionRequest />} />
          <Route path="inspection/list" element={<InspectionList />} />
          <Route path="inspection/reminder" element={<InspectionReminder />} />
          <Route path="inspection/schedule" element={<InspectionSchedule />} />
          <Route path="inspection/history" element={<InspectionHistory />} />
          <Route path="inspection/compliance" element={<ComplianceRegulations />} />
          <Route path="adgr" element={<ADGR />} />
          <Route path="adgr/dashboard" element={<ADGRDashboardPage />} />
          <Route path="adgr/generate" element={<ADGRGenerate />} />
          <Route path="adgr/archives" element={<ADGRArchives />} />
          <Route path="adgr/analytics" element={<ADGRAnalyticsPage />} />

          <Route path="crm" element={<CRM />} />
          <Route path="crm/dashboard" element={<CRMDashboard />} />
          <Route path="crm/leads" element={<CRMLeads />} />
          <Route path="crm/customers" element={<CRMCustomers />} />
          <Route path="crm/opportunities" element={<CRMOpportunities />} />
          <Route path="crm/activities" element={<CRMActivities />} />

          <Route path="ecom" element={<ECOM />} />
          <Route path="ecom/products" element={<EcomProducts />} />
          <Route path="ecom/categories" element={<EcomCategories />} />
          <Route path="ecom/orders" element={<EcomOrders />} />
          <Route path="ecom/payments" element={<EcomPayments />} />
          <Route path="ecom/invoices" element={<EcomInvoices />} />
          <Route path="ecom/returns" element={<EcomReturns />} />

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
          <Route path="ims/dashboard" element={<IMSDashboardPage />} />
          <Route path="ims/stock" element={<IMSSpock />} />
          <Route path="ims/movements" element={<IMSMovements />} />
          <Route path="ims/vendors" element={<IMSVendors />} />
          <Route path="ims/orders" element={<IMSOrders />} />

          <Route path="mmm" element={<MMM />} />
          <Route path="mmm/campaigns" element={<MMMCampaigns />} />
          <Route path="mmm/leads" element={<MMMLeads />} />
          <Route path="mmm/content" element={<MMMContent />} />
          <Route path="mmm/analytics" element={<MMMAnalytics />} />
          <Route path="mmm/reports" element={<MMMReports />} />

          <Route path="vms" element={<VMS />} />
          <Route path="vms/directory" element={<VMSDirectory />} />
          <Route path="vms/contracts" element={<VMSContracts />} />
          <Route path="vms/performance" element={<VMSPerformance />} />
          <Route path="vms/payments" element={<VMSPayments />} />
          <Route path="vms/reports" element={<VMSReports />} />
        </Route>

        {/* 🏎️ Separate Bidding Portal (No Sidebar/Navbar) */}
        <Route path="/bidding" element={<BiddingLayout />}>
          <Route index element={<BiddingHome />} />
          <Route path="dashboard" element={<BiddingDashboard />} />
          <Route path="auctions" element={<LiveAuctions />} />
          <Route path="my-bids" element={<MyBids />} />
          <Route path="history" element={<BiddingHistory />} />
          <Route path="membership" element={<Membership />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="careers" element={<Careers />} />
          <Route path="login" element={<BiddingSignIn />} />
          <Route path="register" element={<BiddingRegister />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard/inspection" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
