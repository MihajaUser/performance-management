//frontend/app/(protected)/employees/hooks/useEmployeeCompetenciesQuery.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/apiClient";

export interface CompetencySummary {
  id: number;
  category: string;
  averageScore: number;
  commentSummary?: string;
}

export interface CompetencyDetail {
  id: number;
  competency: string;
  category: string;
  score: number;
  comment?: string;
  evaluatorType: string;
  requiredLevel?: string | null;
}

export interface EmployeeCompetencies {
  summary: CompetencySummary[];
  details: CompetencyDetail[];
}

/**
 * 🧠 Récupère les compétences d’un employé, filtrées par évaluation si précisé
 */
export function useEmployeeCompetenciesQuery(userId: number, evaluationId?: number | null) {
  return useQuery<EmployeeCompetencies>({
    queryKey: ["employeeCompetencies", userId, evaluationId],
    queryFn: async () => {
      const url = evaluationId
        ? `/competencies/user/${userId}?evaluationId=${evaluationId}` // ✅ camelCase
        : `/competencies/user/${userId}`;
      const { data } = await api.get(url);
      return data;
    },
    enabled: !!userId,
  });
}
