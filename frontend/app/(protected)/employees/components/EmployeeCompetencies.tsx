"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type DetailItem = {
  competency: string;
  category: string;
  score: number;
  requiredLevel?: string | null;
  comment?: string;
};

type SummaryItem = {
  category: string;
  averageScore: number;
  commentSummary?: string;
};

export function EmployeeCompetencies({
  summary,
  details,
}: {
  summary: SummaryItem[];
  details: DetailItem[];
}) {
  return (
    <div className="space-y-10">
      {/* --- Graphique de synthèse --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Synthèse des catégories
        </h3>

        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart
            layout="vertical"
            data={summary.map((s) => ({
              category: s.category,
              average: s.averageScore,
            }))}
            margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              type="number"
              domain={[0, 5]}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              dataKey="category"
              type="category"
              width={140}
              tick={{ fill: "#4B5563", fontSize: 13, fontWeight: 500 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#374151",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#6B7280" }} />
            <Bar
              dataKey="average"
              fill="#9CA3AF"
              radius={[6, 6, 6, 6]}
              barSize={18}
              opacity={0.6}
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#4B5563"
              strokeWidth={2}
              dot={{ r: 4, fill: "#4B5563" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* --- Tableau détaillé --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Détails des compétences
        </h3>

        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">
                  Compétence
                </th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">
                  Catégorie
                </th>
                <th className="px-5 py-3 text-center font-semibold text-gray-600">
                  Score
                </th>
                <th className="px-5 py-3 text-center font-semibold text-gray-600">
                  Niveau requis
                </th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">
                  Commentaire
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {details.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3 text-gray-900 font-medium">
                    {item.competency}
                  </td>
                  <td className="px-5 py-3 text-gray-700">{item.category}</td>
                  <td className="px-5 py-3 text-center">
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md font-semibold">
                      {item.score.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="inline-block bg-gray-50 border border-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
                      {item.requiredLevel ?? "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600 italic">
                    {item.comment ?? "—"}
                  </td>
                </tr>
              ))}
              {details.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-6 text-center text-gray-500 italic"
                  >
                    Aucune compétence évaluée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
