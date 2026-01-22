import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  Megaphone,
  Plus,
  Search,
  TrendingUp,
  Users,
  Mail,
  Share2,
  MousePointer2,
  DollarSign,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Target,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
 
/* ================= TYPES ================= */

type CampaignStatus = "Active" | "Scheduled" | "Completed" | "Paused" | "Draft";

interface Campaign {
  id: string;
  name: string;
  type: "Email" | "Social" | "Search" | "SMS";
  status: CampaignStatus;
  budget: number;
  spend: number;
  reach: number;
  conversions: number;
  startDate: string;
}

/* ================= CONSTANTS ================= */

const MMM_STORAGE_KEY = "erp_mmm_campaigns";
const ITEMS_PER_PAGE = 8;

/* ================= DEFAULT DATA ================= */

const defaultCampaigns: Campaign[] = [
  { id: "CMP-001", name: "Summer Service Special", type: "Email", status: "Active", budget: 50000, spend: 32000, reach: 15000, conversions: 450, startDate: "2024-01-01" },
  { id: "CMP-002", name: "New Model Launch", type: "Social", status: "Scheduled", budget: 120000, spend: 0, reach: 0, conversions: 0, startDate: "2024-02-15" },
  { id: "CMP-003", name: "Tire Replacement Promo", type: "SMS", status: "Completed", budget: 15000, spend: 14800, reach: 8000, conversions: 320, startDate: "2023-12-10" },
  { id: "CMP-004", name: "Winter Safety Check", type: "Search", status: "Active", budget: 45000, spend: 28000, reach: 12000, conversions: 210, startDate: "2024-01-05" },
  { id: "CMP-005", name: "Loyalty Rewards Program", type: "Email", status: "Paused", budget: 25000, spend: 12000, reach: 5000, conversions: 180, startDate: "2023-11-20" },
];

/* ================= MAIN COMPONENT ================= */

