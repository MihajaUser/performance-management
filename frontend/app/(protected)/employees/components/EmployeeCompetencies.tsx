"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from "recharts";

type Item = { category: string; average: number };

export function EmployeeCompetencies({ items }: { items: Item[] }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="70%" data={items}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <Tooltip />
          <Radar
            name="Moyenne"
            dataKey="average"
            fill="#2563eb"
            fillOpacity={0.45}
          />
        </RadarChart>
      </ResponsiveContainer>
      {items.length === 0 && (
        <p className="text-gray-500 mt-3">Aucune compétence évaluée.</p>
      )}
    </div>
  );
}
