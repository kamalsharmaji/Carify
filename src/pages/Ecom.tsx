import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  ShoppingCart,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  TrendingUp,
  DollarSign,
  Package,
  X,
  Clock,
  Users
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
  color: "emerald" | "amber" | "blue" | "indigo";
}

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
  paymentStatus: "Paid" | "Unpaid" | "Refunded";
}

interface EcomProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  status: "Active" | "Draft" | "Out of Stock";
}

type NewOrderData = Omit<Order, "id" | "date">;
type NewProductData = Omit<EcomProduct, "id" | "sales" | "rating">;

/* ================= CONSTANTS ================= */

const ORDERS_STORAGE_KEY = "erp_ecom_orders";
const PRODUCTS_STORAGE_KEY = "erp_ecom_products";
const ITEMS_PER_PAGE = 8;

/* ================= DEFAULT DATA ================= */

const defaultOrders: Order[] = [
  { id: "ORD-9821", customerName: "Rahul Sharma", date: "2024-01-15", total: 12500, status: "Delivered", items: 3, paymentStatus: "Paid" },
  { id: "ORD-9822", customerName: "Anita Desai", date: "2024-01-16", total: 4500, status: "Shipped", items: 1, paymentStatus: "Paid" },
  { id: "ORD-9823", customerName: "Vikram Singh", date: "2024-01-16", total: 8900, status: "Processing", items: 2, paymentStatus: "Paid" },
  { id: "ORD-9824", customerName: "Priya Patel", date: "2024-01-17", total: 2200, status: "Pending", items: 1, paymentStatus: "Unpaid" },
  { id: "ORD-9825", customerName: "Sanjay Gupta", date: "2024-01-17", total: 15600, status: "Processing", items: 4, paymentStatus: "Paid" },
];

const defaultProducts: EcomProduct[] = [
  { id: 1, name: "Premium Brake Pads", category: "Parts", price: 2400, stock: 45, sales: 120, rating: 4.8, status: "Active" },
  { id: 2, name: "Synthetic Engine Oil", category: "Fluids", price: 3500, stock: 12, sales: 85, rating: 4.5, status: "Active" },
  { id: 3, name: "LED Headlight Kit", category: "Electrical", price: 5800, stock: 24, sales: 64, rating: 4.9, status: "Active" },
  { id: 4, name: "Performance Air Filter", category: "Parts", price: 1800, stock: 0, sales: 42, rating: 4.2, status: "Out of Stock" },
  { id: 5, name: "Tire Pressure Sensor", category: "Electrical", price: 1200, stock: 15, sales: 30, rating: 4.4, status: "Draft" },
];

/* ================= MAIN COMPONENT ================= */

