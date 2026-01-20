//  

 import { useState, useEffect } from "react";
 import {
   Plus,
   Eye,
   Pencil,
   Trash2,
   LayoutGrid,
   Table as TableIcon,
   Search,
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
 
   return (
     <div className="min-h-screen bg-slate-50/50 p-3 md:p-6">
       <div className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
             <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
               <span className="w-2 h-8 bg-red-400 rounded-full"></span>
               Manage Vehicles
             </h1>
             <p className="text-slate-500 mt-1 font-medium">
               Fleet Management › Vehicle Directory
             </p>
           </div>
 
           <div className="flex items-center gap-3">
             <div className="relative group">
               <Search
                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-400 transition-colors"
                 size={18}
               />
               <input
                 type="text"
                 placeholder="Search vehicles or drivers..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400/20 focus:border-red-400 transition-all w-full md:w-64"
               />
             </div>
 
             <div className="flex border border-slate-200 rounded-xl bg-white p-1">
               <button
                 onClick={() => setView("table")}
                 className={`p-2 rounded-lg transition-all ${
                   view === "table"
                     ? "bg-red-400 text-white shadow-sm"
                     : "text-slate-500 hover:bg-slate-50"
                 }`}
               >
                 <TableIcon size={18} />
               </button>
               <button
                 onClick={() => setView("card")}
                 className={`p-2 rounded-lg transition-all ${
                   view === "card"
                     ? "bg-red-400 text-white shadow-sm"
                     : "text-slate-500 hover:bg-slate-50"
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
               className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-400/20 active:scale-95"
             >
               <Plus size={18} strokeWidth={3} />
               <span className="hidden sm:inline">Add Vehicle</span>
             </button>
           </div>
         </div>
 
         {view === "table" && (
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all">
             <div className="overflow-x-auto custom-scrollbar">
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 border-b border-slate-100">
                   <tr>
                     {[
                       "NO",
                       "VEHICLE NAME",
                       "VEHICLE TYPE",
                       "FUEL TYPE",
                       "REGISTRATION DATE",
                       "DRIVER NAME",
                       "STATUS",
                       "ACTION",
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
                 <tbody className="divide-y divide-slate-50">
                   {filteredVehicles.map((v, index) => (
                     <tr
                       key={v.id}
                       className="hover:bg-slate-50/80 transition-colors group"
                     >
                       <td className="px-6 py-4 font-bold text-slate-400">
                         {index + 1}
                       </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-sm border border-blue-100 uppercase group-hover:scale-110 transition-transform">
                             {v.vehicleName.charAt(0)}
                           </div>
                           <div className="font-bold text-slate-900">
                             {v.vehicleName}
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4 font-medium text-slate-600">
                         {v.vehicleType}
                       </td>
                       <td className="px-6 py-4">
                         <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wide border border-green-100">
                           {v.fuelType}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-slate-600 font-medium">
                         {v.registrationDate}
                       </td>
                       <td className="px-6 py-4 text-slate-900 font-bold">
                         {v.driverName}
                       </td>
                       <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                           v.status === 'Active' 
                             ? 'bg-green-50 text-green-600 border-green-100' 
                             : 'bg-orange-50 text-orange-600 border-orange-100'
                         }`}>
                           {v.status}
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
               <div className="py-20 text-center">
                 <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                   <Search size={32} />
                 </div>
                 <p className="text-slate-500 font-medium">No vehicles found</p>
               </div>
             )}
           </div>
         )}
 
         {view === "card" && (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredVehicles.map((v) => (
               <div
                 key={v.id}
                 className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
               >
                 <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-400/20">
                     {v.vehicleName.charAt(0)}
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-900 group-hover:text-red-500 transition-colors line-clamp-1">
                       {v.vehicleName}
                     </h3>
                     <p className="text-xs text-slate-500 font-medium truncate">
                       Driver: {v.driverName}
                     </p>
                   </div>
                 </div>
 
                 <div className="space-y-3 pt-4 border-t border-slate-50">
                   <CardRow label="Type" value={v.vehicleType} isBadge />
                   <CardRow label="Fuel" value={v.fuelType} isBadge />
                   <CardRow label="Status" value={v.status} isBadge />
                   <CardRow label="Registered" value={v.registrationDate} />
                 </div>
 
                 <div className="flex gap-2 mt-6">
                   <button
                     onClick={() => setViewVehicle(v)}
                     className="flex-1 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                   >
                     View
                   </button>
                   <button
                     onClick={() => {
                       setEditVehicle(v);
                       setShowForm(true);
                     }}
                     className="flex-1 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 text-xs font-bold transition-colors"
                   >
                     Edit
                   </button>
                   <button
                     onClick={() => remove(v.id)}
                     className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
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
         <Modal onClose={() => setViewVehicle(null)} title="Vehicle Details">
           <div className="space-y-4">
             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
               <div className="h-16 w-16 rounded-2xl bg-blue-400 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-400/20">
                 {viewVehicle.vehicleName.charAt(0)}
               </div>
               <div>
                 <h2 className="text-xl font-bold text-slate-900">
                   {viewVehicle.vehicleName}
                 </h2>
                 <p className="text-sm text-slate-500">Driver: {viewVehicle.driverName}</p>
               </div>
             </div>
 
             <div className="grid grid-cols-2 gap-4">
               {Object.entries(viewVehicle).map(([k, v]) =>
                 k !== "id" && k !== "vehicleName" ? (
                   <div key={k} className="p-3 border border-slate-100 rounded-xl">
                     <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">
                       {k.replace(/([A-Z])/g, " $1")}
                     </p>
                     <p className="text-sm font-bold text-slate-700">{v}</p>
                   </div>
                 ) : null
               )}
             </div>
           </div>
         </Modal>
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
   color: "blue" | "orange" | "red";
 }) {
   const styles = {
     blue: "text-blue-500 hover:bg-blue-50 hover:text-blue-600",
     orange: "text-orange-500 hover:bg-orange-50 hover:text-orange-600",
     red: "text-red-500 hover:bg-red-50 hover:text-red-600",
   };
 
   return (
     <button
       onClick={onClick}
       className={`p-2 rounded-lg transition-all active:scale-90 ${styles[color]}`}
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
     <div className="flex justify-between items-center text-sm">
       <span className="text-slate-400 font-medium">{label}</span>
       {isBadge ? (
         <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-black uppercase tracking-tight">
           {value}
         </span>
       ) : (
         <span className="text-slate-700 font-bold">{value}</span>
       )}
     </div>
   );
 }
 
 function Modal({
   children,
   onClose,
   title,
 }: {
   children: React.ReactNode;
   onClose: () => void;
   title: string;
 }) {
   return (
     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in">
       <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
         <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
           <h3 className="font-black text-slate-800 uppercase tracking-tight">
             {title}
           </h3>
           <button
             onClick={onClose}
             className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-500"
           >
             ✕
           </button>
         </div>
         <div className="p-6">{children}</div>
       </div>
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
   onSave: (v: Vehicle) => void;
 }) {
   const [form, setForm] = useState<Vehicle>(
     editData || {
       id: 0,
       vehicleName: "",
       vehicleType: "",
       fuelType: "",
       registrationDate: "",
       driverName: "",
       status: "Active",
     }
   );
 
   const [errors, setErrors] = useState<Record<string, string>>({});
 
   const validate = () => {
     const newErrors: Record<string, string> = {};
     if (!form.vehicleName.trim()) newErrors.vehicleName = "Required";
     if (!form.vehicleType.trim()) newErrors.vehicleType = "Required";
     if (!form.driverName.trim()) newErrors.driverName = "Required";
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
 
   const handleSave = () => {
     if (validate()) {
       onSave(form);
     }
   };
 
   return (
     <Modal onClose={onClose} title={editData ? "Edit Vehicle" : "Add New Vehicle"}>
       <div className="space-y-4">
         <FormInput
           label="Vehicle Name"
           value={form.vehicleName}
           onChange={(v) => setForm({ ...form, vehicleName: v })}
           error={errors.vehicleName}
           placeholder="Toyota Fortuner (DL09AB1234)"
           fullWidth
         />
 
         <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1.5">
             <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
               Vehicle Type
             </label>
             <select
               value={form.vehicleType}
               onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-400/20 focus:border-red-400 outline-none transition-all"
             >
               <option value="">Select Type</option>
               <option value="Sedan">Sedan</option>
               <option value="SUV">SUV</option>
               <option value="Truck">Truck</option>
               <option value="Van">Van</option>
             </select>
           </div>
           <div className="space-y-1.5">
             <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
               Fuel Type
             </label>
             <select
               value={form.fuelType}
               onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-400/20 focus:border-red-400 outline-none transition-all"
             >
               <option value="">Select Fuel</option>
               <option value="Petrol">Petrol</option>
               <option value="Diesel">Diesel</option>
               <option value="Electric">Electric</option>
               <option value="CNG">CNG</option>
             </select>
           </div>
         </div>
 
         <div className="grid grid-cols-2 gap-4">
           <FormInput
             label="Registration Date"
             value={form.registrationDate}
             onChange={(v) => setForm({ ...form, registrationDate: v })}
             placeholder="DD-MM-YYYY"
           />
           <div className="space-y-1.5">
             <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
               Status
             </label>
             <select
               value={form.status}
               onChange={(e) => setForm({ ...form, status: e.target.value })}
               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-400/20 focus:border-red-400 outline-none transition-all"
             >
               <option value="Active">Active</option>
               <option value="Maintenance">Maintenance</option>
               <option value="Inactive">Inactive</option>
             </select>
           </div>
         </div>
 
         <FormInput
           label="Driver Name"
           value={form.driverName}
           onChange={(v) => setForm({ ...form, driverName: v })}
           error={errors.driverName}
           placeholder="Enter driver name"
           fullWidth
         />
 
         <div className="pt-6 flex gap-3">
           <button
             onClick={onClose}
             className="flex-1 px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
           >
             Cancel
           </button>
           <button
             onClick={handleSave}
             className="flex-1 px-6 py-3 rounded-2xl bg-red-400 hover:bg-red-500 text-white font-bold transition-all shadow-lg shadow-red-400/20 active:scale-95"
           >
             {editData ? "Update Vehicle" : "Create Vehicle"}
           </button>
         </div>
       </div>
     </Modal>
   );
 }
 
 function FormInput({
   label,
   value,
   onChange,
   error,
   placeholder,
   fullWidth,
 }: {
   label: string;
   value: string;
   onChange: (v: string) => void;
   error?: string;
   placeholder?: string;
   fullWidth?: boolean;
 }) {
   return (
     <div className={`space-y-1.5 ${fullWidth ? "col-span-2" : ""}`}>
       <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
         {label} {error && <span className="text-red-400">*</span>}
       </label>
       <input
         type="text"
         value={value}
         onChange={(e) => onChange(e.target.value)}
         placeholder={placeholder}
         className={`w-full bg-slate-50 border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-400/20 focus:border-red-400 outline-none transition-all ${
           error ? "border-red-300" : "border-slate-200"
         }`}
       />
       {error && <p className="text-[10px] text-red-500 font-medium ml-1">{error}</p>}
     </div>
   );
 }
 
