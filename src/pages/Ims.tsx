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
      className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-6 animate-in fade-in duration-700"
    >
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Warehouse className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Inventory <span className="text-indigo-500">Core</span>
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  Precision Stock Control & Global Warehouse Sync
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Scan repository..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-64 lg:w-80 font-bold placeholder:text-indigo-300"
                />
              </div>

              <div className="flex border border-slate-200 rounded-xl bg-white p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "table" ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:bg-slate-50"}`}
                >
                  <TableIcon size={20} />
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "card" ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:bg-slate-50"}`}
                >
                  <LayoutGrid size={20} />
                </button>
              </div>

              <button
                onClick={() => { setSelectedItem(null); setShowForm(true); }}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95"
              >
                <Plus size={18} />
                <span>NEW ENTRY</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Global SKU Count" value={items.length.toString()} icon={<Boxes size={24} />} trend="+4.2%" color="indigo" />
          <StatCard title="Valuation Matrix" value={`₹${(totalValue / 1000).toFixed(1)}K`} icon={<DollarSign size={24} />} trend="Optimal" color="emerald" />
          <StatCard title="Anomalous Stock" value={lowStockCount.toString()} icon={<AlertTriangle size={24} />} trend="Critical" color="rose" />
          <StatCard title="Asset Velocity" value="+12.5%" icon={<TrendingUp size={24} />} trend="High Efficiency" color="blue" />
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          {viewMode === "table" ? (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["Entity Details", "Classification", "Quantification", "Unit Value", "Total Valuation", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
                            <Package size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm tracking-tight">{item.name}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200">{item.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{item.quantity}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.unit}</span>
                            <StatusBadge status={item.status} />
                          </div>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${item.status === 'In Stock' ? 'bg-emerald-500' : item.status === 'Low Stock' ? 'bg-amber-500' : 'bg-rose-500'}`}
                              style={{ width: `${Math.min(100, (item.quantity / (item.minThreshold * 5)) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 text-sm">₹{item.price.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600 text-sm">₹{(item.price * item.quantity).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <ActionBtn color="blue" onClick={() => setViewDetails(item)} icon={<Eye size={16} />} />
                          <ActionBtn color="orange" onClick={() => { setSelectedItem(item); setShowForm(true); }} icon={<Pencil size={16} />} />
                          <ActionBtn color="red" onClick={() => handleDelete(item.id)} icon={<Trash2 size={16} />} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {paginated.map((item) => (
                <div key={item.id} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                      <Package size={24} />
                    </div>
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg text-slate-900 tracking-tight line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{item.sku}</p>
                  </div>

                  <div className="space-y-3 py-4 border-y border-slate-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inventory</span>
                      <span className="font-bold text-slate-700 text-sm">{item.quantity} {item.unit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Valuation</span>
                      <span className="font-bold text-slate-700 text-sm">₹{item.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</span>
                      <span className="font-bold text-indigo-600 text-sm">{item.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button onClick={() => setViewDetails(item)} className="flex-1 py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-[10px] font-bold uppercase tracking-wider transition-all">Analysis</button>
                    <button onClick={() => { setSelectedItem(item); setShowForm(true); }} className="p-2 rounded-lg bg-slate-900 text-white hover:bg-indigo-600 transition-all shadow-md active:scale-90"><Pencil size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> Records
            </p>
            <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`h-9 w-9 rounded-lg text-xs font-bold transition-all ${currentPage === p ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-20 transition-all text-slate-600"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <InventoryFormModal 
          editData={selectedItem} 
          onClose={() => { setShowForm(false); setSelectedItem(null); }} 
          onSave={handleSave} 
        />
      )}

      {viewDetails && (
        <ItemDetailsModal 
          item={viewDetails} 
          onClose={() => setViewDetails(null)} 
          onEdit={(item) => { setViewDetails(null); setSelectedItem(item); setShowForm(true); }} 
        />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: "indigo" | "emerald" | "rose" | "blue";
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colorMap = {
    indigo: "from-indigo-500/20 to-indigo-600/5 text-indigo-600 shadow-indigo-200/50",
    emerald: "from-emerald-500/20 to-emerald-600/5 text-emerald-600 shadow-emerald-200/50",
    rose: "from-rose-500/20 to-rose-600/5 text-rose-600 shadow-rose-200/50",
    blue: "from-blue-500/20 to-blue-600/5 text-blue-600 shadow-blue-200/50"
  };

  return (
    <div className="group relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-[40px] shadow-2xl hover:shadow-indigo-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorMap[color]} blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
      <div className="relative flex items-center gap-6">
        <div className={`w-16 h-16 rounded-[24px] bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-xl`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${color === 'rose' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ItemStatus }) {
  const configs: Record<ItemStatus, string> = {
    "In Stock": "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100",
    "Low Stock": "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100",
    "Out of Stock": "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100",
    "Discontinued": "bg-slate-50 text-slate-600 border-slate-100 shadow-slate-100",
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${configs[status]}`}>
      {status}
    </span>
  );
}

function ActionBtn({ icon, onClick, color }: { icon: React.ReactNode; onClick: () => void; color: "blue" | "red" | "orange" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white shadow-blue-200",
    red: "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white shadow-rose-200",
    orange: "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white shadow-amber-200"
  };

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all duration-300 shadow-lg hover:-translate-y-1 active:scale-90 ${colors[color]}`}
    >
      {icon}
    </button>
  );
}

/* ================= MODALS ================= */

function InventoryFormModal({ editData, onClose, onSave }: { editData: InventoryItem | null; onClose: () => void; onSave: (data: InventoryItem) => void }) {
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
      lastUpdated: new Date().toISOString().split('T')[0],
      minThreshold: 10
    }
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative bg-white/95 backdrop-blur-2xl border border-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in duration-500">
        <div className="p-10 border-b border-indigo-100/50 flex justify-between items-center bg-indigo-50/30">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{editData ? "Update" : "New"} <span className="text-indigo-600">Entry</span></h2>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Inventory Ledger Synapse</p>
          </div>
          <button onClick={onClose} className="p-4 rounded-2xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all shadow-xl active:scale-90">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-10 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <FormInput label="Item Nomenclature" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} placeholder="e.g. Brake Pads" required className="col-span-2" />
            <FormInput label="SKU Identifier" value={formData.sku} onChange={(v) => setFormData({...formData, sku: v})} placeholder="e.g. BK-F-001" required />
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Classification</label>
              <select 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-6 py-5 bg-indigo-50/50 border border-indigo-100 rounded-[22px] text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all appearance-none cursor-pointer"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <FormInput label="Asset Quantity" type="number" value={formData.quantity.toString()} onChange={(v) => setFormData({...formData, quantity: parseInt(v) || 0})} required />
            <FormInput label="Measurement Unit" value={formData.unit} onChange={(v) => setFormData({...formData, unit: v})} placeholder="Pieces, Sets, etc." required />
            <FormInput label="Unit Valuation (₹)" type="number" value={formData.price.toString()} onChange={(v) => setFormData({...formData, price: parseFloat(v) || 0})} required />
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Warehouse Location</label>
              <select 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-6 py-5 bg-indigo-50/50 border border-indigo-100 rounded-[22px] text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all appearance-none cursor-pointer"
              >
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-6 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-5 rounded-[22px] border-2 border-slate-100 text-slate-400 font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Discard</button>
            <button type="submit" className="flex-1 py-5 rounded-[22px] bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/20 active:scale-95">Commit Entry</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ItemDetailsModal({ item, onClose, onEdit }: { item: InventoryItem; onClose: () => void; onEdit: (item: InventoryItem) => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative bg-white/90 backdrop-blur-2xl border border-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-500">
        <div className="p-10 border-b border-indigo-100/50 flex justify-between items-center bg-indigo-50/30">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Entity <span className="text-indigo-600">Analysis</span></h2>
              <StatusBadge status={item.status} />
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">{item.sku}</p>
          </div>
          <button onClick={onClose} className="p-4 rounded-2xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all shadow-xl shadow-slate-200/50 active:scale-90">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-10 space-y-10">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-[30px] bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/30 mb-6 rotate-3">
              <Package size={48} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">{item.name}</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">Verified Global Asset</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <DetailBox label="Classification" value={item.category} icon={<Boxes size={16} />} />
            <DetailBox label="Deployment" value={item.location} icon={<Warehouse size={16} />} />
            <DetailBox label="Quantification" value={`${item.quantity} ${item.unit}`} icon={<Package size={16} />} />
            <DetailBox label="Valuation" value={`₹${item.price}`} icon={<DollarSign size={16} />} />
            <DetailBox label="Total Equity" value={`₹${(item.price * item.quantity).toLocaleString()}`} icon={<TrendingUp size={16} />} />
            <DetailBox label="Last Sync" value={item.lastUpdated} icon={<Clock size={16} />} />
          </div>

          <div className="flex gap-6">
            <button 
              onClick={() => onEdit(item)}
              className="flex-1 py-6 rounded-[24px] bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20 active:scale-95"
            >
              <Pencil size={20} /> Modify Core
            </button>
            <button 
              onClick={() => toast.success("Restock protocol initiated")}
              className="px-8 py-6 rounded-[24px] bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95"
            >
              <ArrowDownToLine size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBox({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-[24px] group hover:bg-white hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-indigo-600">{icon}</span>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-sm font-black text-slate-900 truncate">{value}</p>
    </div>
  );
}

function FormInput({ label, onChange, className = "", ...props }: { label: string; onChange: (v: string) => void; className?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
      <input 
        {...props} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-5 bg-indigo-50/50 border border-indigo-100 rounded-[22px] text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all placeholder:text-indigo-200" 
      />
    </div>
  );
}

