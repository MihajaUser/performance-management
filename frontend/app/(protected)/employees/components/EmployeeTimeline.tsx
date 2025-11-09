//frontend/app/(protected)/employees/components/EmployeeTimeline.tsx
"use client";

interface EvaluationTimelineProps {
  evaluations: { id: number; period: string; created_at: string }[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function EvaluationTimeline({
  evaluations,
  selectedId,
  onSelect,
}: EvaluationTimelineProps) {
  if (!evaluations.length) return null;

  const sortedEvaluations = [...evaluations].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <p className="text-sm text-gray-500 font-medium">Périodes :</p>
      <div className="flex flex-wrap gap-3">
        {sortedEvaluations.map((e) => {
          const isActive = selectedId === e.id;
          return (
            <button
              key={e.id}
              onClick={() => onSelect(e.id)}
              className={[
                "px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200",
                "hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1",
                isActive
                  ? "bg-[#002B5B] text-white border-[#002B5B] shadow-sm"
                  : "bg-white text-[#002B5B] border-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              {e.period}
            </button>
          );
        })}
      </div>
      <div className="border-t border-gray-200 mt-2" />
    </div>
  );
}
