import { useState } from "react";
import { Search, Plus, Download } from "lucide-react";

export default function MaintenanceReport() {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const data = [
    { serviceType: "General", maintenanceType: "Routine Maintenance", serviceName: "Tire Rotation", date: "30-09-2024", priority: "High", cost: "$1,230.0", chargeBy: "$203.0", totalCost: "$1,200.0" },
    { serviceType: "Maintenance", maintenanceType: "Preventive Maintenance", serviceName: "Brake Inspection/Service", date: "15-09-2024", priority: "Medium", cost: "$5,000.0", chargeBy: "$230.0", totalCost: "$4,500.0" },
    { serviceType: "Maintenance", maintenanceType: "Corrective Maintenance", serviceName: "Wheel Alignment", date: "25-08-2024", priority: "Low", cost: "$600.0", chargeBy: "$300.0", totalCost: "$550.0" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Manage Maintenance Report</h1>
          <p className="text-gray-600 text-sm mt-1">Dashboard / Reports / Maintenance Report</p>
        </div>
        <button className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
          <Plus size={18} /> Add Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle</label>
            <select 
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Vehicle</option>
              <option value="vehicle1">Vehicle 1</option>
            </select>
          </div>
          <div className="flex gap-2 items-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Search size={18} /> Search
            </button>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Service Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Maintenance Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Service Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Maintenance Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Priority</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Cost</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Charge Bear By</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-3 text-gray-800">{row.serviceType}</td>
                  <td className="px-4 py-3 text-gray-800">{row.maintenanceType}</td>
                  <td className="px-4 py-3 text-blue-600">{row.serviceName}</td>
                  <td className="px-4 py-3 text-gray-800">{row.date}</td>
                  <td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.priority === 'High' ? 'bg-red-100 text-red-800' : row.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{row.priority}</span></td>
                  <td className="px-4 py-3 text-gray-800">{row.cost}</td>
                  <td className="px-4 py-3 text-gray-800">{row.chargeBy}</td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">{row.totalCost}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td colSpan={7} className="px-4 py-3 text-right">Total</td>
                <td className="px-4 py-3">$6,250.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
