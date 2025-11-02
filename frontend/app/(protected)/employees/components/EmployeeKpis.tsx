"use client";

export type KpiItem = {
  id: number;
  name: string;
  target: number;
  actual: number;
  score: number;
  comment?: string;
  weight?: number;
};

export function EmployeeKpis({ items }: { items: KpiItem[] }) {
  if (!items.length) {
    return <p className="text-gray-500 text-sm">Aucun KPI enregistré.</p>;
  }

  const weightedSum = items.reduce(
    (acc, k) => acc + (k.score * (k.weight ?? 25)) / 100,
    0
  );
  const totalWeight = items.reduce((acc, k) => acc + (k.weight ?? 25), 0);
  const weightedAverage = (weightedSum / totalWeight) * 100;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Détails des indicateurs de performance
      </h3>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-gray-600">
                Intitulé du KPI
              </th>
              <th className="px-5 py-3 text-center font-semibold text-gray-600">
                Objectif
              </th>
              <th className="px-5 py-3 text-center font-semibold text-gray-600">
                Réalisé
              </th>
              <th className="px-5 py-3 text-center font-semibold text-gray-600">
                Score
              </th>
              <th className="px-5 py-3 text-center font-semibold text-gray-600">
                Poids (%)
              </th>
              <th className="px-5 py-3 text-left font-semibold text-gray-600">
                Commentaire
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {items.map((kpi) => (
              <tr key={kpi.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3 text-gray-900 font-medium">
                  {kpi.name}
                </td>
                <td className="px-5 py-3 text-center text-gray-700">
                  {kpi.target}
                </td>
                <td className="px-5 py-3 text-center text-gray-700">
                  {kpi.actual}
                </td>
                <td className="px-5 py-3 text-center text-gray-900 font-semibold">
                  {kpi.score.toFixed(1)}
                </td>
                <td className="px-5 py-3 text-center text-gray-700">
                  {kpi.weight ?? "—"}
                </td>
                <td className="px-5 py-3 text-gray-600">
                  {kpi.comment ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-left">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-[#002B5B]">
            Moyenne pondérée KPI :
          </span>{" "}
          {weightedAverage.toFixed(1)} / 100
        </p>
      </div>
    </div>
  );
}
