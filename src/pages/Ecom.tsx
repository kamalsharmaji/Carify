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
      className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500 p-4 md:p-8"
    >
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 brand rounded-full"></span>
              E-Commerce Hub
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <ShoppingCart size={16} />
              Storefront Management & Order Fulfillment
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-64 shadow-sm font-medium"
              />
            </div>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">{activeTab === "orders" ? "New Order" : "Add Product"}</span>
              <span className="sm:hidden">{activeTab === "orders" ? "Order" : "Product"}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value={`₹${(totalRevenue / 1000).toFixed(1)}K`} icon={<DollarSign size={24} />} trend="+15.2%" color="bg-emerald-500" />
          <StatCard title="Pending Orders" value={pendingOrders.toString()} icon={<Clock size={24} />} trend="Needs attention" color="bg-amber-500" />
          <StatCard title="Total Sales" value={orders.length.toString()} icon={<TrendingUp size={24} />} trend="+8 this week" color="bg-blue-500" />
          <StatCard title="Active Customers" value={totalCustomers.toString()} icon={<Users size={24} />} trend="Engaged" color="bg-indigo-500" />
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm">
          <button
            onClick={() => { setActiveTab("orders"); setCurrentPage(1); }}
            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === "orders" ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-slate-400 hover:bg-slate-50"}`}
          >
            Orders
          </button>
          <button
            onClick={() => { setActiveTab("products"); setCurrentPage(1); }}
            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === "products" ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-slate-400 hover:bg-slate-50"}`}
          >
            Products
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden transition-all">
          <div className="overflow-x-auto custom-scrollbar">
            {activeTab === "orders" ? (
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Order ID", "Customer", "Date", "Total", "Status", "Payment", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginatedData.map((order) => {
                    const o = order as Order;
                    return (
                      <tr key={o.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 font-black text-brand text-sm">{o.id}</td>
                        <td className="px-8 py-5">
                          <div className="font-bold text-slate-900">{o.customerName}</div>
                          <div className="text-xs text-slate-400">{o.items} items ordered</div>
                        </td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-500">{o.date}</td>
                        <td className="px-8 py-5 font-black text-slate-900 text-sm">₹{o.total.toLocaleString()}</td>
                        <td className="px-8 py-5">
                          <StatusBadge status={o.status} />
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${o.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setSelectedOrder(o); setShowOrderModal(true); }} className="p-2.5 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"><Eye size={18} /></button>
                            <button onClick={() => handleDeleteOrder(o.id)} className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {["Product", "Category", "Price", "Inventory", "Sales", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginatedData.map((product) => {
                    const p = product as EcomProduct;
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                              <Package size={20} />
                            </div>
                            <div className="font-bold text-slate-900">{p.name}</div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-wider">{p.category}</span>
                        </td>
                        <td className="px-8 py-5 font-black text-slate-900 text-sm">₹{p.price.toLocaleString()}</td>
                        <td className="px-8 py-5">
                          <div className="flex flex-col gap-1">
                            <span className={`text-sm font-bold ${p.stock === 0 ? 'text-rose-500' : 'text-slate-700'}`}>{p.stock} in stock</span>
                            <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 font-bold text-slate-600 text-sm">{p.sales} units sold</td>
                        <td className="px-8 py-5">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex gap-2">
                            <button className="p-2.5 rounded-xl bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white transition-all"><Pencil size={18} /></button>
                            <button className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={18} /></button>
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, displayData.length)}</span> of <span className="text-slate-900 font-black">{displayData.length}</span> {activeTab}
            </p>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-black transition-all ${currentPage === p ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowOrderModal(false)}></div>
          <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-black text-slate-900">Order Details</h2>
                  <StatusBadge status={selectedOrder.status} />
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setShowOrderModal(false)} className="p-3 rounded-2xl hover:bg-white transition-colors shadow-sm"><X size={20} /></button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Customer Info</label>
                  <p className="font-bold text-slate-900 text-lg">{selectedOrder.customerName}</p>
                  <p className="text-sm text-slate-500">Contact details and shipping address would appear here in a real system.</p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Order Timeline</label>
                  <p className="font-bold text-slate-900">Placed on {selectedOrder.date}</p>
                  <p className="text-sm text-slate-500">Last updated: Today, 10:45 AM</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-black text-slate-900 uppercase text-xs tracking-widest">Order Summary</span>
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600">{selectedOrder.items} Items</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Subtotal</span>
                    <span className="font-bold text-slate-900">₹{(selectedOrder.total * 0.85).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">GST (18%)</span>
                    <span className="font-bold text-slate-900">₹{(selectedOrder.total * 0.15).toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between">
                    <span className="font-black text-slate-900 uppercase text-xs tracking-widest">Grand Total</span>
                    <span className="text-2xl font-black text-brand">₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">Print Invoice</button>
                {selectedOrder.status !== "Delivered" && (
                  <button 
                    onClick={() => handleUpdateStatus(selectedOrder.id, "Shipped")}
                    className="flex-1 py-4 rounded-2xl bg-brand text-white font-bold hover:bg-brand transition-all shadow-lg active:scale-95"
                  >
                    Mark as Shipped
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{activeTab === "orders" ? "Create New Order" : "New Product Entry"}</h2>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{activeTab === "orders" ? "Transaction Details" : "Catalog Specification"}</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-3 rounded-2xl hover:bg-white transition-colors shadow-sm"><X size={20} /></button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              if (activeTab === "orders") {
                const data: NewOrderData = {
                  customerName: formData.get("customerName") as string,
                  total: Number(formData.get("total")),
                  items: Number(formData.get("items")),
                  status: "Pending",
                  paymentStatus: "Unpaid",
                };
                handleAddData(data);
              } else {
                const data: NewProductData = {
                  name: formData.get("name") as string,
                  category: formData.get("category") as string,
                  price: Number(formData.get("price")),
                  stock: Number(formData.get("stock")),
                  status: "Active",
                };
                handleAddData(data);
              }
            }} className="p-8 space-y-6">
              {activeTab === "orders" ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer Name</label>
                    <input name="customerName" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Items Count</label>
                      <input name="items" type="number" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Grand Total (₹)</label>
                      <input name="total" type="number" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                    <input name="name" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <select name="category" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all">
                      <option>Parts</option>
                      <option>Fluids</option>
                      <option>Electrical</option>
                      <option>Accessories</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (₹)</label>
                      <input name="price" type="number" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Stock</label>
                      <input name="stock" type="number" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all" />
                    </div>
                  </div>
                </>
              )}
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-4 rounded-2xl bg-brand text-white font-bold hover:bg-brand transition-all shadow-xl shadow-brand/20 active:scale-95">Save {activeTab === "orders" ? "Order" : "Product"}</button>
              </div>
            </form>
          </div>
        </div>
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
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 p-8 rounded-[24px] shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:scale-110`}></div>
      <div className="flex items-center gap-6 relative z-10">
        <div className={`h-16 w-16 rounded-[24px] ${color} text-white flex items-center justify-center shadow-lg shadow-current/20`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
            <span className="text-[10px] font-black text-emerald-500 flex items-center gap-0.5">{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, string> = {
    // Order Statuses
    Pending: "bg-amber-100 text-amber-600 border-amber-200",
    Processing: "bg-blue-100 text-blue-600 border-blue-200",
    Shipped: "bg-indigo-100 text-indigo-600 border-indigo-200",
    Delivered: "bg-emerald-100 text-emerald-600 border-emerald-200",
    Cancelled: "bg-rose-100 text-rose-600 border-rose-200",
    // Product Statuses
    Active: "bg-emerald-100 text-emerald-600 border-emerald-200",
    Draft: "bg-slate-100 text-slate-600 border-slate-200",
    "Out of Stock": "bg-rose-100 text-rose-600 border-rose-200",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${configs[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}
