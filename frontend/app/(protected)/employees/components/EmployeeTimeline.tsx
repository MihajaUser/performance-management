//frontend/app/(protected)/employees/components/EmployeeTimeline.tsx
"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

interface EvaluationPeriod {
  id: number;
  period: string;
}

interface EmployeeTimelineProps {
  evaluations: EvaluationPeriod[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function EmployeeTimeline({
  evaluations,
  selectedId,
  onSelect,
}: EmployeeTimelineProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!evaluations.length)
    return (
      <p className="text-gray-500 text-sm mt-2">
        Aucune période d’évaluation disponible.
      </p>
    );

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 pb-3 mb-4">
      <span className="text-sm font-medium text-gray-600 mr-2">
        Périodes :
      </span>

      {evaluations.map((e) => (
        <Button
          key={e.id}
          size="sm"
          radius="full"
          variant={selectedId === e.id ? "solid" : "bordered"}
          color={selectedId === e.id ? "primary" : "default"}
          onClick={() => onSelect(e.id)}
          onMouseEnter={() => setHovered(e.id)}
          onMouseLeave={() => setHovered(null)}
          className={`transition ${
            hovered === e.id && selectedId !== e.id
              ? "border-primary/50 text-primary"
              : ""
          }`}
        >
          {e.period}
        </Button>
      ))}
    </div>
  );
}
