//frontend/app/(protected)/dashboard/components/PerformanceChart.tsx
"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function PerformanceChart({
  data,
}: {
  data: { name: string; score: number }[];
}) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
          <XAxis
            dataKey="name"
            stroke="#374151"
            tick={{ fontSize: 12, fill: "#1F2937" }}
          />
          <YAxis
            stroke="#374151"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: "#1F2937" }}
          />
          <Tooltip
            formatter={(v: number) => `${v.toFixed(1)}%`}
            contentStyle={{
              backgroundColor: "#F9FAFB",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#111827",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 13, color: "#374151" }}
            iconType="circle"
            verticalAlign="bottom"
          />
          <Bar
            dataKey="score"
            fill="url(#barGradient)"
            name="Score moyen (%)"
            radius={[6, 6, 0, 0]}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#003C82" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#0057B3" stopOpacity={0.75} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
