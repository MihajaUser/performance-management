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
  isLoading?: boolean;
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
  isLoading,
  onSubmit,
}: EvaluationFormProps) {
  const [formData, setFormData] = useState<EvaluationPayload>({
    employeeId,
    kpis: kpis.map((k) => ({ ...k, score: 0, comment: "" })),
    competencies: competencies.map((c) => ({ ...c, score: 0, comment: "" })),
    comment: "",
  });

  const [commentSentiment, setCommentSentiment] = useState<string | null>(null);

  const [isAnalyzed, setIsAnalyzed] = useState(false);

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
        onChange={(value) => {
          setFormData((f) => ({ ...f, comment: value }));
          setIsAnalyzed(false); // 🧠 si on retape, il faut réanalyser
        }}
        onSentimentChange={setCommentSentiment}
        onAnalyzedChange={setIsAnalyzed} // 🆕 ajoute ceci !
      />

      <div className="flex justify-end">
        <Button
          color="primary"
          type="submit"
          isLoading={isLoading}
          spinner={<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}  
          isDisabled={
            isLoading || !allValid || !isAnalyzed || commentSentiment === "aggressif"
          }
          className={`transition-all duration-200 px-6 py-2.5 rounded-lg shadow-sm font-medium text-sm
    ${allValid && isAnalyzed && commentSentiment !== "aggressif"
              ? "bg-[#002B5B] hover:bg-[#003a78] text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {isLoading ? "Enregistrement..." : "Enregistrer l’évaluation"}
        </Button>

      </div>
    </form>
  );
}
