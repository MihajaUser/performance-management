//frontend/app/(protected)/employees/components/EmployeeCompetenciesChart.tsx
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

type SummaryItem = {
  category: string;
  averageScore: number;
  commentSummary?: string;
};

export function EmployeeCompetenciesChart({
  summary,
}: {
  summary: SummaryItem[];
}) {
  return (
    <div>
      <h3 className="ttext-lg font-semibold text-gray-900 mb-4">
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
  );
}
