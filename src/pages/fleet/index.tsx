interface FleetTableProps {
  title: string;
  columns: string[];
  rows: string[][];
}

export function FleetTable({ title, columns, rows }: FleetTableProps) {
  return (
    <div className="bg-slate-50/50 min-h-screen p-3 md:p-6 animate-in">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-8 bg-red-400 rounded-full"></span>
              {title}
            </h1>
            <p className="text-slate-500 mt-1 font-medium italic">
              Fleet Management › {title}
            </p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 font-medium text-slate-700"
                      >
                        {cellIndex === 0 ? (
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center font-bold text-xs border border-red-100 uppercase group-hover:scale-110 transition-transform">
                              {cell.charAt(0)}
                            </div>
                            <span>{cell}</span>
                          </div>
                        ) : (
                          <span className={cell === "Active" || cell === "Completed" || cell === "Available" 
                            ? "px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wide"
                            : cell === "Maintenance" || cell === "Pending" || cell === "In Service"
                            ? "px-2.5 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-wide"
                            : ""
                          }>
                            {cell}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && (
            <div className="py-20 text-center text-slate-500 font-medium">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
