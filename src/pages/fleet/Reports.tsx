import { useState } from "react";
import { Search, Download, Plus } from "lucide-react";

export default function Reports() {
  const [activeTab, setActiveTab] = useState<"maintenance" | "fuel">("maintenance");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const maintenanceData = [
    { serviceType: "General", maintenanceType: "Routine Maintenance", serviceName: "Tire Rotation", date: "30-09-2024", priority: "High", cost: "$1,230.0", chargeBy: "$203.0", totalCost: "$1,200.0" },
    { serviceType: "Maintenance", maintenanceType: "Preventive Maintenance", serviceName: "Brake Inspection", date: "15-09-2024", priority: "Medium", cost: "$5,000.0", chargeBy: "$230.0", totalCost: "$4,400.0" },
    { serviceType: "Maintenance", maintenanceType: "Corrective Maintenance", serviceName: "Wheel Alignment", date: "25-08-2024", priority: "Low", cost: "$400.0", chargeBy: "$300.0", totalCost: "$550.0" },
  ];

  const fuelData = [
    { driverName: "Amanda Carter", vehicleName: "BMW Z4", fuellingDate: "10-01-2025", fuelType: "Gasoline", gallons: "6", costPerLiter: "$510.0", totalCost: "$5,400.0", reading: "150 KM" },
    { driverName: "Kevin Brown", vehicleName: "Toyota Camry", fuellingDate: "10-05-2024", fuelType: "Electricity", gallons: "247", costPerLiter: "$9,400.0", totalCost: "$4,900.0", reading: "10 Km" },
    { driverName: "Kevin Brown", vehicleName: "Kia Sedona", fuellingDate: "10-12-2024", fuelType: "CNG", gallons: "29", costPerLiter: "$240.0", totalCost: "$3,400.0", reading: "15 km" },
  ];

  const tabs = [
    { key: "maintenance" as const, label: "Maintenance Report" },
    { key: "fuel" as const, label: "Fuel History Report" },
  ];

  const getCurrentData = () => activeTab === "maintenance" ? maintenanceData : fuelData;
  const filteredData = getCurrentData().filter(item => {
    const searchStr = searchTerm.toLowerCase();
    if (activeTab === "maintenance") {
      const mItem = item as typeof maintenanceData[0];
      return mItem.serviceName.toLowerCase().includes(searchStr) ||
             mItem.serviceType.toLowerCase().includes(searchStr);
    } else {
      const fItem = item as typeof fuelData[0];
      return fItem.driverName.toLowerCase().includes(searchStr) ||
             fItem.vehicleName.toLowerCase().includes(searchStr);
    }
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Fleet Reports</h1>
          <p className="text-gray-400 text-sm mt-1">Dashboard / Fleet / Reports</p>
        </div>
        <button className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-red-400 to-red-400 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium">
          <Plus size={18} /> New Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-200 bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-red-400 border-b-2 border-red-400 bg-white"
                  : "text-gray-400 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Vehicle</label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
              >
                <option value="">All Vehicles</option>
                <option value="vehicle1">Vehicle 1</option>
                <option value="vehicle2">Vehicle 2</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Search</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder={activeTab === "maintenance" ? "Search by service..." : "Search by driver..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-400 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium text-sm">
                <Search size={18} /> Filter
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-400 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium text-sm">
                <Download size={18} /> Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            {activeTab === "maintenance" ? (
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Service Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Maintenance Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Service Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Priority</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-400">Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => {
                    const mRow = row as typeof maintenanceData[0];
                    return (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-800">{mRow.serviceType}</td>
                        <td className="px-4 py-3 text-gray-800">{mRow.maintenanceType}</td>
                        <td className="px-4 py-3 text-blue-400 font-medium">{mRow.serviceName}</td>
                        <td className="px-4 py-3 text-gray-800">{mRow.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            mRow.priority === "High" ? "bg-red-100 text-red-800" :
                            mRow.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {mRow.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900">{mRow.totalCost}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Driver Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Vehicle</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Fuelling Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Fuel Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-400">Gallons</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-400">Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => {
                    const fRow = row as typeof fuelData[0];
                    return (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-800">{fRow.driverName}</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">{fRow.vehicleName}</td>
                        <td className="px-4 py-3 text-gray-800">{fRow.fuellingDate}</td>
                        <td className="px-4 py-3 text-gray-800">{fRow.fuelType}</td>
                        <td className="px-4 py-3 text-gray-800">{fRow.gallons}</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900">{fRow.totalCost}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
