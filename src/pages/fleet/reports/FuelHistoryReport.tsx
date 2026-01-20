import { useState } from "react";
import { Search, Plus, Download } from "lucide-react";

export default function FuelHistoryReport() {
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const data = [
    { driverName: "Amanda Carter", vehicleName: "BMW Z4", fuellingDate: "10-01-2025", fuelType: "Gasoline", gallons: "6", costPerLiter: "$510.0", totalCost: "$5,500.0", reading: "150 KM" },
    { driverName: "Kevin Brown", vehicleName: "Toyota Camry", fuellingDate: "10-05-2024", fuelType: "Electricity", gallons: "247", costPerLiter: "$9,700.0", totalCost: "$4,900.0", reading: "10 Km" },
    { driverName: "Kevin Brown", vehicleName: "Kia Sedona", fuellingDate: "10-12-2024", fuelType: "Compressed Natural Gas (CNG)", gallons: "29", costPerLiter: "$240.0", totalCost: "$3,600.0", reading: "15 km" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Manage Fuel History Report</h1>
          <p className="text-gray-600 text-sm mt-1">Dashboard / Reports / Fuel History Report</p>
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
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Driver Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Vehicle Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Fuelling Date & Time</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Fuel Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Gallons/Liters of Fuel</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Cost per Liter/Liter</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Total Cost</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Reading</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-slate-50">
                  <td className="px-4 py-3 text-gray-800">{row.driverName}</td>
                  <td className="px-4 py-3 text-gray-800">{row.vehicleName}</td>
                  <td className="px-4 py-3 text-gray-800">{row.fuellingDate}</td>
                  <td className="px-4 py-3 text-gray-800">{row.fuelType}</td>
                  <td className="px-4 py-3 text-gray-800">{row.gallons}</td>
                  <td className="px-4 py-3 text-gray-800">{row.costPerLiter}</td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">{row.totalCost}</td>
                  <td className="px-4 py-3 text-gray-800">{row.reading}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td colSpan={5} className="px-4 py-3 text-right">Total</td>
                <td className="px-4 py-3">$10,645.0</td>
                <td className="px-4 py-3">$24,200.0</td>
                <td className="px-4 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
