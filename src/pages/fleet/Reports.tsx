import { useState } from "react";
import { 
  Search, 
  Download, 
  Plus, 
  BarChart3,
  FileText, 
  Fuel, 
  Wrench, 
  Calendar, 
  DollarSign, 
  Activity,
  ArrowRight,
  Filter
} from "lucide-react";

/* ================= TYPES ================= */
interface MaintenanceRow {
  serviceType: string;
  maintenanceType: string;
  serviceName: string;
  date: string;
  priority: string;
  cost: string;
  chargeBy: string;
  totalCost: string;
}

interface FuelRow {
  driverName: string;
  vehicleName: string;
  fuellingDate: string;
  fuelType: string;
  gallons: string;
  costPerLiter: string;
  totalCost: string;
  reading: string;
}

/* ================= COMPONENT ================= */
export default function Reports() {
  const [activeTab, setActiveTab] = useState<"maintenance" | "fuel">("maintenance");
  const [searchTerm, setSearchTerm] = useState("");

  const maintenanceData: MaintenanceRow[] = [
    { serviceType: "General", maintenanceType: "Routine Maintenance", serviceName: "Tire Rotation", date: "30-09-2024", priority: "High", cost: "$1,230.0", chargeBy: "$203.0", totalCost: "$1,200.0" },
    { serviceType: "Maintenance", maintenanceType: "Preventive Maintenance", serviceName: "Brake Inspection", date: "15-09-2024", priority: "Medium", cost: "$5,000.0", chargeBy: "$230.0", totalCost: "$4,400.0" },
    { serviceType: "Maintenance", maintenanceType: "Corrective Maintenance", serviceName: "Wheel Alignment", date: "25-08-2024", priority: "Low", cost: "$400.0", chargeBy: "$300.0", totalCost: "$550.0" },
  ];

  const fuelData: FuelRow[] = [
    { driverName: "Amanda Carter", vehicleName: "BMW Z4", fuellingDate: "10-01-2025", fuelType: "Gasoline", gallons: "6", costPerLiter: "$510.0", totalCost: "$5,400.0", reading: "150 KM" },
    { driverName: "Kevin Brown", vehicleName: "Toyota Camry", fuellingDate: "10-05-2024", fuelType: "Electricity", gallons: "247", costPerLiter: "$9,400.0", totalCost: "$4,900.0", reading: "10 Km" },
    { driverName: "Kevin Brown", vehicleName: "Kia Sedona", fuellingDate: "10-12-2024", fuelType: "CNG", gallons: "29", costPerLiter: "$240.0", totalCost: "$3,400.0", reading: "15 km" },
  ];

  const tabs = [
    { key: "maintenance" as const, label: "Maintenance Reports", icon: Wrench, color: "orange" },
    { key: "fuel" as const, label: "Fuel Consumption", icon: Fuel, color: "emerald" },
  ];

  const filteredMaintenance = maintenanceData.filter(item => 
    item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFuel = fuelData.filter(item => 
    item.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50  p-2 md:p-0 lg:p-0 lg:pt-0">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-slate-900" />
              Fleet Analytics
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Comprehensive operational and financial reports
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95">
            <Plus size={18} />
            <span>Generate New Report</span>
          </button>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Expenditure", value: "$12,450.00", icon: DollarSign, color: "emerald" },
            { label: "Active Assets", value: "48 Units", icon: Activity, color: "blue" },
            { label: "Reports Generated", value: "124", icon: FileText, color: "indigo" },
            { label: "Next Scheduled", value: "24 Jan 2025", icon: Calendar, color: "orange" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <stat.icon size={18} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-lg font-bold text-slate-900 leading-tight mt-0.5">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Switcher & Filters */}
        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex bg-slate-100 p-1 rounded-lg w-full lg:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all whitespace-nowrap flex-1 lg:flex-none ${
                    activeTab === tab.key
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search report data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all"
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all">
                  <Filter size={16} />
                  Filters
                </button>
                <button className="flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all active:scale-90 shadow-sm">
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Table Area */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
          <div className="overflow-x-auto">
            {activeTab === "maintenance" ? (
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["Protocol Type", "Category", "Service Name", "Date", "Priority", "Cost"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMaintenance.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-slate-900">{row.serviceType}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{row.maintenanceType}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-900 font-semibold group-hover:text-slate-900 transition-colors">
                          {row.serviceName}
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-slate-400" />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{row.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                          row.priority === "High" ? "bg-red-50 text-red-600 border-red-100" :
                          row.priority === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" :
                          "bg-emerald-50 text-emerald-600 border-emerald-100"
                        }`}>
                          {row.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-slate-900">{row.totalCost}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["Driver", "Vehicle", "Date", "Fuel Type", "Reading", "Total Cost"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFuel.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-xs border border-slate-200">
                            {row.driverName.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-900">{row.driverName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{row.vehicleName}</td>
                      <td className="px-6 py-4 font-medium text-slate-500">{row.fuellingDate}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase border border-slate-200">
                          {row.fuelType}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{row.gallons}L / {row.reading}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-emerald-600">{row.totalCost}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {((activeTab === "maintenance" && filteredMaintenance.length === 0) || 
            (activeTab === "fuel" && filteredFuel.length === 0)) && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                <FileText size={32} className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs text-center">
                No report data found <br /> 
                <span className="text-[10px] font-medium opacity-60 normal-case">Try adjusting your search criteria</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
