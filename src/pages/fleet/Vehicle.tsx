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
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-6 lg:p-10 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Cinematic Header Section */}
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] p-8 md:p-10 shadow-2xl shadow-slate-200/50">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center shadow-2xl shadow-slate-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                <Truck className="text-white w-10 h-10" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Fleet <span className="text-indigo-600">Operations</span>
                  </h1>
                  <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                    ASSET v4.0
                  </span>
                </div>
                <p className="text-slate-500 mt-2 font-semibold text-lg">
                  Vehicle Management › Fleet Directory
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
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
                onClick={() => { setEditVehicle(null); setShowForm(true); }}
                className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 group"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                <span>Add Vehicle</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <StatCard label="Total Fleet" value={totalVehicles.toString()} icon={Truck} color="blue" />
            <StatCard label="Active Units" value={activeVehicles.toString()} icon={Activity} color="emerald" />
            <StatCard label="Maintenance" value={maintenanceVehicles.toString()} icon={Settings} color="orange" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by vehicle name or driver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-2xl shadow-slate-200/50"
            />
          </div>
        </div>

        {view === "table" ? (
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["#", "Vehicle Details", "Type", "Fuel", "Registration", "Driver", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredVehicles.map((v, index) => (
                    <tr key={v.id} className="hover:bg-white/80 transition-all group">
                      <td className="px-8 py-6 font-black text-slate-300">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xl group-hover:rotate-6 transition-transform">
                            {v.vehicleName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-slate-900 text-sm tracking-tight">{v.vehicleName}</div>
                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Fleet ID: VH-{v.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 bg-slate-100/50 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200/50">
                          {v.vehicleType}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-slate-700 font-black text-xs uppercase tracking-wider">
                          <Fuel size={14} className="text-slate-400" />
                          {v.fuelType}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-slate-500 font-black text-[11px] uppercase">
                        {v.registrationDate}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-tight">
                          <Users size={14} className="text-slate-400" />
                          {v.driverName}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={v.status} />
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-3">
                          <ActionBtn color="blue" onClick={() => setViewVehicle(v)}>
                            <Eye size={18} />
                          </ActionBtn>
                          <ActionBtn color="orange" onClick={() => { setEditVehicle(v); setShowForm(true); }}>
                            <Pencil size={18} />
                          </ActionBtn>
                          <ActionBtn color="red" onClick={() => remove(v.id)}>
                            <Trash2 size={18} />
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredVehicles.length === 0 && (
              <div className="py-32 text-center">
                <div className="inline-flex h-32 w-32 items-center justify-center rounded-[32px] bg-slate-50 text-slate-200 mb-8 border border-slate-100 shadow-inner">
                  <Search size={48} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Vehicles Not Found</h3>
                <p className="text-slate-500 mt-3 font-semibold text-lg">Try adjusting your search parameters</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((v) => (
              <div key={v.id} className="group bg-white/70 backdrop-blur-xl rounded-[40px] p-10 border border-white/50 shadow-2xl shadow-slate-200/50 hover:scale-[1.02] transition-all duration-500">
                <div className="flex justify-between items-start mb-10">
                  <div className="h-16 w-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-2xl shadow-slate-900/20 group-hover:rotate-12 transition-transform duration-500">
                    {v.vehicleName.charAt(0)}
                  </div>
                  <StatusBadge status={v.status} />
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1">{v.vehicleName}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-indigo-500 font-black mt-2 uppercase tracking-[0.2em]">
                    <Users size={14} />
                    {v.driverName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 py-8 border-y border-slate-100/50">
                  <CardRow label="Type" value={v.vehicleType} />
                  <CardRow label="Fuel" value={v.fuelType} />
                  <CardRow label="Registered" value={v.registrationDate} />
                  <CardRow label="Asset ID" value={`VH-${v.id}`} />
                </div>

                <div className="flex gap-3 mt-10">
                  <button onClick={() => setViewVehicle(v)} className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 active:scale-95">
                    View Details
                  </button>
                  <button onClick={() => { setEditVehicle(v); setShowForm(true); }} className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">
                    <Pencil size={20} />
                  </button>
                  <button onClick={() => remove(v.id)} className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {viewVehicle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-2xl rounded-[40px] w-full max-w-2xl shadow-3xl overflow-hidden border border-white/50 animate-in zoom-in duration-500">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-900 rounded-[24px] flex items-center justify-center shadow-2xl rotate-3">
                  <Truck className="text-white w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Vehicle Profile</h3>
                  <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">Asset Intelligence System</p>
                </div>
              </div>
              <button onClick={() => setViewVehicle(null)} className="h-12 w-12 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-xl transition-all text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-10">
              <div className="grid grid-cols-2 gap-6">
                <DetailCard label="Vehicle Name" value={viewVehicle.vehicleName} icon={Truck} color="blue" />
                <DetailCard label="Vehicle Type" value={viewVehicle.vehicleType} icon={Navigation} color="indigo" />
                <DetailCard label="Fuel System" value={viewVehicle.fuelType} icon={Fuel} color="orange" />
                <DetailCard label="Registration" value={viewVehicle.registrationDate} icon={Calendar} color="violet" />
              </div>

              <div className="p-8 bg-slate-900 rounded-[32px] flex items-center justify-between shadow-2xl shadow-slate-900/20 group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                    <Users size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Assigned Personnel</p>
                    <p className="text-white text-xl font-black mt-1 tracking-tight">{viewVehicle.driverName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">On Duty</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <ShieldCheck className="text-emerald-500" size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Protocol</span>
                    <span className="text-sm font-black text-slate-700">ACTIVE & SECURED</span>
                  </div>
                </div>
                <button 
                  onClick={() => setViewVehicle(null)}
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
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
