import React from 'react';
import { Gavel } from 'lucide-react';

const LiveAuctions = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Live Auctions</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px]">
        <div className="p-4 bg-red-50 text-red-600 rounded-full mb-4 animate-pulse">
          <Gavel size={32} />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">No Live Auctions</h2>
        <p className="text-slate-500 mt-2">Check back later for upcoming car auctions.</p>
      </div>
    </div>
  );
};

export default LiveAuctions;
