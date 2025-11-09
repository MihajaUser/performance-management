//frontend/app/(protected)/employees/[id]/page.tsx
"use client";

import { useState, useMemo } from "react";
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
import { ChevronDown, ChevronUp, GraduationCap } from "lucide-react";

export type EvaluationItem = {
  id: number;
  period: string;
  score: number;
  sentiment: string;
  trainingRecommendations?: { title: string; url: string }[];
  createdAt: string;
};

type PerformancePoint = {
  period: string;
  score: number;
  predicted: number;
};

export function EmployeeEvaluations({
  items,
  performance,
  weakestKpi,
}: {
  items: EvaluationItem[];
  performance: PerformancePoint[];
  weakestKpi?: string | null;
}) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  // 🧩 Trier les évaluations du plus récent au plus ancien
  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [items]
  );

  const getIntroMessage = (score: number) => {
    if (score >= 90)
      return `Excellent travail ! Tu fais preuve d'une performance remarquable sur l'ensemble de tes indicateurs. Continue ainsi ! 👏`;

    if (score >= 70)
      return weakestKpi
        ? `Très bon niveau général ! Tu pourrais encore renforcer ton efficacité sur "${weakestKpi}" pour viser l’excellence. 💪`
        : `Très bon niveau général ! Continue à perfectionner tes compétences pour viser l’excellence. 💪`;

    if (score >= 50)
      return weakestKpi
        ? `Performance correcte, mais des points comme "${weakestKpi}" méritent une attention particulière. 🔍`
        : `Performance correcte dans l’ensemble, quelques axes d’amélioration possibles. 🔍`;

    return weakestKpi
      ? `Des difficultés sont observées, notamment sur "${weakestKpi}". Nous te recommandons de suivre des formations ciblées pour progresser. 🎯`
      : `Des difficultés générales sont observées. Voici quelques formations recommandées pour t’aider à progresser. 🎯`;
  };

  return (
    <div className="space-y-8">
      {/* --- Graphique global --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
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

      {/* --- Retour d’évaluation --- */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
         Retour d’évaluation
        </h3>
        <div className="space-y-3">
          {sortedItems.map((e) => (
            <div
              key={e.id}
              className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-3 hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{e.period}</p>
                  
                  <p className="text-sm text-gray-700">
                    Sentiment IA :{" "}
                    <span className="font-medium capitalize">
                      {e.sentiment}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="text-lg font-semibold text-gray-700">
                    {e.score.toFixed(2)}{' /100'}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 italic">
                {getIntroMessage(e.score)}
              </p>

              {e.trainingRecommendations?.length ? (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => toggleOpen(e.id)}
                    className="flex items-center gap-2 text-sm text-[#002B5B] hover:text-blue-700 font-medium"
                  >
                    <GraduationCap className="w-4 h-4" />
                    {openId === e.id
                      ? "Masquer les formations"
                      : "Voir les formations recommandées"}
                    {openId === e.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {openId === e.id && (
                    <div className="mt-3 space-y-2">
                      {e.trainingRecommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-lg bg-white p-3 shadow-sm hover:shadow-md transition"
                        >
                          <p className="text-sm font-medium text-gray-800 mb-1 truncate">
                            {rec.title}
                          </p>
                          <a
                            href={rec.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            🔗 Consulter la formation
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ))}
          {!sortedItems.length && (
            <p className="text-gray-500 text-sm">Aucune évaluation.</p>
          )}
        </div>
      </div>
    </div>
  );
}