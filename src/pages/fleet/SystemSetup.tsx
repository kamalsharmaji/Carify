import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";

interface SetupItem {
  id: number;
  name: string;
}

const STORAGE_KEYS = {
  license: "fleet_license_types",
  vehicle: "fleet_vehicle_types",
  fuel: "fleet_fuel_types",
  recurring: "fleet_recurring",
  maintenance: "fleet_maintenance_types",
};

const DEFAULT_DATA = {
  license: [
    { id: 1, name: "Commercial Driver's License" },
    { id: 2, name: "Motorcycle License" },
    { id: 3, name: "Boat License" },
  ],
  vehicle: [
    { id: 1, name: "Passenger Car" },
    { id: 2, name: "SUV" },
    { id: 3, name: "Truck" },
  ],
  fuel: [
    { id: 1, name: "Gasoline" },
    { id: 2, name: "Diesel" },
    { id: 3, name: "Electric" },
  ],
  recurring: [
    { id: 1, name: "Air Filter Replacement" },
    { id: 2, name: "Oil Change" },
  ],
  maintenance: [
    { id: 1, name: "Routine Maintenance" },
    { id: 2, name: "Preventive Maintenance" },
  ],
};

export default function SystemSetup() {
  const [activeTab, setActiveTab] = useState<keyof typeof STORAGE_KEYS>("license");
  const [items, setItems] = useState<SetupItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS["license"]);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DATA["license"];
      }
    } catch {
      /* ignore */
    }
    return DEFAULT_DATA["license"];
  });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formValue, setFormValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = (tab: keyof typeof STORAGE_KEYS) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS[tab]);
      if (saved) {
        const parsed = JSON.parse(saved);
        setItems(Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DATA[tab]);
      } else {
        setItems(DEFAULT_DATA[tab]);
      }
    } catch {
      setItems(DEFAULT_DATA[tab]);
    }
  };

  const handleTabChange = (tab: keyof typeof STORAGE_KEYS) => {
    setActiveTab(tab);
    loadData(tab);
    setEditingId(null);
    setFormValue("");
    setSearchTerm("");
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS[activeTab], JSON.stringify(items));
  }, [items, activeTab]);

  const handleAdd = () => {
    if (formValue.trim()) {
      if (editingId) {
        setItems(items.map(item => item.id === editingId ? { ...item, name: formValue } : item));
        setEditingId(null);
      } else {
        setItems([...items, { id: Date.now(), name: formValue }]);
      }
      setFormValue("");
      setShowModal(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this item?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item: SetupItem) => {
    setEditingId(item.id);
    setFormValue(item.name);
    setShowModal(true);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { key: "license" as const, label: "License Type" },
    { key: "vehicle" as const, label: "Vehicle Type" },
    { key: "fuel" as const, label: "Fuel Type" },
    { key: "recurring" as const, label: "Recurring" },
    { key: "maintenance" as const, label: "Maintenance Type" },
  ];

  const currentLabel = tabs.find(t => t.key === activeTab)?.label || "";

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 md:p-6 animate-in fade-in duration-500">
      <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">System Setup</h1>
          <p className="text-gray-600 text-sm mt-1">Dashboard / Fleet / System Setup</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setFormValue(""); setShowModal(true); }}
          className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-red-400 to-red-400 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-200 bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-red-600 border-b-2 border-red-600 bg-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-6">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${currentLabel}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-semibold text-gray-900 text-sm flex-1">{item.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? `Edit ${currentLabel}` : `Add ${currentLabel}`}
              </h2>
              <button
                onClick={() => { setShowModal(false); setEditingId(null); setFormValue(""); }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <input
              type="text"
              placeholder={`Enter ${currentLabel.toLowerCase()}`}
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-6"
              onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            />

            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                {editingId ? "Update" : "Add"}
              </button>
              <button
                onClick={() => { setShowModal(false); setEditingId(null); setFormValue(""); }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
