//frontend/app/(protected)/employees/[id]/evaluations/new/components/CompetencySection.tsx
"use client";

export interface CompetencyItem {
  id: number;
  name: string;
  category: string;
  requiredLevel?: string;
  score: number;
  comment: string;
}

interface CompetencySectionProps {
  items: CompetencyItem[];
  onChange: (updated: CompetencyItem[]) => void;
}

const LEVEL_LABELS: Record<string, string> = {
  N: "Notions",
  I: "Intermédiaire",
  M: "Maîtrise",
  E: "Expert",
};

export function CompetencySection({ items, onChange }: CompetencySectionProps) {
  const updateItem = (
    id: number,
    field: keyof CompetencyItem,
    value: string | number
  ) => {
    onChange(
      items.map((c) =>
        c.id === id
          ? { ...c, [field]: field === "score" ? Number(value) : value }
          : c
      )
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Évaluation des compétences
      </h3>
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Compétence</th>
              <th className="px-4 py-2 text-left">Catégorie</th>
              <th className="px-4 py-2 text-center">Niveau requis</th>
              <th className="px-4 py-2 text-center">Score (1–5)</th>
              <th className="px-4 py-2 text-left">Commentaire</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {items.map((comp) => (
              <tr key={comp.id}>
                <td className="px-4 py-2">{comp.name}</td>
                <td className="px-4 py-2">{comp.category}</td>
                <td className="px-4 py-2 text-center">
                  {comp.requiredLevel
                    ? LEVEL_LABELS[comp.requiredLevel] ?? comp.requiredLevel
                    : "—"}
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={comp.score}
                    onChange={(e) =>
                      updateItem(comp.id, "score", e.target.value)
                    }
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-center
             focus:outline-none focus:ring-1 focus:ring-[#002B5B]/30 focus:border-[#002B5B]/40
             shadow-sm"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={comp.comment}
                    onChange={(e) =>
                      updateItem(comp.id, "comment", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1
             focus:outline-none focus:ring-1 focus:ring-[#002B5B]/30 focus:border-[#002B5B]/40
             shadow-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
