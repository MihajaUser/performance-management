//frontend/app/(protected)/employees/[id]/evaluations/new/hooks/useEvaluationForm.ts
"use client";

import { api } from "@/app/(protected)/employees/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

interface KpiPayload {
  kpiTemplateId: number;
  score: number;
  comment?: string;
}

interface CompetencyPayload {
  competencyId: number;
  score: number;
  comment?: string;
}

interface CreateEvaluationPayload {
  employeeId: number;
  evaluatorId: number;
  period: string;
  type: "manager" | "auto" | "peer" | "hr_review";
  generalScore: number;
  comment: string;
  kpis: KpiPayload[];
  competencies: CompetencyPayload[];
}

export function useCreateEvaluation() {
  return useMutation({
    mutationFn: async (payload: CreateEvaluationPayload) => {
      const { data } = await api.post("/evaluations/create/full", payload);
      return data;
    },
  });
}
