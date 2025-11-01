"use client";

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";

type Point = { period: string; score: number; predicted: number };

export function EmployeePerformance({ points }: { points: Point[] }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={points}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" stroke="#6b7280" />
          <YAxis stroke="#6b7280" domain={[0, 5]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#2563eb" dot={false} />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#16a34a"
            strokeDasharray="4 2"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      {points.length === 0 && (
        <p className="text-gray-500 mt-3">Aucune donnée de performance.</p>
      )}
    </div>
  );
}
