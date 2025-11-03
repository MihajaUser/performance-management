//frontend/app/(protected)/employees/components/EmployeeCompetenciesTable.tsx
"use client";

type DetailItem = {
  competency: string;
  category: string;
  score: number;
  requiredLevel?: string | null;
  comment?: string;
};

const LEVEL_LABELS: Record<string, string> = {
  N: "Notions",
  I: "Intermédiaire",
  M: "Maîtrise",
  E: "Expert",
};

export function EmployeeCompetenciesTable({
  details,
}: {
  details: DetailItem[];
}) {
  return (
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
                Niveau requis
              </th>
              <th className="px-5 py-3 text-center font-semibold text-gray-600">
                Score
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
                <td className="px-5 py-3 text-gray-900 text-center font-medium">
                  {item.requiredLevel
                    ? LEVEL_LABELS[item.requiredLevel] || item.requiredLevel
                    : "—"}
                </td>
                <td className="px-5 py-3 text-center text-gray-800 font-semibold">
                  {item.score.toFixed(1)}
                </td>
                <td className="px-5 py-3 text-gray-600">
                  {item.comment ?? "—"}
                </td>
              </tr>
            ))}

            {details.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-6 text-center text-gray-500">
                  Aucune compétence évaluée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
