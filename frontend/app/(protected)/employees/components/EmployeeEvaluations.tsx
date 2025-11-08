//frontend/app/(protected)/employees/components/EmployeeEvaluations.tsx
"use client";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

export type EvaluationItem = {
  id: number;
  period: string;
  score: number;
  sentiment: string;
  trainingRecommendations?: { title: string; url: string }[];
};

type PerformancePoint = {
  period: string;
  score: number;
  predicted: number;
};

export function EmployeeEvaluations({
  items,
  performance,
}: {
  items: EvaluationItem[];
  performance: PerformancePoint[];
}) {
  console.log(items)
  return (
    <div className="space-y-8">
      {/* --- Graphique global --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900  mb-4">
          Évolution des performances
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performance}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="period"
                  tick={{ fontSize: 12, fill: "#4B5563" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: "#4B5563" }}
                />
                <Tooltip
                  formatter={(value: number) => value.toFixed(2)}
                  labelStyle={{ color: "#111827", fontWeight: 600 }}
                  contentStyle={{
                    backgroundColor: "#F9FAFB",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#374151",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 13, color: "#374151" }}
                  iconType="circle"
                  verticalAlign="bottom"
                />
                <Bar
                  dataKey="predicted"
                  fill="#86EFAC"
                  name="Score prédit (IA)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="score"
                  fill="#60A5FA"
                  name="Score réel"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Historique des évaluations --- */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Historique des évaluations
        </h3>
        <div className="space-y-3">
          {items.map((e) => (
            <div       key={e.id} className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{e.period}</p>
                  <p className="text-sm text-gray-700">
                    Sentiment IA :{" "}
                    <span className="font-medium capitalize">{e.sentiment}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {e.score.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* 🧠 Recommandations IA */}
              {e.trainingRecommendations && e.trainingRecommendations.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-[#002B5B] mb-1">
                    🎯 Formations recommandées :
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {e.trainingRecommendations.map((rec, idx) => (
                      <li key={idx}>
                        <a
                          href={rec.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {rec.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          ))}
          {items.length === 0 && (
            <p className="text-gray-500 text-sm">Aucune évaluation.</p>
          )}
        </div>
      </div>
    </div>
  );
}
