import { Users, MapPin } from "lucide-react";

export default function VendorMapping() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Standard Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/10">
              <Users className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Vendor Mapping
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Link inventory items to specific suppliers
              </p>
            </div>
          </div>
        </div>

        {/* Empty State / Content Area */}
        <div className="bg-white border border-slate-200 rounded-xl p-12 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
            <MapPin size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Mappings Defined</h3>
          <p className="text-slate-500 mt-2 font-medium max-w-sm">
            Connect items to vendors for automated procurement and supply chain management.
          </p>
          <button className="mt-8 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all active:scale-95 flex items-center gap-2">
            Create First Mapping
          </button>
        </div>
      </div>
    </div>
  );
}
