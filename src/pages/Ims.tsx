import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Search,
  LayoutGrid,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  X,
  Warehouse,
  Boxes,
  ArrowDownToLine
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type ItemStatus = "In Stock" | "Low Stock" | "Out of Stock" | "Discontinued";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  status: ItemStatus;
  lastUpdated: string;
  minThreshold: number;
}

/* ================= CONSTANTS ================= */

const STORAGE_KEY = "erp_inventory_items";
const ITEMS_PER_PAGE = 8;

const CATEGORIES = ["Engine Parts", "Electrical", "Brakes & Suspension", "Body Work", "Fluids & Lubricants", "Tires & Wheels"];
const LOCATIONS = ["Warehouse A", "Warehouse B", "Main Store", "Garage 1", "Garage 2"];

/* ================= DEFAULT DATA ================= */

const defaultItems: InventoryItem[] = [
  { id: 1, name: "Brake Pads (Front)", sku: "BK-F-001", category: "Brakes & Suspension", quantity: 45, unit: "Sets", price: 1200, location: "Warehouse A", status: "In Stock", lastUpdated: "2024-01-10", minThreshold: 10 },
  { id: 2, name: "Engine Oil 5W-40", sku: "FL-O-0540", category: "Fluids & Lubricants", quantity: 12, unit: "Cans", price: 3500, location: "Main Store", status: "Low Stock", lastUpdated: "2024-01-12", minThreshold: 15 },
  { id: 3, name: "Spark Plug Platinum", sku: "EL-SP-002", category: "Electrical", quantity: 120, unit: "Pieces", price: 450, location: "Warehouse B", status: "In Stock", lastUpdated: "2024-01-08", minThreshold: 30 },
  { id: 4, name: "Oil Filter Premium", sku: "EN-OF-001", category: "Engine Parts", quantity: 0, unit: "Pieces", price: 850, location: "Warehouse A", status: "Out of Stock", lastUpdated: "2024-01-05", minThreshold: 10 },
  { id: 5, name: "Led Headlight H7", sku: "EL-HL-H7", category: "Electrical", quantity: 24, unit: "Pairs", price: 2800, location: "Garage 1", status: "In Stock", lastUpdated: "2024-01-11", minThreshold: 5 },
  { id: 6, name: "Coolant Pink 5L", sku: "FL-C-P05", category: "Fluids & Lubricants", quantity: 18, unit: "Bottles", price: 1250, location: "Main Store", status: "In Stock", lastUpdated: "2024-01-09", minThreshold: 10 },
];

/* ================= MAIN COMPONENT ================= */

