import { useEffect, useState } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Search, 
  Settings, 
  CreditCard, 
  Car, 
  Fuel, 
  Clock, 
  Wrench,
  ChevronRight,
  Shield,
  Activity
} from "lucide-react";

/* ================= TYPES ================= */
interface SetupItem {
  id: number;
  name: string;
}

/* ================= CONFIGURATION ================= */
const STORAGE_KEYS = {
  license: "fleet_license_types_v2",
  vehicle: "fleet_vehicle_types_v2",
  fuel: "fleet_fuel_types_v2",
  recurring: "fleet_recurring_v2",
  maintenance: "fleet_maintenance_types_v2",
};

const DEFAULT_DATA = {
  license: [
    { id: 1, name: "Commercial Driver's License" },
    { id: 2, name: "Motorcycle License" },
    { id: 3, name: "Specialized Asset Permit" },
  ],
  vehicle: [
    { id: 1, name: "Premium Sedan" },
    { id: 2, name: "Heavy Duty Logistics" },
    { id: 3, name: "Electric Transit" },
  ],
  fuel: [
    { id: 1, name: "Premium Gasoline" },
    { id: 2, name: "Ultra-Low Diesel" },
    { id: 3, name: "Bio-Electric Energy" },
  ],
  recurring: [
    { id: 1, name: "Bi-Annual Safety Audit" },
    { id: 2, name: "Precision Calibration" },
  ],
  maintenance: [
    { id: 1, name: "Predictive Analysis" },
    { id: 2, name: "Core System Restoration" },
  ],
};

/* ================= COMPONENT ================= */
export default function SystemSetup() {
  const [activeTab, setActiveTab] = useState<keyof typeof STORAGE_KEYS>("license");
  const [items, setItems] = useState<SetupItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS["license"]);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DATA["license"];
      }
    } catch { /* ignore */ }
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
    if (window.confirm("Delete this configuration?")) {
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
    { key: "license" as const, label: "License Types", icon: CreditCard, color: "blue" },
    { key: "vehicle" as const, label: "Vehicle Classes", icon: Car, color: "indigo" },
    { key: "fuel" as const, label: "Fuel Types", icon: Fuel, color: "emerald" },
    { key: "recurring" as const, label: "Frequencies", icon: Clock, color: "orange" },
    { key: "maintenance" as const, label: "Service Modes", icon: Wrench, color: "violet" },
  ];

  const currentTabInfo = tabs.find(t => t.key === activeTab);

  return (
    <div className="min-h-screen bg-slate-50  p-2 md:p-0 lg:p-0 lg:pt-0">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Settings className="w-8 h-8 text-slate-900" />
              System Configuration
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Manage fleet protocols and system parameters
            </p>
          </div>

          <button
            onClick={() => { setEditingId(null); setFormValue(""); setShowModal(true); }}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95 shadow-sm"
          >
            <Plus size={18} />
            <span>Add Protocol</span>
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="bg-white border border-slate-200 p-2 rounded-xl shadow-sm overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab.key
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.02]"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
              <input
                type="text"
                placeholder={`Search ${currentTabInfo?.label}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Activity size={16} className="text-slate-400" />
              <span>{filteredItems.length} Parameters Configured</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-slate-900 transition-colors duration-300 border border-slate-100">
                      <ChevronRight size={18} className="text-slate-400 group-hover:text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-slate-900 transition-colors">{item.name}</h3>
                  </div>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4 bg-white border border-dashed border-slate-300 rounded-xl">
                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                  <Shield size={32} className="text-slate-200" />
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">No configuration protocols found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Configuration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit" : "Add"} Protocol
                </h3>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">System setup & parameters</p>
              </div>
              <button
                onClick={() => { setShowModal(false); setEditingId(null); setFormValue(""); }}
                className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Protocol Name</label>
                <input
                  type="text"
                  placeholder={`Enter ${currentTabInfo?.label.toLowerCase()}...`}
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all"
                  onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowModal(false); setEditingId(null); setFormValue(""); }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-all active:scale-95"
                >
                  {editingId ? "Update" : "Establish"} Protocol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
