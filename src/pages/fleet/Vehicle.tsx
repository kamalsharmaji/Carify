import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Truck,
  Activity,
  Settings,
  Navigation,
  Fuel,
  Users,
  X,
  Calendar,
  ShieldCheck
} from "lucide-react";

/* ================= TYPES ================= */
interface Vehicle {
  id: number;
  vehicleName: string;
  vehicleType: string;
  fuelType: string;
  registrationDate: string;
  driverName: string;
  status: string;
}

/* ================= LOCAL STORAGE KEY ================= */
const STORAGE_KEY = "fleet_vehicles_v2";

/* ================= DEFAULT DATA ================= */
const seedData: Vehicle[] = [
  {
    id: 1,
    vehicleName: "Toyota Fortuner (DL09AB1234)",
    vehicleType: "SUV",
    fuelType: "Diesel",
    registrationDate: "15-06-2022",
    driverName: "Deepak Sharma",
    status: "Active",
  },
  {
    id: 2,
    vehicleName: "Honda City (MH01CD5678)",
    vehicleType: "Sedan",
    fuelType: "Petrol",
    registrationDate: "20-08-2023",
    driverName: "Amit Kumar",
    status: "Maintenance",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function Vehicle() {
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
      v.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.status === "Active").length;
  const maintenanceVehicles = vehicles.filter(v => v.status === "Maintenance").length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Truck className="w-8 h-8 text-slate-900" />
              Fleet Directory
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Manage and track your vehicle assets and deployment
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-200/50 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-md transition-all ${view === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2 rounded-md transition-all ${view === "card" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => { setEditVehicle(null); setShowForm(true); }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95 shadow-sm"
            >
              <Plus size={18} />
              <span>Add Vehicle</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Fleet" value={totalVehicles.toString()} icon={Truck} color="blue" />
          <StatCard label="Active Units" value={activeVehicles.toString()} icon={Activity} color="emerald" />
          <StatCard label="Maintenance" value={maintenanceVehicles.toString()} icon={Settings} color="orange" />
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by vehicle name or driver..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-sm"
          />
        </div>

        {view === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["#", "Vehicle Details", "Type", "Fuel", "Registration", "Driver", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredVehicles.map((v, index) => (
                    <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-slate-400">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-xs border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                            {v.vehicleName.charAt(0)}
                          </div>
                          <div className="font-bold text-slate-900">{v.vehicleName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase border border-blue-100">
                          {v.vehicleType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                          <Fuel size={14} className="text-slate-400" />
                          {v.fuelType}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {v.registrationDate}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-900 font-semibold">
                          <Users size={14} className="text-slate-400" />
                          {v.driverName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={v.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <ActionBtn color="blue" onClick={() => setViewVehicle(v)}>
                            <Eye size={16} />
                          </ActionBtn>
                          <ActionBtn color="orange" onClick={() => { setEditVehicle(v); setShowForm(true); }}>
                            <Pencil size={16} />
                          </ActionBtn>
                          <ActionBtn color="red" onClick={() => remove(v.id)}>
                            <Trash2 size={16} />
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredVehicles.length === 0 && (
              <div className="py-20 text-center bg-slate-50/50">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-300 mb-4 shadow-sm">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No vehicles found</h3>
                <p className="text-slate-500 text-sm">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((v) => (
              <div key={v.id} className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-lg bg-slate-50 text-slate-900 flex items-center justify-center font-bold text-xl border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    {v.vehicleName.charAt(0)}
                  </div>
                  <StatusBadge status={v.status} />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">{v.vehicleName}</h3>
                  <div className="flex items-center gap-2 text-slate-500 mt-1 font-medium">
                    <Users size={14} className="text-slate-400" />
                    {v.driverName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                  <CardRow label="Type" value={v.vehicleType} />
                  <CardRow label="Fuel" value={v.fuelType} />
                  <CardRow label="Registered" value={v.registrationDate} />
                  <CardRow label="Asset ID" value={`#${v.id}`} />
                </div>

                <div className="flex gap-2 mt-6">
                  <button onClick={() => setViewVehicle(v)} className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-900 font-bold text-sm transition-all hover:bg-slate-200 active:scale-95">
                    View Details
                  </button>
                  <button onClick={() => { setEditVehicle(v); setShowForm(true); }} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => remove(v.id)} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {viewVehicle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                  <Truck className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Vehicle Profile</h3>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">Asset Management System</p>
                </div>
              </div>
              <button onClick={() => setViewVehicle(null)} className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <DetailCard label="Vehicle Name" value={viewVehicle.vehicleName} icon={Truck} color="blue" />
                <DetailCard label="Vehicle Type" value={viewVehicle.vehicleType} icon={Navigation} color="indigo" />
                <DetailCard label="Fuel System" value={viewVehicle.fuelType} icon={Fuel} color="orange" />
                <DetailCard label="Registration" value={viewVehicle.registrationDate} icon={Calendar} color="violet" />
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Driver</p>
                  <p className="text-slate-900 font-bold">{viewVehicle.driverName}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-emerald-500" size={20} />
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-tight">Active Protocol</span>
                </div>
                <button 
                  onClick={() => setViewVehicle(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <FormModal
          editData={editVehicle}
          onClose={() => { setShowForm(false); setEditVehicle(null); }}
          onSave={saveVehicle}
        />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100",
  };
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${colors[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
      isActive 
      ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
      : "bg-orange-50 text-orange-600 border-orange-100"
    }`}>
      {status}
    </span>
  );
}

function ActionBtn({ children, color, onClick }: { children: React.ReactNode; color: 'blue' | 'orange' | 'red'; onClick: () => void }) {
  const colors = {
    blue: "text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-100",
    orange: "text-orange-600 hover:bg-orange-50 border-transparent hover:border-orange-100",
    red: "text-red-600 hover:bg-red-50 border-transparent hover:border-red-100"
  };
  return (
    <button onClick={onClick} className={`p-2 rounded-lg border transition-all active:scale-95 ${colors[color]}`}>
      {children}
    </button>
  );
}

function CardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="font-semibold text-sm text-slate-900">{value}</p>
    </div>
  );
}

function DetailCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100"
  };
  
  return (
    <div className="p-4 bg-white border border-slate-100 rounded-lg flex items-center gap-3 shadow-sm">
      <div className={`w-10 h-10 rounded-lg border ${colors[color] || 'bg-slate-50 text-slate-600'} flex items-center justify-center`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-slate-900 font-bold text-sm">{value}</p>
      </div>
    </div>
  );
}

function FormModal({ editData, onClose, onSave }: { editData: Vehicle | null; onClose: () => void; onSave: (data: Vehicle) => void }) {
  const [form, setForm] = useState<Vehicle>(
    editData || { id: 0, vehicleName: "", vehicleType: "", fuelType: "", registrationDate: "", driverName: "", status: "Active" }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.vehicleName.trim()) newErrors.vehicleName = "Vehicle Name Required";
    if (!form.driverName.trim()) newErrors.driverName = "Driver Name Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{editData ? "Edit" : "Add"} Vehicle</h3>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5">Asset inventory entry</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="space-y-1.5">
            <FormInput label="Vehicle Name & No" value={form.vehicleName} onChange={(v) => setForm({ ...form, vehicleName: v })} error={errors.vehicleName} placeholder="e.g. Toyota Fortuner (DL01AB1234)" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Vehicle Type" value={form.vehicleType} onChange={(v) => setForm({ ...form, vehicleType: v })} placeholder="e.g. SUV, Sedan" />
            <FormInput label="Fuel Type" value={form.fuelType} onChange={(v) => setForm({ ...form, fuelType: v })} placeholder="e.g. Diesel, Petrol" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Registration Date" type="date" value={form.registrationDate} onChange={(v) => setForm({ ...form, registrationDate: v })} />
            <FormInput label="Assigned Driver" value={form.driverName} onChange={(v) => setForm({ ...form, driverName: v })} error={errors.driverName} placeholder="Driver name" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Vehicle Status</label>
            <div className="flex gap-2">
              {["Active", "Maintenance"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm({ ...form, status: s })}
                  className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all border ${
                    form.status === s 
                    ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all">Cancel</button>
            <button 
              onClick={() => {
                if (validate()) onSave(form);
              }}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg shadow-slate-900/10 transition-all active:scale-95"
            >
              {editData ? "Update Vehicle" : "Add Vehicle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, error, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all ${
          error ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
        }`}
      />
      {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight ml-1">{error}</p>}
    </div>
  );
}