export default function IMS() {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultItems;
      }
    } catch {
      return defaultItems;
    }
    return defaultItems;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [viewDetails, setViewDetails] = useState<InventoryItem | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  /* ---------- ACTIONS ---------- */

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this item from inventory?")) {
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success("Item removed from inventory", {
        icon: '🗑️',
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
    }
  };

  const handleSave = (itemData: InventoryItem) => {
    // Auto-calculate status based on quantity
    let status: ItemStatus = "In Stock";
    if (itemData.quantity === 0) status = "Out of Stock";
    else if (itemData.quantity <= itemData.minThreshold) status = "Low Stock";

    const finalData = { ...itemData, status, lastUpdated: new Date().toISOString().split('T')[0] };

    if (selectedItem) {
      setItems(prev => prev.map(i => i.id === finalData.id ? finalData : i));
      toast.success("Inventory item updated");
    } else {
      setItems(prev => [...prev, { ...finalData, id: Date.now() }]);
      toast.success("New item added to inventory");
    }
    setShowForm(false);
    setSelectedItem(null);
  };

  /* ---------- FILTER & PAGINATION ---------- */

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalValue = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const lowStockCount = items.filter(i => i.status === "Low Stock" || i.status === "Out of Stock").length;

  return (
    <div 
      className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500 p-4 md:p-8"
    >
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 brand rounded-full"></span>
              Inventory Repository
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <Warehouse size={16} />
              IMS › Stock Control & Warehouse Management
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-64 shadow-sm font-medium"
              />
            </div>

            <div className="flex border border-slate-200 rounded-2xl bg-white p-1.5 shadow-sm">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "table"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <TableIcon size={20} />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === "card"
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedItem(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Item</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total SKU Count" value={items.length.toString()} icon={<Boxes size={24} />} trend="Active items" color="bg-blue-500" />
          <StatCard title="Inventory Value" value={`₹${(totalValue / 1000).toFixed(1)}K`} icon={<DollarSign size={24} />} trend="Current valuation" color="bg-emerald-500" />
          <StatCard title="Low Stock Alerts" value={lowStockCount.toString()} icon={<AlertTriangle size={24} />} trend="Action required" color="bg-rose-500" />
          <StatCard title="Monthly Turnover" value="+12.5%" icon={<TrendingUp size={24} />} trend="Vs last month" color="bg-indigo-500" />
        </div>

        {/* Content Section */}
        {viewMode === "table" ? (
          <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden transition-all">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Item Details", "Category", "Stock Level", "Unit Price", "Value", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginated.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center font-black text-lg border border-brand/20 group-hover:scale-110 transition-transform shadow-sm">
                            <Package size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-base">{item.name}</div>
                            <div className="text-xs text-slate-400 font-black uppercase tracking-tighter">SKU: {item.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-700">{item.quantity} {item.unit}</span>
                            <StatusBadge status={item.status} />
                          </div>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${item.status === 'In Stock' ? 'bg-emerald-400' : item.status === 'Low Stock' ? 'bg-amber-400' : 'bg-rose-400'}`}
                              style={{ width: `${Math.min(100, (item.quantity / (item.minThreshold * 5)) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-bold text-slate-600 text-sm">
                        ₹{item.price.toLocaleString()}
                      </td>
                      <td className="px-8 py-5 font-black text-slate-900 text-sm">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(item)} icon={<Eye size={18} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedItem(item); setShowForm(true); }} icon={<Pencil size={18} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(item.id)} icon={<Trash2 size={18} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginated.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-[120px] -mr-10 -mt-10 transition-all group-hover:scale-125"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="h-16 w-16 rounded-[24px] bg-brand text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-brand/30 group-hover:rotate-6 transition-transform">
                    <Package size={28} />
                  </div>
                  <StatusBadge status={item.status} />
                </div>

                <div className="mb-8">
                  <h3 className="font-black text-xl text-slate-900 line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-brand font-black mt-1 uppercase tracking-wider">{item.sku}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">Quantity</span>
                    <span className="font-black text-slate-700">{item.quantity} {item.unit}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">Unit Price</span>
                    <span className="font-black text-slate-700">₹{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">Location</span>
                    <span className="font-bold text-slate-700">{item.location}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
                  <button onClick={() => setViewDetails(item)} className="flex-1 py-3.5 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-black uppercase transition-colors">Details</button>
                  <button onClick={() => { setSelectedItem(item); setShowForm(true); }} className="p-3.5 rounded-2xl bg-brand/5 text-brand hover:bg-brand hover:text-white transition-all shadow-sm"><Pencil size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> SKU Items
            </p>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-2 rounded-[24px] shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-10 w-10 rounded-xl text-xs font-black transition-all ${
                      currentPage === i + 1 ? 'bg-brand text-white shadow-lg shadow-brand/20 scale-110' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <InventoryForm
          editData={selectedItem}
          onClose={() => {
            setShowForm(false);
            setSelectedItem(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Details View Modal */}
      {viewDetails && (
        <ItemDetailsModal 
          item={viewDetails} 
          onClose={() => setViewDetails(null)} 
          onEdit={(item) => {
            setViewDetails(null);
            setSelectedItem(item);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function StatCard({ title, value, icon, trend, color }: { title: string; value: string; icon: React.ReactNode; trend: string; color: string }) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-150`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</h3>
        <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1">
          <TrendingUp size={12} className="text-emerald-500" />
          {trend}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ItemStatus }) {
  const styles = {
    "In Stock": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Low Stock": "bg-amber-50 text-amber-600 border-amber-100",
    "Out of Stock": "bg-rose-50 text-rose-600 border-rose-100",
    "Discontinued": "bg-slate-100 text-slate-500 border-slate-200"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${styles[status]}`}>
      {status}
    </span>
  );
}

function ActionBtn({ color, onClick, icon }: { color: "blue" | "orange" | "red"; onClick: () => void; icon: React.ReactNode }) {
  const styles = {
    blue: "text-blue-500 hover:bg-blue-50 border-blue-100",
    orange: "text-orange-500 hover:bg-orange-50 border-orange-100",
    red: "text-rose-500 hover:bg-rose-50 border-rose-100"
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-xl border transition-all hover:scale-110 active:scale-90 ${styles[color]}`}
    >
      {icon}
    </button>
  );
}

function InventoryForm({ editData, onClose, onSave }: { editData: InventoryItem | null; onClose: () => void; onSave: (item: InventoryItem) => void }) {
  const [formData, setFormData] = useState<InventoryItem>(
    editData || {
      id: 0,
      name: "",
      sku: "",
      category: CATEGORIES[0],
      quantity: 0,
      unit: "Pieces",
      price: 0,
      location: LOCATIONS[0],
      status: "In Stock",
      lastUpdated: "",
      minThreshold: 5
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Item name is required";
    if (!formData.sku) newErrors.sku = "SKU is required";
    if (formData.quantity < 0) newErrors.quantity = "Invalid quantity";
    if (formData.price <= 0) newErrors.price = "Invalid price";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[24px] w-full max-w-2xl shadow-2xl overflow-hidden border border-white/20 scale-in-center">
        <div className="bg-slate-900 p-8 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              {editData ? "Refine Item" : "New Inventory Item"}
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-1">Populate stock details below</p>
          </div>
          <button onClick={onClose} className="relative z-10 h-12 w-12 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-brand transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="Item Name" 
              value={formData.name} 
              onChange={(v) => setFormData({...formData, name: v})} 
              placeholder="e.g. Engine Oil 5W-40"
              error={errors.name}
            />
            <FormInput 
              label="SKU Identifier" 
              value={formData.sku} 
              onChange={(v) => setFormData({...formData, sku: v})} 
              placeholder="e.g. EN-OIL-01"
              error={errors.sku}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Storage Location</label>
              <select 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all"
              >
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <FormInput 
              label="Unit (e.g. Pcs, Ltrs)" 
              value={formData.unit} 
              onChange={(v) => setFormData({...formData, unit: v})} 
              placeholder="Pieces"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput 
              label="Stock Quantity" 
              type="number"
              value={formData.quantity.toString()} 
              onChange={(v) => setFormData({...formData, quantity: parseInt(v) || 0})} 
              error={errors.quantity}
            />
            <FormInput 
              label="Min Threshold" 
              type="number"
              value={formData.minThreshold.toString()} 
              onChange={(v) => setFormData({...formData, minThreshold: parseInt(v) || 0})} 
            />
            <FormInput 
              label="Unit Price (₹)" 
              type="number"
              value={formData.price.toString()} 
              onChange={(v) => setFormData({...formData, price: parseFloat(v) || 0})} 
              error={errors.price}
            />
          </div>

          <div className="pt-6 flex gap-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-8 py-4 rounded-2xl border-2 border-slate-100 text-slate-500 font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              Discard
            </button>
            <button 
              type="submit" 
              className="flex-1 px-8 py-4 rounded-2xl bg-brand hover:bg-brand text-white font-black uppercase tracking-widest shadow-xl shadow-brand/20 transition-all active:scale-95"
            >
              {editData ? "Update Item" : "Acknowledge Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange, placeholder, error, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; error?: string; type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-slate-50 border ${error ? 'border-rose-300 ring-4 ring-rose-400/10' : 'border-slate-200'} rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-brand/10 focus:border-brand outline-none transition-all`}
      />
      {error && <p className="text-[10px] text-rose-500 font-black uppercase ml-1">{error}</p>}
    </div>
  );
}

function ItemDetailsModal({ item, onClose, onEdit }: { item: InventoryItem; onClose: () => void; onEdit: (item: InventoryItem) => void }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 bg-gradient-to-br from-slate-50 to-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 h-10 w-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all">
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-[24px] bg-brand text-white flex items-center justify-center shadow-2xl shadow-brand/30 mb-6">
              <Package size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{item.name}</h2>
            <p className="text-brand font-black uppercase tracking-widest text-sm mt-1">{item.sku}</p>
            <div className="mt-4">
              <StatusBadge status={item.status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <DetailBox label="Category" value={item.category} />
            <DetailBox label="Location" value={item.location} />
            <DetailBox label="Quantity" value={`${item.quantity} ${item.unit}`} />
            <DetailBox label="Min Stock" value={`${item.minThreshold} ${item.unit}`} />
            <DetailBox label="Unit Price" value={`₹${item.price}`} />
            <DetailBox label="Last Updated" value={item.lastUpdated} />
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 flex gap-4">
            <button 
              onClick={() => onEdit(item)}
              className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20"
            >
              <Pencil size={18} /> Edit Item
            </button>
            <button 
              onClick={() => {
                const restockQty = prompt("Enter restock quantity:", "10");
                if (restockQty && !isNaN(parseInt(restockQty))) {
                  // This is a simplified action for the UI
                  toast.success(`Restock order for ${restockQty} units initiated`);
                }
              }}
              className="px-6 py-4 rounded-2xl bg-brand text-white hover:bg-brand/90 transition-all shadow-xl shadow-brand/20"
            >
              <ArrowDownToLine size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-700">{value}</p>
    </div>
  );
}
