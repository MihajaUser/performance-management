"use client";

import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          className="bg-[#002B5B] text-white"
        >
          Enregistrer l’évaluation
        </Button>
      </div>
    </form>
  );
}