export default function MMM() {
   const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(MMM_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCampaigns;
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorage.setItem(MMM_STORAGE_KEY, JSON.stringify(campaigns));
  }, [campaigns]);

  /* ---------- CALCULATIONS ---------- */

  const totalBudget = campaigns.reduce((acc, curr) => acc + curr.budget, 0);
  const totalSpend = campaigns.reduce((acc, curr) => acc + curr.spend, 0);
  const avgConversionRate = ((campaigns.reduce((acc, curr) => acc + curr.conversions, 0) / 
                            (campaigns.reduce((acc, curr) => acc + curr.reach, 0) || 1)) * 100).toFixed(1);

  const filtered = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  /* ---------- ACTIONS ---------- */

  const handleSave = (campaignData: Campaign) => {
    if (selectedCampaign) {
      setCampaigns(prev => prev.map(c => c.id === campaignData.id ? campaignData : c));
      toast.success("Campaign updated");
    } else {
      setCampaigns(prev => [...prev, { ...campaignData, id: `CMP-${Date.now().toString().slice(-3)}` }]);
      toast.success("Campaign launched");
    }
    setShowForm(false);
    setSelectedCampaign(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this campaign?")) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
      toast.success("Campaign deleted");
    }
  };

  const toggleStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus: CampaignStatus = c.status === "Active" ? "Paused" : "Active";
        toast.success(`Campaign ${nextStatus}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 animate-in fade-in duration-700">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Standardized Header Section */}
        <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20 transition-transform duration-500">
                <Megaphone className="text-white w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Marketing <span className="text-blue-600">Growth</span>
                  </h1>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-200">
                    MMM v4.0
                  </span>
                </div>
                <p className="text-slate-500 mt-1 font-medium text-sm flex items-center gap-2">
                  Omnichannel Campaign Orchestration & ROI Tracking
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all w-64 lg:w-80 font-medium placeholder:text-slate-400"
                />
              </div>

              <button 
                onClick={() => {
                  setSelectedCampaign(null);
                  setShowForm(true);
                }}
                className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95"
              >
                <Plus size={18} />
                <span>Launch Campaign</span>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Ad Spend" value={`₹${(totalSpend / 1000).toFixed(1)}K`} icon={<DollarSign size={24} />} trend={`Of ₹${(totalBudget/1000).toFixed(0)}K`} color="blue" />
          <StatCard title="Total Reach" value={(campaigns.reduce((a, b) => a + b.reach, 0) / 1000).toFixed(1) + "K"} icon={<Users size={24} />} trend="Impressions" color="emerald" />
          <StatCard title="Conv. Rate" value={`${avgConversionRate}%`} icon={<Target size={24} />} trend="Avg. Perf" color="rose" />
          <StatCard title="Active Now" value={campaigns.filter(c => c.status === "Active").length.toString()} icon={<TrendingUp size={24} />} trend="Live now" color="slate" />
        </div>

        {/* Content Section */}
        <div className="bg-white border border-slate-200/60 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-blue-500 rounded-full"></span>
              Campaign Management
            </h3>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Campaign Details", "Channel", "Performance", "Budget Usage", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-sm border border-white/20 ${
                          campaign.type === 'Email' ? 'bg-blue-600' : 
                          campaign.type === 'Social' ? 'bg-pink-600' : 
                          campaign.type === 'Search' ? 'bg-amber-600' : 'bg-slate-900'
                        }`}>
                          {campaign.type === 'Email' && <Mail size={20} />}
                          {campaign.type === 'Social' && <Share2 size={20} />}
                          {campaign.type === 'Search' && <MousePointer2 size={20} />}
                          {campaign.type === 'SMS' && <Megaphone size={20} />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{campaign.name}</div>
                          <div className="text-[11px] text-slate-400 font-medium mt-0.5">Start: {campaign.startDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-semibold border border-slate-200">
                        {campaign.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-xs">{campaign.conversions.toLocaleString()} Conv.</span>
                        <span className="text-[11px] text-slate-400 font-medium">{campaign.reach.toLocaleString()} Reach</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 w-32">
                        <div className="flex justify-between text-[10px] font-medium">
                          <span className="text-slate-400">₹{campaign.spend.toLocaleString()}</span>
                          <span className="text-slate-900 font-bold">₹{campaign.budget.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              (campaign.spend / campaign.budget) > 0.9 ? 'bg-rose-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${Math.min(100, (campaign.spend / campaign.budget) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setShowForm(true);
                          }} 
                          className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-all"
                        >
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => toggleStatus(campaign.id)} className={`p-2 rounded-lg border transition-all ${
                          campaign.status === 'Active' ? 'bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 border-slate-200' : 'bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border-slate-200'
                        }`}>
                          {campaign.status === 'Active' ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                        </button>
                        <button onClick={() => handleDelete(campaign.id)} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-semibold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-semibold">{filtered.length}</span> Campaigns
            </p>
            <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === p ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Campaign Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedCampaign ? "Edit Campaign" : "New Campaign"}
                  </h2>
                  <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-wider">Campaign Configuration</p>
                </div>
                <button 
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data: Campaign = {
                  id: selectedCampaign?.id || "",
                  name: formData.get("name") as string,
                  type: formData.get("type") as Campaign["type"],
                  status: selectedCampaign?.status || "Active",
                  budget: Number(formData.get("budget")),
                  spend: selectedCampaign?.spend || 0,
                  reach: selectedCampaign?.reach || 0,
                  conversions: selectedCampaign?.conversions || 0,
                  startDate: formData.get("startDate") as string,
                };
                handleSave(data);
              }} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 ml-1">Campaign Name</label>
                  <input
                    name="name"
                    required
                    defaultValue={selectedCampaign?.name}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900"
                    placeholder="e.g. Summer Sale 2024"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 ml-1">Channel</label>
                    <select
                      name="type"
                      defaultValue={selectedCampaign?.type || "Email"}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900 appearance-none"
                    >
                      <option value="Email">Email Marketing</option>
                      <option value="Social">Social Media</option>
                      <option value="Search">Search Ads</option>
                      <option value="SMS">SMS Campaign</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 ml-1">Start Date</label>
                    <input
                      name="startDate"
                      type="date"
                      required
                      defaultValue={selectedCampaign?.startDate}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 ml-1">Budget (INR)</label>
                  <input
                    name="budget"
                    type="number"
                    required
                    defaultValue={selectedCampaign?.budget}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium text-slate-900"
                    placeholder="50000"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-md"
                  >
                    {selectedCampaign ? "Update" : "Launch"} Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
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

function StatCard({ title, value, icon, trend, color }: { title: string; value: string; icon: React.ReactNode; trend: string; color: "blue" | "emerald" | "rose" | "slate" }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    slate: "bg-slate-50 text-slate-600 border-slate-200"
  };

  const iconBgMap = {
    blue: "bg-blue-600",
    emerald: "bg-emerald-600",
    rose: "bg-rose-600",
    slate: "bg-slate-900"
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-20 h-20 ${iconBgMap[color]} opacity-[0.03] rounded-bl-full -mr-6 -mt-6 transition-all group-hover:scale-110`}></div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-300 border ${colorMap[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border ${colorMap[color]}`}>
          <TrendingUp size={12} />
          {trend.split(' ')[0]}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        <p className="text-[10px] font-medium text-slate-500 mt-2">{trend}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  const configs: Record<CampaignStatus, string> = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Scheduled: "bg-blue-50 text-blue-600 border-blue-100",
    Completed: "bg-slate-50 text-slate-500 border-slate-200",
    Paused: "bg-amber-50 text-amber-600 border-amber-100",
    Draft: "bg-slate-50 text-slate-400 border-slate-100",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${configs[status]}`}>
      {status}
    </span>
  );
}
