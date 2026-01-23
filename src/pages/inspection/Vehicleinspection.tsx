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
  ChevronRight,
  ShieldCheck,
  AlertCircle,
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- Standardized Header --- */}
      <header className="mb-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Manage <span className="text-red-500">Vehicles</span>
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className="hover:text-red-500 transition-colors cursor-pointer">Vehicle Inspection</span>
              <ChevronRight size={14} />
              <span className="text-slate-600">Fleet Inventory</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full lg:w-64"
              />
            </div>

            <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-lg">
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-md transition-all ${
                  view === "table" ? "bg-white text-red-500 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <TableIcon size={18} />
              </button>
              <button
                onClick={() => setView("card")}
                className={`p-2 rounded-md transition-all ${
                  view === "card" ? "bg-white text-red-500 shadow-sm" : "text-slate-500 hover:text-slate-700"
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
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus size={18} />
              <span>Add Vehicle</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Stats Quick Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <StatCard icon={<Truck className="text-red-500" />} label="Total Inventory" value={vehicles.length} />
        <StatCard icon={<ShieldCheck className="text-emerald-600" />} label="Recently Inspected" value={vehicles.length} />
        <StatCard icon={<AlertCircle className="text-amber-600" />} label="Maintenance Due" value={vehicles.filter(v => v.reminderDays !== '-').length} />
      </div>

      {/* --- Main Content Area --- */}
      <main className="transition-all duration-300">
        {view === "table" ? (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {[
                      "VEHICLE MODEL",
                      "LICENSE",
                      "YEAR",
                      "VIN",
                      "LAST INSPECTION",
                      "REMINDER",
                      "OPERATIONS",
                    ].map((h) => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredVehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 text-red-500 flex items-center justify-center font-bold text-base">
                            {v.model.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {v.model}
                            </div>
                            <div className="text-xs text-slate-500">
                              Asset ID: {v.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold text-red-500 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                          {v.license}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {v.manufactureYear}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-400 font-mono">
                          {v.vin}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {v.lastInspection}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                          v.reminderDays === '-' ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {v.reminderDays} {v.reminderDays !== '-' && 'Days'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ActionBtn color="blue" onClick={() => setViewVehicle(v)} icon={<Eye size={16} />} />
                          <ActionBtn color="indigo" onClick={() => { setEditVehicle(v); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => remove(v.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredVehicles.length === 0 && <EmptyState />}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredVehicles.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-indigo-100 text-red-500 flex items-center justify-center font-bold text-xl">
                      {v.model.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-slate-900 group-hover:text-red-500 transition-colors truncate">
                        {v.model}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {v.license}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <CardRow label="VIN" value={v.vin} />
                  <CardRow label="Year" value={v.manufactureYear} />
                  <CardRow label="Last Insp." value={v.lastInspection} />
                  <CardRow label="Reminder" value={v.reminderDays} isBadge={v.reminderDays !== '-'} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewVehicle(v)}
                    className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all border border-slate-200"
                  >
                    PREVIEW
                  </button>
                  <button
                    onClick={() => { setEditVehicle(v); setShowForm(true); }}
                    className="flex-1 py-2 rounded-lg bg-indigo-50 text-red-500 hover:bg-indigo-100 text-xs font-semibold transition-all border border-indigo-100"
                  >
                    MODIFY
                  </button>
                  <button
                    onClick={() => remove(v.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- Modals --- */}
      {viewVehicle && (
        <Modal onClose={() => setViewVehicle(null)} title="Vehicle Intelligence Profile">
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
              <div className="h-24 w-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-500/40 border-4 border-white/10">
                {viewVehicle.model.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight">{viewVehicle.model}</h2>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm font-medium">{viewVehicle.license}</span>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-2">Certified Fleet Asset</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">VIN</p>
                <p className="text-sm font-black text-slate-800">{viewVehicle.vin}</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Manufacture Year</p>
                <p className="text-sm font-black text-slate-800">{viewVehicle.manufactureYear}</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Last Inspection</p>
                <p className="text-sm font-black text-slate-800">{viewVehicle.lastInspection}</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-2">Reminder Threshold</p>
                <p className="text-sm font-black text-slate-800">{viewVehicle.reminderDays} Days</p>
              </div>
            </div>
            
            <button
              onClick={() => setViewVehicle(null)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-red-500 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
            >
              Close Asset Analysis
            </button>
          </div>
        </Modal>
      )}

      {showForm && (
        <VehicleForm
          editData={editVehicle}
          onClose={() => { setShowForm(false); setEditVehicle(null); }}
          onSave={saveVehicle}
        />
      )}
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StatCard({ icon, label, value }: any) {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-50 rounded-lg text-red-500">{icon}</div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ onClick, icon, color }: any) {
  const styles: any = {
    blue: "text-blue-600 hover:bg-blue-50 border-blue-100",
    indigo: "text-red-500 hover:bg-indigo-50 border-indigo-100",
    red: "text-red-600 hover:bg-red-50 border-red-100",
  };
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border transition-all active:scale-90 ${styles[color]}`}
    >
      {icon}
    </button>
  );
}

function CardRow({ label, value, isBadge }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500 font-medium">{label}</span>
      {isBadge ? (
        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold border border-amber-100">
          {value}
        </span>
      ) : (
        <span className="text-slate-900 font-semibold">{value}</span>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50">
      <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
        <Truck size={40} />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No vehicles found</h3>
      <p className="text-slate-500 text-sm">Try adjusting your search or add a new vehicle.</p>
    </div>
  );
}

function Modal({ children, onClose, title }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-slate-900">
            <X size={20} />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

function VehicleForm({ editData, onClose, onSave }: any) {
  const [formData, setFormData] = useState(
    editData || {
      model: "",
      license: "",
      manufactureYear: "",
      vin: "",
      lastInspection: "",
      reminderDays: "-"
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-900">
            {editData ? "Edit Vehicle" : "New Vehicle"}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-slate-900">
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="p-8 space-y-4"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Vehicle Model</label>
              <input
                required
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                placeholder="e.g. Volkswagen Jetta"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">License Plate</label>
                <input
                  required
                  value={formData.license}
                  onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                  placeholder="e.g. LMN456"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Manufacture Year</label>
                <input
                  required
                  value={formData.manufactureYear}
                  onChange={(e) => setFormData({ ...formData, manufactureYear: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                  placeholder="e.g. 2022"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">VIN (Vehicle Identification Number)</label>
              <input
                required
                value={formData.vin}
                onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold font-mono"
                placeholder="17-digit VIN"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Last Inspection</label>
                <input
                  required
                  value={formData.lastInspection}
                  onChange={(e) => setFormData({ ...formData, lastInspection: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                  placeholder="DD-MM-YYYY"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Reminder Days</label>
                <input
                  value={formData.reminderDays}
                  onChange={(e) => setFormData({ ...formData, reminderDays: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold"
                  placeholder="e.g. 30 (or - for none)"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              {editData ? "Update Vehicle" : "Save Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
