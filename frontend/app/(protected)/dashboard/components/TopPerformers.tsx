"use client";

export function TopPerformers({
  data,
}: {
  data: { name: string; department: string; score: number }[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="py-3 px-4 font-semibold text-gray-600">Employé</th>
            <th className="px-4 font-semibold text-gray-600">Département</th>
            <th className="px-4 text-right font-semibold text-gray-600">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, i) => (
            <tr
              key={p.name}
              className={[
                "border-b last:border-none transition-colors",
                i === 0
                  ? "bg-[#002B5B]/5 font-semibold"
                  : "hover:bg-gray-50",
              ].join(" ")}
            >
              <td className="py-3 px-4 text-gray-900 flex items-center gap-2">
                <span
                  className={[
                    "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                    i === 0
                      ? "bg-[#002B5B] text-white"
                      : "bg-gray-200 text-gray-700",
                  ].join(" ")}
                >
                  {i + 1}
                </span>
                {p.name}
              </td>
              <td className="px-4 text-gray-700">{p.department}</td>
              <td className="px-4 text-right font-medium text-gray-900">
                {p.score.toFixed(1)} / 100
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
