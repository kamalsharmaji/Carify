
const MyBids = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bids</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-100">
              <th className="pb-4 font-semibold text-slate-600">Car Details</th>
              <th className="pb-4 font-semibold text-slate-600">Your Last Bid</th>
              <th className="pb-4 font-semibold text-slate-600">Status</th>
              <th className="pb-4 font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50">
              <td className="py-4">
                <p className="font-medium text-slate-900">2022 BMW M4</p>
                <p className="text-xs text-slate-500">Lot #4521</p>
              </td>
              <td className="py-4 font-bold text-slate-900">$72,500</td>
              <td className="py-4">
                <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-md">Winning</span>
              </td>
              <td className="py-4">
                <button className="text-blue-600 text-sm font-semibold hover:underline">View Auction</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
