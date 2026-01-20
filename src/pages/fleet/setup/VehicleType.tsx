import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function VehicleType() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const types = [
    "Passenger Car",
    "SUV (Sport Utility Vehicle)",
    "Truck",
    "Bus",
    "Boat",
    "Motorcycle",
    "Electric Vehicle (EV)",
  ];

  const handleSubmit = () => {
    if (formData.name.trim()) {
      setFormData({ name: "" });
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Manage Vehicle Type</h1>
          <p className="text-gray-600 text-sm mt-1">Dashboard / Vehicle Type</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Vehicle Type
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {types.map((type, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">{type}</h3>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-1 text-sm">
                  <Edit2 size={16} /> Edit
                </button>
                <button className="flex-1 sm:flex-none px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center gap-1 text-sm">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Add Vehicle Type</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type Name</label>
                <input 
                  type="text"
                  placeholder="Enter vehicle type name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm md:text-base"
                >
                  Save
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium text-sm md:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
