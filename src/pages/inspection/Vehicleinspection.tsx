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
      className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500"
       
    >
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-brand rounded-full"></span>
              Manage Vehicles
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <Truck size={16} />
              Vehicle Inspection › Fleet Inventory
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group flex-1 md:flex-none">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-full md:w-64 shadow-sm font-medium"
              />
            </div>

            <div className="flex border border-slate-200 rounded-2xl bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-xl transition-all ${
                  view === "table"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <TableIcon size={20} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2 rounded-xl transition-all ${
                  view === "card"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setEditVehicle(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-brand hover:opacity-90 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-brand/20 active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Vehicle</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {view === "table" && (
          <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden transition-all">
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
                        className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredVehicles.map((v) => (
                    <tr
                      key={v.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold text-sm border border-brand/10 uppercase group-hover:scale-110 transition-transform">
                            {v.model.charAt(0)}
                          </div>
                          <div className="font-bold text-slate-900">
                            {v.model}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-black text-brand bg-brand/5 border border-brand/10 px-2 py-1 rounded-lg text-xs">
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
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${
                          v.reminderDays === '-' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {v.reminderDays}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1.5">
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
                className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-110"></div>
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-brand text-white flex items-center justify-center font-black text-xl shadow-lg shadow-brand/20">
                    {v.model.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 group-hover:text-brand transition-colors">
                      {v.model}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold tracking-tight">
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
                    className="flex-1 py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditVehicle(v);
                      setShowForm(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-brand/10 text-brand hover:bg-brand hover:text-white text-xs font-bold transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(v.id)}
                    className="p-2.5 rounded-xl text-slate-300 hover:text-brand hover:bg-brand/10 transition-colors"
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
          <div className="bg-white rounded-[40px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="relative h-32 bg-slate-900">
              <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full scale-150"></div>
              <button onClick={() => setViewVehicle(null)} className="absolute top-6 right-6 h-10 w-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white transition-all">
                <X size={20} />
              </button>
            </div>
            
            <div className="px-8 pb-10">
              <div className="relative -mt-16 mb-6">
                <div className="h-32 w-32 rounded-[40px] bg-white p-2 shadow-2xl mx-auto border border-slate-50">
                  <div className="h-full w-full rounded-[32px] bg-brand/10 text-brand flex items-center justify-center font-black text-4xl border border-brand/20 uppercase">
                    {viewVehicle.model.charAt(0)}
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1 mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{viewVehicle.model}</h2>
                <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">{viewVehicle.license}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(viewVehicle).map(([k, v]) =>
                  k !== "id" && k !== "model" && k !== "license" ? (
                    <div key={k} className="p-4 bg-slate-50 rounded-[24px] border border-slate-100">
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1 flex items-center gap-1">
                        <Truck size={10} className="text-brand" /> {k.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm font-black text-slate-700">{v}</p>
                    </div>
                  ) : null
                )}
              </div>

              <button onClick={() => setViewVehicle(null)} className="w-full mt-8 py-4 bg-slate-900 text-white rounded-[24px] font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
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
    blue: "text-blue-500 hover:bg-blue-50 border-blue-100",
    orange: "text-orange-500 hover:bg-orange-50 border-orange-100",
    brand: "text-brand hover:bg-brand/10 border-brand/10",
  };
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-xl transition-all active:scale-90 border border-transparent ${styles[color]}`}
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
      <span className="text-slate-400 font-bold uppercase tracking-tighter">{label}</span>
      {isBadge ? (
        <span className={`px-2 py-0.5 rounded-md font-black ${
          value === '-' ? 'bg-slate-100 text-slate-500' : 'bg-amber-50 text-amber-500'
        }`}>
          {value}
        </span>
      ) : (
        <span className="text-slate-700 font-black">{value}</span>
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
      <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
        <div className="bg-slate-900 p-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 rounded-bl-full -mr-16 -mt-16 blur-2xl"></div>
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <div className="h-14 w-14 rounded-2xl bg-brand flex items-center justify-center mb-4 shadow-lg shadow-brand/20">
            <Truck size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">{editData ? "Edit Vehicle" : "Add New Vehicle"}</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Fill in the technical specifications below.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] py-4 rounded-2xl bg-brand text-white font-black hover:opacity-90 shadow-lg shadow-brand/20 transition-all active:scale-95"
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
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-slate-700 font-medium text-sm"
      />
    </div>
  );
}