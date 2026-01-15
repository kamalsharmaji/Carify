import { Truck, MapPin, Gauge, AlertCircle, Plus } from "lucide-react";

export default function Fleet() {
  const vehicles = [
    { id: "V001", model: "Toyota Hilux", plate: "ABC-1234", status: "Active", fuel: "75%", health: "Good" },
    { id: "V002", model: "Ford Ranger", plate: "XYZ-5678", status: "Maintenance", fuel: "20%", health: "Critical" },
    { id: "V003", model: "Isuzu D-Max", plate: "LMN-9012", status: "Active", fuel: "90%", health: "Excellent" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Fleet Management</h1>
        <button className="bg-[#00b37e] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm shadow-lg shadow-green-100">
          <Plus size={18} /> Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-gray-50 p-3 rounded-xl text-[#00b37e]">
                <Truck size={24} />
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold ${v.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                {v.status}
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-800">{v.model}</h3>
            <p className="text-sm text-gray-400 mb-4">{v.plate}</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fuel Level</span>
                <span className="font-bold text-gray-700">{v.fuel}</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00b37e] h-full" style={{ width: v.fuel }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
