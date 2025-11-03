//frontend/app/(protected)/employees/[id]/evaluations/new/components/KpiSection.tsx
"use client";

export interface KpiData {
  id: number;
  name: string;
  target: number;
  actual: number;
  score: number;
  weight: number;
  comment: string;
}

interface KpiSectionProps {
  items: KpiData[];
  onChange: (updated: KpiData[]) => void;
}

export function KpiSection({ items, onChange }: KpiSectionProps) {
  const updateItem = (id: number, field: keyof KpiData, value: string | number) => {
    onChange(
      items.map((kpi) =>
        kpi.id === id ? { ...kpi, [field]: field === "score" ? Number(value) : value } : kpi
      )
    );
  };

  const average =
    items.reduce((sum, k) => sum + (k.score * (k.weight ?? 1)), 0) /
    (items.length || 1);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Détails des KPI
      </h3>
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Intitulé du KPI</th>
              <th className="px-4 py-2 text-center">Objectif</th>
              <th className="px-4 py-2 text-center">Réalisé</th>
              <th className="px-4 py-2 text-center">Score</th>
              <th className="px-4 py-2 text-left">Commentaire</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {items.map((kpi) => (
              <tr key={kpi.id}>
                <td className="px-4 py-2 text-gray-900">{kpi.name}</td>
                <td className="px-4 py-2 text-center">{kpi.target}</td>
                <td className="px-4 py-2 text-center">{kpi.actual}</td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={kpi.score}
                    onChange={(e) => updateItem(kpi.id, "score", e.target.value)}
                    className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={kpi.comment}
                    onChange={(e) => updateItem(kpi.id, "comment", e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-right mt-3 text-sm text-gray-700">
        Moyenne pondérée KPI :{" "}
        <span className="font-semibold text-[#002B5B]">
          {average.toFixed(1)} / 100
        </span>
      </p>
    </div>
  );
}
