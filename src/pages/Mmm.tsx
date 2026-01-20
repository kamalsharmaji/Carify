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
    <div 
      className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-500"
       
    >
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <span className="w-2.5 h-10 bg-brand rounded-full"></span>
              Marketing Engine
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <Megaphone size={16} />
              MMM › Multimedia-Campaign Marketing System
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all w-64 shadow-sm font-medium"
              />
            </div>
            
            <button 
              onClick={() => {
                setSelectedCampaign(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-brand hover:opacity-90 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Create Campaign</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Ad Spend" value={`₹${(totalSpend / 1000).toFixed(1)}K`} icon={<DollarSign size={24} />} trend={`Of ₹${(totalBudget/1000).toFixed(0)}K Budget`} color="bg-brand" />
          <StatCard title="Total Reach" value={(campaigns.reduce((a, b) => a + b.reach, 0) / 1000).toFixed(1) + "K"} icon={<Users size={24} />} trend="Impressions" color="bg-emerald-500" />
          <StatCard title="Conv. Rate" value={`${avgConversionRate}%`} icon={<Target size={24} />} trend="Avg. Performance" color="bg-rose-500" />
          <StatCard title="Active Now" value={campaigns.filter(c => c.status === "Active").length.toString()} icon={<TrendingUp size={24} />} trend="Live campaigns" color="bg-indigo-500" />
        </div>

        {/* Campaign List */}
        <div className="bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Campaign Details", "Channel", "Performance", "Budget Usage", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-sm ${
                          campaign.type === 'Email' ? 'bg-blue-500' : 
                          campaign.type === 'Social' ? 'bg-pink-500' : 
                          campaign.type === 'Search' ? 'bg-amber-500' : 'bg-slate-700'
                        }`}>
                          {campaign.type === 'Email' && <Mail size={18} />}
                          {campaign.type === 'Social' && <Share2 size={18} />}
                          {campaign.type === 'Search' && <MousePointer2 size={18} />}
                          {campaign.type === 'SMS' && <Megaphone size={18} />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-[15px]">{campaign.name}</div>
                          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Starts: {campaign.startDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {campaign.type}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">{campaign.conversions.toLocaleString()} Conv.</span>
                        <span className="text-xs text-slate-400">{campaign.reach.toLocaleString()} Reach</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-1.5 w-40">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                          <span className="text-slate-400">₹{campaign.spend.toLocaleString()}</span>
                          <span className="text-slate-900">₹{campaign.budget.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              (campaign.spend / campaign.budget) > 0.9 ? 'bg-rose-500' : 'bg-brand'
                            }`}
                            style={{ width: `${Math.min(100, (campaign.spend / campaign.budget) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setShowForm(true);
                          }} 
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                        >
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => toggleStatus(campaign.id)} className={`p-2.5 rounded-xl transition-all ${
                          campaign.status === 'Active' ? 'bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                        }`}>
                          {campaign.status === 'Active' ? <Clock size={18} /> : <CheckCircle2 size={18} />}
                        </button>
                        <button onClick={() => handleDelete(campaign.id)} className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                          <Trash2 size={18} />
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <p className="text-sm font-bold text-slate-400">
              Showing <span className="text-slate-900 font-black">{(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-slate-900 font-black">{filtered.length}</span> Campaigns
            </p>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1">
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
                className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Campaign Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {selectedCampaign ? "Edit Campaign" : "New Campaign"}
                  </h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Campaign Configuration</p>
                </div>
                <button 
                  onClick={() => setShowForm(false)}
                  className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm border border-transparent hover:border-slate-100"
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
              }} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Campaign Name</label>
                  <input
                    name="name"
                    required
                    defaultValue={selectedCampaign?.name}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-bold text-slate-900"
                    placeholder="e.g. Summer Sale 2024"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Channel</label>
                    <select
                      name="type"
                      defaultValue={selectedCampaign?.type || "Email"}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-bold text-slate-900 appearance-none"
                    >
                      <option value="Email">Email Marketing</option>
                      <option value="Social">Social Media</option>
                      <option value="Search">Search Ads</option>
                      <option value="SMS">SMS Campaign</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                    <input
                      name="startDate"
                      type="date"
                      required
                      defaultValue={selectedCampaign?.startDate}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Budget (INR)</label>
                  <input
                    name="budget"
                    type="number"
                    required
                    defaultValue={selectedCampaign?.budget}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-bold text-slate-900"
                    placeholder="50000"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 rounded-2xl bg-brand text-white font-bold hover:opacity-90 transition-all shadow-xl active:scale-95"
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

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center text-center">
      <div className={`h-14 w-14 rounded-full ${color === 'bg-brand' ? 'bg-brand' : color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <div className={`${color === 'bg-brand' ? 'text-brand' : color.replace('bg-', 'text-')}`}>
          {icon}
        </div>
      </div>
      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h3>
      {trend && (
        <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">
          {trend}
        </span>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  const configs: Record<CampaignStatus, string> = {
    Active: "bg-green-50 text-green-600 border-green-100",
    Scheduled: "bg-blue-50 text-blue-600 border-blue-100",
    Completed: "bg-slate-50 text-slate-600 border-slate-100",
    Paused: "bg-amber-50 text-amber-600 border-amber-100",
    Draft: "bg-slate-50 text-slate-400 border-slate-100",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${configs[status]}`}>
      {status}
    </span>
  );
}
