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
      className="min-h-screen bg-[#F1F5F9] p-4 md:p-6 lg:p-10 animate-in fade-in duration-700"
    >
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Cinematic Header Section */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] p-8 md:p-10 shadow-2xl shadow-slate-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center shadow-2xl shadow-slate-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                <Truck className="text-white w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Manage <span className="text-brand">Vehicles</span>
                  </h1>
                  <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                    INSPECTION v2.0
                  </span>
                </div>
                <p className="text-slate-500 mt-2 font-semibold text-lg">
                  Vehicle Inspection › Fleet Inventory
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group flex-1 md:flex-none">
                <Search
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 pr-6 py-4 bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-full md:w-64 shadow-xl shadow-slate-200/50"
                />
              </div>

              <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white shadow-xl">
                <button
                  onClick={() => setView("table")}
                  className={`p-3 rounded-xl transition-all ${
                    view === "table"
                      ? "bg-slate-900 text-white shadow-lg scale-105"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <TableIcon size={20} />
                </button>
                <button
                  onClick={() => setView("card")}
                  className={`p-3 rounded-xl transition-all ${
                    view === "card"
                      ? "bg-slate-900 text-white shadow-lg scale-105"
                      : "text-slate-400 hover:text-slate-600"
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
                className="flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-brand/20 active:scale-95 group"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                <span>Add Vehicle</span>
              </button>
            </div>
          </div>
        </div>

        {view === "table" && (
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
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
                        className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
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
                      className="hover:bg-white/80 transition-all group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xl group-hover:rotate-6 transition-transform">
                            {v.model.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-slate-900 text-sm tracking-tight">{v.model}</div>
                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Asset ID: {v.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 bg-brand/5 text-brand rounded-xl text-[10px] font-black uppercase tracking-widest border border-brand/10">
                          {v.license}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-slate-600 font-black text-[11px] uppercase">
                        {v.manufactureYear}
                      </td>
                      <td className="px-8 py-6 text-slate-500 font-black text-[10px] tracking-wider uppercase">
                        {v.vin}
                      </td>
                      <td className="px-8 py-6 text-slate-600 font-black text-[11px] uppercase">
                        {v.lastInspection}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] border ${
                          v.reminderDays === '-' ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {v.reminderDays} {v.reminderDays !== '-' && 'Days'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-3">
                          <ActionBtn
                            color="blue"
                            onClick={() => setViewVehicle(v)}
                          >
                            <Eye size={18} />
                          </ActionBtn>
                          <ActionBtn
                            color="orange"
                            onClick={() => {
                              setEditVehicle(v);
                              setShowForm(true);
                            }}
                          >
                            <Pencil size={18} />
                          </ActionBtn>
                          <ActionBtn color="brand" onClick={() => remove(v.id)}>
                            <Trash2 size={18} />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVehicles.map((v) => (
              <div
                key={v.id}
                className="group bg-white/70 backdrop-blur-xl rounded-[40px] p-8 border border-white/50 shadow-2xl shadow-slate-200/50 hover:scale-[1.02] transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="h-16 w-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-2xl shadow-slate-900/20 group-hover:rotate-12 transition-transform duration-500">
                    {v.model.charAt(0)}
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                    v.reminderDays === '-' ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {v.reminderDays}
                  </span>
                </div>
                
                <div className="mb-8 relative z-10">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-brand transition-colors tracking-tight line-clamp-1">
                    {v.model}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">
                    {v.license}
                  </p>
                </div>

                <div className="space-y-4 py-6 border-y border-slate-100/50">
                  <CardRow label="VIN" value={v.vin} />
                  <CardRow label="Year" value={v.manufactureYear} />
                  <CardRow label="Last Insp." value={v.lastInspection} />
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setViewVehicle(v)}
                    className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 active:scale-95"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditVehicle(v);
                      setShowForm(true);
                    }}
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => remove(v.id)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-brand hover:bg-brand/5 hover:border-brand/10 transition-all active:scale-95"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewVehicle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-2xl rounded-[40px] w-full max-w-2xl shadow-3xl overflow-hidden border border-white/50 animate-in zoom-in duration-500">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-900 rounded-[24px] flex items-center justify-center shadow-2xl rotate-3">
                  <Truck className="text-white w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Vehicle Intelligence</h3>
                  <p className="text-brand text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">Fleet Core Profile</p>
                </div>
              </div>
              <button onClick={() => setViewVehicle(null)} className="h-12 w-12 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-xl transition-all text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-10">
              <div className="grid grid-cols-2 gap-6 mb-10">
                {Object.entries(viewVehicle).map(([k, v]) =>
                  k !== "id" && k !== "model" && k !== "license" ? (
                    <div key={k} className="p-6 bg-slate-50/50 border border-slate-100 rounded-[24px] group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">
                        {k.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-xl font-black text-slate-900 tracking-tight">{v}</p>
                    </div>
                  ) : null
                )}
              </div>

              <div className="p-8 bg-slate-900 rounded-[32px] flex items-center justify-between shadow-2xl shadow-slate-900/20 mb-10">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white">
                    <Truck size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Vehicle Designation</p>
                    <p className="text-white text-xl font-black mt-1 tracking-tight">{viewVehicle.model}</p>
                  </div>
                </div>
                <div className="px-6 py-2 bg-brand/10 border border-brand/20 rounded-full">
                  <span className="text-[10px] font-black text-brand uppercase tracking-widest">{viewVehicle.license}</span>
                </div>
              </div>

              <button 
                onClick={() => setViewVehicle(null)} 
                className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-[12px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-[0.98]"
              >
                Close Asset Intelligence
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
    blue: "text-blue-500 bg-blue-50/50 border-blue-100 hover:bg-blue-100 hover:text-blue-600",
    orange: "text-orange-500 bg-orange-50/50 border-orange-100 hover:bg-orange-100 hover:text-orange-600",
    brand: "text-brand bg-brand/5 border-brand/10 hover:bg-brand hover:text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all active:scale-90 border shadow-sm ${styles[color]}`}
    >
      {children}
    </button>
  );
}

function CardRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-slate-900 font-black text-xs tracking-tight uppercase">{value}</span>
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-2xl rounded-[40px] w-full max-w-2xl shadow-3xl overflow-hidden border border-white/50 animate-in zoom-in duration-500">
        <div className="bg-slate-900 p-10 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-bl-full -mr-32 -mt-32 blur-3xl"></div>
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors">
            <X size={32} />
          </button>
          <div className="h-16 w-16 rounded-[24px] bg-brand flex items-center justify-center mb-6 shadow-2xl shadow-brand/20">
            <Truck size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase tracking-[0.05em]">{editData ? "Modify Asset" : "Register Asset"}</h2>
          <p className="text-slate-400 text-[10px] font-black mt-2 uppercase tracking-[0.3em]">Vehicle Intelligence System</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <div className="mt-12 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-5 rounded-[24px] border border-slate-200 text-slate-500 font-black text-[12px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] py-5 rounded-[24px] bg-brand text-white font-black text-[12px] uppercase tracking-[0.3em] hover:opacity-90 shadow-2xl shadow-brand/20 transition-all active:scale-95"
            >
              {editData ? "Update Registry" : "Execute Registration"}
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
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-4 bg-slate-50/50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand transition-all text-slate-900 font-bold text-sm"
      />
    </div>
  );
}
