 import { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Truck,
  X
} from "lucide-react";
 
/* ================= TYPES ================= */
interface Vehicle {
  id: number;
  model: string;
  license: string;
  manufactureYear: string;
  vin: string;
  lastInspection: string;
  reminderDays: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "inspection_vehicles";

/* ================= DEFAULT DATA ================= */
const seedData: Vehicle[] = [
  {
    id: 1,
    model: "Volkswagen Jetta",
    license: "LMN456",
    manufactureYear: "2018",
    vin: "2147483647",
    lastInspection: "15-08-2024",
    reminderDays: "-",
  },
  {
    id: 2,
    model: "BMW X5",
    license: "PQR987",
    manufactureYear: "2024",
    vin: "2147483647",
    lastInspection: "05-09-2024",
    reminderDays: "60",
  },
  {
    id: 3,
    model: "Nissan Altima",
    license: "JKL321",
    manufactureYear: "2016",
    vin: "2147483647",
    lastInspection: "08-10-2024",
    reminderDays: "90",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function Vehicleinspection() {
   const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedData;
      }
    } catch {
      return seedData;
    }
    return seedData;
  });

  const [view, setView] = useState<"table" | "card">("table");
  const [showForm, setShowForm] = useState(false);
  const [viewVehicle, setViewVehicle] = useState<Vehicle | null>(null);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  }, [vehicles]);

  const remove = (id: number) => {
    if (window.confirm("Delete this vehicle?")) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const saveVehicle = (data: Vehicle) => {
    if (editVehicle) {
      setVehicles((prev) => prev.map((v) => (v.id === data.id ? data : v)));
    } else {
      setVehicles((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false);
    setEditVehicle(null);
  };

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen bg-slate-50/50 p-4 sm:p-6 animate-in fade-in duration-500"
    >
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Standardized Header Section */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 transition-transform">
                <Truck className="text-white w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Manage Vehicles
                </h1>
                <p className="text-slate-500 mt-1 font-medium text-sm flex items-center gap-2">
                  Vehicle Inspection › Fleet Inventory
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group flex-1 md:flex-none">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-full md:w-64 font-medium"
                />
              </div>

              <div className="flex border border-slate-200 rounded-lg bg-slate-50 p-1 shadow-sm">
                <button
                  onClick={() => setView("table")}
                  className={`p-1.5 rounded-md transition-all ${
                    view === "table"
                      ? "bg-white text-brand shadow-sm border border-slate-200"
                      : "text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <TableIcon size={18} />
                </button>
                <button
                  onClick={() => setView("card")}
                  className={`p-1.5 rounded-md transition-all ${
                    view === "card"
                      ? "bg-white text-brand shadow-sm border border-slate-200"
                      : "text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <LayoutGrid size={18} />
                </button>
              </div>

              <button
                onClick={() => {
                  setEditVehicle(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 bg-brand hover:opacity-90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                <Plus size={18} />
                <span>Add Vehicle</span>
              </button>
            </div>
          </div>
        </div>

        {view === "table" && (
          <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {[
                      "VEHICLE MODEL",
                      "LICENSE",
                      "YEAR",
                      "VIN",
                      "LAST INSPECTION",
                      "REMINDER DAYS",
                      "ACTIONS",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredVehicles.map((v) => (
                    <tr
                      key={v.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold text-sm border border-brand/10 uppercase group-hover:scale-105 transition-transform">
                            {v.model.charAt(0)}
                          </div>
                          <div className="font-semibold text-slate-900">
                            {v.model}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-brand bg-brand/5 border border-brand/10 px-2 py-0.5 rounded-md text-xs">
                          {v.license}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {v.manufactureYear}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium font-mono text-xs">
                        {v.vin}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {v.lastInspection}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                          v.reminderDays === '-' ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {v.reminderDays}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewVehicle(v)}
                          >
                            <Eye size={16} />
                          </ActionBtn>
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditVehicle(v);
                              setShowForm(true);
                            }}
                          >
                            <Pencil size={16} />
                          </ActionBtn>
                          <ActionBtn color="brand" onClick={() => remove(v.id)}>
                            <Trash2 size={16} />
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand/5 rounded-bl-full -mr-6 -mt-6 transition-all group-hover:scale-110"></div>
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="h-12 w-12 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-lg shadow-md shadow-brand/20">
                    {v.model.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-brand transition-colors">
                      {v.model}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold tracking-tight">
                      {v.license}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <CardRow label="VIN" value={v.vin} />
                  <CardRow label="Year" value={v.manufactureYear} />
                  <CardRow label="Last Insp." value={v.lastInspection} />
                  <CardRow label="Reminders" value={v.reminderDays} isBadge />
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setViewVehicle(v)}
                    className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors border border-slate-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditVehicle(v);
                      setShowForm(true);
                    }}
                    className="flex-1 py-2 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white text-xs font-semibold transition-all border border-brand/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(v.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-brand hover:bg-brand/10 transition-colors border border-transparent hover:border-brand/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewVehicle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
            <div className="relative h-24 bg-slate-900">
              <div className="absolute inset-0 bg-brand/10 blur-2xl rounded-full scale-150"></div>
              <button onClick={() => setViewVehicle(null)} className="absolute top-4 right-4 h-8 w-8 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white transition-all">
                <X size={18} />
              </button>
            </div>
            
            <div className="px-6 pb-8">
              <div className="relative -mt-12 mb-6 text-center">
                <div className="h-24 w-24 rounded-2xl bg-white p-1.5 shadow-lg mx-auto border border-slate-100">
                  <div className="h-full w-full rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold text-3xl border border-brand/20 uppercase">
                    {viewVehicle.model.charAt(0)}
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1 mb-6">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{viewVehicle.model}</h2>
                <p className="text-slate-400 font-bold text-xs tracking-widest uppercase">{viewVehicle.license}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(viewVehicle).map(([k, v]) =>
                  k !== "id" && k !== "model" && k !== "license" ? (
                    <div key={k} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                        {k.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm font-bold text-slate-700">{v}</p>
                    </div>
                  ) : null
                )}
              </div>

              <button onClick={() => setViewVehicle(null)} className="w-full mt-6 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95">
                Dismiss Details
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <VehicleForm
          editData={editVehicle}
          onClose={() => {
            setShowForm(false);
            setEditVehicle(null);
          }}
          onSave={saveVehicle}
        />
      )}
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  color,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color: "blue" | "orange" | "brand";
}) {
  const styles = {
    blue: "text-blue-500 hover:bg-blue-50 border-slate-200 hover:border-blue-200",
    orange: "text-orange-500 hover:bg-orange-50 border-slate-200 hover:border-orange-200",
    brand: "text-brand hover:bg-brand/10 border-slate-200 hover:border-brand/20",
  };
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all active:scale-95 border ${styles[color]}`}
    >
      {children}
    </button>
  );
}

function CardRow({
  label,
  value,
  isBadge,
}: {
  label: string;
  value: string;
  isBadge?: boolean;
}) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-slate-400 font-semibold uppercase tracking-wider">{label}</span>
      {isBadge ? (
        <span className={`px-2 py-0.5 rounded-md font-bold ${
          value === '-' ? 'bg-slate-50 text-slate-500' : 'bg-amber-50 text-amber-600 border border-amber-100'
        }`}>
          {value}
        </span>
      ) : (
        <span className="text-slate-700 font-bold">{value}</span>
      )}
    </div>
  );
}

function VehicleForm({
  editData,
  onClose,
  onSave,
}: {
  editData: Vehicle | null;
  onClose: () => void;
  onSave: (data: Vehicle) => void;
}) {
  const [formData, setFormData] = useState<Vehicle>(
    editData || {
      id: 0,
      model: "",
      license: "",
      manufactureYear: "",
      vin: "",
      lastInspection: "",
      reminderDays: "-",
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
        <div className="bg-slate-900 p-6 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-bl-full -mr-16 -mt-16 blur-2xl"></div>
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <div className="h-12 w-12 rounded-xl bg-brand flex items-center justify-center mb-4 shadow-lg shadow-brand/20">
            <Truck size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">{editData ? "Edit Vehicle" : "Add New Vehicle"}</h2>
          <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">Technical Specifications</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Vehicle Model"
              value={formData.model}
              onChange={(v) => setFormData({ ...formData, model: v })}
              placeholder="e.g. Toyota Camry"
            />
            <FormInput
              label="License Plate"
              value={formData.license}
              onChange={(v) => setFormData({ ...formData, license: v })}
              placeholder="e.g. ABC123"
            />
            <FormInput
              label="Manufacture Year"
              value={formData.manufactureYear}
              onChange={(v) => setFormData({ ...formData, manufactureYear: v })}
              placeholder="e.g. 2024"
            />
            <FormInput
              label="VIN"
              value={formData.vin}
              onChange={(v) => setFormData({ ...formData, vin: v })}
              placeholder="Vehicle Identification Number"
            />
            <FormInput
              label="Last Inspection"
              value={formData.lastInspection}
              onChange={(v) => setFormData({ ...formData, lastInspection: v })}
              placeholder="DD-MM-YYYY"
            />
            <FormInput
              label="Reminder Days"
              value={formData.reminderDays}
              onChange={(v) => setFormData({ ...formData, reminderDays: v })}
              placeholder="e.g. 30"
            />
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] py-2.5 rounded-lg bg-brand text-white font-bold hover:opacity-90 shadow-md transition-all active:scale-95"
            >
              {editData ? "Update Vehicle" : "Register Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand transition-all text-slate-700 font-medium text-sm"
      />
    </div>
  );
}