//frontend/app/(protected)/employees/[id]/evaluations/new/components/EvaluationForm.tsx
"use client";

import { useState, useMemo } from "react";
import { KpiData, KpiSection } from "./KpiSection";
import { CompetencyItem, CompetencySection } from "./CompetencySection";
import { CommentSection } from "./CommentSection";
import { Button } from "@heroui/react";

interface EvaluationFormProps {
  employeeId: number;
  kpis: KpiData[];
  competencies: CompetencyItem[];
  onSubmit: (data: EvaluationPayload) => void;
}

interface EvaluationPayload {
  employeeId: number;
  kpis: KpiData[];
  competencies: CompetencyItem[];
  comment: string;
}

export function EvaluationForm({
  employeeId,
  kpis,
  competencies,
  onSubmit,
}: EvaluationFormProps) {
  const [formData, setFormData] = useState<EvaluationPayload>({
    employeeId,
    kpis: kpis.map((k) => ({ ...k, score: 0, comment: "" })),
    competencies: competencies.map((c) => ({ ...c, score: 0, comment: "" })),
    comment: "",
  });

  const allValid = useMemo(() => {
    const kpiValid = formData.kpis.every(
      (k) => k.score > 0 && k.comment.trim().length > 0
    );
    const compValid = formData.competencies.every(
      (c) => c.score > 0 && c.comment.trim().length > 0
    );
    const commentValid = formData.comment.trim().length > 0;
    return kpiValid && compValid && commentValid;
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <KpiSection
        items={formData.kpis}
        onChange={(updated) => setFormData((f) => ({ ...f, kpis: updated }))}
      />

      <CompetencySection
        items={formData.competencies}
        onChange={(updated) =>
          setFormData((f) => ({ ...f, competencies: updated }))
        }
      />

      <CommentSection
        value={formData.comment}
        onChange={(value) => setFormData((f) => ({ ...f, comment: value }))}
      />

      <div className="flex justify-end pt-4">
        <Button
          color="primary"
          type="submit"
          isDisabled={!allValid}
          className={`transition-all duration-200 px-6 py-2.5 rounded-lg shadow-sm font-medium text-sm
      ${allValid
              ? "bg-[#002B5B] hover:bg-[#003a78] text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Enregistrer l’évaluation
        </Button>
      </div>
    </form>
  );
}