export default function Ecom() {
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultOrders;
  });
  const [products, setProducts] = useState<EcomProduct[]>(() => {
    const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [orders, products]);

  /* ---------- CALCULATIONS ---------- */

  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.paymentStatus === "Paid" ? curr.total : 0), 0);
  const pendingOrders = orders.filter(o => o.status === "Pending" || o.status === "Processing").length;
  const totalCustomers = new Set(orders.map(o => o.customerName)).size;

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayData = activeTab === "orders" ? filteredOrders : filteredProducts;
  const totalPages = Math.ceil(displayData.length / ITEMS_PER_PAGE);
  const paginatedData = displayData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  /* ---------- ACTIONS ---------- */

  const handleAddData = (data: NewOrderData | NewProductData) => {
    if (activeTab === "orders") {
      const d = data as NewOrderData;
      setOrders(prev => [{ 
        ...d, 
        id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`, 
        date: new Date().toISOString().split('T')[0] 
      }, ...prev]);
      toast.success("New order created");
    } else {
      const d = data as NewProductData;
      setProducts(prev => [{ 
        ...d, 
        id: Date.now(),
        sales: 0,
        rating: 5.0
      }, ...prev]);
      toast.success("Product added to catalog");
    }
    setShowAddModal(false);
  };

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order ${id} updated to ${newStatus}`);
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm("Delete this order record?")) {
      setOrders(prev => prev.filter(o => o.id !== id));
      toast.success("Order deleted");
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#F1F5F9] p-4 md:p-6 lg:p-10 animate-in fade-in duration-700"
    >
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] p-8 md:p-10 shadow-2xl shadow-slate-200/50">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-emerald-600 rounded-[30px] flex items-center justify-center shadow-2xl shadow-emerald-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                <ShoppingCart className="text-white w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Commerce <span className="text-emerald-500">Hub</span>
                </h1>
                <p className="text-slate-500 mt-2 font-semibold text-lg">
                  ECOM › Unified Storefront & Order Orchestration
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-inner w-full md:w-80 placeholder:text-slate-400"
                />
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-xl shadow-slate-900/20 group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                <span>{activeTab === "orders" ? "NEW ORDER" : "ADD PRODUCT"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard title="Total Revenue" value={`₹${(totalRevenue / 1000).toFixed(1)}K`} icon={<DollarSign size={24} />} trend="+15.2%" color="emerald" />
          <StatCard title="Pending Orders" value={pendingOrders.toString()} icon={<Clock size={24} />} trend="Action Required" color="amber" />
          <StatCard title="Total Sales" value={orders.length.toString()} icon={<TrendingUp size={24} />} trend="+8 this week" color="blue" />
          <StatCard title="Active Customers" value={totalCustomers.toString()} icon={<Users size={24} />} trend="Highly Engaged" color="indigo" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 p-2 bg-white/50 backdrop-blur-md border border-white/50 rounded-2xl w-fit shadow-xl shadow-slate-200/40">
          <button
            onClick={() => { setActiveTab("orders"); setCurrentPage(1); }}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
              activeTab === "orders" 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105" 
                : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
            }`}
          >
            Order Registry
          </button>
          <button
            onClick={() => { setActiveTab("products"); setCurrentPage(1); }}
            className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
              activeTab === "products" 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105" 
                : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
            }`}
          >
            Product Catalog
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            {activeTab === "orders" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    {["Order ID", "Customer", "Date", "Total", "Status", "Payment", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-tighter">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedData.map((order) => {
                    const o = order as Order;
                    return (
                      <tr key={o.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="px-6 py-6 font-black text-emerald-600 text-sm">{o.id}</td>
                        <td className="px-6 py-6">
                          <div className="font-black text-slate-900 text-sm">{o.customerName}</div>
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{o.items} items</div>
                        </td>
                        <td className="px-6 py-6 text-sm font-bold text-slate-500">{o.date}</td>
                        <td className="px-6 py-6 font-black text-slate-900 text-sm">₹{o.total.toLocaleString()}</td>
                        <td className="px-6 py-6">
                          <StatusBadge status={o.status} />
                        </td>
                        <td className="px-6 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${o.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex gap-2">
                            <ActionBtn color="blue" onClick={() => { setSelectedOrder(o); setShowOrderModal(true); }} icon={<Eye size={18} />} />
                            <ActionBtn color="red" onClick={() => handleDeleteOrder(o.id)} icon={<Trash2 size={18} />} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    {["Product", "Category", "Price", "Stock", "Sales", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-tighter">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedData.map((product) => {
                    const p = product as EcomProduct;
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm group-hover:rotate-6 transition-transform">
                              <Package size={22} />
                            </div>
                            <div>
                              <div className="font-black text-slate-900 text-sm">{p.name}</div>
                              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">ID: {p.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200">{p.category}</span>
                        </td>
                        <td className="px-6 py-6 font-black text-slate-900 text-sm">₹{p.price.toLocaleString()}</td>
                        <td className="px-6 py-6">
                          <div className="flex flex-col gap-2">
                            <span className={`text-[11px] font-black ${p.stock === 0 ? 'text-rose-500' : 'text-slate-600'}`}>{p.stock} Units</span>
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                              <div className={`h-full rounded-full transition-all duration-1000 ${p.stock === 0 ? 'bg-rose-400' : 'bg-emerald-400'}`} style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="font-black text-slate-900 text-sm">{p.sales}</div>
                        </td>
                        <td className="px-6 py-6">
                          <StatusBadge status={p.status as any} />
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex gap-2">
                            <ActionBtn color="orange" onClick={() => {}} icon={<Pencil size={18} />} />
                            <ActionBtn color="red" onClick={() => {}} icon={<Trash2 size={18} />} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing <span className="text-slate-900 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, displayData.length)}</span> of <span className="text-slate-900 font-bold">{displayData.length}</span> Records
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
                    className={`h-9 w-9 rounded-lg text-xs font-bold transition-all ${currentPage === p ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
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
      {showOrderModal && selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => { setShowOrderModal(false); setSelectedOrder(null); }} 
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {showAddModal && (
        <AddDataModal 
          type={activeTab} 
          onClose={() => setShowAddModal(false)} 
          onSubmit={handleAddData} 
        />
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
  color: "emerald" | "amber" | "blue" | "indigo";
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100"
  };

  const iconBgMap = {
    emerald: "bg-emerald-600",
    amber: "bg-amber-600",
    blue: "bg-blue-600",
    indigo: "bg-indigo-600"
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-16 h-16 ${iconBgMap[color]} opacity-[0.03] rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-150`}></div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${colorMap[color]}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md">
          <TrendingUp size={12} />
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Processing: "bg-blue-50 text-blue-600 border-blue-100",
    Shipped: "bg-indigo-50 text-indigo-600 border-indigo-100",
    Delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Draft: "bg-slate-50 text-slate-600 border-slate-100",
    "Out of Stock": "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${configs[status] || "bg-slate-50 text-slate-600 border-slate-100"}`}>
      {status}
    </span>
  );
}

function ActionBtn({ icon, onClick, color }: { icon: ReactNode; onClick: () => void; color: "blue" | "red" | "orange" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white",
    red: "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white",
    orange: "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white"
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all active:scale-90 ${colors[color]}`}
    >
      {icon}
    </button>
  );
}

/* ================= MODALS ================= */

function OrderDetailsModal({ order, onClose, onUpdateStatus }: { order: Order; onClose: () => void; onUpdateStatus: (id: string, s: OrderStatus) => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Order <span className="text-emerald-600">Details</span></h2>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all active:scale-90">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block ml-1">Customer Entity</label>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="font-bold text-slate-900 text-base">{order.customerName}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Verified Enterprise Partner</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block ml-1">Timeline Core</label>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="font-bold text-slate-900 text-base">{order.date}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1"><Clock size={12} /> Synced 2m ago</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden shadow-lg">
            <div className="relative flex justify-between items-center mb-6 pb-6 border-b border-white/10">
              <span className="font-bold uppercase text-[10px] tracking-wider text-emerald-400">Transaction Summary</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-wider uppercase">{order.items} Items</span>
            </div>
            <div className="relative space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="font-bold text-white">₹{(order.total * 0.82).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">GST (18%)</span>
                <span className="font-bold text-emerald-400">₹{(order.total * 0.18).toLocaleString()}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-center">
                <span className="font-bold uppercase text-[10px] tracking-wider text-emerald-500">Grand Total</span>
                <span className="text-2xl font-black text-white tracking-tight">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-900 font-bold uppercase tracking-wider hover:bg-slate-200 transition-all active:scale-95 text-xs">Print Invoice</button>
            {order.status !== "Delivered" && (
              <button 
                onClick={() => { onUpdateStatus(order.id, "Shipped"); onClose(); }}
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md active:scale-95 text-xs"
              >
                Authorize Shipment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddDataModal({ type, onClose, onSubmit }: { type: "orders" | "products"; onClose: () => void; onSubmit: (data: any) => void }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">{type === "orders" ? "Create Order" : "New Product"}</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Initialize Core Registry</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all active:scale-90">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          if (type === "orders") {
            onSubmit({
              customerName: formData.get("customerName"),
              total: Number(formData.get("total")),
              items: Number(formData.get("items")),
              status: "Pending",
              paymentStatus: "Unpaid",
            });
          } else {
            onSubmit({
              name: formData.get("name"),
              category: formData.get("category"),
              price: Number(formData.get("price")),
              stock: Number(formData.get("stock")),
              status: "Active",
            });
          }
        }} className="p-6 space-y-4">
          {type === "orders" ? (
            <div className="space-y-4">
              <FormInput label="Customer Entity" name="customerName" required />
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="Module Count" name="items" type="number" required />
                <FormInput label="Grand Total (₹)" name="total" type="number" required />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <FormInput label="Product Specification" name="name" required />
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Categorization</label>
                <select name="category" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all appearance-none cursor-pointer">
                  <option>Parts</option>
                  <option>Fluids</option>
                  <option>Electrical</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="Unit Valuation (₹)" name="price" type="number" required />
                <FormInput label="Inventory Core" name="stock" type="number" required />
              </div>
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold uppercase tracking-wider hover:bg-slate-50 transition-all text-xs">Discard</button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md active:scale-95 text-xs">Commit Entry</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
      <input 
        {...props} 
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all placeholder:text-slate-300" 
      />
    </div>
  );
}

